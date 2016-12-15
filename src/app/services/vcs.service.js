/**
 * Created by kh.levon98 on 14-Dec-16.
 */
/**
 * Created by kh.levon98 on 28-Sep-16.
 */
class VCS {
  constructor(JWT, AppConstants, Restangular, Validator, Analyser, $state, $q) {
    'ngInject';
    this._JWT = JWT;
    this._AppConstants = AppConstants;

    this._Git = Restangular.all('git');
    this._$state = $state;
    this._$q = $q;
    this._Validator = new Validator();
    this._Analyser = Analyser;
  }

  pull(projectId = null, fields = {}) {
    let Analyser = new this._Analyser();

    this._Git.all("theirs").post(fields, {
      id: projectId
    }).then(Analyser.resolve, Analyser.reject);

    return Analyser.promise;
  }

  push(projectId = null, fields = {}) {
    let Analyser = new this._Analyser();

    this._Git.all("ours").post(fields, {
      id: projectId
    }).then(Analyser.resolve, Analyser.reject);

    return Analyser.promise;
  }

}

export default VCS;