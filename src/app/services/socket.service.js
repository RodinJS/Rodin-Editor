/**
 * Created by kh.levon98 on 23-Nov-16.
 */

import * as io from 'socket.io-client/socket.io.min';
import * as _ from "lodash/dist/lodash.min";


class Socket {
  constructor(JWT, AppConstants, Restangular, Validator, $state, $q, Analyser, User) {
    'ngInject';
    this._JWT = JWT;
    this._AppConstants = AppConstants;
    this._Projects = Restangular.all('socket');
    this._User = User;
    this._$state = $state;
    this._$q = $q;
    this._Validator = new Validator();
    this._Analyser = Analyser;

    this._socket = null;

    this._User.verifyAuth().then(() => {
      if (!this._socket) {
        let params = {
          query: `x-access-token=${this.JWT.get()}`
        };

        this._socket = io.connect('', params);
      }
    })
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