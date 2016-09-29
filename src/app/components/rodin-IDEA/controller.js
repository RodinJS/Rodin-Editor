/**
 * Created by kh.levon98 on 24-Sep-16.
 */

class RIDEACtrl {
	constructor($scope) {
		'ngInject';

		this._$scope = $scope;

		this.fileContent = '// Javascript code in here.\n' +
			'function foo(msg) {\n\tvar r = Math.random();\n\treturn "" + r + " : " + msg;\n}';

		this.aceOptions = {
			theme:'monokai',
			mode: 'javascript',
			onLoad: function (_ace) {
				console.log("onLoad")
			},
			onChange: function (_ace) {
				console.log("onChange")
			}
		};
	}


}

export default RIDEACtrl;