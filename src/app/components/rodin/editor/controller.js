/**
 * Created by kh.levon98 on 24-Sep-16.
 */

let self;

class EditorCtrl {

	constructor($scope, RodinTabs, RodinEditor, Ace) {
		'ngInject';

		self = this;

		this._$scope = $scope;
		this._RodinTabs = RodinTabs;
		this._RodinEditor = RodinEditor;
		this._Ace = Ace;


		this.options = this._RodinEditor.options;

		this.aceConfig = this._RodinEditor.options.ace;

		this.tabsComponentId = "editor_tabs";

		this.tabsCallbacks = {
			"close": this.closeFile,
			"change": this.switchFile,
		};


		this._RodinEditor.setTabsComponentId(this.tabsComponentId);
	}

	closeFile(oldFile, newFile) {
		self._RodinEditor.openFile((newFile.isBlank ? null : newFile));
	}

	switchFile(oldFile, newFile) {

		self._RodinEditor.saveState(oldFile);

		self._RodinEditor.openFile(newFile); /// change ace content and settings
	}
}

export default EditorCtrl;