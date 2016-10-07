/**
 * Created by kh.levon98 on 13-Sep-16.
 */
import angular from 'angular/index';


const componentsModule = angular.module('app.components', []);

import AceEditor from './ace-angular/index';
componentsModule.directive('aceEditor', AceEditor);

import FileTree from './tree-angular/index';
componentsModule.directive('fileTree', FileTree);

import EditorTabs from './editor-tabs-angular/index';
componentsModule.directive('editorTabs', EditorTabs);

import RodinIDEA from './rodin-IDEA/index';
componentsModule.directive('rodinIdea', RodinIDEA);

import MenuBar from './menu-bar/index';
componentsModule.directive('menuBar', MenuBar);


import Compile from './compile/index';
componentsModule.directive('compile', Compile);

export default componentsModule;
