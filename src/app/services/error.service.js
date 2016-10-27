class Error {
  constructor($log) {
    'ngInject';

    this._$log = $log;
  }


  showErrors(errors, form, formScope) {
    if (!_.isArray(errors)) {
      return this._$log.error("assigned parameter does not array");
    }

    let showedFields = [];
    let error;

    let length = errors.length;
    for (let i = 0; i < length; ++i) {
      error = errors[i];
      if (showedFields.indexOf(error.fieldName)) {
        let field;
        if (_.isArray(error.fieldName)) {
          for (let _i = 0; _i < error.fieldName.length; _i++) {
            field = form[error.fieldName[_i]];
            if (_.isObject(field)) {
              break;
            }
          }
        } else {
          field = form[error.fieldName];
        }

        if (!field) {
          formScope.errorMessage = error.error;
        } else {
          field.$setValidity('server', false);
          field.serverErrorMsg = error.error;
          let counter = 0;
          let watcherDestroyer = formScope.$watch(function () {
            return field.$modelValue;
          }, function () {
            if (++counter > 1) {
              field.$setValidity('server', true);
              field.serverErrorMsg = "";
              watcherDestroyer();
            }
          })
        }

        showedFields.push(error.fieldName);
      }
    }
  }

  hideErrors(errors, form, formScope) {
    if (!_.isArray(errors)) {
      return this._$log.error("assigned parameter does not array");
    }

    let error;

    let length = errors.length;
    for (let i = 0; i < length; ++i) {
      error = errors[i];
      let field;
      if (_.isArray(error.fieldName)) {
        for (let _i = 0; _i < error.fieldName.length; _i++) {
          field = form[error.fieldName[_i]];
          if (_.isObject(field)) {
            break;
          }
        }
      } else {
        field = form[error.fieldName];
      }

      if (field) {
        field.$setValidity('server', true);
        field.serverErrorMsg = "";
      }

      formScope.errorMessage = "";
    }
  }

}

export default Error;