/**
 * Created by kh.levon98 on 24-Sep-16.
 */

import * as _ from "lodash/dist/lodash.min";

let self;

class MenuBarCtrl {
	constructor(AppConstants, $scope, RodinMenuBar) {
		'ngInject';
		self = this;
		this.appName = AppConstants.appName;
		this._$scope = $scope;
		this._RodinMenuBar = RodinMenuBar;

		this.menuList = this._RodinMenuBar.getList(); //tmp

		this.drawNode = this._RodinMenuBar.drawNode;

	}

	selectOption(subMenu = {}, model) {
		let event = subMenu.event;

		if (_.isFunction(event)) {
			return event.call(subMenu, model);
		}
	}

}

export default MenuBarCtrl;