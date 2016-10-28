import angular from 'angular/index';

// Create the module where our functionality can attach to
let servicesModule = angular.module('app.services', []);


import UtilsService from './utils.service';
servicesModule.service('Utils', UtilsService);

import FileUtilsService from './fileUtils.service';
servicesModule.service('FileUtils', FileUtilsService);

import ValidatorService from './validator.service';
servicesModule.factory('Validator', ValidatorService);

import AnalyserService from './analyser.service';
servicesModule.factory('Analyser', AnalyserService);

import ErrorService from './error.service';
servicesModule.service('Error', ErrorService);

import JwtService from './jwt.service';
servicesModule.service('JWT', JwtService);

import UserService from './user.service';
servicesModule.service('User', UserService);

import ProjectService from './project.service';
servicesModule.service('Project', ProjectService);

import EditorService from './editor.service';
servicesModule.service('Editor', EditorService);

import FileService from './file.service';
servicesModule.service('File', FileService);


import StorageService from './storage.service';
servicesModule.service('Storage', StorageService);


export default servicesModule;
