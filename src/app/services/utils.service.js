/**
 * Created by kh.levon98 on 30-Sep-16.
 */
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

  parse(str = "") {
    var ret = Object.create(null);

    str = str.trim().replace(/^(\?|#|&)/, '');

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

  stringify(obj = {}, opts = {}) {
    var defaults = {
      encode: true,
      strict: true
    };

    opts = angular.extend({}, defaults, opts);

    return obj ? Object.keys(obj).sort().map((key)=> {
      var val = obj[key];

      if (val === undefined) {
        return '';
      }

      if (val === null) {
        return this.encode(key, opts);
      }

      if (Array.isArray(val)) {
        var result = [];

        val.slice().forEach((val2)=> {
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
}


export default Utils;