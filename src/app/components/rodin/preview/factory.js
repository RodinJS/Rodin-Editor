/**
 * Created by kh.levon98 on 17-Oct-16.
 */
function RodinPreviewFactory(Storage, RodinTabsConstants) {
  'ngInject';

  let model = {};
  let tabsComponentId = RodinTabsConstants.preview;

  model.autoReload = Storage.get("autoReload") || false;


  model.setAutoReload = setAutoReload;


  model.update = updatePreview;


  return model;

  function setAutoReload(val = false) {
    model.autoReload = !!val;
    Storage.set("autoReload", model.autoReload);
  }

  function updatePreview() {
    if(this.autoReload){

    }
  }
}

export default RodinPreviewFactory;