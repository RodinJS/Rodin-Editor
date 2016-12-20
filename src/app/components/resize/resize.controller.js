function ResizeCtrl($scope, $timeout) {
  'ngInject';

  this._$timeout = $timeout;

  this.columns = [];
  this.resizeType = "horizontal";
}

export default ResizeCtrl;