export default class JWT {
  constructor(AppConstants, store, $cookies, $state, $window, $q, Restangular) {
    'ngInject';

    this._AppConstants = AppConstants;
    this._store = store;
    this._$cookies = $cookies;
    this._$state = $state;
    this._$window = $window;
    this._$q = $q;
    this._Auth = Restangular.all("auth");
    this._token = null;
  }

  save(token) {
    let domains = this._AppConstants.COOKIEDOMAIN || [];

    for (let i = 0; i < domains.length; ++i) {

      this._$cookies.put(this._AppConstants.jwtKey, token, {
        expires: Date.now() + 6.048e+8,
        domain: domains[i]
      });

    }

    this._update();
  }

  get() {
    if (!this._token) {
      this._update();
    }
    return this._token;
  }

  _update() {
    this._token = this._$cookies.get(this._AppConstants.jwtKey) || null;
  }

  destroy() {
    let domains = this._AppConstants.COOKIEDOMAIN || [];

    for (let i = 0; i < domains.length; ++i) {

      this._$cookies.remove(this._AppConstants.jwtKey, {
        domain: domains[i]
      });

    }

    this._update();
  }

  verify() {
    let deferred = this._$q.defer();

    if (this.get()) {
      return this._Auth.one("verify").get().then((res) => {
        return res;
      }, (err) => {
        this.destroy();
        this._$window.location.href = this._AppConstants.SITE;
        return err;
      });
    }
    deferred.resolve(true);
    return deferred.promise;
  }

}
