/**
 * Created by kh.levon98 on 01-Nov-16.
 */

function BytesFilter() {
  'ngInject';

  return Filter;

  /**
   * @param bytes {Number}
   * @param precision {Number}
   * @return {String}
   */
  function Filter(bytes, precision) {
    if (bytes === 0) {
      return '0 bytes'
    }
    if (isNaN(parseFloat(bytes)) || !isFinite(bytes)) return '-';
    if (typeof precision === 'undefined') precision = 1;

    var units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB'],
      number = Math.floor(Math.log(bytes) / Math.log(1024)),
      val = (bytes / Math.pow(1024, Math.floor(number))).toFixed(precision);

    return (val.match(/\.0*$/) ? val.substr(0, val.indexOf('.')) : val) + ' ' + units[number];
  }
}

export default BytesFilter;