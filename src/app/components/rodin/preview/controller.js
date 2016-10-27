/**
 * Created by kh.levon98 on 24-Sep-16.
 */
class PreviewCtrl {
  constructor($scope, RodinTabsConstants) {
    'ngInject';

    this._$scope = $scope;

    this.tabsComponentId = RodinTabsConstants.preview;

    this.tabsCallbacks = {
      "close": this.closeTab,
      "change": this.switchTab
    };

  }

  closeTab(oldTab, newTab) {

  }


  switchTab(oldTab, newTab) {

  }

}

export default PreviewCtrl;