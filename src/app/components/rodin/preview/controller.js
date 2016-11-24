/**
 * Created by kh.levon98 on 24-Sep-16.
 */
let self;

class PreviewCtrl {
  constructor($scope, RodinPreview, RodinTabs, RodinTree, RodinTabsConstants, $on, User, Notification, Socket) {
    'ngInject';

    self = this;

    this._$scope = $scope;
    this._$on = $on;
    this._RodinPreview = RodinPreview;
    this._RodinTabs = RodinTabs;
    this._RodinTree = RodinTree;
    this._Notification = Notification;
    this._Socket = Socket;


    this.currentUser = User.current;
    this.tabsComponentId = RodinTabsConstants.preview;

    this.tabsCallbacks = {
      "close": this._closeTab,
      "change": this._switchTab
    };

    this._$on(`tabs:${this.tabsComponentId}:change-active-tab`, () => {
      this.tab = this._RodinTabs.get(this.tabsComponentId);
    });


    ///////// subscribe menu-bar events //////////

    this._$on("menu-bar:run", (e, node, model) => {
      self._RodinPreview.run();
    });


    ///////// subscribe builder events //////////
    this._Socket.on("projectTranspiled", (data) => {
      this._Notification.success("Build finished.");
      this._RodinTree.update();
      this._RodinPreview.update(false, true);
    });
  }


  updatePreview() {
    this._RodinPreview.update(true, true);
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