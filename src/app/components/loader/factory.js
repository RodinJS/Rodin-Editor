/**
 * Created by kh.levon98 on 17-Oct-16.
 */
import * as _ from "lodash/lodash.min";
import angular from 'angular/index';

function LoaderFactory($timeout, $q) {
  'ngInject';

  let model = {};
  let loaders = {};
  let nextId = 0;
  let elem = null;

  model.__setElem = setElem;
  model.show = showLoader;
  model.hide = hideLoader;

  return model;


  function showLoader(caller) {
    if (_.isEmpty(loaders)) {
      elem && elem.removeClass("hidden");
    }

    loaders[nextId] = true;

    return nextId++;
  }

  function hideLoader(id) {
    let defer = $q.defer();

    if (_.isNumber(id)) {
      delete loaders[id];
    } else {
      loaders = {};
    }

    if (_.isEmpty(loaders)) {
      elem && elem.addClass("hidden");
      defer.resolve();
    }

    return defer.promise;
  }

  function setElem(elm) {
    elem = angular.element(elm);
  }
}

export default LoaderFactory;