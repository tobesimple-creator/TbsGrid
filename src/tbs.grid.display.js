/**
 * tbs.grid.column.js
 *
 */
TbsGrid.prototype.tbs_display = function (panelArray, topRowIndex) {
    let selector = '#' + this.gridId;
    let grid = this;

    this.tbs_displayPanel20(topRowIndex);
    this.tbs_displayPanel30(topRowIndex);
    this.tbs_displayPanel40('panel40', this.topColumns);
    this.tbs_displayPanel50('panel50', this.footerColumns);
    this.tbs_displayPanel60(topRowIndex);
}
TbsGrid.prototype.tbs_displayPanel = function (panel, topRowIndex) {
    let selector = '#' + this.gridId;
    let grid = this;
    // // param : {panel: panel, topRowIndex: topRowIndex}
    // let arrayPanel1 = ['panel21', 'panel31', 'panel41', 'panel51', 'panel61'];
    // let arrayPanel2 = ['panel22', 'panel32', 'panel42', 'panel52', 'panel62'];
    // let arrayPanel3 = ['panel20', 'panel30', 'panel40', 'panel50', 'panel60'];
    //
    // // content : left
    // if (arrayPanel1.indexOf(param.panelName) > 0) {
    //     this.tbs_displayPanel20(param);
    // }
    // // content : frozen
    // else if (arrayPanel2.indexOf(param.panelName) > 0) {
    //     this.tbs_displayPanel20(param);
    // }
    // // content : main
    // else if (arrayPanel3.indexOf(param.panelName) > 0) {
    //     this.tbs_displayPanel20(param)
    // }
}
TbsGrid.prototype.tbs_displayPanel20 = function() {
    let selector = '#' + this.gridId;
    let grid = this;

    //this.tbs_setDataTable({panelName: 'panel21'});
    //this.tbs_setDataTable({panelName: 'panel22'});
    this.tbs_setDataTable({panelName: 'panel20'});

    //this.tbs_displayHeaderDataFixCol();
}
TbsGrid.prototype.tbs_displayPanel30 = function (topRowIndex) {
    let selector = '#' + this.gridId;
    let grid = this;

    this.tbs_clearSelection('panel30');

    this.tbs_setDataTable({ panelName: 'panel31', topRowIndex : topRowIndex });
    this.tbs_setDataTable({ panelName: 'panel30', topRowIndex : topRowIndex });
    this.tbs_setDataTable({ panelName: 'panel32', topRowIndex : topRowIndex });

    this.tbs_displayPanel60(0);
    //this.tbs_displaySelectedLine();
}
TbsGrid.prototype.tbs_displayPanel30_merge = function (topRowIndex) {
    //=============================================================
    // panel31, panel32, panel30 display
    //=============================================================
    let selector = '#' + this.gridId;
    let grid = this;

    let rowHeight = this.rowHeight;
    let count = this.data_panel30.length;
    topRowIndex = this.tbs_validateTopRowIndex('panel30', topRowIndex);

    let pageRowCount = this.pageRowCount;
    let columns = this.columns;
    //============================================================= left, content
    document.querySelectorAll(selector + ' .tbs-grid-cell-start').forEach(function (cell) {
        cell.classList.remove('tbs-grid-cell-start');
    });
    document.querySelectorAll(selector + ' .tbs-grid-cell-select').forEach(function (cell) {
        cell.classList.remove('tbs-grid-cell-select');
    });
    if (this.groupColumns.length > 0){
        document.querySelectorAll(selector + ' [class*=tbs-grid-sum-background]').forEach(function (cell) {
            for (let i = 0; i < 20; i++) cell.classList.remove('tbs-grid-sum-background' + i.toString());
            cell.classList.remove('tbs-grid-sum-background');
        });
    }
    //============================================================= table display
    let trList31= document.querySelectorAll(selector + ' .tbs-grid-panel31 .tbs-grid-table tbody tr');
    let trList32= document.querySelectorAll(selector + ' .tbs-grid-panel32 .tbs-grid-table tbody tr');
    let trList30= document.querySelectorAll(selector + ' .tbs-grid-panel30 .tbs-grid-table tbody tr');
    //============================================================= column width
    //let thList30  = document.querySelectorAll(selector + ' .tbs-grid-panel30 thead th');
    //let thList32 = document.querySelectorAll(selector + ' .tbs-grid-panel32 thead th');
    //for (let x = 0, len = this.columns.length; x < len; x++) {
    // 	if (this.fixedColumnIndex != -1) thList32[x].style.width = parseInt(this.columns[x].column_width);
    // 	thList30[x].style.width = parseInt(this.columns[x].column_width) + 'px';
    //}
    //=============================================================
    let arr = this.tbs_getDisplayedHeaderColumn();
    let startColumnIndex = arr[0];
    let lastColumnIndex  = arr[1];
    //=============================================================
    count = topRowIndex + pageRowCount;
    let viewCount = this.data_panel30.length;
    if (count > viewCount) count = viewCount;
    //=============================================================
    if (this.merge){
        for (let i = topRowIndex; i < count; i++) {
            for(let x = 0, len2 = grid.columns.length; x < len2; x++){
                let layout = grid.data_panel30[i].layout[grid.tbs_getColumnId(x)];

                if (i == topRowIndex && layout[grid.layout_rowspan] != layout[grid.layout_subrowspan]) {
                    //layout[grid.layout_rowspan] = layout.layout_subRowspan;
                    layout[grid.layout_visible] = false;
                }
            }
        }
    }
    //============================================================= left, content data display
    let i = 0;
    for (let ri = topRowIndex; ri < count; ri++) {
        if (ri > viewCount - 1) break;

        let tr31 = trList31[i];
        let tr32 = trList32[i]
        let tr30 = trList30[i];

        let row = this.data_panel30[ri];

        if (tr31.style.display == 'none') tr31.style.display = '';
        if (tr31.style.height  != this.rowHeight + 'px') tr31.style.height = rowHeight + 'px';
        if (tr30.style.height  != this.rowHeight + 'px') tr30.style.height = rowHeight + 'px';

        tr31.classList.remove('tbs-grid-tr-bg','tbs-grid-tr-bg2');
        tr30.classList.remove('tbs-grid-tr-bg','tbs-grid-tr-bg2');
        //============================================================= row alternative background color
        if (!this.merge) {
            if (ri % 2) {
                tr31.classList.add('tbs-grid-tr-bg2');
                tr30.classList.add('tbs-grid-tr-bg2');
            }
            else {
                tr31.classList.add('tbs-grid-tr-bg');
                tr30.classList.add('tbs-grid-tr-bg');
            }
        }
        //============================================================= pane31, panel32
        if (this.fixedColumnIndex != -1 && tr32.style.height != this.rowHeight + 'px') tr32.style.height  = rowHeight + 'px';
        let td31 = tr31.childNodes[0];
        td31.dataset.rowIndex = ri;

        let selectedValue = this.tbs_isSelectedCell31(ri, 0);
        if (selectedValue == 1) td31.classList.add('tbs-grid-cell-select');

        if (td31.childNodes[0].textContent != (ri + 1).toString()) td31.childNodes[0].textContent = (ri + 1).toString();
        if (this.options[grid.option_rowMode]) {
            tr31.childNodes[1].childNodes[0].textContent = (row['mode'] != '' && row['mode'] != 'S') ? row['mode'] : '';
        }
        if (this.options[grid.option_checkbox]) {
            tr31.childNodes[2].childNodes[0].childNodes[0].checked = (row['check'] == undefined) ? false : row['check'];
        }
        //=============================================================
        if (tr30.style.display == 'none') tr30.style.display = '';
        if (this.fixedColumnIndex != -1 && tr32.style.display == 'none') tr32.style.display = '';
        //=============================================================
        if (this.merge && row['mode'] == 'S' && row['colorDepth'] != undefined) {
            tr30.classList.add('tbs-grid-sum-background' + row['colorDepth'].toString());
            if (this.fixedColumnIndex != -1) tr32.classList.add('tbs-grid-sum-background' + row['colorDepth'].toString());
        }
        //============================================================= panel30
        for (let x = 0; x <= lastColumnIndex; x++) {
            let td = tr30.childNodes[x]; //content tr > td

            if (this.fixedColumnIndex != -1) {
                if(x > this.fixedColumnIndex && x < startColumnIndex) continue;
                if (x <= this.fixedColumnIndex) td = tr32.childNodes[x];
            }
            else { if(x < startColumnIndex) continue; }
            let column = this.columns[x];

            let layout = this.data_panel30[ri].layout[column[grid.column_id]];
            let colValue = this.tbs_getLayoutData(ri, column[grid.column_id], this.layout_text);

            let selectedValue = this.tbs_isSelectedCell30(ri, x); //new
            if (td.style.textAlign != column[grid.column_align]) td.style.textAlign = column[grid.column_align];
            if (td.style.width != column[grid.column_width] + 'px') td.style.width = column[grid.column_width] + 'px';
            if (td.style.backgroundImage != '') td.style.backgroundImage = '';
            if (td.style.display != '') td.style.display = '';
            if (td.rowSpan != '1') td.rowSpan = '1';
            td.style.display = (layout[grid.layout_visible] == true) ? '' : 'none';
            //============================================================= merge
            if (this.merge){
                if (this.mergeType == 1){
                    if (i == 0 && layout[grid.layout_rowspan] != layout[grid.layout_subrowspan]) {
                        td.rowSpan = layout[grid.layout_subrowspan];
                        td.style.display = '';
                    }
                    else {
                        td.rowSpan = layout[grid.layout_rowspan];
                        td.style.display = (layout[grid.layout_visible] == true) ? '' : 'none';
                    }
                }
                if (this.mergeType == 2){
                    if (i == 0) colValue = this.tbs_getValue(ri, column[grid.column_id]);
                    if (layout.mergeClass != undefined && layout.mergeClass != '') td.classList.add(layout.mergeClass);
                    else td.classList.remove('tbs-grid-cell-bottom-none');
                }
                if (this.mergeType == 4){
                    if (i == 0) colValue = this.tbs_getValue(ri, column[grid.column_id]);
                    if (layout.mergeClass != undefined && layout.mergeClass != '') td.classList.add(layout.mergeClass);
                    else td.classList.remove('tbs-grid-cell-bottom-none');
                }
                if (this.mergeType == 5){
                    if (i == 0) {
                        td.rowSpan = layout[grid.layout_subrowspan];
                        td.style.display = '';
                    }
                    else {
                        td.rowSpan = layout[grid.layout_rowspan];
                        td.style.display = (layout[grid.layout_visible] == true) ? '' : 'none';
                    }
                }
            }
            else {
                td.style.display = (layout[grid.layout_visible] == true) ? '' : 'none';
                td.rowSpan = layout[grid.layout_rowspan];
            }
            //============================================================= merge
            if (this.merge) {
                if (td.style.backgroundImage != '') td.style.backgroundImage = '';
                if (this.mergeType == 1 || this.mergeType == 5) { //mergeType : 3
                    if (i == 0) {
                        if (td.rowSpan > 1) {
                            let arr = [];
                            for (let xx = 0; xx < td.rowSpan; xx++) {
                                let s = this.tbs_isSelectedCell30(ri + xx, x);
                                if (s == 1) arr.push(ri + xx);
                            }
                            td.style.backgroundImage = 'url("/js_wdt/img/select.png")';
                            td.style.backgroundPosition = '0px ' + this.rowHeight * (arr[0] - ri) + 'px';
                            td.style.backgroundRepeat = 'no-repeat';
                            td.style.backgroundSize = '1000px ' + this.rowHeight * arr.length + 'px';
                        }
                    }
                    else {
                        if (layout[grid.layout_visible] == false) { td.style.display = 'none'; }
                        else {
                            let arr = [];
                            for (let xx = 0; xx < td.rowSpan; xx++) {
                                let s = this.tbs_isSelectedCell30(ri + xx, x);
                                if (s == 1) arr.push(ri + xx);
                            }
                            td.style.backgroundImage = 'url("/js_wdt/img/select.png")';
                            td.style.backgroundPosition = '0px ' + this.rowHeight * (arr[0] - ri) + 'px';
                            td.style.backgroundRepeat = 'no-repeat';
                            td.style.backgroundSize = '1000px ' + this.rowHeight * arr.length + 'px';
                        }
                    }
                }
            }
            //============================================================= (end)
            if (selectedValue == 1) {
                if (this.startRowIndex == ri && this.startCellIndex == x) {
                    td.classList.add('tbs-grid-cell-start');
                }
                else td.classList.add('tbs-grid-cell-select');
            }
            if (td.childNodes[0].textContent != colValue) td.childNodes[0].textContent = colValue;
            //============================================================= fixed col
        }
        for (let x = 0; x <= lastColumnIndex; x++) {
            let td = tr30.childNodes[x];
            if (this.fixedColumnIndex != -1 && x <= this.fixedColumnIndex) {
                if(td.style.display != 'none') td.style.display = 'none';
            }
        }
        i += 1;
    }
    //=============================================================
    let startCount = i;
    for (let i = startCount, len = this.pageRowCount; i < len; i++) {
        let tr31 = trList31[i];
        let tr30 = trList30[i];
        let tr32 = trList32[i];

        if (tr31.style.display != 'none') tr31.style.display = 'none';
        if (tr30.style.display != 'none') tr30.style.display = 'none';
        if (this.fixedColumnIndex != -1 && tr32.style.display != 'none') tr32.style.display = 'none';
    }
    //=============================================================
    if (document.querySelector(selector + ' .tbs-grid-panel21 td div').textContent != this.data_panel30.length) //total
        document.querySelector(selector + ' .tbs-grid-panel21 td div').textContent = this.data_panel30.length
    //============================================================= selectLine
    this.tbs_displayPanel60(topRowIndex);
    this.tbs_displaySelectedLine();
}
TbsGrid.prototype.tbs_displayPanel40 = function (panel, summaryColumns) {
    let selector = '#' + this.gridId;
    let grid = this;
    this.tbs_setDataTable({panelName: 'panel40', summaryColumns: summaryColumns});
}
TbsGrid.prototype.tbs_displayPanel50 = function (panel, summaryColumns) {
    let selector = '#' + this.gridId;
    let grid = this;
    this.tbs_setDataTable({panelName: 'panel50', summaryColumns: summaryColumns});
}
TbsGrid.prototype.tbs_displayPanel60 = function (topRowIndex) {
    let selector = '#' + this.gridId;
    let grid = this;

    this.tbs_clearSelection('panel60');

    this.tbs_setDataTable({ panelName: 'panel61', topRowIndex : topRowIndex });
    this.tbs_setDataTable({ panelName: 'panel60', topRowIndex : topRowIndex });
    this.tbs_setDataTable({ panelName: 'panel62', topRowIndex : topRowIndex });
}
TbsGrid.prototype.tbs_getSFirstelectedTableCell = function (panelName) {
    let selector = '#' + this.gridId;
    let grid = this;

    let startCell;

    let startRowIndex  = this._startRowIndex ;
    let rowIndex1 = grid.tbs_getFirstRowIndex();
    let rowIndex2 = grid.tbs_getLastRowIndex();

    if (startRowIndex < rowIndex1) startRowIndex = rowIndex1;

    let tableRows31= document.querySelectorAll(selector + ' .tbs-grid-panel31 .tbs-grid-table tbody tr:not([style*="display: none"])');
    let tableRows= document.querySelectorAll(selector + ' .tbs-grid-' + panelName + ' .tbs-grid-table tbody tr:not([style*="display: none"])');

    for (let i = 0, len = tableRows31.length; i < len; i++) {
        if (startCell != undefined) break;
        let tableRow31 = tableRows31[i];
        let tableRow30 = tableRows[i];

        let rowIndex = tableRow31.childNodes[0].dataset.rowIndex;
        if (rowIndex == startRowIndex) {
            for (let x = 0; x < this.columns.length; x++) {
                let tableCell = tableRow30.childNodes[x];
                if (tableCell.classList.contains('tbs-grid-cell-start') || tableCell.classList.contains('tbs-grid-cell-select')) {
                    startCell = tableCell;
                    break;
                }
            }
        }
    }
    return startCell;
}
TbsGrid.prototype.tbs_getLastSelectedTableCell = function (panelName) {
    let selector = '#' + this.gridId;
    let grid = this;

    let lastCell;

    let lastRowIndex   = this._lastRowIndex  ;

    let rowIndex1 = grid.tbs_getFirstRowIndex();
    let rowIndex2 = grid.tbs_getLastRowIndex();

    if (lastRowIndex  > rowIndex2) lastRowIndex = rowIndex2;

    let tableRows31= document.querySelectorAll(selector + ' .tbs-grid-panel31 .tbs-grid-table tbody tr:not([style*="display: none"])');
    let tableRows= document.querySelectorAll(selector + ' .tbs-grid-' + panelName + ' .tbs-grid-table tbody tr:not([style*="display: none"])');

    for (let i = tableRows31.length - 1; i >= 0n; i--) {
        if (lastCell != undefined) break;
        let tableRow31 = tableRows31[i];
        let tableRow30 = tableRows[i];

        let rowIndex = tableRow31.childNodes[0].dataset.rowIndex;
        if (rowIndex == lastRowIndex) {
            for (let x = this.columns.length - 1; x >= 0; x--) {
                let tableCell = tableRow30.childNodes[x];
                if (tableCell.classList.contains('tbs-grid-cell-start') || tableCell.classList.contains('tbs-grid-cell-select')) {
                    lastCell = tableCell;
                    break;
                }
            }
        }
    }
    return lastCell;
}
TbsGrid.prototype.tbs_clearSelectedLine = function () {
    this.topLineDiv.style    = 'width :0px;top:0px;left:0px;';
    this.leftLineDiv.style   = 'height:0px;top:0px;left:0px;';
    this.bottomLineDiv.style = 'width :0px;top:0px;left:0px;';
    this.rightLineDiv.style  = 'height:0px;top:0px;left:0px;';
}
TbsGrid.prototype.tbs_setSelectedLine = function (lineWidth, lineHeight, rectTop, rectBottom, rectLeft, rectRight) {
    this.topLineDiv.style    = 'width:'  + lineWidth        + 'px;top:' + rectTop     + 'px;left:' + rectLeft  + 'px;';
    this.leftLineDiv.style   = 'height:' + lineHeight       + 'px;top:' + rectTop     + 'px;left:' + rectLeft  + 'px;';
    this.rightLineDiv.style  = 'height:' + (lineHeight + 1) + 'px;top:' + rectTop     + 'px;left:' + rectRight + 'px;';
    this.bottomLineDiv.style = 'width:'  + lineWidth        + 'px;top:' + rectBottom  + 'px;left:' + rectLeft  + 'px;';
}
TbsGrid.prototype.tbs_displaySelectedLine = function () {
    return;
    let selector = '#' + this.gridId;
    let grid = this;

    if (grid.fixedColumnIndex != -1 && grid.fixedRowIndex != -1) { }
    else if (grid.fixedColumnIndex != -1) {
        let tableRows30= document.querySelectorAll(selector + ' .tbs-grid-panel30 .tbs-grid-table tbody tr:not([style*="display: none"])');
        if (grid.tbs_getRowCount() == 0) return;

        let fixedColumnIndex = this.fixedColumnIndex;
        let startCell = grid.tbs_getSFirstelectedTableCell('panel32');
        if (startCell == undefined) startCell = grid.tbs_getSFirstelectedTableCell('panel30');

        let lastCell  = grid.tbs_getLastSelectedTableCell('panel30');
        if (lastCell == undefined) lastCell  = grid.tbs_getLastSelectedTableCell('panel32');

        if (startCell == undefined || lastCell == undefined) { grid.tbs_clearSelectedLine(); return; }
        //console.dir(lastCell);
        //console.log(`startCell.cellIndex : ${startCell.cellIndex} / lastCell.cellIndex : ${lastCell.cellIndex}`);
        // startCell Rect
        // lastCell Rect
        let startCellIndex = startCell.cellIndex;
        let lastCellIndex  = lastCell.cellIndex;

        let rectMain   = document.querySelector(selector + ' .tbs-grid-main').getBoundingClientRect();
        let rectTable31= document.querySelector(selector + ' .tbs-grid-panel31 .tbs-grid-table').getBoundingClientRect();
        let rectWrap   = document.querySelector(selector + ' .tbs-grid-wrap').getBoundingClientRect();
        let rectPanel30= document.querySelector(selector + ' .tbs-grid-panel30').getBoundingClientRect();

        let startRect= startCell.getBoundingClientRect();
        let lastRect = lastCell.getBoundingClientRect();

        let beforeLeft = rectTable31.left;

        let rectTop   = startRect.top  - rectMain.top;
        let rectBottom= lastRect.top  - rectMain.top + lastRect.height;

        let rectLeft  = startRect.left - beforeLeft;
        let rectRight = lastRect.left  - beforeLeft + lastRect.width;

        let rectPanelLeft  = (startCellIndex <= fixedColumnIndex) ?  rectLeft : rectPanel30.left  - rectTable31.left;
        let rectPanelBottom= rectPanel30.top   - rectMain.top      + rectPanel30.height;
        let rectPanelRight = rectPanel30.left  - rectTable31.left  + rectPanel30.width;

        // case outside line
        if (rectLeft   <= rectPanelLeft)   rectLeft   = rectPanelLeft;
        if (rectBottom >= rectPanelBottom) rectBottom = rectPanelBottom - 2;
        if (rectRight  >= rectPanelRight)  rectRight  = rectPanelRight;

        let lineHeight= rectBottom - rectTop;
        let lineWidth = rectRight - rectLeft;
        grid.tbs_setSelectedLine(lineWidth, lineHeight, rectTop, rectBottom, rectLeft, rectRight);
    }
    else {
        let tableRows30= document.querySelectorAll(selector + ' .tbs-grid-panel30 .tbs-grid-table tbody tr:not([style*="display: none"])');
        if (grid.tbs_getRowCount() == 0) return;

        let startCell = grid.tbs_getSFirstelectedTableCell('panel30');
        let lastCell = grid.tbs_getLastSelectedTableCell('panel30');

        if (startCell == undefined || lastCell == undefined) { grid.tbs_clearSelectedLine(); return; }

        let rectMain = document.querySelector(selector + ' .tbs-grid-main').getBoundingClientRect();
        let rectTable31 = document.querySelector(selector + ' .tbs-grid-panel31 .tbs-grid-table').getBoundingClientRect();
        let rectPanel30 = document.querySelector(selector + ' .tbs-grid-panel30').getBoundingClientRect();

        let startRect = startCell.getBoundingClientRect();
        let lastRect = lastCell.getBoundingClientRect();

        let rectTop   = startRect.top  - rectMain.top;
        let rectLeft  = startRect.left - rectTable31.left;
        let rectBottom= lastRect.top  - rectMain.top     + lastRect.height;
        let rectRight = lastRect.left - rectTable31.left + lastRect.width;

        let rectPanelLeft  = rectPanel30.left  - rectTable31.left;
        let rectPanelBottom= rectPanel30.top   - rectMain.top      + rectPanel30.height;
        let rectPanelRight = rectPanel30.left  - rectTable31.left  + rectPanel30.width;

        // case outside line
        if (rectLeft   <= rectPanelLeft)   rectLeft   = rectPanelLeft;
        if (rectBottom >= rectPanelBottom) rectBottom = rectPanelBottom - 2;
        if (rectRight  >= rectPanelRight)  rectRight  = rectPanelRight;

        let lineHeight= rectBottom - rectTop;
        let lineWidth = rectRight - rectLeft;

        grid.tbs_setSelectedLine(lineWidth, lineHeight, rectTop, rectBottom, rectLeft, rectRight);
    }
}
TbsGrid.prototype.tbs_displaySelectedLineFixCol = function() {
    let selector = '#' + this.gridId;
    let grid = this;

    let rowArray = [];
    let colArray = [];
    //=============================================================
    let column = this.columns;
    let contentRect      = document.querySelector(selector + ' .tbs-grid-panel30').getBoundingClientRect();
    let contentTableRect = document.querySelector(selector + ' .tbs-grid-panel30 > table').getBoundingClientRect();
    let contentTableLeft = parseInt(document.querySelector(selector + ' .tbs-grid-panel30 > table').style.left, 10);

    let tbsGridDiv = document.querySelector(selector + ' .tbs-grid-main');
    let gridRect = tbsGridDiv.getBoundingClientRect();

    let startColIndex = 0;
    let lastColIndex  = column.length - 1;

    let accWidth = 0;
    for (let i = this.fixedColumnIndex + 1, len = column.length; i < len; i++) {
        accWidth += parseInt(column[i][grid.column_width]);
        if (accWidth + contentTableLeft > 0) { startColIndex = i; break; }
    }
    accWidth = contentTableRect.width;
    for (let i = column.length - 1; i >= 0; i--) {
        accWidth -= parseInt(column[i][grid.column_width]);
        if (accWidth + contentTableLeft < contentRect.width) { lastColIndex = i; break; }
    }
    //============================================================= rowArray, colArray create
    let startRowIndex = this.tbs_getFirstRowIndex();
    let lastRowIndex  = this.tbs_getLastRowIndex();
    for (let i = startRowIndex; i <= lastRowIndex; i++) {
        for (let x = this._startRowIndex ; x <= this._lastRowIndex;  x++)	if (i == x) rowArray.push(x);
    }
    for (let x = this._startCellIndex; x <= this._lastCellIndex; x++)	{

        if (startColIndex <= x && x <= lastColIndex) colArray.push(x);
        else if (this.fixedColumnIndex >= x) colArray.push(x);
    }
    //=============================================================
    if (!(rowArray.length > 0 && colArray.length > 0)) {
        this.topLineDiv.style    = 'width :0px;top:0px;left:0px;';
        this.leftLineDiv.style   = 'height:0px;top:0px;left:0px;';
        this.bottomLineDiv.style = 'width :0px;top:0px;left:0px;';
        this.rightLineDiv.style  = 'height:0px;top:0px;left:0px;';
        return;
    }
    //============================================================= fixBottom, content active
    let activefixBottom = false; //fixBottom selectColIndex
    let activeContent   = false; //content selectColIndex
    for (let x = 0, len = colArray.length; x < len; x++){
        if (colArray[x] <= this.fixedColumnIndex) { activefixBottom = true; break; }
    }
    for (let x = 0, len = colArray.length; x < len; x++){
        if (colArray[x] > this.fixedColumnIndex) { activeContent = true; break; }
    }
    //=============================================================
    let width = 0;
    let trHeaderList  = document.querySelectorAll(selector + ' .tbs-grid-panel20 tbody tr');
    let trFixTopList  = document.querySelectorAll(selector + ' .tbs-grid-panel22 tbody tr');
    let trLeftList    = document.querySelectorAll(selector + ' .tbs-grid-panel31   tbody tr');
    //============================================================= if (activefixBottom && activeContent)
    if (activefixBottom && activeContent) {
        let startCell = trFixTopList[0].childNodes[colArray[0]];
        let startCellRect = startCell.getBoundingClientRect();
        let lastCellRect  = trHeaderList[0].childNodes[colArray[colArray.length - 1]].getBoundingClientRect();

        if (this.headerRowCount > 1) {
            for (let i = this.headerRowCount - 1; i >= 0; i--) {
                if (trFixTopList[i].childNodes[colArray[0]].dataset.id != '') {
                    startCellRect = trFixTopList[i].childNodes[colArray[0]].getBoundingClientRect();
                    break;
                }
            }
            for (let i = this.headerRowCount - 1; i >= 0; i--) {
                if (trHeaderList[i].childNodes[colArray[colArray.length - 1]].dataset.id != '') {
                    lastCellRect = trHeaderList[i].childNodes[colArray[colArray.length - 1]].getBoundingClientRect();
                    break;
                }
            }
        }
        let leftCellRect   = this.tbs_getLeftTableCell(rowArray[0]).getBoundingClientRect();
        let width = lastCellRect.right - startCellRect.left;
        let height = rowArray.length * this.rowHeight;

        let startCellTop  = leftCellRect.top   - gridRect.top  - 1;
        let startCellLeft = startCellRect.left - gridRect.left - 1;

        //============================================================= option
        if (colArray[colArray.length - 1] == lastColIndex) {
            if (lastCellRect.right > contentRect.right) width -= Math.abs(lastCellRect.right - contentRect.right);
        }

        let defaultHeight = document.querySelector(selector + ' .tbs-grid-panel20').getBoundingClientRect().height;
        if (this.topColumns.length > 0) defaultHeight += document.querySelector(selector + ' .tbs-grid-panel40').getBoundingClientRect().height;
        if ((startCellTop + height - defaultHeight) > contentRect.height) height -= Math.abs((startCellTop + height - defaultHeight) - contentRect.height);

        //=============================================================
        let lastCellTop  = startCellTop  + height;
        let lastCellLeft = startCellLeft + width;
        //============================================================= line drawing
        if (width <= 3 || height <= 3) {
            this.topLineDiv.style    = 'width:0px;top:0px;left:0px;';	 //topLineDiv(absolute) left tbs-grid(relative)
            this.leftLineDiv.style   = 'height:0px;top:0px;left:0px;';
            this.bottomLineDiv.style = 'width:0px;top:0px;left:0px;';
            this.rightLineDiv.style  = 'height:0px;top:0px;left:0px;';
        }
        else {
            this.topLineDiv.style    = 'width:'  + width       + 'px;top:' + startCellTop + 'px;left:' + startCellLeft + 'px;';
            this.leftLineDiv.style   = 'height:' + height      + 'px;top:' + startCellTop + 'px;left:' + startCellLeft + 'px;';
            this.rightLineDiv.style  = 'height:' + (height + 1)+ 'px;top:' + startCellTop + 'px;left:' + lastCellLeft  + 'px;';
            this.bottomLineDiv.style = 'width:'  + width       + 'px;top:' + lastCellTop  + 'px;left:' + startCellLeft + 'px;';
        }
    }
    //============================================================= else if (activefixBottom) {
    else if (activefixBottom) {
        let trHeaderList  = document.querySelectorAll(selector + ' .tbs-grid-panel22 tbody tr');
        for (let x = colArray[0]; x <= colArray[colArray.length - 1]; x++) width += parseInt(this.columns[x][grid.column_width]);
        let startCell = trHeaderList[0].childNodes[colArray[0]];
        let startCellRect = startCell.getBoundingClientRect();
        let lastCellRect  = trHeaderList[0].childNodes[colArray[colArray.length - 1]].getBoundingClientRect();

        if (this.headerRowCount > 1) {
            for (let i = this.headerRowCount - 1; i >= 0; i--) {
                if (trHeaderList[i].childNodes[colArray[0]].dataset.id != '') {
                    startCellRect = trHeaderList[i].childNodes[colArray[0]].getBoundingClientRect();
                    break;
                }
            }
            for (let i = this.headerRowCount - 1; i >= 0; i--) {
                if (trHeaderList[i].childNodes[colArray[colArray.length - 1]].dataset.id != '') {
                    lastCellRect = trHeaderList[i].childNodes[colArray[colArray.length - 1]].getBoundingClientRect();
                    break;
                }
            }
        }
        let leftCellRect   = this.tbs_getLeftTableCell(rowArray[0]).getBoundingClientRect();

        let height = rowArray.length * this.rowHeight;

        let startCellTop  = leftCellRect.top   - gridRect.top  - 1;
        let startCellLeft = startCellRect.left - gridRect.left - 1;
        //============================================================= option

        let defaultHeight = document.querySelector(selector + ' .tbs-grid-panel20').getBoundingClientRect().height;
        if (this.topColumns.length > 0) defaultHeight += document.querySelector(selector + ' .tbs-grid-panel40').getBoundingClientRect().height;
        if ((startCellTop + height - defaultHeight) > contentRect.height) height -= Math.abs((startCellTop + height - defaultHeight) - contentRect.height);

        //=============================================================
        let lastCellTop  = startCellTop  + height;
        let lastCellLeft = startCellLeft + width;
        //============================================================= line drawing
        if (width <= 3 || height <= 3) {
            this.topLineDiv.style    = 'width:0px;top:0px;left:0px;';	 //topLineDiv(absolute) left tbs-grid(relative)
            this.leftLineDiv.style   = 'height:0px;top:0px;left:0px;';
            this.bottomLineDiv.style = 'width:0px;top:0px;left:0px;';
            this.rightLineDiv.style  = 'height:0px;top:0px;left:0px;';
        }
        else {
            this.topLineDiv.style    = 'width:'  + width       + 'px;top:' + startCellTop + 'px;left:' + startCellLeft + 'px;';
            this.leftLineDiv.style   = 'height:' + height      + 'px;top:' + startCellTop + 'px;left:' + startCellLeft + 'px;';
            this.rightLineDiv.style  = 'height:' + (height + 1)+ 'px;top:' + startCellTop + 'px;left:' + lastCellLeft  + 'px;';
            this.bottomLineDiv.style = 'width:'  + width       + 'px;top:' + lastCellTop  + 'px;left:' + startCellLeft + 'px;';
        }
    }
    //============================================================= else if (activeContent) {
    else if (activeContent) {
        for (let x = colArray[0]; x <= colArray[colArray.length - 1]; x++) width += parseInt(this.columns[x].width);
        let startCell = trHeaderList[0].childNodes[colArray[0]];
        let startCellRect = startCell.getBoundingClientRect();
        let lastCellRect  = trHeaderList[0].childNodes[colArray[colArray.length - 1]].getBoundingClientRect();

        if (this.headerRowCount > 1) {
            for (let i = this.headerRowCount - 1; i >= 0; i--) {
                if (trHeaderList[i].childNodes[colArray[0]].dataset.id != '') {
                    startCellRect = trHeaderList[i].childNodes[colArray[0]].getBoundingClientRect();
                    break;
                }
            }
            for (let i = this.headerRowCount - 1; i >= 0; i--) {
                if (trHeaderList[i].childNodes[colArray[colArray.length - 1]].dataset.id != '') {
                    lastCellRect = trHeaderList[i].childNodes[colArray[colArray.length - 1]].getBoundingClientRect();
                    break;
                }
            }
        }
        let leftCellRect   = this.tbs_getLeftTableCell(rowArray[0]).getBoundingClientRect();

        let height = rowArray.length * this.rowHeight;

        let startCellTop  = leftCellRect.top   - gridRect.top  - 1;
        let startCellLeft = startCellRect.left - gridRect.left - 1;

        //============================================================= option
        if (colArray[0] == startCell.cellIndex) {
            if (startCellRect.left < contentRect.left) {
                width -= Math.abs(startCellRect.left - contentRect.left);
                startCellLeft = startCellRect.left - gridRect.left + Math.abs(startCellRect.left - contentRect.left);
            }
        }
        if (colArray[colArray.length - 1] == lastColIndex) {
            if (lastCellRect.right > contentRect.right) width -= Math.abs(lastCellRect.right - contentRect.right);
        }

        let defaultHeight = document.querySelector(selector + ' .tbs-grid-panel20').getBoundingClientRect().height;
        if (this.topColumns.length > 0) defaultHeight += document.querySelector(selector + ' .tbs-grid-panel40').getBoundingClientRect().height;
        if ((startCellTop + height - defaultHeight) > contentRect.height) height -= Math.abs((startCellTop + height - defaultHeight) - contentRect.height);

        //=============================================================
        let lastCellTop  = startCellTop  + height;
        let lastCellLeft = startCellLeft + width;
        //============================================================= line drawing
        if (width <= 3 || height <= 3) {
            this.topLineDiv.style    = 'width:0px;top:0px;left:0px;';	 //topLineDiv(absolute) left tbs-grid(relative)
            this.leftLineDiv.style   = 'height:0px;top:0px;left:0px;';
            this.bottomLineDiv.style = 'width:0px;top:0px;left:0px;';
            this.rightLineDiv.style  = 'height:0px;top:0px;left:0px;';
        }
        else {
            this.topLineDiv.style    = 'width:'  + width       + 'px;top:' + startCellTop + 'px;left:' + startCellLeft + 'px;';
            this.leftLineDiv.style   = 'height:' + height      + 'px;top:' + startCellTop + 'px;left:' + startCellLeft + 'px;';
            this.rightLineDiv.style  = 'height:' + (height + 1)+ 'px;top:' + startCellTop + 'px;left:' + lastCellLeft  + 'px;';
            this.bottomLineDiv.style = 'width:'  + width       + 'px;top:' + lastCellTop  + 'px;left:' + startCellLeft + 'px;';
        }
    }
    else return;
    //=============================================================
}
TbsGrid.prototype.tbs_displaySelectedLineFixRow = function() {
    let selector = '#' + this.gridId;
    let grid = this;

    let rowArray = [];
    let colArray = [];
    //============================================================= find view area / rowArray와 colArray
    let contentRect      = document.querySelector(selector + ' .tbs-grid-panel30').getBoundingClientRect();
    let contentTableRect = document.querySelector(selector + ' .tbs-grid-panel30 > table').getBoundingClientRect();
    let contentTableLeft = parseInt(document.querySelector(selector + ' .tbs-grid-panel30 > table').style.left, 10);

    let tbsGridDiv = document.querySelector(selector + ' .tbs-grid-main');
    let gridRect   = tbsGridDiv.getBoundingClientRect();

    let startColIndex = 0;
    let lastColIndex  = this.columns.length - 1;

    let accWidth = 0;
    for (let i = this.fixedColumnIndex + 1, len = this.columns.length; i < len; i++) {
        accWidth += parseInt(this.columns[i].width);
        if (accWidth + contentTableLeft > 0) { startColIndex = i; break; }
    }
    accWidth = contentTableRect.width;
    for (let i = this.columns.length - 1; i >= 0; i--) {
        accWidth -= parseInt(this.columns[i].width);
        if (accWidth + contentTableLeft < contentRect.width) { lastColIndex = i; break; }
    }
    //============================================================= rowArray, colArray create
    let startRowIndex = this.tbs_getFirstRowIndex();
    let lastRowIndex  = this.tbs_getLastRowIndex();
    for (let i = 0; i <= this.fixedRowIndex; i++) {
        for (let x = this._startRowIndex ; x <= this._lastRowIndex;  x++)	if (i == x) rowArray.push(x);
    }
    if (startRowIndex <= this.fixedRowIndex) startRowIndex = this.fixedRowIndex + 1;
    for (let i = startRowIndex; i <= lastRowIndex; i++) {
        for (let x = this._startRowIndex ; x <= this._lastRowIndex;  x++)	if (i == x) rowArray.push(x);
    }
    for (let x = this._startCellIndex; x <= this._lastCellIndex; x++)	{
        if (startColIndex <= x && x <= lastColIndex) colArray.push(x);
        else if (this.fixedColumnIndex >= x) colArray.push(x);
    }
    //=============================================================
    if (rowArray.length == 0 || colArray.length == 0) {
        this.topLineDiv.style    = 'width :0px;top:0px;left:0px;';
        this.leftLineDiv.style   = 'height:0px;top:0px;left:0px;';
        this.bottomLineDiv.style = 'width :0px;top:0px;left:0px;';
        this.rightLineDiv.style  = 'height:0px;top:0px;left:0px;';
        return;
    }
    //============================================================= fixBottom, content active
    let activeFixRight  = false; //activeFixRight selectColIndex
    let activeContent   = false; //content selectColIndex
    for (let i = 0; i <= this.fixedRowIndex; i++){
        if (rowArray[i] <= this.fixedRowIndex) { activeFixRight = true; break; }
    }
    for (let i = 0, len = rowArray.length; i < len; i++){
        if (rowArray[i] >=  this.fixedRowIndex) { activeContent = true; break; }
    }

    let width = 0;
    let trHeaderList  = document.querySelectorAll(selector + ' .tbs-grid-panel20 tbody tr');
    let trContentList = document.querySelectorAll(selector + ' .tbs-grid-panel30 tbody tr');
    let trFixRightList= document.querySelectorAll(selector + ' .tbs-grid-panel60 tbody tr');
    let trLeftList    = document.querySelectorAll(selector + ' .tbs-grid-panel31 tbody tr');
    //============================================================= if (activeFixRight && activeContent)
    if (activeFixRight && activeContent) {
        let startCell     = trHeaderList[0].childNodes[colArray[0]]; //content,
        let startCellRect = startCell.getBoundingClientRect();
        let lastCellRect  = trHeaderList[0].childNodes[colArray[colArray.length - 1]].getBoundingClientRect();

        if (this.headerRowCount > 1) {
            for (let i = this.headerRowCount - 1; i >= 0; i--) {
                if (trHeaderList[i].childNodes[colArray[0]].dataset.id != '') {
                    startCellRect = trHeaderList[i].childNodes[colArray[0]].getBoundingClientRect();
                    break;
                }
            }
            for (let i = this.headerRowCount - 1; i >= 0; i--) {
                if (trHeaderList[i].childNodes[colArray[colArray.length - 1]].dataset.id != '') {
                    lastCellRect = trHeaderList[i].childNodes[colArray[colArray.length - 1]].getBoundingClientRect();
                    break;
                }
            }
        }
        let leftCellRect   = this.tbs_getLeftTableCell(rowArray[0], 'panel61').getBoundingClientRect();
        let width = lastCellRect.right - startCellRect.left;
        let height = rowArray.length * this.rowHeight;

        let startCellTop  = leftCellRect.top   - gridRect.top  - 1;
        let startCellLeft = startCellRect.left - gridRect.left - 1;

        //============================================================= option
        if (colArray[0] == startCell.cellIndex) {
            if (startCellRect.left < contentRect.left) {
                width -= Math.abs(startCellRect.left - contentRect.left);
                startCellLeft = startCellRect.left - gridRect.left + Math.abs(startCellRect.left - contentRect.left);
            }
        }
        if (colArray[colArray.length - 1] == lastColIndex) {
            if (lastCellRect.right > contentRect.right) width -= Math.abs(lastCellRect.right - contentRect.right);
        }

        let defaultHeight = document.querySelector(selector + ' .tbs-grid-panel20').getBoundingClientRect().height;
        let fixLeftHeight = parseInt(document.querySelector(selector + ' .tbs-grid-panel60').getBoundingClientRect().height);
        if (this.topColumns.length > 0) defaultHeight += document.querySelector(selector + ' .tbs-grid-panel40').getBoundingClientRect().height;
        if ((startCellTop + height - defaultHeight) > (fixLeftHeight + contentRect.height)) {
            height -= Math.abs((startCellTop + height - defaultHeight) - (fixLeftHeight + contentRect.height));
        }
        //=============================================================
        let lastCellTop  = startCellTop  + height;
        let lastCellLeft = startCellLeft + width;
        //============================================================= line drawing
        if (width <= 3 || height <= 3) {
            this.topLineDiv.style    = 'width:0px;top:0px;left:0px;';	 //topLineDiv(absolute) left tbs-grid(relative)
            this.leftLineDiv.style   = 'height:0px;top:0px;left:0px;';
            this.bottomLineDiv.style = 'width:0px;top:0px;left:0px;';
            this.rightLineDiv.style  = 'height:0px;top:0px;left:0px;';
        }
        else {
            this.topLineDiv.style    = 'width:'  + width       + 'px;top:' + startCellTop + 'px;left:' + startCellLeft + 'px;';
            this.leftLineDiv.style   = 'height:' + height      + 'px;top:' + startCellTop + 'px;left:' + startCellLeft + 'px;';
            this.rightLineDiv.style  = 'height:' + (height + 1)+ 'px;top:' + startCellTop + 'px;left:' + lastCellLeft  + 'px;';
            this.bottomLineDiv.style = 'width:'  + width       + 'px;top:' + lastCellTop  + 'px;left:' + startCellLeft + 'px;';
        }
    }
    //=============================================================
    else if (activeFixRight) {
        let trHeaderList  = document.querySelectorAll(selector + ' .tbs-grid-panel20 tbody tr');
        for (let x = colArray[0]; x <= colArray[colArray.length - 1]; x++) width += parseInt(this.columns[x].width);

        let startCell     = trHeaderList[0].childNodes[colArray[0]];
        let startCellRect = startCell.getBoundingClientRect();
        let lastCellRect  = trHeaderList[0].childNodes[colArray[colArray.length - 1]].getBoundingClientRect();

        if (this.headerRowCount > 1) {
            for (let i = this.headerRowCount - 1; i >= 0; i--) {
                if (trHeaderList[i].childNodes[colArray[0]].dataset.id != '') {
                    startCellRect = trHeaderList[i].childNodes[colArray[0]].getBoundingClientRect();
                    break;
                }
            }
            for (let i = this.headerRowCount - 1; i >= 0; i--) {
                if (trHeaderList[i].childNodes[colArray[colArray.length - 1]].dataset.id != '') {
                    lastCellRect = trHeaderList[i].childNodes[colArray[colArray.length - 1]].getBoundingClientRect();
                    break;
                }
            }
        }
        let leftCellRect = this.tbs_getLeftTableCell(rowArray[0], 'panel61').getBoundingClientRect();

        let height = rowArray.length * this.rowHeight;

        let startCellTop  = leftCellRect.top   - gridRect.top  - 1;
        let startCellLeft = startCellRect.left - gridRect.left - 1;
        //============================================================= option
        if (colArray[0] == startCell.cellIndex) {
            if (startCellRect.left < contentRect.left) {
                width -= Math.abs(startCellRect.left - contentRect.left);
                startCellLeft = startCellRect.left - gridRect.left + Math.abs(startCellRect.left - contentRect.left);
            }
        }
        if (colArray[colArray.length - 1] == lastColIndex) {
            if (lastCellRect.right > contentRect.right) width -= Math.abs(lastCellRect.right - contentRect.right);
        }

        let defaultHeight = document.querySelector(selector + ' .tbs-grid-panel20').getBoundingClientRect().height;
        if (this.topColumns.length > 0) defaultHeight += document.querySelector(selector + ' .tbs-grid-panel40').getBoundingClientRect().height;
        if ((startCellTop + height - defaultHeight) > contentRect.height) height -= Math.abs((startCellTop + height - defaultHeight) - contentRect.height);

        //=============================================================
        let lastCellTop  = startCellTop  + height;
        let lastCellLeft = startCellLeft + width;
        //============================================================= line drawing
        if (width <= 3 || height <= 3) {
            this.topLineDiv.style    = 'width:0px;top:0px;left:0px;';	 //topLineDiv(absolute) left tbs-grid(relative)
            this.leftLineDiv.style   = 'height:0px;top:0px;left:0px;';
            this.bottomLineDiv.style = 'width:0px;top:0px;left:0px;';
            this.rightLineDiv.style  = 'height:0px;top:0px;left:0px;';
        }
        else {
            this.topLineDiv.style    = 'width:'  + width       + 'px;top:' + startCellTop + 'px;left:' + startCellLeft + 'px;';
            this.leftLineDiv.style   = 'height:' + height      + 'px;top:' + startCellTop + 'px;left:' + startCellLeft + 'px;';
            this.rightLineDiv.style  = 'height:' + (height + 1)+ 'px;top:' + startCellTop + 'px;left:' + lastCellLeft  + 'px;';
            this.bottomLineDiv.style = 'width:'  + width       + 'px;top:' + lastCellTop  + 'px;left:' + startCellLeft + 'px;';
        }
    }
    //============================================================= else if (activeContent) {
    else if (activeContent) {
        for (let x = colArray[0]; x <= colArray[colArray.length - 1]; x++) width += parseInt(this.columns[x].width);
        let startCell = trHeaderList[0].childNodes[colArray[0]];
        let startCellRect = startCell.getBoundingClientRect();
        let lastCellRect  = trHeaderList[0].childNodes[colArray[colArray.length - 1]].getBoundingClientRect();

        if (this.headerRowCount > 1) {
            for (let i = this.headerRowCount - 1; i >= 0; i--) {
                if (trHeaderList[i].childNodes[colArray[0]].dataset.id != '') {
                    startCellRect = trHeaderList[i].childNodes[colArray[0]].getBoundingClientRect();
                    break;
                }
            }
            for (let i = this.headerRowCount - 1; i >= 0; i--) {
                if (trHeaderList[i].childNodes[colArray[colArray.length - 1]].dataset.id != '') {
                    lastCellRect = trHeaderList[i].childNodes[colArray[colArray.length - 1]].getBoundingClientRect();
                    break;
                }
            }
        }
        let leftCellRect   = this.tbs_getLeftTableCell(rowArray[0]).getBoundingClientRect();
        let height = rowArray.length * this.rowHeight;

        let startCellTop  = leftCellRect.top   - gridRect.top  - 1;
        let startCellLeft = startCellRect.left - gridRect.left - 1;

        //============================================================= option
        if (colArray[0] == startCell.cellIndex) {
            if (startCellRect.left < contentRect.left) {
                width -= Math.abs(startCellRect.left - contentRect.left);
                startCellLeft = startCellRect.left - gridRect.left + Math.abs(startCellRect.left - contentRect.left);
            }
        }
        if (colArray[colArray.length - 1] == lastColIndex) {
            if (lastCellRect.right > contentRect.right) width -= Math.abs(lastCellRect.right - contentRect.right);
        }

        let defaultHeight = document.querySelector(selector + ' .tbs-grid-panel20').getBoundingClientRect().height;
        if (this.topColumns.length > 0) defaultHeight += document.querySelector(selector + ' .tbs-grid-panel40').getBoundingClientRect().height;
        defaultHeight += document.querySelector(selector + ' .tbs-grid-panel60').getBoundingClientRect().height;
        if ((startCellTop + height - defaultHeight) > contentRect.height) height -= Math.abs((startCellTop + height - defaultHeight) - contentRect.height);

        //=============================================================
        let lastCellTop  = startCellTop  + height;
        let lastCellLeft = startCellLeft + width;
        //============================================================= line drawing
        if (width <= 3 || height <= 3) {
            this.topLineDiv.style    = 'width:0px;top:0px;left:0px;';	 //topLineDiv(absolute) left tbs-grid(relative)
            this.leftLineDiv.style   = 'height:0px;top:0px;left:0px;';
            this.bottomLineDiv.style = 'width:0px;top:0px;left:0px;';
            this.rightLineDiv.style  = 'height:0px;top:0px;left:0px;';
        }
        else {
            this.topLineDiv.style    = 'width:'  + width       + 'px;top:' + startCellTop + 'px;left:' + startCellLeft + 'px;';
            this.leftLineDiv.style   = 'height:' + height      + 'px;top:' + startCellTop + 'px;left:' + startCellLeft + 'px;';
            this.rightLineDiv.style  = 'height:' + (height + 1)+ 'px;top:' + startCellTop + 'px;left:' + lastCellLeft  + 'px;';
            this.bottomLineDiv.style = 'width:'  + width       + 'px;top:' + lastCellTop  + 'px;left:' + startCellLeft + 'px;';
        }
    }
    else return;
    //=============================================================
}
TbsGrid.prototype.tbs_displayHeaderDataFixCol = function() {
    // frozen function
    let selector = '#' + this.gridId;
    let grid = this;

    if (this.fixedColumnIndex == -1) return;
    //=============================================================	 header table, body
    let thList = document.querySelectorAll(selector + ' .tbs-grid-panel22 .tbs-grid-table thead th');
    for (let i = 0, len = this.columns.length; i < len; i++) {
        if (i > this.fixedColumnIndex) {
            thList[i].style.width   = '0px';
            thList[i].style.display = 'none';
        }
        else {
            thList[i].style.width   = (this.columns[i][grid.column_visible] == true) ? parseInt(this.columns[i].width) + 'px' : '0px';
            thList[i].style.display = (this.columns[i][grid.column_visible] == true) ? '' : 'none';
        }
    }
    //=============================================================	 header tr
    let trList = document.querySelectorAll(selector + ' .tbs-grid-panel22 .tbs-grid-table tbody tr');
    for (let i = 0, rowLen = trList.length; i < rowLen; i++) {
        trList[i].style.height = this.headerRowHeight + 'px';
        for (let x = 0, colLen = this.columns.length; x < colLen; x++) {
            let header = this.headerColumns[i][x];
            let cell = trList[i].childNodes[x];

            if (x <= this.fixedColumnIndex){
                cell.style.textAlign = 'center';
                cell.dataset.id = (header[grid.column_kind] == 'column') ? header[grid.column_id] : '';
                cell.colSpan = header[grid.column_colspan];
                cell.rowSpan = header[grid.column_rowspan];
                cell.style.display = (header[grid.column_visible] == true) ? '' : 'none';
                cell.childNodes[0].childNodes[0].textContent = header[grid.column_text];
            }
            else if (x == this.fixedColumnIndex + 1) {
                cell.style.textAlign = 'center';
                cell.dataset.id = (header[grid.column_kind] == 'column') ? header[grid.column_id] : '';
                cell.colSpan = header[grid.column_subColspan];
                cell.rowSpan = header[grid.column_subRowspan];
                cell.style.display = '';
                cell.childNodes[0].childNodes[0].textContent = header[grid.column_text];
            }
            else {
                cell.style.textAlign = 'center';
                cell.dataset.id = (header[grid.column_kind] == 'column') ? header[grid.column_id] : '';
                cell.colSpan = header[grid.column_colspan];
                cell.rowSpan = header[grid.column_rowspan];
                cell.style.display = 'none';
                cell.childNodes[0].childNodes[0].textContent = header[grid.column_text];
            }
        }
    }
}
TbsGrid.prototype.tbs_displayHeaderDataFixCol2 = function() {
    // frozen function
    let selector = '#' + this.gridId;
    let grid = this;

    if (this.fixedColumnIndex == -1) return;
    let fixedColumnIndex = this.fixedColumnIndex + 1;
    //=============================================================	[start] header div
    let headerRowCount = this.headerRowCount;
    let headerColumn = this.headerColumns;
    //=============================================================	 header table, body
    let column = this.columns;
    let colGroupList = document.querySelectorAll(selector + ' .tbs-grid-panel22 .tbs-grid-table col');
    for (let i = 0, len = fixedColumnIndex; i < len; i++) {
        colGroupList[i].style.width = column[i].width + 'px';
    }
    //=============================================================	 header tr
    let trList = document.querySelectorAll(selector + ' .tbs-grid-panel22 .tbs-grid-table tbody tr');
    for (let i = 0, rowLen = trList.length; i < rowLen; i++) {
        trList[i].style.height = this.headerRowHeight + 'px';
        for (let x = 0, colLen = fixedColumnIndex; x < colLen; x++) {
            let col = headerColumn[i][x];
            let cell = trList[i].childNodes[x];
            //=============================================================	 init cell
            cell.style.textAlign = 'center';
            cell.dataset.id = (col[grid.column_id] == undefined || col[grid.column_id] == '') ? '' : col[grid.column_id];
            cell.colSpan = 1;
            cell.rowSpan = 1;
            //=============================================================	 init cell
            if (col[grid.column_id] != undefined && col[grid.column_id] != '') {
                if (i == 0) cell.rowSpan = rowLen;
                else if (i < rowLen - 1) cell.rowSpan = rowLen - i;
                cell.dataset.id = col[grid.column_id];
                cell.style.display = '';
                cell.childNodes[0].childNodes[0].textContent = col[grid.column_text];
            }
            else if (col[grid.column_text] != undefined) {
                cell.dataset.id = '';
                cell.style.display = '';
                cell.colSpan = col[grid.column_colspan];
                cell.childNodes[0].childNodes[0].textContent = col[grid.column_text];
            }
            else {
                cell.dataset.id = '';
                cell.style.display = 'none';
            }
        }
    }
}
TbsGrid.prototype.tbs_displayOneSelection = function (startRowIndex, startRowIndex, startCellIndex, startCellIndex) {
    let selector = '#' + this.gridId;
    let grid = this;

    let column = this.columns;

    this.startRowIndex  = startRowIndex;
    this.lastRowIndex   = startRowIndex;

    this.startCellIndex = startCellIndex;
    this.lastCellIndex  = startCellIndex;

    this._startRowIndex = startRowIndex;
    this._lastRowIndex  = startRowIndex;

    this._startCellIndex= startCellIndex;
    this._lastCellIndex = startCellIndex;

    this.tbs_setSelectedRangeValue(startRowIndex, startRowIndex, startCellIndex, startCellIndex);


    let count = this.data_panel30.length;
    let topRowIndex = this.tbs_getFirstRowIndex();
    //============================================================= table display
    let trLeftList    	= document.querySelectorAll(selector + ' .tbs-grid-panel31  .tbs-grid-table tbody tr');
    let trFixLeftList   = document.querySelectorAll(selector + ' .tbs-grid-panel61   .tbs-grid-table tbody tr');
    let trContentList 	= document.querySelectorAll(selector + ' .tbs-grid-panel30   .tbs-grid-table tbody tr');
    let trFixBottomtList= document.querySelectorAll(selector + ' .tbs-grid-panel32 .tbs-grid-table tbody tr');
    let trFixRightList 	= document.querySelectorAll(selector + ' .tbs-grid-panel60  .tbs-grid-table tbody tr');

    count = topRowIndex + this.pageRowCount;
    //=============================================================
    let contentRect = document.querySelector(selector + ' .tbs-grid-panel30').getBoundingClientRect();
    let contentTableRect = document.querySelector(selector + ' .tbs-grid-panel30 > table').getBoundingClientRect();
    let contentTableLeft = parseInt(document.querySelector(selector + ' .tbs-grid-panel30 > table').style.left, 10);

    let startColumnIndex = 0;
    let lastColumnIndex = column.length - 1;

    let accWidth = 0;
    for (let i = 0, len = column.length; i < len; i++) {
        accWidth += parseInt(column[i].width);
        if (accWidth + contentTableLeft > 0) { startColumnIndex = i; break; }
    }
    accWidth = contentTableRect.width;
    for (let i = column.length - 1; i >= 0; i--) {
        accWidth -= parseInt(column[i].width);
        if (accWidth + contentTableLeft < contentRect.width) { lastColumnIndex = i; break; }
    }
    //============================================================= left, content, fixBottom
    let viewCount = this.data_panel30.length;
    let i = 0;
    for (let ri = topRowIndex; ri < count; ri++) {
        if (ri > viewCount - 1) break;
        let trLeft = trLeftList[i];
        let trContent = trContentList[i];
        let trFixBottom = trFixBottomtList[i]
        let row = this.data_panel30[ri];
        //============================================================= left
        leftTd = trLeft.childNodes[0];
        let selectedValue = this.tbs_isSelectedCell31(ri, 0);
        if (selectedValue == 1) leftTd.classList.add('tbs-grid-cell-select');
        //============================================================= content
        for (let x = startColumnIndex; x <= lastColumnIndex; x++) {
            let td = trContent.childNodes[x];
            let selectedValue = this.tbs_isSelectedCell30(ri, x); //new
            if (selectedValue == 1) {
                if (this.startRowIndex == ri && this.startCellIndex == x) {
                    td.classList.add('tbs-grid-cell-start');
                }
            }
        }
        //============================================================= fixBottom
        if (this.fixedColumnIndex != -1) {
            for (let x = 0; x <= this.fixedColumnIndex; x++) {
                let td = trFixBottom.childNodes[x];
                let selectedValue = this.tbs_isSelectedCell30(ri, x); //new
                if (selectedValue == 1) {
                    if (this.startRowIndex == ri && this.startCellIndex == x) {
                        td.classList.add('tbs-grid-cell-start');
                    }
                }
            }
        }
        i += 1;
    }
    //=============================================================
    if (this.fixedRowIndex != -1){
        let i = 0;
        for (let ri = 0; ri <= this.fixedRowIndex; ri++) {
            if (ri > viewCount - 1) break;
            let trLeft      = trFixLeftList[i];
            let trContent   = trFixRightList[i];
            let row         = this.data_panel30[ri];
            //============================================================= left
            leftTd = trLeft.childNodes[0];
            leftTd.dataset.rowIndex = ri;
            let selectedValue = this.tbs_isSelectedCell31(ri, 0);
            if (selectedValue == 1) leftTd.classList.add('tbs-grid-cell-select');
            //============================================================= content
            for (let x = startColumnIndex; x <= lastColumnIndex; x++) {
                let td = trContent.childNodes[x];
                let selectedValue = this.tbs_isSelectedCell30(ri, x); //new
                if (selectedValue == 1) {
                    if (this.startRowIndex == ri && this.startCellIndex == x) {
                        td.classList.add('tbs-grid-cell-start');
                    }
                }
            }
        }
        i += 1;
    }
    this.tbs_displaySelectedLine();
}
//================================================================
//
// Select Range
//
//================================================================
TbsGrid.prototype.tbs_setSelectedRange = function (startRowIndex, lastRowIndex, startCellIndex, lastCellIndex, topRowIndex, type = 'add') {
    let selector = '#' + this.gridId;
    let grid = this;

    if (arguments.length == 2) { startCellIndex = 0; lastCellIndex = this.columns.length - 1; }

    if (lastRowIndex  == -1) { lastRowIndex  = this.data_panel30.length - 1; }
    if (lastCellIndex == -1) { lastCellIndex = this.columns.length - 1; }

    this.startRowIndex  = startRowIndex;
    this.startCellIndex = startCellIndex;
    this.lastRowIndex   = lastRowIndex;
    this.lastCellIndex  = lastCellIndex;

    let _startRowIndex= startRowIndex  > lastRowIndex  ? lastRowIndex   : startRowIndex;
    let _lastRowIndex = startRowIndex  > lastRowIndex  ? startRowIndex  : lastRowIndex;
    let _startCellIndex    = startCellIndex > lastCellIndex ? lastCellIndex  : startCellIndex;
    let _lastCellIndex     = startCellIndex > lastCellIndex ? startCellIndex : lastCellIndex;

    this._startRowIndex  = _startRowIndex;
    this._startCellIndex = _startCellIndex;
    this._lastRowIndex   = _lastRowIndex;
    this._lastCellIndex  = _lastCellIndex;

    if (type == 'add' || this.selectRangeArray == 0) {
        let selectRange = {};
        selectRange.startRowIndex   = startRowIndex;
        selectRange.startCellIndex  = startCellIndex;
        selectRange.lastRowIndex    = lastRowIndex;
        selectRange.lastCellIndex   = lastCellIndex;
        selectRange._startRowIndex  = _startRowIndex;
        selectRange._startCellIndex = _startCellIndex;
        selectRange._lastRowIndex   = _lastRowIndex;
        selectRange._lastCellIndex  = _lastCellIndex;
        this.selectRangeArray.push(selectRange);
    }
    else {
        let selectRange = this.selectRangeArray[0];
        selectRange.startRowIndex   = startRowIndex;
        selectRange.startCellIndex  = startCellIndex;
        selectRange.lastRowIndex    = lastRowIndex;
        selectRange.lastCellIndex   = lastCellIndex;
        selectRange._startRowIndex  = _startRowIndex;
        selectRange._startCellIndex = _startCellIndex;
        selectRange._lastRowIndex   = _lastRowIndex;
        selectRange._lastCellIndex  = _lastCellIndex;
    }
    this.tbs_setSelectedRangeValue(_startRowIndex, _lastRowIndex, _startCellIndex, _lastCellIndex);
    if (this.fixedRowIndex == -1) {
        topRowIndex = (topRowIndex == undefined) ? this.tbs_getFirstRowIndex() : this.fixedRowIndex + 1;
    }
    else {
        topRowIndex = (topRowIndex == undefined) ? this.tbs_getFirstRowIndex() : topRowIndex;
    }
    this.tbs_displayPanel30(topRowIndex);
}
TbsGrid.prototype.tbs_setSelectedRangeValue = function (startRowIndex, lastRowIndex, startCellIndex, lastCellIndex) {
    // fcuntion : set selected value
    //console.log(`startRowIndex, lastRowIndex, startCellIndex, lastCellIndex`);
    //console.log(`${startRowIndex}, ${lastRowIndex}, ${startCellIndex}, ${lastCellIndex}`);
    let selector = '#' + this.gridId;
    let grid = this;

    if (this.options[grid.option_selectMode] == 'row' || this.options[grid.option_selectMode] == 'rows') {
        startCellIndex = 0;
        lastCellIndex = -1;
    }
    //=============================================================	panel31 select
    let data = this.data_select_panel31;
    if (lastRowIndex == -1) lastRowIndex = data.length - 1;
    for (let rowIndex = startRowIndex; rowIndex <= lastRowIndex; rowIndex++) {
        let len = data.length;
        let bCount = false;
        for (let n = 0; n < len; n++) {
            if (rowIndex == data[n][0][0]) {
                bCount = true;
                data[n][1][0] = 1;
                break;
            }
        }
        if (bCount == false) {
            data.push([new Int32Array([rowIndex]), new Int8Array([1, 0, 0])]);
        }
    }
    //=============================================================	panel30 select
    let column = this.columns;
    let columnLen = column.length;
    data = this.data_select_panel30;

    for (let rowIndex = startRowIndex; rowIndex <= lastRowIndex; rowIndex++) {
        if (lastCellIndex == -1) lastCellIndex = column.length - 1;
        let len = data.length;
        let bCount = false;
        for (let n = 0; n < len; n++) {
            if (rowIndex == data[n][0][0]) {
                bCount = true;
                for (let colIndex = 0; colIndex < columnLen; colIndex++) {
                    if (colIndex >= startCellIndex && colIndex <= lastCellIndex) {
                        data[n][1][colIndex] = 1;
                    }
                    else {
                        data[n][1][colIndex] = 0;
                    }
                }
                break;
            }
        }
        if (bCount == false) {
            let array = [];
            for (let colIndex = 0; colIndex < columnLen; colIndex++) array.push(0);
            let row = [new Int32Array([rowIndex]), new Int8Array(array)];
            for (let colIndex = 0; colIndex < columnLen; colIndex++) {
                if (colIndex >= startCellIndex && colIndex <= lastCellIndex) row[1][colIndex] = 1;
                else row[1][colIndex] = 0;
            }
            data.push(row);
        }
    }

    if (this.headerRowCount > 1) {
        function selectCell(trList, colIndex){
            for (let i = trList.length - 1; i >=0; i--) {
                let cell = trList[i].childNodes[colIndex];
                if (cell.style.display == 'none') continue;
                else cell.classList.add('tbs-grid-cell-select');
            }
        }
        // panel20
        let trList = document.querySelectorAll(selector + ' .tbs-grid-panel20 .tbs-grid-table tbody tr');
        for (let x = startCellIndex; x <= lastCellIndex; x++) selectCell(trList, x);
        // panel22
        if (this.fixedColumnIndex != -1){
            trList = document.querySelectorAll(selector + ' .tbs-grid-panel22 .tbs-grid-table tbody tr');
            for (let x = startCellIndex; x <= lastCellIndex; x++) selectCell(trList, x);
        }
    }
    else {
        // panel20
        let tableCells = document.querySelectorAll(selector + ' .tbs-grid-panel20 .tbs-grid-table tbody tr:last-child td');
        for (let i = startCellIndex; i <= lastCellIndex; i++) {
            tableCells[i].classList.add('tbs-grid-cell-select');
        }
        // panel22
        if (this.fixedColumnIndex != -1){
            tableCells = document.querySelectorAll(selector + ' .tbs-grid-panel22 .tbs-grid-table tbody tr:last-child td');
            for (let i = startCellIndex; i <= lastCellIndex; i++) {

                tableCells[i].classList.add('tbs-grid-cell-select');
            }
        }
    }
}
TbsGrid.prototype.tbs_selectedRange = function (startRowIndex, lastRowIndex, startCellIndex, lastCellIndex, topRowIndex) {
    this.tbs_setSelectedRange(startRowIndex, lastRowIndex, startCellIndex, lastCellIndex, topRowIndex, '');
}
TbsGrid.prototype.tbs_clearRange = function (startRowIndex, lastRowIndex, startCellIndex, lastCellIndex) {
    let selector = '#' + this.gridId;
    let grid = this;

    if (this.startRowIndex != -1) this.startRowIndex = -1;
    if (this.startCellIndex != -1) this.startCellIndex = -1;
    if (this.lastRowIndex != -1) this.lastRowIndex = -1;
    if (this.lastCellIndex != -1) this.lastCellIndex = -1;

    if (this._startRowIndex != -1) this._startRowIndex = -1;
    if (this._startCellIndex != -1) this._startCellIndex = -1;
    if (this._lastRowIndex != -1) this._lastRowIndex = -1;
    if (this._lastCellIndex != -1) this._lastCellIndex = -1;

    if (this.topLineDiv.style.width != '0px') this.topLineDiv.style.width = '0px';
    if (this.leftLineDiv.style.height != '0px') this.leftLineDiv.style.height = '0px';
    if (this.bottomLineDiv.style.width != '0px') this.bottomLineDiv.style.width = '0px';
    if (this.rightLineDiv.style.height != '0px') this.rightLineDiv.style.height = '0px';

    this.data_select_panel30 = [];
    this.data_select_panel31 = [];
    this.selectRangeArray = [];

    document.querySelectorAll(selector + ' .tbs-grid-panel20 .tbs-grid-table td').forEach(function(td) {
        td.classList.remove('tbs-grid-cell-select');
    });
    if (this.fixedColumnIndex != -1){
        document.querySelectorAll(selector + ' .tbs-grid-panel22 .tbs-grid-table td').forEach(function(td) {
            td.classList.remove('tbs-grid-cell-select');
        });
    }

}
TbsGrid.prototype.tbs_clearSelection = function (panelName = '') {
    let selector = '#' + this.gridId;
    let grid = this;
    if (panelName == 'panel30') {
        document.querySelectorAll(selector + ' .tbs-grid-cell-start' ).forEach(cell => cell.classList.remove('tbs-grid-cell-start'));
        document.querySelectorAll(selector + ' .tbs-grid-panel31 .tbs-grid-cell-select').forEach(cell => cell.classList.remove('tbs-grid-cell-select'));
        document.querySelectorAll(selector + ' .tbs-grid-panel32 .tbs-grid-cell-select').forEach(cell => cell.classList.remove('tbs-grid-cell-select'));
        document.querySelectorAll(selector + ' .tbs-grid-panel30 .tbs-grid-cell-select').forEach(cell => cell.classList.remove('tbs-grid-cell-select'));
    }
    else if (panelName == 'panel60') {
        document.querySelectorAll(selector + ' .tbs-grid-panel61 .tbs-grid-cell-select').forEach(cell => cell.classList.remove('tbs-grid-cell-select'));
        document.querySelectorAll(selector + ' .tbs-grid-panel62 .tbs-grid-cell-select').forEach(cell => cell.classList.remove('tbs-grid-cell-select'));
        document.querySelectorAll(selector + ' .tbs-grid-panel60 .tbs-grid-cell-select').forEach(cell => cell.classList.remove('tbs-grid-cell-select'));
    }
}
//================================================================
//
// setDataTable Functions : for Panel30, panel60
//
//================================================================
TbsGrid.prototype.tbs_setDataTable = function (param) {
    // param : {panel: panel, topRowIndex: topRowIndex}
    let selector = '#' + this.gridId;
    let grid = this;

    let panelName = param.panelName;

    //content rows
    if (panelName == 'panel31') {
        this.tbs_setDataTable1(param);
    }
    else if (panelName == 'panel32') {
        this.tbs_setDataTable2(param);
    }
    else if (panelName == 'panel30') {
        this.tbs_setDataTable3(param)
    }
    //frozen rows
    else if (panelName == 'panel61') {
        if (this.fixedRowIndex == -1) return;
        this.tbs_setDataTable1(param);
    }
    else if (panelName == 'panel62') {
        if (this.fixedRowIndex == -1) return;
        this.tbs_setDataTable2(param);
    }
    else if (panelName == 'panel60') {
        if (this.fixedRowIndex == -1) return;
        this.tbs_setDataTable3(param)
    }
    //summary rows
    else if (panelName == 'panel40' || panelName == 'panel50') {
        this.tbs_setDataSummaryTable(param)
    }
    //header rows
    else if (panelName == 'panel21') {
        this.tbs_setDataHeaderTable1(param)
    }
    else if (panelName == 'panel22') {
        this.tbs_setDataHeaderTable1(param)
    }
    else if (panelName == 'panel20') {
        this.tbs_setDataHeaderTable3(param)
    }
}
TbsGrid.prototype.tbs_setDataTable1 = function (param) {
    //console.log('tbs_setDataTable1');
    let selector = '#' + this.gridId;
    let grid = this;

    let panelName = param.panelName;
    if (panelName == 'panel61') { if (grid.fixedRowIndex == -1) return; }

    if (grid.fixedRowIndex != -1) {
        let topRowIndex = this.tbs_validateTopRowIndex(panelName, param.topRowIndex);
        let bottomRowIndex = this.tbs_validateBottomRowIndex(panelName, topRowIndex);

        let pageRowCount = this.tbs_getPageRowCount(panelName);
        let rowHeight = this.rowHeight;

        let tableRows= document.querySelectorAll(selector + ' .tbs-grid-' + panelName + ' .tbs-grid-table tbody tr');
        //console.log(`tbs_setDataTable1 ${panelName} pageRowCount ${pageRowCount} topRowIndex ${topRowIndex} bottomRowIndex ${bottomRowIndex}`);
        //startColumnIndex, lastColumIndex
        let result = this.tbs_getDisplayedHeaderColumn();
        let startColumnIndex= result.startColumnIndex;
        let lastColumnIndex = result.lastColumnIndex;

        let tableRowIndex = 0;
        for (let i = topRowIndex; i < bottomRowIndex + 1; i++) {
            if (i > this.tbs_getRowCount() - 1) break;

            let tableRow = tableRows[tableRowIndex];
            tableRow.dataset.rowIndex = i;

            let row = this.tbs_getRow(i);
            if (tableRow.style.display == 'none') tableRow.style.display = '';
            if (tableRow.style.height != this.rowHeight + 'px') tableRow.style.height = rowHeight + 'px';

            // row alternative background color
            this.tbs_setAlternativeRowColor(panelName, tableRow, i);

            let tableCell = tableRow.childNodes[0];
            tableCell.dataset.rowIndex = i;
            tableCell.dataset.displayRowIndex = i - (grid.fixedRowIndex + 1);

            let selectedValue = this.tbs_isSelectedCell(panelName, i, 0);
            if (selectedValue == 1) tableCell.classList.add('tbs-grid-cell-select');

            if (tableCell.childNodes[0].textContent != (i + 1).toString()) tableCell.childNodes[0].textContent = (i + 1).toString();
            if (this.options[grid.option_rowMode] ) tableRow.childNodes[1].childNodes[0].textContent = (row['mode'] != '' && row['mode'] != 'S') ? row['mode'] : '';
            if (this.options[grid.option_checkbox]) tableRow.childNodes[2].childNodes[0].childNodes[0].checked = (row['check'] == undefined) ? false : row['check'];

            tableRowIndex += 1;
        }
        // hidden : Unnecessary tableRows
        this.tbs_hiddenTableRows(panelName, tableRows, tableRowIndex, this.pageRowCount);
    }
    else {
        let topRowIndex = this.tbs_validateTopRowIndex(panelName, param.topRowIndex);
        let bottomRowIndex = this.tbs_validateBottomRowIndex(panelName, topRowIndex);

        let pageRowCount = this.tbs_getPageRowCount(panelName);
        let rowHeight = this.rowHeight;

        let tableRows= document.querySelectorAll(selector + ' .tbs-grid-' + panelName + ' .tbs-grid-table tbody tr');

        //startColumnIndex, lastColumIndex
        let result = this.tbs_getDisplayedHeaderColumn();
        let startColumnIndex= result.startColumnIndex;
        let lastColumnIndex = result.lastColumnIndex;

        let tableRowIndex = 0;
        for (let i = topRowIndex; i < bottomRowIndex + 1; i++) {
            if (i > this.tbs_getRowCount() - 1) break;

            let tableRow = tableRows[tableRowIndex];
            tableRow.dataset.rowIndex = i;

            let row = this.tbs_getRow(i);

            if (tableRow.style.display == 'none') tableRow.style.display = '';
            if (tableRow.style.height != this.rowHeight + 'px') tableRow.style.height = rowHeight + 'px';

            // row alternative background color
            this.tbs_setAlternativeRowColor(panelName, tableRow, i);

            let tableCell = tableRow.childNodes[0];
            tableCell.dataset.rowIndex = i;
            tableCell.dataset.displayRowIndex = i;

            let selectedValue = this.tbs_isSelectedCell(panelName, i, 0);
            if (selectedValue == 1) tableCell.classList.add('tbs-grid-cell-select');
            if (tableCell.childNodes[0].textContent != (i + 1).toString()) tableCell.childNodes[0].textContent = (i + 1).toString();
            if (this.options[grid.option_rowMode] ) tableRow.childNodes[1].childNodes[0].textContent = (row['mode'] != '' && row['mode'] != 'S') ? row['mode'] : '';
            if (this.options[grid.option_checkbox]) tableRow.childNodes[2].childNodes[0].childNodes[0].checked = (row['check'] == undefined) ? false : row['check'];

            tableRowIndex += 1;
        }
        // hidden : Unnecessary tableRows
        this.tbs_hiddenTableRows(panelName, tableRows, tableRowIndex, this.pageRowCount);
    }

}
TbsGrid.prototype.tbs_setDataTable2 = function (param) {
    let selector = '#' + this.gridId;
    let grid = this;

    if (this.fixedColumnIndex == -1) return;

    let panelName = param.panelName;
    let topRowIndex = this.tbs_validateTopRowIndex(panelName, param.topRowIndex);
    let bottomRowIndex = this.tbs_validateBottomRowIndex(panelName, topRowIndex);

    let pageRowCount = this.tbs_getPageRowCount(panelName);
    let rowHeight = this.rowHeight;

    let columns= this.columns;
    let tableRows= document.querySelectorAll(selector + ' .tbs-grid-' + panelName + ' .tbs-grid-table tbody tr');

    //startColumnIndex, lastColumIndex
    let result = this.tbs_getDisplayedHeaderColumn(panelName);
    let startColumnIndex= result.startColumnIndex;
    let lastColumnIndex = result.lastColumnIndex;

    // hidden for Unnecessary datas
    let tableRowIndex = 0;
    for (let i = topRowIndex; i < bottomRowIndex + 1; i++) {
        if (i > this.tbs_getRowCount() - 1) break;

        let tableRow = tableRows[tableRowIndex];
        tableRow.dataset.rowIndex = i;

        // row alternative background color
        this.tbs_setAlternativeRowColor(panelName, tableRow, i);

        if (tableRow.style.height != this.rowHeight + 'px') tableRow.style.height  = rowHeight + 'px';

        let selectedValue = this.tbs_isSelectedCell(panelName, i, 0);
        if (tableRow.style.display == 'none') tableRow.style.display = '';
        tableRow.dataset.rowIndex = i;

        for (let x = 0; x <= lastColumnIndex; x++) {
            let tableCell = tableRow.childNodes[x]; //content tr > td

            if (x > this.fixedColumnIndex && x < startColumnIndex) continue;
            if (x <= this.fixedColumnIndex) tableCell = tableRow.childNodes[x];

            let column = this.columns[x];

            let layout = this.data_panel30[i].layout[column[grid.column_id]];
            let colValue = this.tbs_getLayoutData(i, column[grid.column_id], this.layout_text);

            if (tableCell.style.textAlign       != column[grid.column_align])          tableCell.style.textAlign = column[grid.column_align];
            if (tableCell.style.width           != column[grid.column_width] + 'px')   tableCell.style.width = column[grid.column_width] + 'px';
            if (tableCell.style.backgroundImage != '')                                 tableCell.style.backgroundImage = '';
            if (tableCell.style.display         != '')                                 tableCell.style.display = '';
            if (tableCell.rowSpan != '1') tableCell.rowSpan = '1';
            tableCell.style.display = layout[grid.layout_visible] == true ? '' : 'none';
            tableCell.rowSpan       = layout[grid.layout_rowspan];

            let selectedValue = this.tbs_isSelectedCell(panelName, i, x);
            if (selectedValue == 1) {
                if (this.startRowIndex == i && this.startCellIndex == x)
                    tableCell.classList.add('tbs-grid-cell-start');
                else
                    tableCell.classList.add('tbs-grid-cell-select');
            }
            if (tableCell.childNodes[0].textContent != colValue) tableCell.childNodes[0].textContent = colValue;
        }
        tableRowIndex += 1;
    }
    // hidden : Unnecessary tableRows
    this.tbs_hiddenTableRows(panelName, tableRows, tableRowIndex, this.pageRowCount);
}
TbsGrid.prototype.tbs_setDataTable3 = function (param) {
    //console.log('tbs_setDataTable3');
    let selector = '#' + this.gridId;
    let grid = this;

    let panelName = param.panelName;
    if (panelName == 'panel60') { if (grid.fixedRowIndex == -1) return; }

    // th table cell
    //let thTableCells = document.querySelectorAll(selector + ' .tbs-grid-' + panelName + ' .tbs-grid-table thead th');
    //for (let i = 0, len = this.columns.length; i < len; i++) {
    //    let tableCell = thTableCells[i];
    //    let column = this.columns[i];
    //    tableCell.style.width   = (column[grid.column_visible] == true) ? parseInt(column[grid.column_width]) + 'px' : '0px';
    //    tableCell.style.display = (column[grid.column_visible] == true) ? '' : 'none';
    //}

    let topRowIndex = this.tbs_validateTopRowIndex(panelName, param.topRowIndex);
    let bottomRowIndex = this.tbs_validateBottomRowIndex(panelName, topRowIndex);

    let pageRowCount = this.tbs_getPageRowCount(panelName);
    let rowHeight = this.rowHeight;
    //console.log(`tbs_setDataTable3 ${panelName} pageRowCount ${pageRowCount} topRowIndex ${topRowIndex} bottomRowIndex ${bottomRowIndex}`);

    let columns= this.columns;
    let tableRows= document.querySelectorAll(selector + ' .tbs-grid-' + panelName + ' .tbs-grid-table tbody tr');

    //startColumnIndex, lastColumIndex
    let result = this.tbs_getDisplayedHeaderColumn();
    let startColumnIndex= result.startColumnIndex;
    let lastColumnIndex = result.lastColumnIndex;

    //let startColumnIndex= 0;
    //let lastColumnIndex = columns.length;

    // hidden for Unnecessary datas
    let tableRowIndex = 0;
    for (let i = topRowIndex; i < bottomRowIndex + 1; i++) {
        if (i > this.tbs_getRowCount() - 1) break;

        let tableRow = tableRows[tableRowIndex];
        tableRow.dataset.rowIndex = i;

        if (tableRow.style.height != this.rowHeight + 'px') tableRow.style.height = rowHeight + 'px';

        // row alternative background color
        this.tbs_setAlternativeRowColor(panelName, tableRow, i);

        //let selectedValue = this.tbs_isSelectedCell(panelName, i, 0);
        let selectedValue = this.tbs_isSelectedCell('panel31', i, 0);
        if (tableRow.style.display == 'none') tableRow.style.display = '';

        for (let x = 0; x <= lastColumnIndex; x++) {
            let tableCell = tableRow.childNodes[x]; //content tr > tableCell
            if (this.fixedColumnIndex != -1) {
                if(x > this.fixedColumnIndex && x < startColumnIndex) continue;
            }
            else { if(x < startColumnIndex) continue; }
            let column = this.columns[x];

            let layout = this.data_panel30[i].layout[column[grid.column_id]];
            let colValue = this.tbs_getLayoutData(i, column[grid.column_id], this.layout_text);

            if (tableCell.style.textAlign       != column[grid.column_align])          tableCell.style.textAlign = column[grid.column_align];
            if (tableCell.style.width           != column[grid.column_width] + 'px')   tableCell.style.width = column[grid.column_width] + 'px';
            if (tableCell.style.backgroundImage != '')                                 tableCell.style.backgroundImage = '';
            if (tableCell.style.display         != '')                                 tableCell.style.display = '';
            if (tableCell.rowSpan != '1') tableCell.rowSpan = '1';
            tableCell.style.display = layout[grid.layout_visible] == true ? '' : 'none';
            tableCell.rowSpan       = layout[grid.layout_rowspan];

            let selectedValue = this.tbs_isSelectedCell(panelName, i, x);
            if (selectedValue == 1) {
                if (this.startRowIndex == i && this.startCellIndex == x) {
                    //console.log(`selectedValue ${selectedValue}`)
                    tableCell.classList.add('tbs-grid-cell-start');
                }
                else {
                    //console.log(`tbs-grid-cell-select : ${selectedValue}`)
                    tableCell.classList.add('tbs-grid-cell-select');
                }
            }
            if (tableCell.childNodes[0].textContent != colValue) tableCell.childNodes[0].textContent = colValue;
        }
        for (let x = 0; x <= lastColumnIndex; x++) {
            let tableCell = tableRow.childNodes[x];
            if (this.fixedColumnIndex != -1 && x <= this.fixedColumnIndex) {
                if(tableCell.style.display != 'none') tableCell.style.display = 'none';
            }
        }
        tableRowIndex += 1;
    }
    // hidden : Unnecessary tableRows
    this.tbs_hiddenTableRows(panelName, tableRows, tableRowIndex, this.pageRowCount);

    // panel21 : display rowCount
    if (param.panelName == 'panel30') document.querySelector(selector + ' .tbs-grid-panel21 td div').textContent = this.tbs_getRowCount();
}
TbsGrid.prototype.tbs_setDataSummaryTable = function (param) {
    // param : { panelName, summaryColumns }
    let selector = '#' + this.gridId;
    let grid = this;

    let panelName = param.panelName;
    let summaryColumns = param.summaryColumns;

    if (summaryColumns.length == 0) return;

    //=============================================================
    let summaryRow = JSON.parse(JSON.stringify(this.data_source[0].data));
    for (let i = 0, colCount = summaryColumns.length; i < colCount; i++) {
        let col = summaryColumns[i];
        if (col[grid.column_type] == 'number') {
            summaryRow[col[grid.column_id]] = 0;
        }
    }
    //============================================================= summary
    for (let rowIndex = 0, len = this.data_panel30.length; rowIndex < len; rowIndex++) {
        let row = this.data_panel30[rowIndex].data;
        for (let i = 0, colCount = summaryColumns.length; i < colCount; i++) {
            let column = summaryColumns[i];
            if (column[grid.column_type] == 'number') {
                let columnId = column[grid.column_id];
                summaryRow[columnId] += parseFloat(row[columnId]);
            }
        }
    }
    //============================================================= summary : sum, avg calculate
    let rowCount = this.data_panel30.length;
    for (let i = 0, colCount = summaryColumns.length; i < colCount; i++) {
        let column = summaryColumns[i];
        if (column[grid.column_type] == 'number' && column[grid.column_summary] == 'avg') {
            let columnId = column[grid.column_id];
            summaryRow[columnId] = summaryRow[columnId] / rowCount;
        }
    }
    //============================================================= display Data
    let cells  = document.querySelectorAll(selector + ` .tbs-grid-${panelName} .tbs-grid-cell`);
    let colList= document.querySelectorAll(selector + ` .tbs-grid-${panelName} thead th`);
    for (let i = 0, len = this.columns.length; i < len; i++) {
        let column = this.columns[i];
        let columnId = column[grid.column_id];
        let cell = cells[i];
        colList[i].style.width = column[grid.column_width] + 'px';
        cell.childNodes[0].textContent = '';

        for (let x = 0, len2 = summaryColumns.length; x < len2; x++){
            let summaryColumn = summaryColumns[x];
            if (columnId == summaryColumn[grid.column_id]) {
                if (column[grid.column_type] == 'number') {
                    cell.childNodes[0].textContent = this.tbs_render(column, summaryRow[columnId]).text;
                    break;
                }
                else {
                    cell.childNodes[0].textContent = summaryColumn[grid.column_text];
                    break;
                }
            }
        }
    }
}
TbsGrid.prototype.tbs_setDataHeaderTable1 = function(param) {}
TbsGrid.prototype.tbs_setDataHeaderTable2 = function(param) {}
TbsGrid.prototype.tbs_setDataHeaderTable3 = function(param) {
    //param : { panelName }
    let selector = '#' + this.gridId;
    let grid = this;

    let panelName = param.panelName;
    //=============================================================	 header th
    //let thList20 = document.querySelectorAll(selector + ' .tbs-grid-' + panelName + ' .tbs-grid-table thead th');
    //for (let i = 0, len = this.columns.length; i < len; i++) {
    //    let column = this.columns[i];
    //    if (this.fixedColumnIndex != -1) {
    //        if (i <= this.fixedColumnIndex) {
    //            thList20[i].style.width   = '0px';
    //            thList20[i].style.display = 'none';
    //        }
    //    }
    //    else {
    //        thList20[i].style.width   = (column[grid.column_visible] == true) ? parseInt(column[grid.column_width]) + 'px' : '0px';
    //        thList20[i].style.display = (column[grid.column_visible] == true) ? '' : 'none';
    //    }
    //}
    //=============================================================	 header tr
    let tablesRows = document.querySelectorAll(selector + ' .tbs-grid-' + panelName + ' .tbs-grid-table tbody tr');
    if (this.fixedColumnIndex != -1){
        for (let i = 0, rowLen = tablesRows.length; i < rowLen; i++) {
            let tableRow = tablesRows[i];
            tableRow.style.height = this.headerRowHeight + 'px';
            for (let x = 0, colLen = this.columns.length; x < colLen; x++) {
                let header = this.headerColumns[i][x];
                let cell = tableRow.childNodes[x];

                if (x <= this.fixedColumnIndex){
                    cell.style.textAlign = header[grid.header_align];
                    cell.dataset.id = (header[grid.column_kind] == 'column') ? header[grid.column_id] : '';
                    cell.colSpan = header[grid.column_colspan];
                    cell.rowSpan = header[grid.column_rowspan];
                    cell.style.display = 'none';
                    cell.childNodes[0].childNodes[0].textContent = header[grid.column_text];
                }
                else if (x == this.fixedColumnIndex + 1) {
                    cell.style.textAlign = header[grid.header_align];
                    cell.dataset.id = (header[grid.column_kind] == 'column') ? header[grid.column_id] : '';
                    cell.colSpan = header[grid.column_subColspan];
                    cell.rowSpan = header[grid.column_subRowspan];
                    cell.style.display = '';
                    cell.childNodes[0].childNodes[0].textContent = header[grid.column_text];
                }
                else {
                    cell.style.textAlign = header[grid.header_align];
                    cell.dataset.id = (header[grid.column_kind] == 'column') ? header[grid.column_id] : '';
                    cell.colSpan = header[grid.column_colspan];
                    cell.rowSpan = header[grid.column_rowspan];
                    cell.style.display = (header[grid.column_visible] == true) ? '' : 'none';
                    cell.childNodes[0].childNodes[0].textContent = header[grid.column_text];
                }
            }
        }
    }
    else {
        for (let i = 0, rowLen = tablesRows.length; i < rowLen; i++) {
            let tableRow = tablesRows[i];
            tableRow.style.height = this.headerRowHeight + 'px';
            for (let x = 0, colLen = this.columns.length; x < colLen; x++) {
                let header = this.headerColumns[i][x];
                let tableCell = tableRow.childNodes[x];

                let selectedValue = this.tbs_isSelectedHeaderCell(panelName, x);
                //console.log(`selectedValue ${selectedValue}`);
                if (selectedValue == 1) tableCell.classList.add('tbs-grid-cell-select');

                tableCell.style.textAlign = header[grid.header_align];
                tableCell.dataset.id = (header[grid.column_kind] == 'column') ? header[grid.column_id] : '';
                tableCell.colSpan = header[grid.column_colspan];
                tableCell.rowSpan = header[grid.column_rowspan];
                tableCell.style.display = (header[grid.column_visible] == true) ? '' : 'none';
                tableCell.childNodes[0].childNodes[0].textContent = header[grid.column_text]; //header.header_headerName + ' : ' + header[grid.column_subRowspan] + '-' + header[grid.column_subColspan];
            }
        }
    }
}
TbsGrid.prototype.tbs_setAlternativeRowColor = function (panelName, tableRow, rowIndex) {
    return;
    tableRow.classList.remove('tbs-grid-tr-bg', 'tbs-grid-tr-bg2');
    if (rowIndex % 2) tableRow.classList.add('tbs-grid-tr-bg2');
    else tableRow.classList.add('tbs-grid-tr-bg');
}
TbsGrid.prototype.tbs_hiddenTableRows = function (panelName, tableRows, fromRowIndex, toRowIndex) {
    for (let i = fromRowIndex; i < toRowIndex; i++) {
        let tableRow = tableRows[i];
        if (tableRow) {
            if (tableRow.style.display != 'none') tableRow.style.display = 'none';
        }
    }
}
TbsGrid.prototype.tbs_setDataTableCellLine = function(panelName, tableCell, param, rowIndex, cellIndex) {
    // function : display selected lines
    let selector = '#' + this.gridId;
    let grid = this;
    let tableCellDiv = tableCell.childNodes[0];

    tableCellDiv.classList.remove('.tbs-grid-cell-line-top');
    tableCellDiv.classList.remove('.tbs-grid-cell-line-bottom');
    tableCellDiv.classList.remove('.tbs-grid-cell-line-left');
    tableCellDiv.classList.remove('.tbs-grid-cell-line-right');

    let selectedValueBefore = this.tbs_isSelectedCell(panelName, i, x);
    let selectedValue = this.tbs_isSelectedCell(panelName, i, x);
    let selectedValueAfter = this.tbs_isSelectedCell(panelName, i, x);

    if (selectedValue == 1) {
        if (rowIndex == this.startRowIndex && cellIndex == this.startCellIndex) tableCell.classList.add('tbs-grid-cell-start');
        // top : previos rowIndex check
        grid.tbs_isSelectedCell(panelName, i, x);

        tableCellDiv.classList.add('.tbs-grid-cell-line-top');
        tableCellDiv.classList.add('.tbs-grid-cell-line-bottom');
        tableCellDiv.classList.add('.tbs-grid-cell-line-left');
        tableCellDiv.classList.add('.tbs-grid-cell-line-right');
    }
}