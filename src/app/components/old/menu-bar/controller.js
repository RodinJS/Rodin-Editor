/**
 * Created by kh.levon98 on 06-Oct-16.
 */
import * as _ from "lodash/dist/lodash.min";

let self;

class TreeCtrl {
	constructor(AppConstants, User, $scope, $stateParams, $rootScope, $timeout, $log, $on, $emit, Project) {
		'ngInject';
		self = this;
		this.appName = AppConstants.appName;
		this.SITE = AppConstants.SITE;
		this.currentUser = User.current;
		this._$scope = $scope;
		this._$rootScope = $rootScope;
		this._Project = Project;

		this.projectRoot = $stateParams.projectFolder;
		this.logout = ()=> {
			User.logout(...arguments);
		};

		this._$timeout = $timeout;
		this._$log = $log;
		this._$on = $on;
		this._$emit = $emit;

		this.menuList = this._$scope.menuList;



		this._Project.getList().then((data)=>{
			this.projectList = data;
		})
	}

	selectOption(subMenu = {}, model) {
		let event = subMenu.event;

		if (_.isFunction(event)) {
			return event.call(subMenu, model);
		}

		this._$emit("rodin-idea:menu-bar:" + event, model);
	}
}

export default TreeCtrl;

