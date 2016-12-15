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
    this.flag = false;
    this.showFlag = false;
  }


  $onInit() {
    this.message = this.resolve.message || "";
    this.showFlag = this.resolve.showFlag || false;
  }

  cancel() {
    this.dismiss({$value: 'cancel'});
  }

  save() {
    let res = {
      confirm: true,
      flag: this.flag
    };

    this.close({$value: res});
  };
}

export default ConfirmCtrl;