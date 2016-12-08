/**
 * Created by kh.levon98 on 23-Nov-16.
 */

import * as io from 'socket.io-client/socket.io.min';
import * as _ from "lodash/dist/lodash.min";

let queue = [];

class Socket {
  constructor(JWT, AppConstants, Restangular, Validator, $state, $q, $rootScope, Analyser, User) {
    'ngInject';
    this._JWT = JWT;
    this._AppConstants = AppConstants;
    this._Projects = Restangular.all('socket');
    this._User = User;
    this._$state = $state;
    this._$q = $q;
    this._$rootScope = $rootScope;
    this._Validator = Validator;
    this._Analyser = Analyser;

    this._socket = null;

    this._User.verifyAuth().then(() => {
      if (!this._socket) {
        let params = {
          query: `token=${this._JWT.get()}`,
          transports: ['websocket', 'polling']
        };

        this._socket = io.connect(AppConstants.SOCKET + "/", params);

        if (queue.length) {
          for (let i = 0, ln = queue.length; i < ln; ++i) {
            let action = queue[i];

            if (action.name = "on") {
              this.on(action.eventName, action.callback);
            } else if (action.name = "emit") {
              this.emit(action.eventName, action.data, action.callback);
            }
          }
          queue.splice(0, queue.length);
        }
      }
    })
  }

  on(eventName = "", callback) {

    if (this._socket) {
      this._socket.on(eventName, (result) => {
        if (callback && _.isFunction(callback)) {
          this._$rootScope.$apply(() => {

            const Validator = new this._Validator();

            Validator.validateHTTP(result);

            return callback.apply(this._socket, [Validator.getDataHTTP(), Validator.getErrorsHTTP()]);
          });
        }
      });
    } else {
      queue.push({
        name: "on",
        eventName: eventName,
        callback: callback
      })
    }

  };

  emit(eventName = "", data = {}, callback) {
    if (this._socket) {
      this._socket.emit(eventName, data, (...args) => {
        this._$rootScope.$apply(() => {
          if (callback && _.isFunction(callback)) {
            callback.apply(this._socket, args);
          }
        });
      });
    } else {
      queue.push({
        name: "emit",
        eventName: eventName,
        data: data,
        callback: callback
      })
    }

  };

}

export default Socket;