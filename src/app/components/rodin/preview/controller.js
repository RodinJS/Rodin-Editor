/**
 * Created by kh.levon98 on 24-Sep-16.
 */
class PreviewCtrl {
  constructor($scope, RodinPreview, RodinTabs, RodinTabsConstants) {
    'ngInject';

    this._$scope = $scope;
    this._RodinPreview = RodinPreview;

    this.tabsComponentId = RodinTabsConstants.preview;

    this.tabsCallbacks = {
      "close": this._closeTab,
      "change": this._switchTab
    };


  }


  update() {
    this._RodinPreview.update(true);
  }


  _closeTab(oldTab, newTab) {

  }


  _switchTab(oldTab, newTab) {

  }

}

export default PreviewCtrl;