/**
 * Created by kh.levon98 on 17-Oct-16.
 */
function RodinPreviewFactory(Storage, RodinTabs, RodinTabsConstants, Utils, $stateParams, AppConstants, User, Notification) {
  'ngInject';

  let model = {};
  let tabsComponentId = RodinTabsConstants.preview;

  model.autoReload = Storage.get("autoReload") || false;


  model.setAutoReload = setAutoReload;
  model._validFileExtensions = [".html", ".htm"];


  model.update = updatePreview;
  model.openExternal = openExternal;
  model.run = run;


  return model;

  function setAutoReload(val = false) {
    this.autoReload = !!val;
    Storage.set("autoReload", this.autoReload);
  }

  function updatePreview(refresh = false, isBuilder = false) {

    ///////////////
    /////TMP///////
    if (!isBuilder) {
      return;
    }
    ///////////////


    let openTab = RodinTabs.get(tabsComponentId);

    if (refresh || this.autoReload) {
      openTab.url = generateUrl(openTab.path);
    }

    if (!refresh && this.autoReload) {
      for (let i in openTab.externalTabs) {
        let win = openTab.externalTabs[i];
        if (win.location && _.isFunction(win.location.reload)) {
          win.location.reload();
        } else {
          delete openTab.externalTabs[i];
        }
      }
    }
  }

  function openExternal(tab = null) {

    let openTab = RodinTabs.get(tabsComponentId, null, (_.isObject(tab) ? {path: tab.path} : {}));

    let win = window.open(openTab.url, "_blank");

    let index = (parseInt(Object.keys(openTab.externalTabs).last()) || 0) + 1; // generate unique indexes

    openTab.externalTabs[index] = win;
  }

  function run(file = RodinTabs.get(RodinTabsConstants.editor)) {
    let path = `${AppConstants.PREVIEW}${User.current.username}/${$stateParams.projectFolder}/${file.path}`;
    let tab = RodinTabs.get(tabsComponentId, null, {"path": path});
    if(!validateFileFormat(file, model._validFileExtensions)){
      const message = `Allowed running files ${model._validFileExtensions.join(', ')}`;
      return Notification.warning(message);
    }
    if (!tab) {
      tab = {
        name: file.name,
        path: path,
        url: `${generateUrl(path)}`,
        externalTabs: []
      };
      return RodinTabs.add(tabsComponentId, tab);
    }

    RodinTabs.setActive(tabsComponentId, tab);
  }

  /// local functions

  function generateUrl(path) {
    let parsedParams = Utils.parseQueryParams(path);

    parsedParams.editMode = true;
    parsedParams.refreshTime = Date.now();
    return `${path}?${Utils.stringifyQueryParams(parsedParams)}`;
  }

    /**
     * File format validation
     * if validate passed return true
     * @param file
     * @returns {boolean}
     */
    function validateFileFormat(file, _validFileExtensions) {
        const sFileName = file.name;
        if (sFileName.length > 0) {
            let blnValid = false;
            for (var j = 0; j < _validFileExtensions.length; j++) {
                let sCurExtension = _validFileExtensions[j];
                if (sFileName.substr(sFileName.length - sCurExtension.length, sCurExtension.length).toLowerCase() == sCurExtension.toLowerCase()) {
                    blnValid = true;
                    break;
                }
            }

            if (!blnValid) {
                return false;
            }
        }

        return true;
    }
}

export default RodinPreviewFactory;