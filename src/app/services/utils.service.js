/**
 * Created by kh.levon98 on 30-Sep-16.
 */

import * as _ from "lodash/lodash.min";

class Utils {
  constructor($log) {
    'ngInject';

    this._$log = $log;
  }

  generateUniqueString(length = 8) {
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let text = "";

    for (let i = 0; i < length; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }

  bindKey(win, mac) {
    return {win: win, mac: mac};
  }

  findFileInTree(list = [], name = "") {
    for (let i = 0, ln = list.length; i < ln; ++i) {
      if (list[i].name.indexOf(name) > -1) {
        return list[i];
      }
    }

    return false;
  }

  parseQueryParams(str = "") {
    var ret = Object.create(null);

    // str = str.trim().replace(/^([^?|#]*)[?|#]/, ''); /// TODO: epic shit
    str = str.trim().replace(/^([^?|#]*)/, '').replace(/[?|#]/, '');

    if (!str) {
      return ret;
    }

    str.split('&').forEach(function (param) {
      var parts = param.replace(/\+/g, ' ').split('=');
      // Firefox (pre 40) decodes `%3D` to `=`
      // https://github.com/sindresorhus/query-string/pull/37
      var key = parts.shift();
      var val = parts.length > 0 ? parts.join('=') : undefined;

      key = decodeURIComponent(key);

      // missing `=` should be `null`:
      // http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters
      val = val === undefined ? null : decodeURIComponent(val);

      if (ret[key] === undefined) {
        ret[key] = val;
      } else if (Array.isArray(ret[key])) {
        ret[key].push(val);
      } else {
        ret[key] = [ret[key], val];
      }
    });

    return ret;
  };

  stringifyQueryParams(obj = {}, opts = {}) {
    var defaults = {
      encode: true,
      strict: true
    };

    opts = angular.extend({}, defaults, opts);

    return obj ? Object.keys(obj).sort().map((key) => {
      var val = obj[key];

      if (val === undefined) {
        return '';
      }

      if (val === null) {
        return this.encode(key, opts);
      }

      if (Array.isArray(val)) {
        var result = [];

        val.slice().forEach((val2) => {
          if (val2 === undefined) {
            return;
          }

          if (val2 === null) {
            result.push(this.encode(key, opts));
          } else {
            result.push(this.encode(key, opts) + '=' + this.encode(val2, opts));
          }
        });

        return result.join('&');
      }

      return this.encode(key, opts) + '=' + this.encode(val, opts);
    }).filter(function (x) {
      return x.length > 0;
    }).join('&') : '';
  };

  encode(value = "", opts = {}) {
    if (opts.encode) {
      if (opts.strict) {
        return encodeURIComponent(value).replace(/[!'()*]/g, x => `%${x.charCodeAt(0).toString(16).toUpperCase()}`);
      } else {
        return encodeURIComponent(value)
      }
    }

    return value;
  }

  filterTree(list = [], filter = {}, field = "", startPath = "") {
    let filteredList = [];
    let _list = [];

    if (startPath) {
      _list.push(findNodeByPath(list, _.concat([""], startPath.split(/[\/|\\]/g))));
    } else {
      _list = list;
    }

    filterTreeRecurrentFn(_list, filter, field, filteredList);

    return filteredList.reverse();
  }

  replaceInTree(list = [], item = null) {
    let pathArr = [""];

    if (!_.isEmpty(item.path)) {
      pathArr = _.concat(pathArr, item.path.split(/[\/|\\]/g));
    }

    replaceWithPath(list, item, pathArr);
  }
}

function replaceWithPath(list, item, pathArr = []) {
  let name = pathArr.shift();

  for (let i = 0, ln = list.length; i < ln; i++) {
    let node = list[i];
    if (node.parent === ".." && item.parent === "..") {
      list[i] = item;
      return true;
    } else if (node.name == name || node.parent === "..") {
      if (!pathArr.length) {
        if (item) {
          list[i] = item
        } else {
          delete list[i];
        }
        return true;
      }
      return replaceWithPath(node.children, item, pathArr);
    }
  }
}

function findNodeByPath(list = [], pathArr = []) {
  let name = pathArr.shift();

  for (let i = 0, ln = list.length; i < ln; i++) {
    let node = list[i];
    if (node.name == name || node.parent === "..") {
      if (!pathArr.length) {
        return node;
      }

      return findNodeByPath(node.children, pathArr);
    }
  }

}

function filterTreeRecurrentFn(list, filter, field, filteredList) {
  let res = _.filter(list, filter);

  for (let i = 0, ln = res.length; i < ln; i++) {
    let node = res[i];

    if (!_.isEmpty(node.children)) {
      filterTreeRecurrentFn(node.children, filter, field, filteredList);
    }

    if (_.isObject(node) && !_.isEmpty(field)) {
      if (node[field] != undefined) {
        filteredList.push(node[field]);
      }
    } else {
      filteredList.push(node);
    }
  }
}


export default Utils;