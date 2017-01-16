/**
 * Created by kh.levon98 on 24-Sep-16.
 */
let self;

class PreviewCtrl {
  constructor($scope, RodinPreview, RodinIdea, RodinTabs, RodinTree, RodinTabsConstants, $on, User, Notification, Socket, Utils) {
    'ngInject';

    self = this;

    this._$scope = $scope;
    this._$on = $on;
    this._RodinPreview = RodinPreview;
    this._RodinTabs = RodinTabs;
    this._RodinTree = RodinTree;
    this._Notification = Notification;
    this._Socket = Socket;
    this._Utils = Utils;
    this._RodinIdea = RodinIdea;


    this.windowActivity = RodinIdea.windowActivity;

    this.currentUser = User.current;
    this.tabsComponentId = RodinTabsConstants.preview;

    this.tabsCallbacks = {
      "close": this._closeTab,
      "change": this._switchTab
    };

    this._$on(`tabs:${this.tabsComponentId}:change-active-tab`, () => {
      this.tab = this._RodinTabs.get(this.tabsComponentId);
      if (!this._$scope.$$phase && !this._$scope.$root.$$phase) {
        this._$scope.$apply();
      }
    });


    ///////// subscribe menu-bar events //////////

    this._$on("menu-bar:run", (e, node, model) => {
      self._RodinPreview.run();
    });


    ///////// subscribe builder events //////////
    this._Socket.on("projectTranspiled", (data, error) => {
      if (!error.length) {
        this._Notification.success("Transpile finished.");

        this._RodinTree.update({
          folderPath: this._Utils.filterTree(this._RodinTree.data, {active: true}, "path", "build")
        });

        this._RodinPreview.update(false, true);
      } else {
        let err = error[0];
        let message = "";

        switch (err.code) {
          case 606:
            message = `${err.data.name}<br/>${err.data.message}`;
            break;
          case 607:
            message = "Transpile in progress, please wait until done.";
            return this._Notification.warning(message);
            break;
          default:
            message = err.error;
            break;
        }

        this._Notification.error(message);
      }
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