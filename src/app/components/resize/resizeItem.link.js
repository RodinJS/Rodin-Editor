function ResizeItemLink(scope, element, attrs, ctrl) {
  let tim = ctrl._$timeout(() => {

    let elm = element[0];

    let obj = {
      attrs: attrs,
      element: element,
    };

    let item = (ctrl.resizeType === "horizontal" ? ctrl.initHorizontal.call(obj, elm) : ctrl.initVertical.call(obj, elm));

    item.__INDEX = ctrl.columns.length;
    item.__TYPE = ctrl.resizeType;

    ctrl.columns.push(item);
    if (ctrl.resizeType === 'horizontal') {
      for (let i = 0; i < ctrl.columns.length - 1; i++)
        ctrl.setup(ctrl.columns[i], ctrl.columns[i + 1]);
      // ctrl.setup(ctrl.columns[index], ctrl.columns[index + 1]);
    } else {
      for (let i = 1; i < ctrl.columns.length; i++)
        ctrl.setup(ctrl.columns[i], ctrl.columns[i - 1]);
      // ctrl.setup(ctrl.columns[i], ctrl.columns[i - 1]);
    }

    ctrl._$timeout.cancel(tim);
  }, 500);

}

export default ResizeItemLink;