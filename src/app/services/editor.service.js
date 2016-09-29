/**
 * Created by kh.levon98 on 28-Sep-16.
 */
class Editor {
	constructor(JWT, AppConstants, Restangular, Validator, Analyser, $state, $q) {
		'ngInject';
		this._JWT = JWT;
		this._AppConstants = AppConstants;

		this._Editors = Restangular.all('editor');
		this._$state = $state;
		this._$q = $q;
		this._Validator = new Validator();
		this._Analyser = Analyser;
	}


	getProject(projectId = null, fields) {
		let Analyser = new this._Analyser();

		this._Editors.one("tree").get(fields).then(Analyser.resolve, Analyser.reject);

		return Analyser.promise;
	}


}

export default Editor;