/**
 * [tobesimple grid] tbs.grid.2.0.0.event.select.content.js
 *
 * Copyrightⓒ2022 by tobesimple.net. All rights reserved.
 *
 */
TbsGrid.prototype.panel30_select = function(eventPanelName) {
    let selector = '#' + this.gridId;
    let grid = this;

    let startRowIndex, startCellIndex, startX, startY;
    let lastRowIndex , lastCellIndex , lastX , lastY;
    
    let mouseButton = 0;
    
    let flagUp      = false;
    let flagDown    = false;
    let flagLeft    = false;
    let flagRight   = false;

    let eventPanel = document.querySelector(selector + ' .tbs-grid-' + eventPanelName);

    const mouseDownEvent = function (e) {
        //if (e.detail == 1) console.log(`click ${e.detail}`);
        //if (e.detail == 2) console.log(`doubleclick ${e.detail}`);

        startX = grid.startX = window.pageXOffset + e.clientX;
        startY = grid.startY = window.pageYOffset + e.clientY;

        lastX = grid.lastX = window.pageXOffset + e.clientX;
        lastY = grid.lastY = window.pageYOffset + e.clientY;

        let tableCell;
        if      (e.target.tagName == 'DIV') { tableCell = e.target.parentNode; }
        else if (e.target.tagName == 'IMG') { tableCell = e.target.parentNode.parentNode; }
        else if (e.target.tagName == 'TD')  { tableCell = e.target; }
        else { return; }

        mouseButton = window.event.button;

        startRowIndex = grid.tbs_getRowIndexInTable(tableCell.parentNode.rowIndex, eventPanelName);
        lastRowIndex  = -1;

        startCellIndex = tableCell.cellIndex;
        lastCellIndex  = tableCell.cellIndex;

        //=====================================================================
        // let moveY = lastY - startY;
        // let moveX = lastX - startX;
        //
        // let rect= document.querySelector(selector + ' .tbs-grid-group30').getBoundingClientRect();
        //
        // let groupTop   = window.pageYOffset + rect.top;
        // let groupBottom= window.pageYOffset + rect.bottom;
        // let groupLeft  = window.pageXOffset + rect.left;
        // let groupRight = window.pageXOffset + rect.right;
        //
        // console.log(` window.pageXOffset: ${window.pageXOffset} e.clientX: ${e.clientX}  window.pageYOffset : ${window.pageYOffset}  e.clientY: ${e.clientY}`)
        // console.log(` groupLeft : ${groupLeft} groupTop: ${groupTop}  `)
        //=====================================================================

        if (window.event.ctrlKey) selectCellCtrl(e);
        else if (window.event.button === 0) {
            if (!window.event.ctrlKey && !window.event.shiftKey) selectCell(e);
            else if (window.event.shiftKey) selectCellShift(e);
        }
        document.addEventListener('mousemove', mouseMoveEvent);
        document.addEventListener('mouseup', mouseUpEvent);
    };
    const mouseMoveEvent = function (e) {
        lastX = grid.lastX = window.pageXOffset + e.clientX;
        lastY = grid.lastY = window.pageYOffset + e.clientY;
        //console.log(`mouseMoveEvent : lastX ${lastX} : lastY ${lastY}`)
        e.preventDefault();
        e.stopPropagation();

        //if (grid.option_selectOne == true) return;
        if (grid.options[grid.option_selectMode] == 'cell' || grid.options[grid.option_selectMode] == 'row') return;
        if (window.event.ctrlKey) selectCellCtrlMove(e);
        if (window.event.button === 0) {
            if (!window.event.ctrlKey && !window.event.shiftKey) selectCellMove(e);
        }
        return false;
    };
    const mouseUpEvent = function (e) {
        e.preventDefault();
        e.stopPropagation();

        lastX = grid.lastX = window.pageXOffset + e.clientX;
        lastY = grid.lastY = window.pageYOffset + e.clientY;

        //console.log(`mouseUpEvent : lastX ${lastX} : lastY ${lastY}`)
        flagUp      = false;
        flagDown    = false;
        flagLeft    = false;
        flagRight   = false;

        document.removeEventListener('mousemove', mouseMoveEvent);
        document.removeEventListener('mouseup', mouseUpEvent);

        // console.log(`${mouseButton} ${startX} == ${lastX} ${startY} == ${lastY}`);
        // input editing, input EditStart, input Editing, input EditEnd
        grid.input_focus();

        let isInArea = grid.tbs_isInArea(e, eventPanelName, lastX, lastY);
        if (isInArea) {
            if (mouseButton == 0 && grid.tbs_isMovedPositionInConstRange(startX, startY, lastX, lastY)) {
                let param = { e: e, rowIndex: startRowIndex, cellIndex: startCellIndex, mode: 'mouse' };

                if (e.detail == 1) grid.tbs_executeEvent(true, 'click', param);
                else if (e.detail == 2) {
                    let isEditable = grid.columns[startCellIndex][grid.column_editable];
                    if (isEditable) {
                        if (grid.user_edit != '') grid.input_edit(e, 0, 'mouse');
                        else grid.input_show(e, 'mouse');
                    }
                    else grid.tbs_executeEvent(true, 'dblclick', param);
                }
            }
        }
    };
    const selectCell = function(e) {
        let tableCell;
        //console.log(`${e.target.tagName}`);
        if (e.target.tagName == 'DIV')  { tableCell = e.target.parentNode; }
        else if (e.target.tagName == 'IMG')  { tableCell = e.target.parentNode.parentNode; }
        else { tableCell = e.target; }

        startCellIndex = tableCell.cellIndex;
        lastCellIndex  = startCellIndex;
        startRowIndex  = grid.tbs_getRowIndexInTable(tableCell.parentNode.rowIndex, eventPanelName);
        lastRowIndex   = startRowIndex;

        if (eventPanelName == 'panel60') {
            if (tableCell.rowSpan != undefined && tableCell.rowSpan > 1) {
                let tableRows = document.querySelectorAll(selector + ' .tbs-grid-panel61 .tbs-grid-table tbody tr:not([style*="display: none"])');
                for (let i = 0, len = tableRows.length; i < len; i++) {
                    let tableRow = tableRows[i];
                    let rect = tableRow.childNodes[0].getBoundingClientRect();
                    if ((window.pageYOffset + rect.top) < startY && startY < (window.pageYOffset + rect.bottom)) {
                        startRowIndex = parseInt(tableRow.childNodes[0].childNodes[0].textContent) - 1;
                        lastRowIndex  = parseInt(tableRow.childNodes[0].childNodes[0].textContent) - 1;
                        break;
                    }
                }
            }
        }
        else {
            if (tableCell.rowSpan != undefined && tableCell.rowSpan > 1) {
                let tableRows = document.querySelectorAll(selector + ' .tbs-grid-panel31 .tbs-grid-table tbody tr:not([style*="display: none"])');
                for (let i = 0, len = tableRows.length; i < len; i++) {
                    let tableRow = tableRows[i];
                    let rect = tableRow.childNodes[0].getBoundingClientRect();
                    if ((window.pageYOffset + rect.top) < startY && startY < (window.pageYOffset + rect.bottom)) {
                        startRowIndex = parseInt(tableRow.childNodes[0].childNodes[0].textContent) - 1;
                        lastRowIndex  = parseInt(tableRow.childNodes[0].childNodes[0].textContent) - 1;
                        break;
                    }
                }
            }
        }
        grid.tbs_clearRange(0, -1);
        grid.tbs_selectedRange(startRowIndex, lastRowIndex, startCellIndex, lastCellIndex);
    }
    const selectCellMove = function(e) {
        flagUp      = false;
        flagDown    = false;
        flagLeft    = false;
        flagRight   = false;

        // clientY : viewport Criteria
        // pageXOffset : scroll amonunt in viewport
        // getBoundingClientRect() : relative parent Criteria

        // lastX = grid.lastX = window.pageXOffset + e.clientX;
        // lastY = grid.lastY = window.pageYOffset + e.clientY;
        //console.log(`selectCellMove : lastX ${lastX} / lastY : ${lastY}`);

        let moveY = grid.lastY - grid.startY;
        let moveX = grid.lastX - grid.startX;
        let lastX = grid.lastX;
        let lastY = grid.lastY;
        if (grid.fixedRowIndex != -1) {
            let panel = document.querySelector(selector + ' .tbs-grid-' + eventPanelName);
            if (eventPanelName == 'panel60') {
                panel = document.querySelector(selector + ' .tbs-grid-group30');
            }
            let panel30 = document.querySelector(selector + ' .tbs-grid-panel30');

            let rect= panel.getBoundingClientRect();
            let absRect = grid.tbs_getOffset(panel);

            let rect30= panel30.getBoundingClientRect();
            let absRect30 = grid.tbs_getOffset(panel30);

            let panelTop   = absRect.top;  // 두 종류인데....panel60 영역 일 경우
            let panelBottom= absRect30.top + rect30.height;
            let panelLeft  = absRect.left;
            let panelRight = absRect.left + rect.width;

            console.log(`selectCellMove : lastX ${lastX} < panelLeft : ${panelLeft} > panelRight ${panelRight}`);

            // Outside the area
            if (lastX < panelLeft || lastX > panelRight || lastY < panelTop || lastY > panelBottom) {
                if (lastX < panelLeft  ) { flagLeft  = true; doInterval(grid.const_left);  }
                if (lastX > panelRight ) { flagRight = true; doInterval(grid.const_right); }
                if (lastY < panelTop   ) { flagUp    = true; doInterval(grid.const_up);    }
                if (lastY > panelBottom) { flagDown  = true; doInterval(grid.const_down);  }
            }
            select(moveX, moveY);
        }
        else if (grid.fixedColumnIndex != -1) {
            let panel  = document.querySelector(selector + ' .tbs-grid-' + eventPanelName);
            let panel30= document.querySelector(selector + ' .tbs-grid-panel30');

            let rect= panel.getBoundingClientRect();
            let absRect = grid.tbs_getOffset(panel);

            let rect30= panel30.getBoundingClientRect();
            let absRect30 = grid.tbs_getOffset(panel30);

            let panelTop   = absRect.top;
            let panelBottom= absRect.top + rect.height;
            let panelLeft  = absRect.left;
            let panelRight = absRect30.left + rect30.width;

            // Outside the area
            if (lastX < panelLeft || lastX > panelRight || lastY < panelTop || lastY > panelBottom) {
                if (lastX < panelLeft  ) { flagLeft  = true; doInterval(grid.const_left);  }
                if (lastX > panelRight ) { flagRight = true; doInterval(grid.const_right); }
                if (lastY < panelTop   ) { flagUp    = true; doInterval(grid.const_up);    }
                if (lastY > panelBottom) { flagDown  = true; doInterval(grid.const_down);  }
            }
            select(moveX, moveY);
        }
        else {
            let panel = document.querySelector(selector + ' .tbs-grid-' + eventPanelName);
            let rect= panel.getBoundingClientRect();
            let absRect = grid.tbs_getOffset(panel);

            let panelTop   = absRect.top;
            let panelBottom= absRect.top + rect.height;
            let panelLeft  = absRect.left;
            let panelRight = absRect.left + rect.width;

            // Outside the area
            if (lastX < panelLeft || lastX > panelRight || lastY < panelTop || lastY > panelBottom) {
                if (lastX < panelLeft  ) { flagLeft  = true; doInterval(grid.const_left);  }
                if (lastX > panelRight ) { flagRight = true; doInterval(grid.const_right); }
                if (lastY < panelTop   ) { flagUp    = true; doInterval(grid.const_up);    }
                if (lastY > panelBottom) { flagDown  = true; doInterval(grid.const_down);  }
            }
            select(moveX, moveY);
        }
    }
    const selectCellCtrl = function(e) {}
    const selectCellCtrlMove = function(e) {}
    const selectCellShift = function(e) {}
    const select = function(moveX, moveY) {
        if (moveY > 0 && moveX > 0) { //아래로, 우로
            let maxRowIndex, maxCellIndex;
            maxRowIndex  = grid.tbs_getMaxRowIndexByMouseMove();
            maxCellIndex = grid.tbs_getMaxCellIndexByMouseMove();
            console.log(`eventPanelName ${eventPanelName} 1) $maxRowIndex  ${maxRowIndex} maxCellIndex ${maxCellIndex}`);
            grid.tbs_clearRange(0, -1);
            grid.tbs_selectedRange(startRowIndex, maxRowIndex, startCellIndex, maxCellIndex);
        }
        if (moveY > 0 && moveX < 0) { //아래로, 좌로
            let maxRowIndex, minCellIndex;
            maxRowIndex  = grid.tbs_getMaxRowIndexByMouseMove();
            minCellIndex = grid.tbs_getMinCellIndexByMouseMove();
            console.log(`eventPanelName ${eventPanelName} 2) $maxRowIndex  ${maxRowIndex} minCellIndex ${minCellIndex}`);
            grid.tbs_clearRange(0, -1);
            grid.tbs_selectedRange(startRowIndex, maxRowIndex, startCellIndex, minCellIndex);
        }
        if (moveY < 0 && moveX > 0) { //위로, 우로 ???
            let minRowIndex, maxCellIndex;
            minRowIndex = grid.tbs_getMinRowIndexByMouseMove();
            maxCellIndex= grid.tbs_getMaxCellIndexByMouseMove();
            console.log(`eventPanelName ${eventPanelName}  3) minRowIndex ${minRowIndex} maxCellIndex ${maxCellIndex}`);
            grid.tbs_clearRange(0, -1);
            grid.tbs_selectedRange(startRowIndex, minRowIndex, startCellIndex, maxCellIndex);
        }
        if (moveY < 0 && moveX < 0) { //위로, 좌로
            let minRowIndex, minCellIndex;
            minRowIndex = grid.tbs_getMinRowIndexByMouseMove();
            minCellIndex= grid.tbs_getMinCellIndexByMouseMove();
            console.log(`eventPanelName ${eventPanelName} 4)  minRowIndex ${minRowIndex} minCellIndex ${minCellIndex}`);
            grid.tbs_clearRange(0, -1);
            grid.tbs_selectedRange(startRowIndex, minRowIndex, startCellIndex, minCellIndex);
        }
    }
    const setPanelMove = function(type) {
        // panel outside area
        let startRowIndex  = grid.startRowIndex;
        let lastRowIndex   = grid.lastRowIndex;
        let startCellIndex = grid.startCellIndex;
        let lastCellIndex  = grid.lastCellIndex;

        let minRowIndex, maxRowIndex, maxCellIndex, minCellIndex;

        // tableRows 는 갯수가 변한다
        let table = document.querySelector(selector + ' .tbs-grid-panel30 .tbs-grid-table');
        let tableRows = document.querySelectorAll(selector + ' .tbs-grid-panel30 .tbs-grid-table tbody tr:not([style*="display: none"])');
        let tableCellCount = (tableRows.length > 0) ? tableRows[0].childNodes.length : 0;

        if (type == 'right') { //우로
            if (table.style.left == (-1 * grid.scroll.xHiddenSize) + 'px') {
                flagRight = false;

                grid.tbs_clearRange(0, -1);
                grid.tbs_selectedRange(startRowIndex, lastRowIndex, startCellIndex, -1);
            }
            else {
                grid.tbs_setBarPositionByDirection('right');
                maxCellIndex = grid.tbs_getMaxCellIndexByMouseMove();

                grid.tbs_clearRange(0, -1);
                grid.tbs_selectedRange(startRowIndex, lastRowIndex, startCellIndex, maxCellIndex);
            }
        } 
        else if (type == 'left') { //좌로
            if (table.style.left == '0px') {
                flagLeft = false;

                grid.tbs_clearRange(0, -1);
                grid.tbs_selectedRange(startRowIndex, lastRowIndex, startCellIndex, lastCellIndex);
            }
            else {
                grid.tbs_setBarPositionByDirection('left');
                minCellIndex = grid.tbs_getMinCellIndexByMouseMove();

                grid.tbs_clearRange(0, -1);
                grid.tbs_selectedRange(startRowIndex, lastRowIndex, startCellIndex, minCellIndex);
            }
        }
        else if (type == 'down') { //아래로
            grid.tbs_setBarPositionByDirection('down');
            if (lastRowIndex < (grid.data_panel30.length - 1)) {
                lastRowIndex += 1;

                grid.tbs_clearRange(0, -1);
                grid.tbs_selectedRange(startRowIndex, lastRowIndex, startCellIndex,lastCellIndex);
            }
            else flagDown = false;
        }
        else if (type == 'up') { //위로
            grid.tbs_setBarPositionByDirection('up');
            if (grid.fixedRowIndex != -1) {
                if (lastRowIndex != 0) {
                    let minRowIndex= lastRowIndex;
                    minRowIndex = grid.tbs_getMinRowIndexByMouseMove();

                    grid.tbs_clearRange(0, -1);
                    grid.tbs_selectedRange(startRowIndex, minRowIndex, startCellIndex, lastCellIndex);
                }
                else flagUp = false;
            }
            else {
                if (lastRowIndex != 0) {
                    let minRowIndex= lastRowIndex;
                    minRowIndex = grid.tbs_getMinRowIndexByMouseMove();

                    grid.tbs_clearRange(0, -1);
                    grid.tbs_selectedRange(startRowIndex, minRowIndex, startCellIndex, lastCellIndex);
                }
                else flagUp = false;
            }
        }
    }
    const doInterval = function(type) {
        if (flagLeft) {
            flagUp      = false;
            flagDown    = false;
            //flagLeft  = false;
            flagRight   = false;
            setTimeout(() => doInterval('left'), 15);
            setPanelMove('left');
        }
        if (flagRight) {
            flagUp      = false;
            flagDown    = false;
            flagLeft    = false;
            //flagRight = false;
            setTimeout(() => doInterval('right'), 15);
            setPanelMove('right');
        }
        if (flagUp) {
            //flagUp    = false;
            flagDown    = false;
            flagLeft    = false;
            flagRight   = false;
            setTimeout(() => doInterval('up'), 5);
            setPanelMove('up');
        }
        if (flagDown) {
            flagUp      = false;
            //flagDown  = false;
            flagLeft    = false;
            flagRight   = false;
            setTimeout(() => doInterval('down'), 5);
            setPanelMove('down');
        }
    }

    eventPanel.addEventListener('mousedown', mouseDownEvent);
}

