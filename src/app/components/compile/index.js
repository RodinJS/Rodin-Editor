/**
 * Created by kh.levon98 on 07-Oct-16.
 */
function Compile($compile) {
  'ngInject';
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      scope.$watch(
        function (scope) {
          return scope.$eval(attrs.compile);
        },
        function (value) {
          element.html(value);
          let bindScope = attrs.compileScope;
          if (bindScope) {
            angular.merge(scope, scope.$eval(bindScope));
          }

          $compile(element.contents())(scope);
        })
    }
  };
}

export default Compile;