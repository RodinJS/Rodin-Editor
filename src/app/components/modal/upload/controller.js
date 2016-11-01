/**
 * Created by kh.levon98 on 31-Oct-16.
 */

import * as _ from "lodash/dist/lodash.min";

let self;

class UploadCtrl {
  constructor($scope, $timeout, $document) {
    'ngInject';
    self = this;

    this._$scope = $scope;
    this._$timeout = $timeout;
    this._$document = $document[0];

    this.input = null;

    this.type = "";
    this.path = "";

    this.items = [];
  }


  $onInit() {
    this.type = this.resolve.type || "";
    this.path = this.resolve.path || "";
  }

  $postLink() {
    let tim = this._$timeout(()=> {
      this.input = this._$document.querySelector(`input#${(self.type == "file") ? "filesToUpload" : "folderToUpload"}`);
      this.input.addEventListener("change", self.change);
      this._$timeout.cancel(tim);
    }, 500);
  }

  $onDestroy() {
    if (this.input) {
      this.input.removeEventListener("change", self.change);
    }
  }

  change(e) {
    self.items.slice(0, self.items.length);

    if (!_.isEmpty(self.input.files)) {
      for (let i = 0, ln = self.input.files.length; i < ln; i++) {

        let file = self.input.files[i];
        
        let item = {
          index: i,
          name: file.name,
          path: (file.webkitRelativePath || ""),
          size: file.size
        };

        self.items.push(item);
      }
    }

    if (!self._$scope.$$phase) {
      self._$scope.$apply();
    }

  }

  cancel() {
    this.dismiss({$value: 'cancel'});
  }

  save() {
    let res = {
      files: this.input.files,
      path: this.path,
      type: this.type
    };

    this.close({$value: res});
  };
}

export default UploadCtrl;