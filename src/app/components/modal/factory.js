/**
 * Created by kh.levon98 on 31-Oct-16.
 */

import * as _ from "lodash/lodash.min";

function ModalFactory($uibModal) {
  'ngInject';

  let model = {};

  let openModals = {};

  model.rename = rename;
  model.create = create;
  model.confirm = confirm;
  model.prompt = prompt;
  model.upload = upload;
  model.replace = replace;
  model.findAndReplace = findAndReplace;
  model.gitSync = gitSync;

  return model;

  function rename(resolve = {}, closeActiveModal = true) {
    if (closeActiveModal) {
      closeModal(openModals);
    }

    return openModal($uibModal.open({
      animation: true,
      component: 'renameModal',
      resolve: resolve
    }));
  }

  function create(resolve = {}, closeActiveModal = true) {
    if (closeActiveModal) {
      closeModal(openModals);
    }

    return openModal($uibModal.open({
      animation: true,
      component: 'createModal',
      resolve: resolve
    }));
  }

  function confirm(resolve = {}, closeActiveModal = true) {
    if (closeActiveModal) {
      closeModal(openModals);
    }

    return openModal($uibModal.open({
      animation: true,
      component: 'confirmModal',
      resolve: resolve
    }));
  }

  function gitSync(resolve = {}, closeActiveModal = true) {
    if (closeActiveModal) {
      closeModal(openModals);
    }

    return openModal($uibModal.open({
      animation: true,
      component: 'gitSyncModal',
      resolve: resolve
    }));
  }

  function prompt(resolve = {}, closeActiveModal = true) {
    if (closeActiveModal) {
      closeModal(openModals);
    }

    return openModal($uibModal.open({
      animation: true,
      component: 'promptModal',
      resolve: resolve
    }));
  }

  function upload(resolve = {}, closeActiveModal = true) {
    if (closeActiveModal) {
      closeModal(openModals);
    }

    return openModal($uibModal.open({
      animation: true,
      component: 'uploadModal',
      resolve: resolve
    }));
  }

  function replace(resolve = {}, closeActiveModal = true) {
    if (closeActiveModal) {
      closeModal(openModals);
    }

    return openModal($uibModal.open({
      animation: true,
      component: 'replaceModal',
      resolve: resolve
    }));
  }

  function findAndReplace(resolve = {}, closeActiveModal = true) {
    if (closeActiveModal) {
      closeModal(openModals);
    }

    return openModal($uibModal.open({
      animation: true,
      component: 'findAndReplaceModal',
      resolve: resolve
    }));
  }

  function closeModal(modal = null) {

    if (_.isObject(modal)) {
      for (let i in modal) {
        let md = modal[i];
        _.isFunction(md.dismiss) && md.dismiss({$value: 'cancel'});
      }
    } else {
      _.isFunction(modal.dismiss) && modal.dismiss({$value: 'cancel'});
    }

  }

  function openModal(modal = null) {
    modal.__INDEX__ = (parseInt(_.last(Object.keys(openModals))) || 0) + 1;

    modal.closed.then(function () {
      delete openModals[modal.__INDEX__];
    });

    return (openModals[modal.__INDEX__] = modal);
  }

}

export default ModalFactory;