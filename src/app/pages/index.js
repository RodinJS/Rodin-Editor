/**
 * Created by kh.levon98 on 14-Sep-16.
 */
import angular from 'angular/index';


import './editor/index';

import './error/index';

// Create the module where our functionality can attach to
let pagesModule = angular.module('app.pages', [
  'app.error',

  'app.editor',

]);


export default pagesModule;
