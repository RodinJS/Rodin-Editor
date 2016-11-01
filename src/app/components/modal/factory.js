/**
 * Created by kh.levon98 on 31-Oct-16.
 */
function ModalFactory($uibModal) {
  'ngInject';
  let model = {};

  model.rename = rename;
  model.create = create;
  model.confirm = confirm;
  model.prompt = prompt;
  model.upload = upload;

  return model;

  function rename(resolve = {}) {
    return $uibModal.open({
      animation: true,
      component: 'renameModal',
      resolve: resolve
    });
  }

  function create(resolve = {}) {
    return $uibModal.open({
      animation: true,
      component: 'createModal',
      resolve: resolve
    });
  }

  function confirm(resolve = {}) {
    return $uibModal.open({
      animation: true,
      component: 'confirmModal',
      resolve: resolve
    });
  }

  function prompt(resolve = {}) {
    return $uibModal.open({
      animation: true,
      component: 'promptModal',
      resolve: resolve
    });
  }

  function upload(resolve = {}) {
    return $uibModal.open({
      animation: true,
      component: 'uploadModal',
      resolve: resolve
    });
  }

}

export default ModalFactory;