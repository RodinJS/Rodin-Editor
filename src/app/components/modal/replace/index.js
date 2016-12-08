import ReplaceCtrl from './controller';

const Replace = {
  templateUrl: 'components/modal/replace/index.html',
  controller: ReplaceCtrl,
  bindings: {
    resolve: '<',
    close: '&',
    dismiss: '&'
  }
};

export default Replace;