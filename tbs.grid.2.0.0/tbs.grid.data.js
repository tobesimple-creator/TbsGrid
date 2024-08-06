/**
 * [tobesimple grid] tbs.grid.2.0.0.data.js
 *
 * Copyrightⓒ2022 by tobesimple.net. All rights reserved.
 */
//================================================================
//
// Common
//
//================================================================
TbsGrid.prototype.tbs_setGridData = function (data) {
    let selector = '#' + this.gridId;
    let grid = this;

    if (data == undefined) return;
    let column = this.columns;
    this.data_insert = [];
    this.data_update = [];
    this.data_delete = [];
    //=============================================================
    // [start] data 생성
    //=============================================================
    this.data_panel31 = [];		    //view - filter
    this.data_select_panel30 = [];  //select color : value 0, 1	   , display field만 관리
    this.data_select_panel31 = [];	//view - filter
    for (let rowIndex = 0; rowIndex < data.length; rowIndex++) {
        data[rowIndex]['rowId'] = rowIndex; //data : rowId 추가
    }
    for (let rowIndex = 0; rowIndex < data.length; rowIndex++) {
        let data31 = {};
        data31['num']   = parseInt(rowIndex + 1);
        data31['mode']  = ''; 	//insert, update, delete 표시를 위해
        data31['rowId'] = data[rowIndex]['rowId'];
        this.data_panel31.push(data31);
    }
    //=============================================================
    this.data_provider = [];
    this.data_source = [];
    this.data_panel30 = [];
    let count = data.length;
    for (let i = 0; i < count; i++) {
        let provider = {};
        let source = {};
        let data30 = {};
        let row = data[i];

        provider.rowId = row['rowId'];
        source.rowId = row['rowId'];
        data30.rowId = row['rowId'];

        provider.mode = ''; // S, U, I, D, blank 로 구성. mode = 'S' 는 merge 일 경우 필요
        source.mode = '';
        data30.mode   = '';

        provider.data = {};
        source.data = {};
        source.layout = {};

        data30.data = {};
        data30.layout = {};

        for (let colIndex = 0, len = column.length; colIndex < len; colIndex++) {
            let col = column[colIndex];
            let id  = col[grid.column_id];
            //=============================================
            // 여기 상당히 중요한데,
            // data 는 null 허용
            // 숫자도 문자로 들어가야 함 => getValue시 숫자는 숫자로 반환. 값이 없으면 0.
            //=============================================
            let val = this.null(row[id]) ? null : this.tbs_renderCode(col, row[id]);
            provider.data[id] = row[id];
            let colType = column[colIndex][grid.column_type];

            source.data[id] = val;
            data30.data[id] = val;

            source.layout[id] = {};
            source.layout[id][grid.layout_visible] = col[grid.column_visible]; //for merge cell
            source.layout[id][grid.layout_text] = this.tbs_renderText(col, row[id]);
            source.layout[id][grid.layout_rowspan] = 1;
            source.layout[id][grid.layout_colspan] = 1;
            source.layout[id][grid.layout_subrowspan] = 1;
            source.layout[id][grid.layout_subcolspan] = 1;
            source.layout[id][grid.layout_color]     = '';
            source.layout[id][grid.layout_background]= '';

            data30.data[id]   = val;
            data30.layout[id] = {};
            data30.layout[id][grid.layout_visible] = col[grid.column_visible];
            data30.layout[id][grid.layout_text] = this.tbs_renderText(col, row[id]);
            data30.layout[id][grid.layout_rowspan] = 1;
            data30.layout[id][grid.layout_colspan] = 1;
            data30.layout[id][grid.layout_subrowspan] = 1;
            data30.layout[id][grid.layout_subcolspan] = 1;
            data30.layout[id][grid.layout_color]     = '';
            data30.layout[id][grid.layout_background]= '';

        }
        this.data_provider.push(provider);
        this.data_source.push(source);
        this.data_panel30.push(data30);
    }
    this.maxRowId = data.length;
    //=============================================================
    // [end] data 생성
    //=============================================================

    document.querySelector(selector + ' .tbs-grid-panel10-filter').value = '';
    this.tbs_clearRange(0, -1);
    this.tbs_selectedRange(0, 0, 0, 0);

    if (data.length == 0) {
        document.querySelector(selector + ' .tbs-grid-panel21 td div').textContent = '0';
        this.tbs_displayPanel30(0);
        this.tbs_setScroll(this.const_vertical);
    }
    else {
        document.querySelector(selector + ' .tbs-grid-panel21 td div').textContent = data.length;
        this.tbs_displayPanel30(0);
        this.tbs_setScroll(this.const_vertical);
        this.tbs_displayPanel40('panel40', this.topColumns);
        this.tbs_displayPanel50('panel50', this.footerColumns);
    }
    if (this.options[grid.option_colSizeType] == 'auto'){
        this.colSizeType();
    }
}
TbsGrid.prototype.tbs_refreshRefData = function () {
    let selector = '#' + this.gridId;
    let grid = this;

    let data = this.data_panel30;
    //=============================================================
    //view 기준으로 left, data_select_panel31, select 재생성
    //=============================================================
    this.data_panel31 = [];		    //view - filter
    this.data_select_panel30 = [];  // select color : value 0, 1	   , display field만 관리
    this.data_select_panel31 = [];	//view - filter

    for (let rowIndex = 0; rowIndex < data.length; rowIndex++) {
        let itemSelect = {};
        let itemLeftSelect = {};
        let itemLeftView = {};
        itemSelect.num = rowIndex + 1;
        itemSelect.rowId = data[rowIndex]['rowId'];
        itemSelect.data = new Uint8ClampedArray([]); //new

        itemLeftView['num'] = rowIndex + 1;
        itemLeftView['mode'] = ''; //insert, update, delete 표시를 위해
        itemLeftView['rowId'] = data[rowIndex]['rowId'];

        itemLeftSelect['num'] = 0;
        itemLeftSelect['mode'] = 0; //insert, update, delete 표시를 위해
        itemLeftSelect['rowId'] = data[rowIndex]['rowId'];

        this.data_panel31.push(itemLeftView);
        this.data_select_panel30.push(itemSelect);
        this.data_select_panel31.push(itemLeftSelect);
    }
    this.tbs_clearRange(0, -1);
    this.tbs_displayPanel30(0);
}
TbsGrid.prototype.tbs_displayDataView = function(matrix, type) {
    if (type == 'groupView') {
        let table = document.createElement('table');
        //table.style.width = '100%'
        table.style.border = '1px solid black';
        table.style.borderSpacing = '1px';
        table.style.padding = '1px';
        for (let i = 0, len = matrix.length; i < len; i++) {
            let row = matrix[i];
            let tr = document.createElement('tr');
            for (let x = 0, len2 = this.columns.length; x < len2; x++) {
                let col = matrix[i][this.columns[x].column_id];
                let td = document.createElement('td');
                td.style.border = '1px solid black';
                td.style.width = '100px';
                td.style.background = (col.srow != -1) ? 'yellow' : '';
                td.innerHTML  = '(' + i + ',' + x + ')<br/>'
                td.innerHTML += 'col.column_id 		:' + col.column_id 		+ '<br/>'
                td.innerHTML += 'col.srow 		:' + col.srow 		+ '<br/>'
                td.innerHTML += 'col.erow 		:' + col.erow 		+ '<br/>'
                td.innerHTML += 'col.node 		:' + col.node 		+ '<br/>'
                td.innerHTML += 'col.parentNode :' + col.parentNode + '<br/>'
                td.innerHTML += 'col.firstChild :' + col.firstChild + '<br/>'
                td.innerHTML += 'col.lastChild :' + col.lastChild + '<br/>'
                tr.appendChild(td);
            }
            table.appendChild(tr);
        }

        if (document.querySelectorAll('#showData').length > 0) {
            document.querySelector('#showData').innerHTML = '';
            document.querySelector('#showData').innerHTML = table.outerHTML;
        }
        else {
            let div = document.createElement('div');
            div.id = 'showData';
            div.appendChild(table);
            document.body.appendChild(div);
        }
    }
    if (type == 'layout') {
        let table = document.createElement('table');
        //table.style.width = '100%'
        table.style.border = '1px solid black';
        table.style.borderSpacing = '1px';
        table.style.padding = '1px';
        for (let i = 0, len = matrix.length; i < len; i++) {
            let row = matrix[i];
            let tr = document.createElement('tr');
            for (let x = 0, len2 = this.columns.length; x < len2; x++) {
                let col = matrix[i].layout[this.tbs_getColumnId(x)];
                let td = document.createElement('td');
                td.style.border = '1px solid black';
                td.style.width = '100px';
                let node = (col.node == undefined) ? -1 : col.node;
                td.style.background = (node != -1) ? 'yellow' : '';
                td.innerHTML  = '(' + i + ',' + x + ')<br/>';
                td.innerHTML += 'col.srow 		:' + col.srow 		+ '<br/>'
                td.innerHTML += 'col.erow 		:' + col.erow 		+ '<br/>'
                td.innerHTML += 'col.depth	    :' + matrix[i].depth+ '<br/>';
                td.innerHTML += 'col.mode	    :' + matrix[i].mode + '<br/>';
                td.innerHTML += 'col.rowSpan	:' + col.rowSpan    + '<br/>';
                td.innerHTML += 'col.subRowSpan	:' + col.subRowSpan + '<br/>';
                td.innerHTML += 'col.visible    :' + col.visible    + '<br/>';
                td.innerHTML += 'col.text       :' + col.text       + '<br/>';
                td.innerHTML += 'col.mergeClass :' + col.mergeClass + '<br/>';
                tr.appendChild(td);
            }
            table.appendChild(tr);
        }
        document.write(table.outerHTML);
    }
}
//================================================================
//
// Column Value
//
//================================================================
TbsGrid.prototype.tbs_applyData = function () {
    this.tbs_displayPanel30(this.tbs_getFirstRowIndex());
}
TbsGrid.prototype.tbs_getValue = function (rowIndex, id) {
    let columnType = this.tbs_getColumn(id)[this.column_type];
    if (columnType == 'number') return Number(this.data_panel30[rowIndex].data[id]);
    else return this.data_panel30[rowIndex].data[id];
}
TbsGrid.prototype.tbs_getText = function (rowIndex, id) {
    return this.data_panel30[rowIndex].layout[id][this.layout_text];
}
TbsGrid.prototype.tbs_getValueByIndex = function (rowIndex, colIndex) {
    let columnId = this.tbs_getColumnId(colIndex);
    return this.tbs_getValue(rowIndex, columnId);
}
TbsGrid.prototype.tbs_setValue = function (rowIndex, id, value) {
    let selector = '#' + this.gridId;
    let grid = this;
    this.tbs_setData(rowIndex, id, value);
    this.tbs_displayPanel30(this.tbs_getFirstRowIndex());
}
TbsGrid.prototype.tbs_setValueByIndex = function (rowIndex, cellIndex, value) {
    rowIndex = parseInt(rowIndex);
    cellIndex = parseInt(cellIndex);
    let id = this.tbs_getColumnId(cellIndex);
    this.tbs_setValue(rowIndex, id, value);
}
TbsGrid.prototype.tbs_setData = function (rowIndex, id, value) {
    let selector = '#' + this.gridId;
    let grid = this;

    let cellIndex = this.tbs_getColumnIndex(id);
    let oldValue = this.data_panel30[rowIndex].data[id];
    let mode = this.data_panel30[rowIndex].mode;

    let result = this.tbs_render(this.columns[cellIndex], value);
    if (mode == 'I') {
        if (oldValue != result.value) {
            this.data_panel30[rowIndex].data[id] = result.value;
            this.tbs_setLayoutData(rowIndex, id, result.text, this.layout_text);
            let rowId = this.data_panel30[rowIndex].rowId;
            for (let i = 0; i < this.data_source.length; i++) {
                if (rowId == this.data_source[i].rowId) {
                    this.data_source[i].data[id] = result.value;
                    this.data_source[i].mode = 'I';
                    break;
                }
            }
        }
    }
    else {
        if (oldValue != result.value) {
            this.data_panel30[rowIndex].data[id] = result.value;
            this.data_panel30[rowIndex].mode = 'U';

            this.tbs_setLayoutData(rowIndex, id, result.text, this.layout_text);

            let rowId = this.data_panel30[rowIndex].rowId;
            for (let i = 0; i < this.data_source.length; i++) {
                if (rowId == this.data_source[i].rowId) {
                    this.data_source[i].data[id] = result.value;
                    this.data_source[i].mode = 'U';
                    break;
                }
            }
        }
    }
}
TbsGrid.prototype.tbs_setDataByIndex = function (rowIndex, cellIndex, value) {
    rowIndex = parseInt(rowIndex);
    cellIndex = parseInt(cellIndex);
    let id = this.tbs_getColumnId(cellIndex);
    this.tbs_setData(rowIndex, id, value);
}
//================================================================
//
// Rows
//
//================================================================
TbsGrid.prototype.tbs_createRow = function (row) {
    let selector = '#' + this.gridId;
    let grid = this;

    let columns = this.columns;
    this.maxRowId = this.maxRowId + 1;
    let rowId = this.maxRowId;

    let source = {}; source.rowId = rowId; source.mode = 'I'; source.data = {}; source.layout = {};
    let data30 = {}; data30.rowId = rowId; data30.mode = 'I'; data30.data = {}; data30.layout = {};
    let data31 = {}; data31['num'] = 0; data31['rowId'] = rowId;

    for (let i = 0, len = columns.length; i < len; i++) {
        let column = columns[i];
        let id = column[grid.column_id];
        source.data[id] = this.null(row[id]) ? null : row[id];
        source.layout[id] = {};
        source.layout[id][grid.layout_visible] = column[grid.layout_visible];
        source.layout[id][grid.layout_rowspan] = 1;
        source.layout[id][grid.layout_colspan] = 1;
        source.layout[id][grid.layout_subrowspan] = 1;
        source.layout[id][grid.layout_subcolspan] = 1;
        source.layout[id][grid.layout_color]      = '';
        source.layout[id][grid.layout_background] = '';
        source.layout[id][grid.layout_text] = this.tbs_renderText(column, row[id]);

        data30.data[id] = this.null(row[id]) ? null : row[id];
        data30.layout[id] = {};
        data30.layout[id][grid.layout_visible] = column[grid.layout_visible];
        data30.layout[id][grid.layout_rowspan] = 1;
        data30.layout[id][grid.layout_colspan] = 1;
        data30.layout[id][grid.layout_subrowspan] = 1;
        data30.layout[id][grid.layout_subcolspan] = 1;
        data30.layout[id][grid.layout_color]      = '';
        data30.layout[id][grid.layout_background] = '';
        data30.layout[id][grid.layout_text] = this.tbs_renderText(column, row[id]);
    }
    return { source : source, data30 : data30, data31 : data31 };
}
TbsGrid.prototype.tbs_getRowCount = function () {
    return this.data_panel30.length;
}
TbsGrid.prototype.tbs_getRow = function (rowIndex) {
    if (rowIndex < 0 || rowIndex >= this.data_panel30.length) return {};
    return JSON.parse(JSON.stringify(this.data_panel30[rowIndex]));
}
TbsGrid.prototype.tbs_getRowById = function (rowId) {
    let result = {};
    for (let i = 0, len = this.data_panel30.length; i < len; i++) {
        if (this.data_panel30[i].rowId == rowId) {
            result = JSON.parse(JSON.stringify(this.data_panel30[i]));
            break;
        }
    }
    return result;
}
TbsGrid.prototype.tbs_getRows = function (startRowIndex, endRowIndex) {
    let result = [];
    let rows = this.data_panel30;
    if (arguments.length == 0) {
        startRowIndex = 0;
        endRowIndex = rows.length;
    } else {
        if (len == 0 || startRowIndex < 0) return result;
        if (endRowIndex >= len) return result;
        if (endRowIndex == -1) endRowIndex = len - 1;
    }
    rows.map(row => {
        result.push(JSON.parse(JSON.stringify(row)));
    });
    return result;
}
TbsGrid.prototype.tbs_getSelectedRow = function () {
    let data = this.tbs_getSelectedRows();
    return (data.length > 0) ? data[0] : null;
}
TbsGrid.prototype.tbs_getSelectedRows = function () {
    let result = [];
    let len = this.data_panel30.length;
    for (rowIndex = 0; rowIndex < len; rowIndex++) {
        let item = {};
        item.rowId = this.data_panel30[rowIndex].rowId;
        item.mode = this.data_panel30[rowIndex].mode;
        item.rowIndex = rowIndex;
        item.data = JSON.parse(JSON.stringify(this.data_panel30[rowIndex].data));
        if (this.tbs_isSelectedCell31(rowIndex, 0) == 1) result.push(item);
    }
    return result;
}
TbsGrid.prototype.tbs_getCheckedRows = function () {
    let selector = '#' + this.gridId;
    let grid = this;

    let result = [];
    for (let i = 0, len = this.data_panel30.length; i < len; i++) {
        let row = this.data_panel30[i];
        if (row.check) {
            result.push(JSON.parse(JSON.stringify(row)));
        }
    }
    return result;
}
TbsGrid.prototype.tbs_validateTopRowIndex = function (panelName, topRowIndex) {
    // function : Validate Top rowIndex
    //
    // @panelName   : panel area name
    // @topRowIndex : topRowIndex
    //
    // @return : topRowIndex
    let selector = '#' + this.gridId;
    let grid = this;

    if (panelName == 'panel30' || panelName == 'panel31') {
        if (this.fixedRowIndex != -1) {
            // topRowIndex : 50 부터 시작
            // 번호 : 51 부터 시작

            // topRowIndex2는 0 부터 시작하는 topRowIndex
            let topRowIndex2 = topRowIndex - (this.fixedRowIndex + 1);
            let rowCount = this.tbs_getRowCount() - (this.fixedRowIndex + 1); //242 - 50 = 192 개

            if (this.pageRowCount > this.pageIntRowCount) {
                if (topRowIndex2 > (rowCount - this.pageRowCount + 1)) {
                    topRowIndex2 = rowCount - this.pageRowCount;
                    if (topRowIndex2 < 0) topRowIndex2 = 0;
                }
            }
            else {
                if (topRowIndex2 > (rowCount - this.pageRowCount)) {
                    topRowIndex2 = rowCount - this.pageRowCount;
                    if (topRowIndex2 < 0) topRowIndex2 = 0;
                }
            }
            if (topRowIndex2 < 0) topRowIndex2 = 0;
            //복구
            topRowIndex = topRowIndex2 + (this.fixedRowIndex + 1);
        }
        else {
            let rowCount = this.tbs_getRowCount();
            if (this.pageRowCount > this.pageIntRowCount) {
                if (topRowIndex > (rowCount - this.pageRowCount + 1)) {
                    topRowIndex = rowCount - this.pageRowCount;
                    if (topRowIndex < 0) topRowIndex = 0;
                }
            }
            else {
                if (topRowIndex > (rowCount - this.pageRowCount)) {
                    topRowIndex = rowCount - this.pageRowCount;
                    if (topRowIndex < 0) topRowIndex = 0;
                }
            }
            if (topRowIndex < 0) topRowIndex = 0;
        }
    }
    else if (panelName == 'panel60') {
        let rowCount = this.fixedRowCount;
        if (topRowIndex > (rowCount - this.fixedRowCount)) {
            topRowIndex = rowCount - this.fixedRowCount;
            if (topRowIndex < 0) topRowIndex = 0;
        }
        if (topRowIndex < 0) topRowIndex = 0;
    }
    return topRowIndex;
}
TbsGrid.prototype.tbs_validateBottomRowIndex = function (panelName, topRowIndex) {
    // function : Validate Bottom rowIndex
    //
    // @panelName   : panel area name
    // @topRowIndex : topRowIndex
    //
    // @return : bottomRowIndex
    let selector = '#' + this.gridId;
    let grid = this;
    let bottomRowIndex = 0;

    if (this.fixedRowIndex != -1) {
        if (panelName == 'panel31' || panelName == 'panel32' || panelName == 'panel30') {
            let rowCount = this.tbs_getRowCount() - (this.fixedRowIndex + 1);
            let displayTopRowIndex = topRowIndex - (this.fixedRowIndex + 1);
            bottomRowIndex = displayTopRowIndex + this.tbs_getPageRowCount(panelName) - 1;
            if (bottomRowIndex > rowCount - 1) bottomRowIndex = rowCount - 1;
            bottomRowIndex = bottomRowIndex + (this.fixedRowIndex + 1);
            //console.log(`tbs_validateBottomRowIndex ${panelName} this.pageRowCount ${this.pageRowCount} topRowIndex ${topRowIndex} bottomRowIndex ${bottomRowIndex}`);
        }
        else if (panelName == 'panel61' || panelName == 'panel62' || panelName == 'panel60') {
            bottomRowIndex = topRowIndex + this.fixedRowCount - 1;
            if (bottomRowIndex > this.fixedRowCount - 1) bottomRowIndex = this.fixedRowCount - 1;
            //console.log(`tbs_validateBottomRowIndex ${panelName} this.pageRowCount ${this.pageRowCount} topRowIndex ${topRowIndex} bottomRowIndex ${bottomRowIndex}`);
        }
    }
    else {
        bottomRowIndex = topRowIndex + this.pageRowCount - 1;
        if (bottomRowIndex > this.tbs_getRowCount() - 1) bottomRowIndex = this.tbs_getRowCount() - 1;
    }
    return bottomRowIndex;
}
TbsGrid.prototype.tbs_getPageRowCount = function (panelName) {
    // function : Validate Bottom rowIndex
    //
    // @panelName   : panel area name
    // @topRowIndex : topRowIndex
    //
    // @return : bottomRowIndex
    let selector = '#' + this.gridId;
    let grid = this;

    if (panelName == 'panel61' || panelName == 'panel62' || panelName == 'panel60') {
        return this.fixedRowCount;
    }
    else {
        return this.pageRowCount;
    }
}
TbsGrid.prototype.tbs_getChangedRowsData_ref = function () {
    let grid = this;

    let d = this.data_source;
    let c = d.length;
    let result = [];
    for (let i = 0; i < c; i++) {
        let r = d[i];
        if (r.mode != 'U' && r.mode != 'I') continue;
        if (r.mode == 'U') {
            let column = this.columns;
            for (let key in r.data) {
                for (let x = 0; x < column.length; x++) {
                    let c = column[x];
                    if (key == c[grid.column_id] && c[grid.column_required] == true && c[grid.column_autosize] != true) {
                        let value = r.data[key].replace(/ /gi, '');
                        if (value == '') { alert('필수 값을 입력해주십시요'); return; }
                    }
                }
            }
        }
        if (r.mode == 'I') {
            // I 일 경우...(pilsu 이면서 column_autosize항목 제외하고) pilsu 항목 모두가 빠져 있을 경우는 continue 시킨다.
            let column = this.columns;
            let colCheckCount = 0;
            let colCount = 0;
            for (let key in r.data) {
                for (let x = 0; x < column.length; x++) {
                    let c = column[x];
                    if (key == c[grid.column_id]) {
                        if (c[grid.column_required] == true && c[grid.column_autosize] != true) {
                            colCount += 1;
                            let value = r.data[key].replace(/ /gi, '');
                            if (value != '') colCheckCount += 1;
                        }
                    }
                }
            }
            if (colCount > colCheckCount) { alert('필수 값을 모두 입력해주십시요'); return; }
        }
        let item = JSON.parse(JSON.stringify(d[i]));
        result.push(item);
    }
    return result;
}
TbsGrid.prototype.tbs_getChangedRowsData = function () {
    let result = [];
    let rows = this.tbs_getDeletedRowsData();
    for (let i = 0, len = rows.length; i < len; i++) {
        result.push(rows[i]);
    }
    rows = this.tbs_getUpdatedRowsData();
    for (let i = 0, len = rows.length; i < len; i++) {
        result.push(rows[i]);
    }
    rows = this.tbs_getInsertedRowsData();
    for (let i = 0, len = rows.length; i < len; i++) {
        result.push(rows[i]);
    }
    return result;
}
TbsGrid.prototype.tbs_getDeletedRowsData = function () {
    let rows = this.data_delete;
    let result = [];
    for (let i = 0, len = rows.length; i < len; i++) {
        let row = rows[i];
        let item = JSON.parse(JSON.stringify(row.data));
        item.tbs_rowId = row.rowId;
        item.tbs_mode = row.mode;
        result.push(item);
    }
    return result;
}
TbsGrid.prototype.tbs_getUpdatedRowsData = function () {
    let rows = this.data_source;
    let result = [];
    for (let i = 0, len = rows.length; i < len; i++) {
        let row = rows[i];
        if (row.mode == 'U') {
            let item = JSON.parse(JSON.stringify(row.data));
            item.tbs_rowId = row.rowId;
            item.tbs_mode = row.mode;
            result.push(item);
        }
    }
    return result;
}
TbsGrid.prototype.tbs_getInsertedRowsData = function () {
    let rows = this.data_source;
    let result = [];
    for (let i = 0, len = rows.length; i < len; i++) {
        let row = rows[i];
        if (row.mode == 'I') {
            let item = JSON.parse(JSON.stringify(row.data));
            item[this.const_rowId] = row.rowId;
            item[this.const_mode ] = row.mode;
            result.push(item);
        }
    }
    return result;
}
TbsGrid.prototype.tbs_addRow = function (row, type = 'bottom') {
    //type : top, bottom, up, down
    let selector = '#' + this.gridId;
    let grid = this;

    let columns = this.columns;
    let rowId = this.maxRowId + 1;
    this.maxRowId = rowId;

    let json = this.tbs_createRow(row);
    let source = json.source;
    let data30 = json.data30;
    let data31 = json.data31;

    let rowIndexList = this.tbs_getSelectedRowIndex();
    if (rowIndexList.length == 0) type = 'bottom';

    if (type == 'top') {
        this.data_source.unshift(source);
        this.data_panel30.unshift(data30);
        this.data_panel31.unshift(data31);

        let topRowIndex = 0;

        this.tbs_setScroll(this.const_vertical);
        this.tbs_setBarPosition(this.const_vertical, topRowIndex); //topRowIndex에 따라.
        this.tbs_clearRange(0, -1);
        this.tbs_selectedRange(topRowIndex, topRowIndex);
        this.tbs_displayPanel30(topRowIndex);
        return;
    }
    if (type == 'bottom') {
        this.data_source.push(source);
        this.data_panel30.push(data30);
        this.data_panel31.push(data31);

        let dataLength = this.data_panel30.length;
        let topRowIndex = this.tbs_getFirstRowIndex();

        topRowIndex = dataLength - this.pageRowCount;
        if (topRowIndex < 0) topRowIndex = 0;
        if (this.pageRowCount > this.pageIntRowCount) {
            topRowIndex = topRowIndex + 1;
        }
        this.tbs_setScroll(this.const_vertical);
        this.tbs_setBarPosition(this.const_vertical, topRowIndex);
        this.tbs_clearRange(0, -1);
        this.tbs_selectedRange(dataLength - 1, dataLength - 1);
        //this.tbs_displayPanel30(topRowIndex);
        return;
    }
    if (type == 'up') {
        let minRowIndex = rowIndexList[0];
        this.data_source.splice(minRowIndex, 0, source);//첫번째 파라미터로 추가할 값이 들어갈 index를 지정하고,두번째 파라미터는 0으로 지정하고 (삭제할 원소가 0개)
        this.data_panel30.splice(minRowIndex, 0, data30);
        this.data_panel31.splice(minRowIndex, 0, data31);
        //this.insertData.push(insertItem);

        let lastRowIndex = this.data_panel30.length - 1;
        let topRowIndex = this.tbs_getFirstRowIndex();

        this.tbs_setScroll(this.const_vertical);
        this.tbs_setBarPosition(this.const_vertical, topRowIndex); //topRowIndex에 따라.
        this.tbs_clearRange(0, -1);
        this.tbs_selectedRange(minRowIndex, minRowIndex);
        //this.tbs_displayPanel30(topRowIndex);
        return;
    }
    if (type == 'down') {
        let minRowIndex = rowIndexList[0];
        let addRowIndex = minRowIndex + 1;
        if (minRowIndex == this.data_panel30.length - 1) {	//마지막 row 일 경우
            this.data_source.push(source);
            this.data_panel30.push(data30);
            this.data_panel31.push(data31);
            addRowIndex = minRowIndex + 1;
        }
        else {
            this.data_source.splice(addRowIndex, 0, source);//첫번째 파라미터로 추가할 값이 들어갈 index를 지정하고,두번째 파라미터는 0으로 지정하고 (삭제할 원소가 0개)
            this.data_panel30.splice(addRowIndex, 0, data30);
            this.data_panel31.splice(addRowIndex, 0, data31);
        }

        this.tbs_clearRange(0, -1);
        this.tbs_selectedRange(addRowIndex, addRowIndex);

        if (this.pageRowCount > this.pageIntRowCount) {
            if (addRowIndex == this.tbs_getLastRowIndex()) {
                this.tbs_moveCell('down');

                this.tbs_clearRange(0, -1);
                this.tbs_selectedRange(addRowIndex, addRowIndex);

                this.tbs_setScroll(this.const_vertical);
                this.tbs_setBarPosition(this.const_vertical, this.tbs_getFirstRowIndex()); //topRowIndex에 따라.
            }
        }
    }
}
TbsGrid.prototype.tbs_removeRows = function (rows) {
    // let rows = this.tbs_getSelectedRows();
    let selector = '#' + this.gridId;
    let grid = this;

    if (this.null(rows) || rows.length == 0) return;

    let data = this.data_panel30;

    //삭제되기전 rowid를 앞과 뒤를 찾자(기본적으로 뒤를 찾는다)
    let prevRowId = -1;
    let nextRowId = -1;
    let nextRowIndex = -1;

    for (let i = 0; i < data.length; i++) { 	//next rowIndex를 찾기
        if (data[i].rowId == rows[rows.length - 1].rowId) { nextRowIndex = i + 1; break; }
    }

    nextRowIndex = (nextRowIndex > data.length - 1) ? nextRowIndex - 1 : nextRowIndex;
    nextRowId = data[nextRowIndex].rowId;

    //Data 삭제
    data = this.data_source;
    for (let i = data.length - 1; i >= 0; i--) { for (let x = rows.length - 1; x >= 0; x--) { if (data[i].rowId == rows[x].rowId) { data.splice(i, 1); break; } } }

    data = this.data_panel30;
    for (let i = data.length - 1; i >= 0; i--) {
        for (let x = rows.length - 1; x >= 0; x--) {
            if (data[i].rowId == rows[x].rowId) { data.splice(i, 1); break; }
        }
    }
    //==============================================
    data = this.data_panel31;
    for (let i = data.length - 1; i >= 0; i--) { for (let x = rows.length - 1; x >= 0; x--) { if (data[i].rowId == rows[x].rowId) { data.splice(i, 1); break; } } }
    //==============================================
    data = this.data_delete;
    for (let i = data.length - 1; i >= 0; i--) { for (let x = rows.length - 1; x >= 0; x--) { if (data[i].rowId == rows[x].rowId) { data.splice(i, 1); break; } } }
    for (let i = 0; i < rows.length; i++) {
        if (rows[i].mode == '' || rows[i].mode == 'U') { rows[i].mode = 'D'; data.push(rows[i]); }
    }
    //==============================================
    let deleteFirstRowIndex = rows[0].rowIndex;
    let topRowIndex = this.tbs_getFirstRowIndex();
    //==============================================
    this.tbs_refreshRefData();
    //==============================================
    data = this.data_panel30;
    let realStartRowIndex = deleteFirstRowIndex;
    if (realStartRowIndex < 0) realStartRowIndex = 0;
    if (realStartRowIndex > this.data_panel30.length - 1) {
        realStartRowIndex = this.data_panel30.length - 1;
    }
    this.tbs_setScroll(this.const_vertical);
    this.tbs_clearRange(0, -1);
    this.tbs_selectedRange(realStartRowIndex, realStartRowIndex, 0, 0);
    //this.tbs_displayPanel30(topRowIndex);
    this.tbs_setBarPosition(this.const_vertical, this.tbs_getFirstRowIndex());

    if (this.pageRowCount > this.pageIntRowCount) {
        let lastRowIndex = this.tbs_getLastRowIndex();
        if (realStartRowIndex == lastRowIndex) {
            this.tbs_setBarPositionByDirection('down');
            this.tbs_setScroll(this.const_vertical);
            this.tbs_setBarPosition(this.const_vertical, this.tbs_getFirstRowIndex()); //topRowIndex에 따라.

        }
    }
}
//================================================================
//
// Row Index
//
//================================================================
TbsGrid.prototype.tbs_getFirstDisplayRowIndex = function (panelName = '') {
    let selector = '#' + this.gridId;
    let grid = this;

    if (this.data_panel30.length == 0) return -1;

    let trList = document.querySelectorAll(selector + ' .tbs-grid-panel31 .tbs-grid-table tbody tr');
    let displayRowIndex = parseInt(trList[0].childNodes[0].dataset.displayRowIndex);

    if (isNaN(displayRowIndex)) displayRowIndex = 0;
    return displayRowIndex;
}
TbsGrid.prototype.tbs_getFirstRowIndex = function (panelName = '') {
    // return : topRowIndex
    let selector = '#' + this.gridId;
    let grid = this;

    if (this.data_panel30.length == 0) return -1;

    let trList = document.querySelectorAll(selector + ' .tbs-grid-panel31 .tbs-grid-table tbody tr');
    let topRowIndex = parseInt(trList[0].childNodes[0].dataset.rowIndex);

    if (panelName == '') {
        if (grid.fixedRowIndex != -1) {
            if (isNaN(topRowIndex)) topRowIndex = grid.fixedRowIndex + 1;
            return topRowIndex;
        }
        else {
            if (isNaN(topRowIndex)) topRowIndex = 0;
            return topRowIndex;
        }
    }
}
TbsGrid.prototype.tbs_getLastRowIndex = function () {
    let selector = '#' + this.gridId;
    let grid = this;

    if (this.data_panel30.length == 0) return -1;
    let trList = document.querySelectorAll(selector + ' .tbs-grid-panel30 .tbs-grid-table tbody tr:not([style*="display: none"])');
    let topRowIndex = this.tbs_getFirstRowIndex();
    return topRowIndex + trList.length - 1;
}
TbsGrid.prototype.tbs_getLastTableRowIndex = function () {
    let selector = '#' + this.gridId;
    let grid = this;

    let trList = document.querySelectorAll(selector + ' .tbs-grid-panel30 .tbs-grid-table tbody tr:not([style*="display: none"])');
    return parseInt(trList.length) - 1;
}
TbsGrid.prototype.tbs_getSelectedRowIndex = function() {
    let result = [];
    for (rowIndex = 0, len = this.data_panel30.length; rowIndex < len; rowIndex++) {
        if (this.tbs_isSelectedCell31(rowIndex, 0) == 1) result.push(rowIndex);
    }
    return result;
}
//================================================================
//
// Layout Data
//
//================================================================
TbsGrid.prototype.tbs_getLayoutData = function (rowIndex, id, type) {
    return this.data_panel30[rowIndex].layout[id][type];
}
TbsGrid.prototype.tbs_setLayoutData = function(rowIndex, id, value, type) {
    let result =  this.tbs_renderText(this.columns[this.tbs_getColumnIndex(id)], value);
    this.data_panel30[rowIndex].layout[id][type] = result;
    return result;
}
//================================================================
//
// isSelectedCell
//
//================================================================
TbsGrid.prototype.tbs_isSelectedCell = function (panelName, rowIndex, cellIndex) {
    //selected 1, 0
    let result = 0;
    let rows = [];
    if      (panelName == 'panel31') rows = this.data_select_panel31;
    else if (panelName == 'panel32') rows = this.data_select_panel30;
    else if (panelName == 'panel30') rows = this.data_select_panel30;

    else if (panelName == 'panel41') rows = this.data_select_panel41;
    else if (panelName == 'panel42') rows = this.data_select_panel42;
    else if (panelName == 'panel40') rows = this.data_select_panel40;

    else if (panelName == 'panel51') rows = this.data_select_panel51;
    else if (panelName == 'panel52') rows = this.data_select_panel52;
    else if (panelName == 'panel50') rows = this.data_select_panel50;

    else if (panelName == 'panel61') rows = this.data_select_panel31;
    else if (panelName == 'panel62') rows = this.data_select_panel30;
    else if (panelName == 'panel60') rows = this.data_select_panel30;
    else rows = this.data_select_panel30;

    for (let i = 0, len= rows.length; i < len; i++) {
        let row = rows[i];
        if (rowIndex == row[0][0]) {
            result = row[1][cellIndex];
            break;
        }
    }
    return result;
}
TbsGrid.prototype.tbs_isSelectedHeaderCell = function (panelName, cellIndex) {
    //selected 1, 0
    let result = 0;
    let rows = this.data_select_panel30;

    for (let i = 0, len= rows.length; i < len; i++) {
        let row = rows[i];
        if (row[1][cellIndex] == 1) {
            result = row[1][cellIndex];
            break;
        }
    }
    return result;
}
TbsGrid.prototype.tbs_isSelectedCell31 = function (rowIndex, cellIndex) {
    //selected 1, 0
    let result = 0;
    let rows = this.data_select_panel31;
    for (let i = 0, len= rows.length; i < len; i++) {
        let row = rows[i];
        if (rowIndex == row[0][0]) {
            result = row[1][cellIndex];
            break;
        }
    }
    return result;
}
TbsGrid.prototype.tbs_isSelectedCell30 = function (rowIndex, cellIndex) {
    //selected 1, 0
    let result = 0;
    let rows = this.data_select_panel30;
    for (let i = 0, len= rows.length; i < len; i++) {
        let row = rows[i];
        if (rowIndex == row[0][0]) {
            result = row[1][cellIndex];
            break;
        }
    }
    return result;
}

