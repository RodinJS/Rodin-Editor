/**
 * Created by kh.levon98 on 24-Sep-16.
 */


import * as _ from "lodash/lodash.min";
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

  $onDestroy() {
    this._RodinTabs.destroy(this.componentId);
  }

  closeTab(tab) {
    let tabs = this._RodinTabs._removeImitation(this._componentId, tab);
    let clFn = this.callbacks["close"];

    if (_.isFunction(clFn)) {
      let result = clFn(tabs.oldTab, tabs.nextTab);
      if (result && _.isFunction(result.then)) {
        return result.then(()=>{
          this._RodinTabs.remove(this._componentId, tab);
        });
      }
    }

    this._RodinTabs.remove(this._componentId, tab);
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