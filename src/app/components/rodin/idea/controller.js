/**
 * Created by kh.levon98 on 24-Sep-16.
 */
let self;

let isFirstCall = true;

class IdeaCtrl {
  constructor($scope) {
    'ngInject';
    self = this;

    this._$scope = $scope;
  }
}

export default IdeaCtrl;