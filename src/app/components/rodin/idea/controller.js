/**
 * Created by kh.levon98 on 24-Sep-16.
 */

import * as _ from "lodash/dist/lodash.min";
import Mousetrap from "mousetrap/mousetrap.min";

Mousetrap.stopCallback = function () {
  console.dir(arguments);
  return false;
};

let self;

class IdeaCtrl {
  constructor($scope, RodinIdea, RodinMenuBar, $emit, Storage) {
    'ngInject';
    self = this;

    this._$scope = $scope;
    this._$emit = $emit;
    this.windowActivity = RodinIdea.windowActivity;

    this.resizeItemConfig = Storage.get("resizeItemConfig");

    this._registerKeys(RodinMenuBar.getList());
  }

  _registerKeys(list) {

    _.map(list, (item) => {
      if (item.hotKey) {

        let keys = item.hotKey;

        if (!_.isString(keys)) {
          keys = _.values(item.hotKey);

          _.map(keys, (item, i, list) => {
            list[i] = item.replace(/-/g, "+").toLowerCase();
          });
        } else {
          keys = keys.replace(/-/g, "+").toLowerCase();
        }

        Mousetrap.bindGlobal(keys, (e) => {
          e.preventDefault();
          return this._$emit(`menu-bar:${item.id}`, item, item.model);
        }, false);
      }

      if (item.subMenus) {
        this._registerKeys(item.subMenus);
      }
    });
  }
}

export default IdeaCtrl;