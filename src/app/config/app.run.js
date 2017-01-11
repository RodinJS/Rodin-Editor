/**
 * Created by kh.levon98 on 13-Sep-16.
 */
function AppRun(AppConstants, $rootScope, Restangular, JWT, $state, $location, $sce, Loader) {
  'ngInject';

  let loader;

  Restangular.addFullRequestInterceptor(function (element, operation, route, url, headers, params, httpConfig) {
    headers["x-access-token"] = JWT.get();
    headers["Access-Control-Allow-Origin"] = "*";
    return {
      headers: headers
    };
  });

  Restangular.setErrorInterceptor(function (response, deferred, responseHandler) {
    if (response.status === 401) {
      JWT.destroy();
      $location.href = this._AppConstants.SITE;
      return false; // error handled
    }

    return true; // error not handled
  });

  // change page title based on state

  $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {
    loader = Loader.show();
    if (toState.redirectToWhenAuthenticated && JWT.get()) {
      // User isn’t authenticated
      $state.go(toState.redirectToWhenAuthenticated);

      event.preventDefault();
    }
  });

  $rootScope.$on('$stateChangeSuccess', (event, toState) => {
    $rootScope.setPageTitle(toState.title);

    $rootScope.setPageClass(toState.pageClass);

    Loader.hide();
  });

  // Helper method for setting the page's title
  $rootScope.setPageTitle = (title) => {
    $rootScope.pageTitle = AppConstants.appName;
    if (title) {
      $rootScope.pageTitle += ' - ';
      $rootScope.pageTitle += title;
    }
  };

  // Helper method for setting the page's class
  $rootScope.setPageClass = (pageClass) => {
    $rootScope.pageClass = pageClass;
  };

  ///
  $rootScope.trustSrc = function (src) {
    return $sce.trustAsResourceUrl(src);
  };

  ///
  $rootScope.trustedHtml = function (html) {
    return $sce.trustedHtml(html);
  };

  ////// debuging /////
  $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
    console.info('$stateChangeStart to ---' + toState.to + '--- fired when the transition begins. toState ----,toParams ---- \n', toState, toParams);
  });
  $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
    console.error('$stateChangeError - fired when an error occurs during transition.');
    console.error(arguments);
  });
  $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
    console.log('%c$stateChangeSuccess to ----' + toState.name + '---- fired once the state transition is complete.', "color: green");
  });
  $rootScope.$on('$viewContentLoading', function (event, viewConfig) {
    console.info('$viewContentLoading - view begins loading - dom not rendered ----', viewConfig);
  });
  // $rootScope.$on('$viewContentLoaded',function(event){
  //   // runs on individual scopes, so putting it in "run" doesn't work.
  //   console.log('$viewContentLoaded - fired after dom rendered',event);
  // });
  $rootScope.$on('$stateNotFound', function (event, unfoundState, fromState, fromParams) {
    console.error('$stateNotFound ----' + unfoundState.to + '---- fired when a state cannot be found by its name.');
    console.error(unfoundState, fromState, fromParams);
  });

}

export default AppRun;
