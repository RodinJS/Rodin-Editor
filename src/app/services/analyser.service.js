/**
 * Created by kh.levon98 on 15-Sep-16.
 */

function Analyser(AppConstants, $log, $q, Validator) {
  'ngInject';

  const ERRORCODES = AppConstants.ERRORCODES;

  return Factory;

  function Factory() {
    const self = this;

    self.deferred = $q.defer();
    self.promise = self.deferred.promise;
    self.resolve = resolve;
    self.reject = reject;

    const _Validator = new Validator();

    ////////////////

    function resolve(result) {

      _Validator.validateHTTP(result);

      if (_Validator.isValidHTTP()) {

        let response = _Validator.getDataHTTP();

        self.deferred.resolve(response);

      } else {

        self.deferred.reject(_Validator.getErrorsHTTP());

      }

    }


    function reject(result) {

      _Validator.validateHTTP(result.data);

      self.deferred.reject(_Validator.getErrorsHTTP());

    }


  }
}

export default Analyser;