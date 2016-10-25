/**
 * Created by kh.levon98 on 17-Oct-16.
 */
function AceFactory() {
  'ngInject';

  let model = {};

  model.editor = null;
  model.session = null;

  return model;
}

export default AceFactory;