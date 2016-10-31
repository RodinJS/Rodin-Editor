/**
 * Created by kh.levon98 on 31-Oct-16.
 */

let self;

class RenameCtrl {
  constructor($scope) {
    'ngInject';
    self = this;

    this._$scope = $scope;

    this.originalName = "";
    this.name = "";
  }


  $onInit() {
    this.name = this.resolve.name || "";
    this.originalName = this.name;
  }

  cancel() {
    this.dismiss({$value: 'cancel'});
  }

  save() {
    let res = {
      oldName: this.originalName,
      newName: this.name
    };

    this.close({$value: res});
  };
}

export default RenameCtrl;