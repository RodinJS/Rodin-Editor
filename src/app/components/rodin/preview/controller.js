/**
 * Created by kh.levon98 on 24-Sep-16.
 */
let self;

class PreviewCtrl {
  constructor($scope, RodinPreview, RodinTabs, RodinTree, RodinTabsConstants, $on, User, AppConstants, $stateParams) {
    'ngInject';

    self = this;

    this._$scope = $scope;
    this._$on = $on;
    this._RodinPreview = RodinPreview;
    this._RodinTabs = RodinTabs;
    this._RodinTree = RodinTree;


    this.currentUser = User.current;
    this.tabsComponentId = RodinTabsConstants.preview;

    this.tabsCallbacks = {
      "close": this._closeTab,
      "change": this._switchTab
    };

    $on(`tabs:${this.tabsComponentId}:change-active-tab`, ()=> {
      this.tab = this._RodinTabs.get(this.tabsComponentId);
    });


    ///////// subscribe menu-bar events //////////

    this._$on("menu-bar:run", (e, node, model)=> {
      self._RodinPreview.run();
    });


  }


  updatePreview() {
    this._RodinPreview.update(true);
  }


  openExternal(tab) {
    this._RodinPreview.openExternal(tab);
  }


  _closeTab(oldTab, newTab) {

  }


  _switchTab(oldTab, newTab) {

  }

}

export default PreviewCtrl;