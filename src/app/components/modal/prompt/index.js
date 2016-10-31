import PromptCtrl from './controller';

const Prompt = {
  templateUrl: 'components/modal/prompt/index.html',
  controller: PromptCtrl,
  bindings: {
    resolve: '<',
    close: '&',
    dismiss: '&'
  }
};

export default Prompt;