/**
 * Created by kh.levon98 on 17-Oct-16.
 */
function RodinPreviewFactory(Storage, RodinTabs, RodinTabsConstants, Utils) {
  'ngInject';

  let model = {};
  let tabsComponentId = RodinTabsConstants.preview;

  model.autoReload = Storage.get("autoReload") || false;


  model.setAutoReload = setAutoReload;


  model.update = updatePreview;
  model.openExternal = openExternal;
  model.run = run;


  return model;

  function setAutoReload(val = false) {
    this.autoReload = !!val;
    Storage.set("autoReload", this.autoReload);
  }

  function updatePreview(refresh = false) {
    /*let openTab = RodinTabs.get(tabsComponentId);

    if (refresh || this.autoReload) {
      openTab.URL = ""
    }
*/
    if (this.autoReload) {
      console.log("autoReload")

/*
      for (let i in openTab.externalTabs) {
        let win = openTab.externalTabs[i];
        if (win.location && _.isFunction(win.location.reload)) {
          win.location.reload();
        } else {
          delete openTab.externalTabs[i];
        }
      }
      */
    }
  }

  function openExternal() {
    let openTab = RodinTabs.get(tabsComponentId);

    let win = window.open(openTab.URL, "_blank");

    let index = (parseInt(Object.keys(openTab.externalTabs).last()) || 0) + 1; // generate unique indexes


    openTab.externalTabs[index] = win;
  }

  function run(file) {
    console.log("run preview", arguments)
  }
}

export default RodinPreviewFactory;