/**
 * Created by kh.levon98 on 12-Oct-16.
 */

import * as _ from "lodash/lodash.min";

export default class Storage {
  constructor(AppConstants, store, $q, User) {
    'ngInject';

    this._AppConstants = AppConstants;
    this._currentUser = User.current;
    this._store = store;
    this._$q = $q;

    this.defaultSettings = {
      autoReload: false,
      theme: 'monokai'
    };

    this._settingsKey = "EditorSettings_" + this._currentUser.username;

    this.set(this._settingsKey, _.merge(this.defaultSettings, this.get(this._settingsKey, true)), true);
  }

  get(key, getGlobal) {
    if (getGlobal) {
      return this._store.get(key) || null;
    } else {
      let userSettings = this._store.get(this._settingsKey);
      if (_.isObject(userSettings)) {
        return userSettings[key] || this.defaultSettings[key];
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

  //// getter and setter functions by scope

  projectScopeGet(projectId = null, key) {
    if (!projectId) {
      return console.error("Please provide projectID");
    }
    let projectScope = this.get(`project_${projectId}`) || {};

    return projectScope[key] || null;
  }

  projectScopeSet(projectId = null, key, value) {
    if (!projectId) {
      return console.error("Please provide projectID");
    }
    let projectScope = this.get(`project_${projectId}`) || {};

    projectScope[key] = value;

    this.set(`project_${projectId}`, projectScope);
  }
}
