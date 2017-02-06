var byuFilterApp = {

  appDescription: 'Advanced filter for finding byu off-campus housing',

  /* MINIMUM VIABLE PRODUCT */
  mvp: {

    frontEnd = {
      framework: 'React Native',
      boilerPlate: 'Skeleton',
      preProcessor: 'LESS',
      views: {
        login: [
          'has a button where you can log in with facebook',
          'background is a autoplayed looping video of google maps buildings popping up'
        ],
        filter: [
          'top section where you can do a simple filter',
          'results section where you can view what you searched for'
        ],
        apartment: [
          'shows specific details about the apartment complex'
        ]
      }
    },

    backEnd = {
      database: 'mongoDB',
      auth: {
        strategies: 'facebook',
        profile: [
          'profile-pic',
          'first name',
          'last name'
        ]
      },
      endpoints: {
        create: {

        },
        read: {

        },
        update: {

        },
        delete: {

        }
      }
    }

  },

  /* UNNECESSARY ADDITIONS TO APP (NOT APART OF MVP)*/
  additions: {

    frontEnd: {
      views: {
        login: {
          elements: {
            p: 'why only facebook login?'
          }
        }
      }
    }

  }

}
