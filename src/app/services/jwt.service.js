export default class JWT {
	constructor(AppConstants, store, $cookies, $state, $q, Restangular) {
		'ngInject';

		this._AppConstants = AppConstants;
		this._store = store;
		this._$cookies = $cookies;
		this._$state = $state;
		this._$q = $q;
		this._Auth = Restangular.all("auth");
		this._token = null;
	}

	save(token) {
		this._$cookies.put(this._AppConstants.jwtKey, token, {});
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
		this._$cookies.remove(this._AppConstants.jwtKey);
		this._update();
	}

	verify() {
		let deferred = this._$q.defer();

		if (this.get()) {
			return this._Auth.one("verify").get().then((res)=> {
				return res;
			}, (err)=> {
				this.destroy();
				window.location.href = this._AppConstants[this._AppConstants.env + "Domain"];
				return err;
			});
		}
		deferred.resolve(true);
		return deferred.promise;
	}

}
