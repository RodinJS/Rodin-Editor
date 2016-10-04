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
		console.trace("set");
		Cookies.set(this._AppConstants.jwtKey, token, {
			expires: 7,
			domain: (extractDomain() == "localhost" ? "localhost" : ".rodinapp.com")
		});
		this._update();
	}

	get() {
		if (!this._token) {
			this._update();
		}
		return this._token;
	}

	_update() {
		this._token = Cookies.get(this._AppConstants.jwtKey) || null;
	}

	destroy() {
		// console.trace("remove");
		Cookies.remove(this._AppConstants.jwtKey, {
			domain: (extractDomain() == "localhost" ? "localhost" : ".rodinapp.com")
		});
		this._update();
	}

	verify() {
		let deferred = this._$q.defer();

		if (this.get()) {
			return this._Auth.one("verify").get().then((res)=> {
				return res;
			}, (err)=> {
				this.destroy();
				this._$location.href = this._AppConstants.SITE;
				return err;
			});
		}
		deferred.resolve(true);
		return deferred.promise;
	}

}
