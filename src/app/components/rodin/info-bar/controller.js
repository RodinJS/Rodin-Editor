/**
 * Created by kh.levon98 on 24-Sep-16.
 */

class InfoBarCtrl {
  constructor(AppConstants, User, $scope) {
    'ngInject';
    this._$scope = $scope;


    this.appName = AppConstants.appName;
    this.SITE = AppConstants.SITE;
    this.currentUser = User.current;

    this.logout = (...args)=> {
      User.logout(args);
    };
  }

}

export default InfoBarCtrl;