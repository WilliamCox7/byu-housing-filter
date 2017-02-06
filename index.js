/* PACKAGES */
var express = require('express');
var bodyParser = require('body-parser');
var passport = require('passport');
var session = require('express-session');
var config = require('./config.js');
var FacebookStrategy = require('passport-facebook').Strategy;
var less = require('less');
var fileSystem = require('fs');
var port = 3000;

var MongoClient = require('mongodb').MongoClient, assert = require('assert');
MongoClient.connect('mongodb://localhost:27017/myproject', function(err, db) {
  assert.equal(null, err);
  console.log("mongodb successfully connected to server");
  db.close();
});

var app = module.exports = express();

app.use(session({ secret: config.secret, saveUninitialized: false, resave: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

/* AUTH */
passport.serializeUser(function(user, done) { done(null, user); });
passport.deserializeUser(function(obj, done) { done(null, obj); });

/* FACEBOOK STRATEGY */
passport.use(new FacebookStrategy({
    clientID: config.fb.clientID,
    clientSecret: config.fb.clientSecret,
    callbackURL: "http://localhost:3000/auth/fb/callback"
  },
  function(token, refreshToken, profile, done) {
    var fb_id = profile.id;
    db.checkFbUser([fb_id], function(err, user) {
      if (!user[0]) {
        var first = profile.displayName.split(" ")[0];
        var last = profile.displayName.split(" ")[1];
        db.createUser([null, null, fb_id, null, first, last, null], function(err, newUser) {
          db.initUser(newUser[0].id, false, function(err, init) {});
          return done(err, newUser[0]);
        });
      } else {
        return done(err, user[0]);
      }
    });
  }
));

app.get('/auth/fb', passport.authenticate('facebook', { scope : 'email' }));

app.get('/auth/fb/callback', passport.authenticate('facebook', {
    successRedirect : '/#!/home/options',
    failureRedirect : '/#!/login'
}));

/* SERVER */
app.listen(port, function() {
  console.log('port ' + port + ' is listening');
});

/* LESS MANAGEMENT */
fileSystem.readFile('styles.less', function(err, styles) {
    less.render(styles.toString(), function(er, css) {
        fileSystem.writeFile('./public/styles/styles.css', css.css, function(e) {
            console.log('Compiled CSS');
        });
    });
});
