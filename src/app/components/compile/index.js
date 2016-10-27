/**
 * Created by kh.levon98 on 07-Oct-16.
 */

import angular from 'angular/index';

function Compile($compile) {
  'ngInject';
  return {
    restrict: 'A',
    scope: {
      "compileScope": "=",
      "compile": "=",
    },
    link: function (scope, element, attrs) {
      scope.$watch(
        function (scope) {
          return scope.compile;
        },
        function (value) {

          element.html(value);
          // console.log("scope.compileScope", scope.compileScope)

          if (typeof scope.compileScope === "object") {
            angular.extend(scope, scope.compileScope); /// TODO: fuckin bug: EXTENDI JAMANAK SETER U GETER METODNER@ SIKTIRA ANUM
          }

          $compile(element.contents())(scope);
        })
    }
  };
}

export default Compile;