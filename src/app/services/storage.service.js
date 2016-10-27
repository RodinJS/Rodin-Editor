/**
 * Created by kh.levon98 on 12-Oct-16.
 */

import * as _ from "lodash/dist/lodash.min";

export default class Storage {
  constructor(AppConstants, store, $q, User) {
    'ngInject';

    this._AppConstants = AppConstants;
    this._currentUser = User.current;
    this._store = store;
    this._$q = $q;

    this.defaultSettings = {
      autoReload: false
    };

    this._settingsKey = "EditorSettings_" + this._currentUser.username;

    if (!_.isObject(this.get(this._settingsKey, true))) {
      this.set(this._settingsKey, this.defaultSettings, true);
    }
  }

  get(key, getGlobal) {
    if (getGlobal) {
      return this._store.get(key) || null;
    } else {
      let userSettings = this._store.get(this._settingsKey);
      if (_.isObject(userSettings)) {
        return userSettings[key];
      }
    }
    return null;
  }

  set(key, value, setGlobal = false) {
    if (setGlobal) {
      this._store.set(key, value);
    } else {
      let userSettings = this._store.get(this._settingsKey);
      if (!_.isObject(userSettings)) {
        userSettings = {};
      }
      userSettings[key] = value;
      this._store.set(this._settingsKey, userSettings);
    }
    return value;
  }
}
