export default class JWT {
	constructor(AppConstants, store, $state, $q, Restangular) {
		'ngInject';

		this._AppConstants = AppConstants;
		this._store = store;
		this._$state = $state;
		this._$q = $q;
		this._Auth = Restangular.all("auth");
		this._token = null;
	}

	save(token) {
		this._store.set(this._AppConstants.jwtKey, token);
		this._update();
	}

	get() {
		if (!this._token) {
			this._update();
		}
		return this._token;
	}

	_update() {
		this._token = this._store.get(this._AppConstants.jwtKey) || null;
	}

	destroy() {
		this._store.remove(this._AppConstants.jwtKey);
		this._update();
	}

	verify() {
		let deferred = this._$q.defer();

		if (this.get()) {
			return this._Auth.one("verify").get().then((res)=> {
				return res;
			}, (err)=> {
				this.destroy();
				this._$state.go("app.login");
				return err;
			});
		}
		deferred.resolve(true);
		return deferred.promise;
	}

}
