/**
 * Created by kh.levon98 on 13-Sep-16.
 */
import angular from 'angular/index';


const componentsModule = angular.module('app.components', []);

import Compile from './compile/index';
componentsModule.directive('compile', Compile);

import FilePreview from './filePreview/index';
componentsModule.directive('filePreview', FilePreview);

import {Resize, ResizeItem} from './resize/index';

componentsModule.directive('resize', Resize);
componentsModule.directive('resizeItem', ResizeItem);

import AceFactory from './ace/factory';
componentsModule.factory('Ace', AceFactory);

import Ace from './ace/index';
componentsModule.directive('ace', Ace);

import LoaderFactory from './loader/factory';
componentsModule.factory('Loader', LoaderFactory);

import Loader from './loader/index';
componentsModule.directive('loader', Loader);

/*
 * Modals modules
 */

import ModalFactory from './modal/factory';
componentsModule.factory('Modal', ModalFactory);

/// rename-modal module

import RenameModal from './modal/rename/index';
componentsModule.component('renameModal', RenameModal);

/// create-modal module

import CreateModal from './modal/create/index';
componentsModule.component('createModal', CreateModal);

/// confirm-modal module

import ConfirmModal from './modal/confirm/index';
componentsModule.component('confirmModal', ConfirmModal);

/// upload-modal module

import UploadModal from './modal/upload/index';
componentsModule.component('uploadModal', UploadModal);

/// replace-modal module

import ReplaceModal from './modal/replace/index';
componentsModule.component('replaceModal', ReplaceModal);

import FindAndReplaceModal from './modal/findandreplace/index';
componentsModule.component('findAndReplaceModal', FindAndReplaceModal);

//Git sync
import GitSyncModal from './modal/gitSync/index';
componentsModule.component('gitSyncModal', GitSyncModal);


/*
 * End of Modals modules
 * */



/*
 * Rodin-IDEA modules
 * */


/// tabs module


import RodinTabsConstants from './rodin/tabs/constants';
componentsModule.constant('RodinTabsConstants', RodinTabsConstants);

import RodinTabsFactory from './rodin/tabs/factory';
componentsModule.factory('RodinTabs', RodinTabsFactory);

import RodinTabs from './rodin/tabs/index';
componentsModule.component('rodinTabs', RodinTabs);

/// file tree module

import RodinTreeFactory from './rodin/tree/factory';
componentsModule.factory('RodinTree', RodinTreeFactory);

import RodinTree from './rodin/tree/index';
componentsModule.component('rodinTree', RodinTree);


/// editor module

import RodinEditorFactory from './rodin/editor/factory';
componentsModule.factory('RodinEditor', RodinEditorFactory);

import RodinEditor from './rodin/editor/index';
componentsModule.component('rodinEditor', RodinEditor);


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
componentsModule.component('rodinPreview', RodinPreview);


/// IDEA module

import RodinIdeaFactory from './rodin/idea/factory';
componentsModule.factory('RodinIdea', RodinIdeaFactory);


import RodinIdea from './rodin/idea/index';
componentsModule.directive('rodinIdea', RodinIdea);


/*
 * End of Rodin-IDEA modules
 * */


export default componentsModule;
