/**
 * Created by kh.levon98 on 13-Sep-16.
 */

function AppConfig(RestangularProvider, $stateProvider, $locationProvider, $urlRouterProvider, AppConstants, $logProvider, NotificationProvider) {
  'ngInject';

  RestangularProvider.setBaseUrl(AppConstants.API);

  // In this case we are mapping the id of each element to the _id field.
  RestangularProvider.setRestangularFields({
    id: "_id"
  });


  NotificationProvider.setOptions({
    delay: 5000,
    maxCount: 10,
    startTop: 40,
    startRight: 10,
    verticalSpacing: 20,
    horizontalSpacing: 20,
    positionX: 'right',
    positionY: 'top'
  });


  if (AppConstants.env !== "local") {
    $locationProvider.html5Mode(true);

    if (AppConstants.env === "prod") {

      $logProvider.debugEnabled(false);

      window.console.log = () => {

      };

      window.console.warn = () => {

      };

      window.console.info = () => {

      };

      /*
       window.console.error = ()=> {

       }
       */

    }
  }


  $stateProvider
    .state('app', {
      abstract: true,
      templateUrl: 'layout/main/app-view.html',
      resolve: {
        auth: function (User) {
          return User.verifyAuth();
        }
      }
    });


  $urlRouterProvider.otherwise('/error');

}

export default AppConfig;
