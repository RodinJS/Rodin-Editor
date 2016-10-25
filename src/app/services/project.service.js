/**
 * Created by kh.levon98 on 20-Sep-16.
 */
class Project {
  constructor(JWT, AppConstants, Restangular, Validator, $state, $q) {
    'ngInject';
    this._JWT = JWT;
    this._AppConstants = AppConstants;

    this._Projects = Restangular.all('project');
    this._$state = $state;
    this._$q = $q;
    this._Validator = new Validator();
  }

  get(projectId = null, fields) {
    let deferred = this._$q.defer();
    this._Projects.one(projectId).get(fields).then((result) => {
      this._Validator.validateHTTP(result);
      if (this._Validator.isValidHTTP()) {
        let response = this._Validator.getDataHTTP();
        deferred.resolve(response);
      } else {
        deferred.reject(this._Validator.getErrorsHTTP());
      }
    }, (result) => {
      this._Validator.validateHTTP(result.data);

      deferred.reject(this._Validator.getErrorsHTTP());
    });

    return deferred.promise;
  }

  getList(fields = {}) {
    let deferred = this._$q.defer();
    this._Projects.one('').get(fields).then((result) => {
      this._Validator.validateHTTP(result);
      if (this._Validator.isValidHTTP()) {
        let response = this._Validator.getDataHTTP();

        deferred.resolve(response);
      } else {
        deferred.reject(this._Validator.getErrorsHTTP());
      }
    }, (result) => {
      this._Validator.validateHTTP(result.data);

      deferred.reject(this._Validator.getErrorsHTTP());
    });

    return deferred.promise;
  }

  update(projectId = null, fields = {}) {
    let deferred = this._$q.defer();

    this._Projects.one(projectId).put(fields).then((result) => {
      this._Validator.validateHTTP(result);
      if (this._Validator.isValidHTTP()) {
        let response = this._Validator.getDataHTTP();
        deferred.resolve(response);
      } else {
        deferred.reject(this._Validator.getErrorsHTTP());
      }
    }, (result) => {
      this._Validator.validateHTTP(result.data);

      deferred.reject(this._Validator.getErrorsHTTP());
    });

    return deferred.promise;
  }

  create(fields = {}) {
    let deferred = this._$q.defer();

    this._Projects.post(fields).then((result) => {
      this._Validator.validateHTTP(result);
      if (this._Validator.isValidHTTP()) {
        let response = this._Validator.getDataHTTP();
        deferred.resolve(response);
      } else {
        deferred.reject(this._Validator.getErrorsHTTP());
      }
    }, (result) => {
      this._Validator.validateHTTP(result.data);

      deferred.reject(this._Validator.getErrorsHTTP());
    });

    return deferred.promise;
  }

  remove(projectId = null, fields = {}) {
    let deferred = this._$q.defer();

    this._Projects.one(projectId).remove(fields).then((result) => {
      this._Validator.validateHTTP(result);
      if (this._Validator.isValidHTTP()) {
        let response = this._Validator.getDataHTTP();
        deferred.resolve(response);
      } else {
        deferred.reject(this._Validator.getErrorsHTTP());
      }
    }, (result) => {
      this._Validator.validateHTTP(result.data);

      deferred.reject(this._Validator.getErrorsHTTP());
    });

    return deferred.promise;
  }

}

export default Project;