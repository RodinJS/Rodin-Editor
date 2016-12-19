/**
 * Created by kh.levon98 on 31-Oct-16.
 */

function CapitalizeFilter() {
  'ngInject';

  return Filter;

  /**
   * @param input {String}
   * @param all {Boolean}
   * @return {String}
   */
  function Filter(input = "", all = false) {
    var reg = (all) ? /([^\W_]+[^\s-]*) */g : /([^\W_]+[^\s-]*)/;

    input = input.toLowerCase();

    return input.replace(reg, function (txt) {

      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();

    });
  }
}

export default CapitalizeFilter;