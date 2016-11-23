/**
 * Created by kh.levon98 on 20-Sep-16.
 */
class Project {
  constructor(JWT, AppConstants, Restangular, Validator, $state, $q, Analyser) {
    'ngInject';
    this._JWT = JWT;
    this._AppConstants = AppConstants;

    this._Projects = Restangular.all('project');
    this._$state = $state;
    this._$q = $q;
    this._Validator = new Validator();
    this._Analyser = Analyser;
  }

  get(projectId = null, fields) {
    let Analyser = new this._Analyser();

    this._Projects.one(projectId).get(fields).then(Analyser.resolve, Analyser.reject);

    return Analyser.promise;
  }

  getList(fields = {}) {
    let Analyser = new this._Analyser();

    this._Projects.one('').get(fields).then(Analyser.resolve, Analyser.reject);

    return Analyser.promise;
  }

  update(projectId = null, fields = {}) {
    let Analyser = new this._Analyser();

    this._Projects.one(projectId).put(fields).then(Analyser.resolve, Analyser.reject);

    return Analyser.promise;
  }

  create(fields = {}) {
    let Analyser = new this._Analyser();

    this._Projects.post(fields).then(Analyser.resolve, Analyser.reject);

    return Analyser.promise;
  }

  remove(projectId = null, fields = {}) {
    let Analyser = new this._Analyser();

    this._Projects.one(projectId).remove(fields).then(Analyser.resolve, Analyser.reject);

    return Analyser.promise;
  }

}

export default Project;