/**
 * Created by kh.levon98 on 14-Sep-16.
 */
import angular from 'angular/index';

import './auth/index';

import './error/index';

import './editor/index';


// Create the module where our functionality can attach to
let pagesModule = angular.module('app.pages', [
	'app.auth',
	'app.error',

	'app.editor',
]);


export default pagesModule;
