/**
 * Created by kh.levon98 on 24-Sep-16.
 */
let self;

class PreviewCtrl {
  constructor($scope, RodinPreview, RodinTabs, RodinTabsConstants, $on) {
    'ngInject';

    self = this;

    this._$scope = $scope;
    this._$on = $on;
    this._RodinPreview = RodinPreview;
    this._RodinTabs = RodinTabs;

    this.tabsComponentId = RodinTabsConstants.preview;

    this.tabsCallbacks = {
      "close": this._closeTab,
      "change": this._switchTab
    };


    this._$scope.$watch(()=> {
      return RodinTabs.getInfo(this.tabsComponentId).activeIndex;
    }, ()=> {
      this.tab = this._RodinTabs.get(this.tabsComponentId);
    });



    ///////// subscribe menu-bar events //////////

    this._$on("menu-bar:run", (e, node, model)=> {
      console.log("run", node, model)
      self._RodinPreview.run();
    });


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