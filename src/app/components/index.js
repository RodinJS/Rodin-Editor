/**
 * Created by kh.levon98 on 13-Sep-16.
 */
import angular from 'angular/index';


const componentsModule = angular.module('app.components', []);

import Compile from './compile/index';
componentsModule.directive('compile', Compile);

import Resize from './resize/index';
componentsModule.directive('resize', Resize);


import AceFactory from './ace/factory';
componentsModule.factory('Ace', AceFactory);


import Ace from './ace/index';
componentsModule.directive('ace', Ace);


/*
 * Rodin-IDEA modules
 * */

/// file tree module

import RodinTreeFactory from './rodin/tree/factory';
componentsModule.factory('RodinTree', RodinTreeFactory);

import RodinTree from './rodin/tree/index';
componentsModule.component('rodinTree', RodinTree);


/// editor module

import RodinTabsFactory from './rodin/tabs/factory';
componentsModule.factory('RodinTabs', RodinTabsFactory);

import RodinTabs from './rodin/tabs/index';
componentsModule.component('rodinTabs', RodinTabs);



/// editor module

import RodinEditorFactory from './rodin/editor/factory';
componentsModule.factory('RodinEditor', RodinEditorFactory);

import RodinEditor from './rodin/editor/index';
componentsModule.directive('rodinEditor', RodinEditor);


/// toolbar modules

// projects-list module
import RodinProjectsList from './rodin/projects-list/index';
componentsModule.directive('rodinProjectsList', RodinProjectsList);

// menu-bar module
import RodinMenuBarFactory from './rodin/menu-bar/factory';
componentsModule.factory('RodinMenuBar', RodinMenuBarFactory);

import RodinMenuBar from './rodin/menu-bar/index';
componentsModule.component('rodinMenuBar', RodinMenuBar);

// information-bar module
import RodinInfoBar from './rodin/info-bar/index';
componentsModule.directive('rodinInfoBar', RodinInfoBar);

// toolbar module
import RodinToolbar from './rodin/toolbar/index';
componentsModule.directive('rodinToolbar', RodinToolbar);


/// preview module

import RodinPreviewFactory from './rodin/preview/factory';
componentsModule.factory('RodinPreview', RodinPreviewFactory);

import RodinPreview from './rodin/preview/index';
componentsModule.directive('rodinPreview', RodinPreview);


/// IDEA module

import RodinIdeaFactory from './rodin/idea/factory';
componentsModule.factory('RodinIdea', RodinIdeaFactory);


import RodinIdea from './rodin/idea/index';
componentsModule.directive('rodinIdea', RodinIdea);


/*
 * End of Rodin-IDEA modules
 * */


export default componentsModule;
