/**
 * Created by kh.levon98 on 13-Sep-16.
 */
import angular from 'angular/index';
import './helpers';

// Import our app config files
import constants  from './config/app.constants';
import appConfig  from './config/app.config';
import appRun     from './config/app.run';

// Import our dependencies
import 'angular-animate/angular-animate.min';
import 'angular-touch/angular-touch.min';
import 'angular-cookies/angular-cookies.min';
import 'angular-sanitize/angular-sanitize.min';
import 'angular-event-emitter/angular-event-emitter';

import 're-tree/re-tree.min';
import 'ng-device-detector/ng-device-detector.min';

import 'angular-ui-router/release/angular-ui-router.min';
import 'a0-angular-storage/dist/angular-storage.min';
import 'lodash/dist/lodash.min';

import 'restangular/dist/restangular.min';
import 'angular-bootstrap/ui-bootstrap-tpls.min';
import 'angular-ui-tree/dist/angular-ui-tree.min';
import 'angular-bootstrap-contextmenu/contextMenu';

// Import our templates file (generated by Gulp)
import './config/app.templates';
// Import our app functionality
import './filters/index';
import './services/index';
import './components/index';
import './layout/index';
import './pages/index';

// Create and bootstrap application
const requires = [
  'ngAnimate',
  'ngTouch',
  'ngCookies',
  'ngSanitize',
  'ngEventEmitter',
  'ng.deviceDetector',

  'angular-storage',
  'ui.router',
  'restangular',

  'templates',


  'ui.bootstrap',
  'ui.bootstrap.contextMenu',
  'ui.tree',


  'app.filters',
  'app.services',
  'app.components',
  'app.layout',
  'app.pages'
];

// Mount on window for testing
const app = angular.module('app', requires);

angular.module('app').constant('AppConstants', constants);

angular.module('app').config(appConfig);

angular.module('app').run(appRun);

angular.bootstrap(document, ['app'], {
  strictDi: true
});
