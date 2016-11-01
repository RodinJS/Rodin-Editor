import angular from 'angular/index';

// Create the module where our functionality can attach to
let filtersModule = angular.module('app.filters', []);

import HotKeyFilter from "./hotKey.filter";

filtersModule.filter('HotKey', HotKeyFilter);

import CapitalizeFilter from "./capitalize.filter";

filtersModule.filter('capitalize', CapitalizeFilter);


export default filtersModule;
