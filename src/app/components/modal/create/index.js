import CreateCtrl from './controller';

const Create = {
  templateUrl: 'components/modal/create/index.html',
  controller: CreateCtrl,
  bindings: {
    resolve: '<',
    close: '&',
    dismiss: '&'
  }
};

export default Create;