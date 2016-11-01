/**
 * Created by kh.levon98 on 31-Oct-16.
 */

let self;

class PromptCtrl {
  constructor($scope) {
    'ngInject';
    self = this;

    this._$scope = $scope;

    this.message = "";
    this.value = "";
  }


  $onInit() {
    this.message = this.resolve.message || "";
    this.value = this.resolve.value || "";
  }

  cancel() {
    this.dismiss({$value: 'cancel'});
  }

  save() {
    let res = {
      value: this.value
    };

    this.close({$value: res});
  };
}

export default PromptCtrl;