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
      output = output.replace(/Command/g, "Cmd");

    }

    return output;
  }
}

export default HotKeyFilter;