/**
 * Created by kh.levon98 on 31-Oct-16.
 */

let self;

class ConfirmCtrl {
  constructor($scope) {
    'ngInject';
    self = this;

    this._$scope = $scope;

    this.message = "";
  }


  $onInit() {
    this.message = this.resolve.message || "";
  }

  cancel() {
    this.dismiss({$value: 'cancel'});
  }

  save() {
    let res = {
      confirm: true
    };

    this.close({$value: res});
  };
}

export default ConfirmCtrl;