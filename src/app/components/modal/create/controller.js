/**
 * Created by kh.levon98 on 31-Oct-16.
 */

let self;

class CreateCtrl {
  constructor($scope, RodinTree) {
    'ngInject';
    self = this;

    this._$scope = $scope;

    this.projectRoot = RodinTree.root;

    this.name = "";
    this.path = "";
    this.type = "";
  }


  $onInit() {
    this.name = this.resolve.name || "";
    this.path = this.resolve.path || "";
    this.type = this.resolve.type || "";
  }

  cancel() {
    this.dismiss({$value: 'cancel'});
  }

  save() {
    let res = {
      name: this.name,
      path: this.path,
      type: this.type
    };

    this.close({$value: res});
  };
}

export default CreateCtrl;