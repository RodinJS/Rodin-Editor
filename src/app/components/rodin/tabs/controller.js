/**
 * Created by kh.levon98 on 24-Sep-16.
 */


import * as _ from "lodash/dist/lodash.min";
import angular from 'angular/index';

class TabsCtrl {
	constructor($scope, RodinTabs) {
		'ngInject';

		this._$scope = $scope;
		this._RodinTabs = RodinTabs;

		this._componentId = RodinTabs.initialize(this.componentId);

		this.tabs = RodinTabs.getList(this._componentId);

		this.info = RodinTabs.getInfo(this._componentId);

		if (!_.isObject(this.callbacks)) {
			this.callbacks = {};
		}

	}

	closeTab(tab) {
		let closedTab;
		angular.merge({}, closedTab, tab);

		this._RodinTabs.remove(this._componentId, tab);

		let clFn = this.callbacks["close"];
		if (_.isFunction(clFn)) {
			clFn(closedTab, this._RodinTabs.get(this._componentId));
		}
	}

	changeTab(tab) {
		let oldTab = this._RodinTabs.get(this._componentId);

		if (tab.index != oldTab.index) {

			this._RodinTabs.setActive(this._componentId, tab);

			let clFn = this.callbacks["change"];

			if (_.isFunction(clFn)) {
				clFn(oldTab, tab);
			}
		}

	}

}

export default TabsCtrl;