/**
 * Created by kh.levon98 on 24-Sep-16.
 */

import * as _ from "lodash/lodash.min";

let self;

class MenuBarCtrl {
  constructor(AppConstants, $scope, RodinMenuBar, $emit) {
    'ngInject';
    self = this;
    this.appName = AppConstants.appName;
    this._$scope = $scope;
    this._$emit = $emit;
    this._RodinMenuBar = RodinMenuBar;

    this.menuList = this._RodinMenuBar.getList(); //tmp

    this.drawNode = this._RodinMenuBar.drawNode;

  }

  selectOption(evt, subMenu = {}, model) {
    let event = subMenu.event;

    if (_.isFunction(event)) {
      return event.apply(subMenu, [evt, model]);
    } else {
      self._$emit(`menu-bar:${subMenu.id}`, subMenu, model);
    }
  }

}

export default MenuBarCtrl;