/**
 * Created by kh.levon98 on 20-Sep-16.
 */
let verificationPromise;
class User {
  constructor(JWT, AppConstants, Restangular, Validator, $state, $q, $window, $timeout, Analyser) {
    'ngInject';

    this._JWT = JWT;
    this._AppConstants = AppConstants;

    this._User = Restangular.all('user');
    this._Auth = Restangular.all('auth');
    this._$state = $state;
    this._$q = $q;
    this._$window = $window;
    this._$timeout = $timeout;
    this._Validator = new Validator();
    this._Analyser = Analyser;

    this.current = null;
    this._inProgress = false;

  }

  login(fields = {}) {
    let deferred = this._$q.defer();
    this._Auth.all("login").post(fields).then((result) => {
      this._Validator.validateHTTP(result);
      if (this._Validator.isValidHTTP()) {
        let response = this._Validator.getDataHTTP();
        /// set auth token
        this._JWT.save(response.token);
        this.current = response.user;

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

  signUp(fields = {}) {
    return this.create(fields).then((res) => {
      this._JWT.save(res.token);
      this.current = res.user;

      return res;
    }, err => {
      return err;
    })
  }

  update(userId = null, fields = {}) {
    let Analyser = new this._Analyser();

    this._User.put(fields).then(Analyser.resolve, Analyser.reject);

    return Analyser.promise;
  }

  create(fields = {}) {
    let Analyser = new this._Analyser();

    this._User.post(fields).then(Analyser.resolve, Analyser.reject);

    return Analyser.promise;
  }

  logout() {
    this.current = null;
    this._JWT.destroy();

    this._$timeout(() => {
      this._$window.location.href = this._AppConstants.SITE;
    }, 100);
  }

  verifyAuth() {
    let deferred = this._$q.defer();
    // check for JWT token
    if (!this._JWT.get()) {
      deferred.resolve(false);
      return deferred.promise;
    }

    if (this.current) {
      deferred.resolve(true);
    } else {
      if (verificationPromise) {
        return verificationPromise;
      }

      this._User.one("me").get().then((res) => {
        this.current = res.data;
        verificationPromise = null;
        deferred.resolve(true);
      }, (err) => {
        this._JWT.destroy();
        verificationPromise = null;
        deferred.resolve(false);
      });

      verificationPromise = deferred.promise;
    }
    return deferred.promise;
  }


  ensureAuthIs() {
    let deferred = this._$q.defer();

    this.verifyAuth().then((authValid) => {
      deferred.resolve(authValid);

      if (!authValid) {
        this._$timeout(() => {
          this._$window.location.href = this._AppConstants.SITE;
        }, 100);
      }

    });

    return deferred.promise;
  }

}

export default User;