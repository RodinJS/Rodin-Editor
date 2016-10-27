/**
 * Created by kh.levon98 on 24-Sep-16.
 */
class AceCtrl {
  constructor($scope, Ace) {
    'ngInject';

    this._$scope = $scope;
    this._Ace = Ace;


    this._$scope._AceFactory = Ace;
  }
}

export default AceCtrl;