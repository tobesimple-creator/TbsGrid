/**
 * tbs.grid.column.js
 *
 * Copyrightⓒ2022 by tobesimple.net. All rights reserved.
 *
 */
/*
[과제]
1) rows / data : getRows, getRowsData 로 분리
2) getRowsData -> tbs_mode, tbs_rowId
3) layout property -> 존재 할 수도 있고 없을 수도 있다.

data_panel30 - data
     - layout : 불필요한 항목은 사용하지 말 것.
     data와 layout 동등 레벨

 */
/*
    column_id          = 'id';
    column_name        = 'name';
    column_type        = 'type';       // string, number, date, combo, year, month, checkbox
    column_width       = '100';
    column_editable    = false;        // reaonly false 가 기본인데...말이 좀 이상하잖아. 기본적으로 우리는 웹에서는 readonly 이어야 해.
    column_visible     = true;         // default : true
    column_align       = 'align';      // left, center, right
    column_scale       = '18,0';       // 0, 2, 4, 6, 7 로 표시함 ...'p', 'n', 'f', 'f2'  사용안함  18,4로 변경함.
    column_scaletype   = 'round';      // round, ceil, floor
    column_scalefixed  = true;         // default : true 고정
    column_scalemax    = '9999999999'; // max value => maxValue, 입력시 사용
    column_scalemin    = '0';          // min value => minValue, 입력시 사용
    column_comma       = '3';          // 0 없음 (default 3)
    column_zero 	   = false    ;
    column_resizable      = true     ;
    column_sort    	   = true     ;
    column_sumHeader   = ''       ;
    column_sumFooter   = ''       ;
    column_required    = ''       ;

    column_combo       = [];


}
 */
/*
    ======================================================== 나중에 하자.
    * History Data : ctr + z, y는 추후에.

    [data_history]
    { mode : 'U', seq  : 9, data : {}, grid : 'grid1' }

    mode = U, I, D
    seq = 1, 2, 3, 4, 5, 6, 7, 8, (행위 순서)
    row
        ㄴ 행추가    : rowId, data { 컬럼1, 컬럼2, ... }
        ㄴ 행삭제    : rowId, data { 컬럼1, 컬럼2, ... }
        ㄴ 컬럼 수정 : rowId, data { 수정된 컬럼 }

    data_insert : data_source  에서 mode I - getNewRows()
    data_update : data_source  에서 mode U - getUpdateRows()
    date_delete : data_history 에서 mode D - getRemoveRows()

    [data_history 갱신]

    tbs_setData()시 History Data 초기화
    ========================================================

    추후에 해도 상관 없는듯.
    layout : { readonly, editable, visible }
    property : num_property   { scale, sacleType, scaleMax, scaleMin }
    column.
    header.

    0 or null 일 경우 빈공백
    type =  string,
            number  : 정수
            decimal : 소수점 있는그대로 표현
            scale   : 18,4
            thousand : true(기본값), false
    scaleMax =  999999
    scaleMin = -999999
*/

TbsGrid.prototype.tbs_createColumn = function (userColumns) {
    let selector = '#' + this.gridId;
    let grid = this;

    let columns = [];
    const getColumnList = function (userColumns) {
        const searchColumn = function (node) {
            if (grid.notNull(node[grid.column_id])) {
                let column = {};
                //user column value
                if (grid.notNull(node[grid.column_id         ])) { column[grid.column_id         ] = grid.tbs_trim(node[grid.column_id]); }
                if (grid.notNull(node[grid.column_text       ])) { column[grid.column_text       ] = node[grid.column_text       ]; }
                if (grid.notNull(node[grid.column_type       ])) { column[grid.column_type       ] = grid.tbs_trim(node[grid.column_type]); }
                if (grid.notNull(node[grid.column_width      ])) { column[grid.column_width      ] = node[grid.column_width      ]; }
                if (grid.notNull(node[grid.column_editable   ])) { column[grid.column_editable   ] = node[grid.column_editable   ]; }
                if (grid.notNull(node[grid.column_visible    ])) { column[grid.column_visible    ] = node[grid.column_visible    ]; }
                if (grid.notNull(node[grid.column_align      ])) { column[grid.column_align      ] = node[grid.column_align      ]; }
                if (grid.notNull(node[grid.column_scale      ])) { column[grid.column_scale      ] = node[grid.column_scale      ]; }
                if (grid.notNull(node[grid.column_scaletype  ])) { column[grid.column_scaletype  ] = node[grid.column_scaletype  ]; }
                if (grid.notNull(node[grid.column_scalefixed ])) { column[grid.column_scalefixed ] = node[grid.column_scalefixed ]; }
                if (grid.notNull(node[grid.column_scalemax   ])) { column[grid.column_scalemax   ] = node[grid.column_scalemax   ]; }
                if (grid.notNull(node[grid.column_scalemin   ])) { column[grid.column_scalemin   ] = node[grid.column_scalemin   ]; }
                if (grid.notNull(node[grid.column_comma      ])) { column[grid.column_comma      ] = node[grid.column_comma      ]; }
                if (grid.notNull(node[grid.column_zero       ])) { column[grid.column_zero       ] = node[grid.column_zero       ]; }
                if (grid.notNull(node[grid.column_resizable  ])) { column[grid.column_resizable  ] = node[grid.column_resizable  ]; }
                if (grid.notNull(node[grid.column_sort       ])) { column[grid.column_sort       ] = node[grid.column_sort       ]; }
                if (grid.notNull(node[grid.column_autosize   ])) { column[grid.column_autosize   ] = node[grid.column_autosize   ]; }
                if (grid.notNull(node[grid.column_combo      ])) { column[grid.column_combo      ] = node[grid.column_combo      ]; }
                if (grid.notNull(node[grid.column_format     ])) { column[grid.column_format     ] = node[grid.column_format     ]; }

                //default column value
                if (grid.null(node[grid.column_type       ])) column[grid.column_type       ] = grid.const_column_type      ;
                if (grid.null(node[grid.column_width      ])) column[grid.column_width      ] = grid.const_column_width     ;
                if (grid.null(node[grid.column_editable   ])) column[grid.column_editable   ] = grid.const_column_editable  ;
                if (grid.null(node[grid.column_visible    ])) column[grid.column_visible    ] = grid.const_column_visible   ;
                if (grid.null(node[grid.column_align      ])) column[grid.column_align      ] = grid.const_column_align     ;
                if (grid.null(node[grid.column_scale      ])) column[grid.column_scale      ] = grid.const_column_scale     ;
                if (grid.null(node[grid.column_scaletype  ])) column[grid.column_scaletype  ] = grid.const_column_scaletype ;
                if (grid.null(node[grid.column_scalefixed ])) column[grid.column_scalefixed ] = grid.const_column_scalefixed;
                if (grid.null(node[grid.column_scalemax   ])) column[grid.column_scalemax   ] = grid.const_column_scalemax  ;
                if (grid.null(node[grid.column_scalemin   ])) column[grid.column_scalemin   ] = grid.const_column_scalemin  ;
                if (grid.null(node[grid.column_comma      ])) column[grid.column_comma      ] = grid.const_column_comma     ;
                if (grid.null(node[grid.column_zero       ])) column[grid.column_zero       ] = grid.const_column_zero      ;
                if (grid.null(node[grid.column_resizable  ])) column[grid.column_resizable  ] = grid.const_column_resizable ;
                if (grid.null(node[grid.column_sort       ])) column[grid.column_sort       ] = grid.const_column_sort      ;
                if (grid.null(node[grid.column_autosize   ])) column[grid.column_autosize   ] = grid.const_column_autosize  ;
                if (grid.null(node[grid.column_combo      ])) column[grid.column_combo      ] = grid.const_column_combo     ;
                if (grid.null(node[grid.column_format     ])) column[grid.column_format     ] = grid.const_column_format    ;

                columns.push(column);
            }
            else node[grid.column_children].map(n => searchColumn(n));
        }
        userColumns.map(userColumn => searchColumn(userColumn, null));
    }
    getColumnList(userColumns);
    //===================================================
    //columns validation => type = number, string, combo, date
    //===================================================
    columns.map(column => {
        if (grid.tbs_empty(column[grid.column_id])) grid.tbs_error(`column's id is not exist`);
        if (grid.tbs_empty(column[grid.column_text])) grid.tbs_error(`column's text is not exist`);
        if (grid.tbs_isNotValidColumnType(column[grid.column_type])) grid.tbs_error(`column's type [${column[grid.column_type]}] is not valid`);
        // if (column[grid.column_type] == 'number' && grid.null(column[grid.column_align])) column[grid.column_align] = 'right';
        // else if (grid.null(column[grid.column_align])) =
        // else
    });
    this.columns = columns;
}
TbsGrid.prototype.tbs_getColumn = function (id) {
    let cellIndex = this.tbs_getColumnIndex(id);
    return this.columns[cellIndex];
}
TbsGrid.prototype.tbs_getColumnByIndex = function (colIndex) {
    return this.columns[colIndex];
}
TbsGrid.prototype.tbs_getColumnId = function (colIndex) {
    return this.columns[colIndex][this.column_id];
}
TbsGrid.prototype.tbs_getColumnIndex = function (id) {
    let grid = this;

    let column = this.columns;
    for (let i = 0, len = column.length; i < len; i++) {
        if (id == column[i][grid.column_id]) {
            return i;
        }
    }
    return -1;
}
TbsGrid.prototype.tbs_getHeaderColumn = function (id) {
    let gird = this;
    let result;
    let columns = this.columns;
    for (let i = 0; i < column.length; i++) {
        if (columns[i][grid.column_id] == id) { result = columns[i]; break; }
    }
    return result;
}
TbsGrid.prototype.tbs_setColumn = function (columnId, property, value) {
    let column = this.tbs_getColumn(columnId);
    column[property] = value;
}
TbsGrid.prototype.tbs_setColumnByType = function (columnType, property, value) {
    let grid = this;
    let columns = this.columns;
    for (let i = 0, len = columns.length; i < len; i++) {
        let column = columns[i];
        if (column[grid.column_type] == columnType) column[property] = value;
    }
}
TbsGrid.prototype.tbs_isNotValidColumnType = function (columnType) {
    let arr = ['string', 'number', 'combo', 'date'];
    return arr.indexOf(columnType) == -1 ? true : false;
}
//================================================================
//
// set column : sort, group, summary top, summary bottom
//
//================================================================
TbsGrid.prototype.tbs_setSortColumn = function (sortColumn) {
    this.sortColumn = Object.keys(sortColumn).length == 0 ? [] : sortColumn;
}
TbsGrid.prototype.tbs_setGroupColumn = function (groupColumn) {
    this.groupColumn = Object.keys(groupColumn).length == 0 ? [] : groupColumn;
    if (Object.keys(this.sortColumn).length == 0) this.sortColumn = Object.keys[sortColumn].length == 0 ? [] : groupColumn;
}
TbsGrid.prototype.tbs_setTopColumns = function (topColumns) {
    let selector = '#' + this.id;
    let grid = this;

    this.topColumns = topColumns;
}
TbsGrid.prototype.tbs_setFooterColumns = function (footerColumns) {
    let selector = '#' + this.id;
    let grid = this;

    this.footerColumns = footerColumns;
}
//================================================================
//
// Table Cell
//
//================================================================
TbsGrid.prototype.tbs_getSelectedTableCell = function (rowIndex, cellIndex) {
    let selector = '#' + this.gridId;
    let grid = this;

    let td = null;
    let startRowIndex;
    let startCellIndex;
    if (arguments.length == 0) {
        startRowIndex  = this.startRowIndex;
        startCellIndex = this.startCellIndex;
    }
    else {
        startRowIndex = rowIndex;
        startCellIndex = cellIndex;
    }
    if (startRowIndex == -1 || startCellIndex == -1) return;
    let trList = document.querySelectorAll(selector + ' .tbs-grid-panel31 table tbody tr');
    let trContentList = document.querySelectorAll(selector + ' .tbs-grid-panel30 table tbody tr');
    for (let i = 0; i < trList.length; i++) {
        let tr = trList[i];
        let dataRowIndex = parseInt(tr.childNodes[0].childNodes[0].innerText) - 1;
        if (dataRowIndex == startRowIndex) {
            let td = trContentList[i].childNodes[startCellIndex];
            break;
        }
    }
    return td;
};
TbsGrid.prototype.tbs_getRowIndexInTable = function (tableRowIndex, panelName = 'panel31') {
    // return : data rowIndex in existing table
    let selector = '#' + this.gridId;
    let grid = this;

    let leftPanelName = panelName;
    if (panelName == 'panel61' || panelName == 'panel62'  || panelName == 'panel60') leftPanelName = 'panel61';
    else leftPanelName = 'panel31';

    let tableRows = document.querySelectorAll(selector + ' .tbs-grid-' + leftPanelName + ' .tbs-grid-table tr');
    //console.log(`tbs_getRowIndexInTable :: ${panelName} : rowIndex ${tableRows[tableRowIndex].childNodes[0].dataset.rowIndex} `);
    return parseInt(tableRows[tableRowIndex].childNodes[0].dataset.rowIndex);

}
TbsGrid.prototype.tbs_getLeftTableCell = function (rowIndex, panel = 'panel31') {1
    // return : find table cell by rowIndex
    let selector = '#' + this.gridId;
    let grid = this;

    let result = null;
    let tableRows = document.querySelectorAll(selector + ' .tbs-grid-' + panel + ' .tbs-grid-table tbody tr:not([style*="display:"])');
    for (let i = 0, len = tableRows.length; i <len; i++) {
        let tableRow= tableRows[i];
        let index= parseInt(tableRow.childNodes[0].childNodes[0].innerText) - 1;
        if (index == rowIndex) { result = tableRow.childNodes[0]; break; }
    }
    return result;
}
