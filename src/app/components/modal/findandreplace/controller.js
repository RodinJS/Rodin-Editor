/**
 * Created by kh.levon98 on 31-Oct-16.
 */

let self;

class FindAndReplaceCtrl {
  constructor($scope) {
    'ngInject';
    self = this;

    this._$scope = $scope;

    this.findText = "";
    this.replaceText = "";
    this.path = "";
    this.replace = false;
    this.caseSensitive = false;
    this.regexp = false;
  }


  $onInit() {
    this.findText = this.resolve.findText || "";
    this.replaceText = this.resolve.replaceText || "";
    this.path = this.resolve.path || "";
    this.replace = this.resolve.replace || false;
  }

  cancel() {
    this.dismiss({$value: 'cancel'});
  }

  save() {
    let res = {
      findText: this.findText,
      replaceText: this.replaceText,
      path: this.path,
      caseSensitive: this.caseSensitive,
      regexp: this.regexp,
    };

    this.close({$value: res});
  };
}

export default FindAndReplaceCtrl;