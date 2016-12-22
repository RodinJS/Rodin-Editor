function ResizeCtrl($scope, $timeout, Storage, RodinIdea) {
  'ngInject';
  let self = this;

  this._$timeout = $timeout;

  this.columns = [];
  this.resizeType = "horizontal";


  let resizeItemConfig = Storage.projectScopeGet(RodinIdea.getProjectId(), "resizeItemConfig");


  this.initHorizontal = initHorizontal;
  this.initVertical = initVertical;
  this.setup = setup;


  function initHorizontal(element) {
    let minWidth = this.attrs.resizeItemMin;
    let initialWidth = this.attrs.resizeItemInitial;

    if (isNaN(parseInt(minWidth))) {
      minWidth = 0;
      console.warn(`Min width will be ignored because it is not an integer, value ${minWidth}`)
    } else {
      minWidth = parseInt(minWidth);
    }

    if (isNaN(parseInt(initialWidth))) {
      initialWidth = 0;
      console.warn(`Initial width will be ignored because it is not an integer, value ${initialWidth}`)
    } else {
      initialWidth = parseInt(initialWidth);
    }

    let parentWidth = element.parentNode.offsetWidth;
    let minWidthPercent = minWidth / parentWidth * 100;

    if (minWidthPercent > initialWidth) {
      initialWidth = minWidthPercent;
    }

    element.style.width = `${initialWidth}%`;

    element.minWidth = minWidth;
    element.initialWidth = initialWidth;

    return element;
  }

  function initVertical(element) {
    let minHeight = this.attrs.resizeItemMin;
    let initialHeight = this.attrs.resizeItemInitial;

    if (isNaN(parseInt(minHeight))) {
      minHeight = 0;
      console.warn(`Min width will be ignored because it is not an integer, value ${minHeight}`)
    } else {
      minHeight = parseInt(minHeight);
    }

    if (isNaN(parseInt(initialHeight))) {
      initialHeight = 0;
      console.warn(`Initial width will be ignored because it is not an integer, value ${initialHeight}`)
    } else {
      initialHeight = parseInt(initialHeight);
    }

    let parentHeight = element.parentNode.offsetHeight;
    let minHeightPercent = minHeight / parentHeight * 100;

    if (minHeightPercent > initialHeight) {
      initialHeight = minHeightPercent;
    }

    element.style.height = `${initialHeight}%`;

    element.minHeight = minHeight;
    element.initialHeight = initialHeight;

    return element;
  }

  function setup(column, right) {

    let className = (self.resizeType === 'horizontal' ? '.drag-handle' : '.drag-handle-vertical');
    const dragHandler = column.querySelector(className);
    if (!dragHandler) {
      return false;
    }

    let isDragging = false;
    let dragStartX = 0;
    let dragStartY = 0;
    let dragStartWidth = 0;
    let dragStartHeight = 0;

    dragHandler.addEventListener('mousedown', startDrag);
    document.addEventListener('mousemove', drag);
    dragHandler.addEventListener('mouseup', stopDrag);
    document.addEventListener('mouseup', stopDrag);

    function startDrag(evt) {
      evt.preventDefault();
      blockIframes(column, right);
      isDragging = true;
      if (self.resizeType === 'horizontal') {
        dragStartX = evt.clientX;
        dragStartWidth = column.offsetWidth;
      } else {
        dragStartY = evt.clientY;
        dragStartHeight = column.offsetHeight;
      }
    }

    function drag(evt) {
      evt.preventDefault();
      if (!isDragging) {
        return;
      }

      self.resizeType === 'vertical' ? dragVertical(evt) : dragHorizontal(evt)
    }

    function dragHorizontal(evt) {
      let parentWidth = column.parentNode.offsetWidth;
      let columnWithRight = column.offsetWidth + right.offsetWidth;
      let draggedArea = evt.clientX - dragStartX;

      const columnWidth = (dragStartWidth + draggedArea) / parentWidth * 100;

      /**
       * Check if current width is not less than min width
       */
      if (dragStartWidth + draggedArea < column.minWidth) {
        return;
      }

      const rightWidth = (columnWithRight - (dragStartWidth + draggedArea)) / parentWidth * 100;
      column.style.width = `${columnWidth}%`;
      right.style.width = `${rightWidth}%`;

      resizeItemConfig[column.__TYPE][column.__INDEX] = `${columnWidth}%`;
      resizeItemConfig[right.__TYPE][right.__INDEX] = `${rightWidth}%`;
    }

    function dragVertical(evt) {
      let parentHeight = column.parentNode.offsetHeight;
      let columnWithPrev = column.offsetHeight + right.offsetHeight;
      let draggedArea = evt.clientY - dragStartY;

      const columnHeight = (dragStartHeight - draggedArea) / parentHeight * 100;

      const prevHeight = (columnWithPrev - (dragStartHeight - draggedArea)) / parentHeight * 100;
      column.style.height = `${columnHeight}%`;
      right.style.height = `${prevHeight}%`;
    }

    function stopDrag() {
      isDragging = false;
      Storage.projectScopeSet(RodinIdea.getProjectId(), "resizeItemConfig", resizeItemConfig);
      unblockIframes(column, right);
    }
  }

  function blockIframes() {
    for (let i = 0; i < arguments.length; i++) {
      let element = arguments[i];

      if (!element) {
        continue;
      }

      let iframes = element.querySelectorAll('iframe');
      for (let j = 0; j < iframes.length; j++) {
        iframes[j].style['pointer-events'] = 'none';
      }
    }
  }

  function unblockIframes() {
    for (let i = 0; i < arguments.length; i++) {
      let element = arguments[i];

      if (!element) {
        continue;
      }

      let iframes = element.querySelectorAll('iframe');
      for (let j = 0; j < iframes.length; j++) {
        iframes[j].style['pointer-events'] = 'auto';
      }
    }
  }
}

export default ResizeCtrl;