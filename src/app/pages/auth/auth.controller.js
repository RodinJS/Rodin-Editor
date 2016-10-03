class AuthCtrl {
	constructor(User, $state, AppConstants) {
		'ngInject';

		this._User = User;
		this._$state = $state;
		this._AppConstants = AppConstants;

		this.title = $state.current.title;
		this.authType = $state.current.name.replace('app.', '');

		window.location.href = this._AppConstants[this._AppConstants.env + "Domain"];
	}

	submitForm() {
		this.isSubmitting = true;

		if (this.authType === "login") {
			this._User.login(this.formData).then(
				(res) => {
					this._$state.go('app.editor');
				},
				(err) => {
					this.isSubmitting = false;
					this.errors = err;
				})
		} else if (this.authType === "register") {
			this._User.signUp(this.formData).then(
				(res) => {
					this._$state.go('app.editor');
				},
				(err) => {
					this.isSubmitting = false;
					this.errors = err;
				})

		} else if (this.authType === "forgot") {
			console.log("forgot");
		} else {
			this.isSubmitting = false;
		}


	}
}

export default AuthCtrl;
