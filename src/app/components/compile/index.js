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
					bindScope = bindScope ? scope.$eval(bindScope) : scope;

					$compile(element.contents())(bindScope);
				})
		}
	};
}

export default Compile;