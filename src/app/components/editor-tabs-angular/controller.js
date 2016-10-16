/**
 * Created by kh.levon98 on 24-Sep-16.
 */

class TabsCtrl {
	constructor($scope, $log, FileUtils) {
		'ngInject';

		this._$scope = $scope;
		this._FileUtils = FileUtils;
		this._$log = $log;

		this.tabs = this._$scope.tabs;
		this.updateEditorFn = this._$scope.updateEditor;

		if (!_.isFunction(this.updateEditorFn)) {
			return this._$log.error("`updateEditor` functions is required!");
		}

	}

	changeTab(tab) {
		this.updateEditorFn(tab);
	}

	closeTab(tab) {
		const index = tab.index;

		this.tabs.splice(index, 1);

		for (let i = index, ln = this.tabs.length; i < ln; ++i) {
			this.tabs[i].index--;
		}

		if (this.tabs.length == 0) {
			this.tabs.push({
				name: "untitled",
				isBlank: true,
				index: this.tabs.length
			});
		}



		let nextTab = this.tabs[index];

		if (nextTab) {
			this._$scope.openedFileIndex = nextTab.index;
		} else {
			this._$scope.openedFileIndex = this.tabs[index - 1].index;
		}

		this.updateEditorFn(this.tabs[this._$scope.openedFileIndex], true);
	}

}

export default TabsCtrl;

