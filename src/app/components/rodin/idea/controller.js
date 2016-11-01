/**
 * Created by kh.levon98 on 24-Sep-16.
 */

let self;

class IdeaCtrl {
  constructor($scope, RodinIdea) {
    'ngInject';
    self = this;

    this._$scope = $scope;
    this.windowActivity = RodinIdea.windowActivity;
  }
}

export default IdeaCtrl;