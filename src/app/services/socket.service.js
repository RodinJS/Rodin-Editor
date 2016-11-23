/**
 * Created by kh.levon98 on 23-Nov-16.
 */

import * as io from 'socket.io-client/socket.io.min';
import * as _ from "lodash/dist/lodash.min";


class Socket {
  constructor(JWT, AppConstants, Restangular, Validator, $state, $q, Analyser) {
    'ngInject';
    this._JWT = JWT;
    this._AppConstants = AppConstants;
    this._Projects = Restangular.all('socket');
    this._$state = $state;
    this._$q = $q;
    this._Validator = new Validator();
    this._Analyser = Analyser;

    this._socket = null;
  }

  init(params = {}) {

    if (!this._socket) {
      params["x-access-token"] = this._JWT.get();
      this._socket = io.connect('', params);
    }

    return this._socket;
  }

  on(eventName = "", callback) {
    this._socket.on(eventName, (...args) => {
      this._$rootScope.$apply(() => {
        if (callback && _.isFunction(callback)) {
          callback.apply(this._socket, args);
        }
      });
    })
  };

  emit(eventName = "", data = {}, callback) {
    this._socket.emit(eventName, data, (...args) => {
      this._$rootScope.$apply(() => {
        if (callback && _.isFunction(callback)) {
          callback.apply(this._socket, args);
        }
      });
    })
  };

}

export default Socket;