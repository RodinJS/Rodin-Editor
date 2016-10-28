/**
 * Created by kh.levon98 on 24-Sep-16.
 */

let self;

let $qs;

class IdeaCtrl {
  constructor($scope, RodinIdea, $q) {
    'ngInject';
    self = this;

    $qs = $q;

    this._$scope = $scope;
    this.windowActivity = RodinIdea.windowActivity;

    window.test = this.test;
  }

  test(res) {

    let def = $qs.defer();

    setTimeout(
      function () {
        if (res) {

          def.resolve("1 res")
        } else {

          def.reject("1 rej")
        }
      },
      1000
    )

    return def.promise;
  }
}

export default IdeaCtrl;