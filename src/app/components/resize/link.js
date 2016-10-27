function init (element) {
    element.style['flex-basis'] = 'auto';

    return element;
}

function setup (column, right, i) {
    const dragHandler = column.querySelector('.drag-handle');

    console.log(column, dragHandler, i);
    window.dragHandler = dragHandler;
    let isDragging = false;
    let dragStartX = 0;
    let dragStartWidth = 0;

    dragHandler.addEventListener('mousedown', startDrag);
    document.addEventListener('mousemove', drag);
    dragHandler.addEventListener('mouseup', stopDrag);
    document.addEventListener('mouseup', stopDrag);

    function startDrag (evt) {
        isDragging = true;
        dragStartX = evt.clientX;
        dragStartWidth = column.offsetWidth;
    }

    function drag (evt) {
        if (!isDragging) {
            return;
        }

        let parentWidth = column.parentNode.offsetWidth;
        let columnWithRight = column.offsetWidth + right.offsetWidth;
        let draggedArea = evt.clientX - dragStartX;

        const columnWidth = (dragStartWidth + draggedArea )/ parentWidth * 100;
        const rightWidth = (columnWithRight - (dragStartWidth + draggedArea)) / parentWidth * 100;
        column.style.width = `${columnWidth}%`;
        right.style.width = `${rightWidth}%`;
    }

    function stopDrag () {
        isDragging = false;
    }
}

function ResizeLink (scope, element, attrs) {
    let columns = [];

    for (let i = 0; i < element[0].children.length; i++) {
        let tmp = element[0].children[i];
        if (tmp.hasAttribute('resize-item')) {
            columns.push(init(tmp));
        }
    }

    let t = setTimeout(() => {
        clearTimeout(t);

        for (let i = 0; i < columns.length - 1; i++) {
            setup(columns[i], columns[i + 1]);
        }
    }, 1000);
}

export default ResizeLink;