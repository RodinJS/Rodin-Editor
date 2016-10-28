/**
 * Created by kh.levon98 on 26-Oct-16.
 */

import * as _ from "lodash/dist/lodash.min";

function HotKeyFilter(deviceDetector) {

  'ngInject';
  return Filter;

  /**
   * @param input {String} or {Object}
   * @return {String}
   */
  function Filter(input = "") {
    let output = "";
    const os = (deviceDetector.os === "mac" ? 'mac' : 'win');

    if (!_.isEmpty(input)) {
      if (_.isObject(input)) {
        output = input[os] || "";
      }

      output = output.replace(/-/g, "+");

      if(os === "mac"){
        output = output.replace(/Alt/g, "&#8997;");
        output = output.replace(/Shift/g, "&#8679;");
        output = output.replace(/Command/g, "&#8984;");
      }

    }

    return output;
  }
}

export default HotKeyFilter;