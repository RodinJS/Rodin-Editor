import angular from 'angular/index';

// Create the module where our functionality can attach to
let layoutModule = angular.module('app.layout', []);


// Main Layout
import AppHeader from './main/header.component';
layoutModule.component('appHeader', AppHeader);

import AppFooter from './main/footer.component';
layoutModule.component('appFooter', AppFooter);

export default layoutModule;
