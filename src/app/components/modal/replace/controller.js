/**
 * Created by kh.levon98 on 31-Oct-16.
 */

import * as _ from "lodash/lodash.min";

let self;

class ReplaceCtrl {
  constructor($scope, $timeout, $document, RodinTree) {
    'ngInject';
    self = this;

    this._$scope = $scope;
    this._$timeout = $timeout;
    this._$document = $document[0];

    this.projectRoot = RodinTree.root;

    this.path = "";

    this.items = [];
    this.files = null;
  }


  $onInit() {
    this.files = this.resolve.files || this.resolve.folder || [];
    this.path = this.resolve.path || "";
    this.folder = this.resolve.folder;

    if (!_.isEmpty(this.files)) {
      for (let i = 0, ln = this.files.length; i < ln; i++) {

        let file = this.files[i];

        let item = this.folder ? {name:file} : {
          index: i,
          name: file.name,
          path: (file.webkitRelativePath || ""),
          size: file.size,
          model: true
        };

        this.items.push(item);
      }
    }
  }

  $postLink() {
  }

  $onDestroy() {
  }

  cancel() {
    this.dismiss({$value: 'cancel'});
  }

  save() {

    let files = [];
    _.map(this.items, (item, i) => {
      if (item.model) {
        files.push(this.files[i]);
      }
    });

    if ((!files.length && !this.folder)) {
      return this.cancel();
    }

    let res = {
      files: files,
      path: this.path,
    };

    this.close({$value: res});
  };
}

export default ReplaceCtrl;