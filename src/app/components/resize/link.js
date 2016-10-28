function ResizeLink (scope, element, attrs) {
    let type = scope.resizeType || 'horizontal';
    console.log(type);

    let columns = [];

    for (let i = 0; i < element[0].children.length; i++) {
        let tmp = element[0].children[i];
        if (tmp.hasAttribute('resize-item')) {
            let initElement = type === 'horizontal' ? initHorizontal(tmp) : initVertical(tmp);
            columns.push(initElement);
        }
    }

    let t = setTimeout(() => {
        clearTimeout(t);

        if (type === 'horizontal') {
            for (let i = 0; i < columns.length - 1; i++) {
                setup(columns[i], columns[i + 1]);
            }
        } else {
            for (let i = 1; i < columns.length; i++) {
                setup(columns[i], columns[i - 1]);
            }
        }
    }, 1000);

    function initHorizontal (element) {
        let minWidth = element.getAttribute('resize-item-min');
        let initialWidth = element.getAttribute('resize-item-initial');

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

    function initVertical (element) {
        let minHeight = element.getAttribute('resize-item-min');
        let initialHeight = element.getAttribute('resize-item-initial');

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

        console.log(element, initialHeight);
        element.style.height = `${initialHeight}%`;

        element.minHeight = minHeight;
        element.initialHeight = initialHeight;

        return element;
    }

    function setup (column, right) {
        const dragHandler = column.querySelector(type === 'horizontal' ? '.drag-handle' : '.drag-handle-vertical');

        let isDragging = false;
        let dragStartX = 0;
        let dragStartY = 0;
        let dragStartWidth = 0;
        let dragStartHeight = 0;

        dragHandler.addEventListener('mousedown', startDrag);
        document.addEventListener('mousemove', drag);
        dragHandler.addEventListener('mouseup', stopDrag);
        document.addEventListener('mouseup', stopDrag);

        function startDrag (evt) {
            isDragging = true;
            if (type === 'horizontal') {
                dragStartX = evt.clientX;
                dragStartWidth = column.offsetWidth;
            } else {
                dragStartY = evt.clientY;
                dragStartHeight = column.offsetHeight;
            }
        }

        function drag (evt) {
            if (!isDragging) {
                return;
            }

            type === 'vertical' ? dragVertical(evt) : dragHorizontal(evt)
        }

        function dragHorizontal (evt) {
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
        }

        function dragVertical (evt) {
            let parentHeight = column.parentNode.offsetHeight;
            let columnWithPrev = column.offsetHeight + right.offsetHeight;
            let draggedArea = evt.clientY - dragStartY;

            const columnHeight = (dragStartHeight - draggedArea) / parentHeight * 100;

            const prevHeight = (columnWithPrev - (dragStartHeight - draggedArea)) / parentHeight * 100;
            column.style.height = `${columnHeight}%`;
            right.style.height = `${prevHeight}%`;
        }

        function stopDrag () {
            isDragging = false;
        }
    }
}

export default ResizeLink;