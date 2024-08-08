/**
 * tbs.grid.function.js
 *
 */
//======================================================
//
// User Event
//
//======================================================
TbsGrid.prototype.click = function (userFunction) {
    this.user_click.push(userFunction);
}
TbsGrid.prototype.dblclick = function (userFunction) {
    this.user_dblclick.push(userFunction);
}
TbsGrid.prototype.edit = function (userFunction) {
    this.user_edit = userFunction;
}
//======================================================
//
// grid
//
//======================================================
TbsGrid.prototype.setToolbar = function (toolbar) {
    this.tbs_setToolbar(toolbar);
}
TbsGrid.prototype.setGrid = function (columns, options) {
    this.tbs_setGrid(columns, options);
}
/**
 * @function setData
 *
 * @description set data or set cell data
 * @param object : column object or json data
 * @param id
 * @param value
 */
TbsGrid.prototype.setData = function (object, id, value) {
    if (arguments.length == 1) this.tbs_setGridData(object);
    if (arguments.length == 3) this.tbs_setData(object, id, value)
}

//======================================================
//
// column, rows
//
//======================================================
TbsGrid.prototype.getValue = function (rowIndex, columnId) {
    return this.tbs_getValue(rowIndex, columnId);
}
TbsGrid.prototype.getText = function (rowIndex, columnId) {
    return this.tbs_getText(rowIndex, columnId);
}
TbsGrid.prototype.setValue = function (rowIndex, columnId, value) {
    this.tbs_setValue(rowIndex, columnId, value);
}
TbsGrid.prototype.applyData = function () {
    this.tbs_applyData();
}
TbsGrid.prototype.getRowCount = function () {
    return this.tbs_getRowCount();
}
TbsGrid.prototype.getRows = function () {
    return this.tbs_getRows();
}
TbsGrid.prototype.getSelectedRow = function () {
    return this.tbs_getSelectedRow();
}
TbsGrid.prototype.setRange = function (rowIndex1, toRowIndex2, columnIndex1, columnIndex2) {
    this.tbs_selectedRange(rowIndex1, toRowIndex2, columnIndex1, columnIndex2);
}
TbsGrid.prototype.selectRange = function (rowIndex1, toRowIndex2, columnIndex1, columnIndex2) {
    this.tbs_selectedRange(rowIndex1, toRowIndex2, columnIndex1, columnIndex2);
}
TbsGrid.prototype.getCheckedRows = function () {
    return this.tbs_getCheckedRows();
}
TbsGrid.prototype.getChangedRowsData = function () {
    return this.tbs_getChangedRowsData();
}
TbsGrid.prototype.getDeletedRowsData = function () {
    return this.tbs_getDeletedRowsData();
}
TbsGrid.prototype.getUpdatedRowsData = function () {
    return this.tbs_getUpdatedRowsData();
}
TbsGrid.prototype.getInsertRowsData = function () {
    return this.tbs_getInsertedRowsData();
}
//================================================================
//
// add row, remove row
//
//================================================================
TbsGrid.prototype.addRow = function (row, type = 'bottom') {
    //type : first, last, up, down
    this.tbs_addRow(row, type);
}
TbsGrid.prototype.removeRows = function (rows) {
    this.tbs_removeRows(rows);
}
//================================================================
//
// set column property
//
//================================================================
TbsGrid.prototype.setColumn = function (columnId, columnProperty, value) {
    this.tbs_setColumn(columnId, columnProperty, value);
}
TbsGrid.prototype.setColumnByType = function (columnType, columnProperty, value) {
    this.tbs_setColumnByType(columnType, columnProperty, value);
}
//======================================================
//
// column, rows
//
//======================================================
TbsGrid.prototype.setTopColumns = function (topColumns) {
    this.tbs_setTopColumns(topColumns)
}
TbsGrid.prototype.setFooterColumns = function (footerColumns) {
    this.tbs_setFooterColumns(footerColumns)
}
//======================================================
//
// Frozen
//
//======================================================
TbsGrid.prototype.setFrozenColumn = function(fixedColumnIndex) {
    this.tbs_setFrozenColumn(fixedColumnIndex);
}
TbsGrid.prototype.setFrozenRow = function(fixedRowIndex) {
    let fixedRowCount = fixedRowIndex + 1;
    this.tbs_setFrozenRow(fixedRowIndex, fixedRowCount);
}
TbsGrid.prototype.removeFrozenColumn = function() {
    this.tbs_removeFrozenColumn();
}
TbsGrid.prototype.removeFrozenRow = function() {
    this.tbs_removeFrozenRow();
}

/** ==========================================================
 *
 * Tree Functions
 *
 * ==========================================================*/
TbsGrid.prototype.setTreeOption = function (property, value) {
    if (this.tree) this.tree.tbs_setTreeOption(property, value);
    else {
        this.tree = new TbsGridTree(this);
        this.tree.tbs_setTreeOption(property, value);
    }
}
TbsGrid.prototype.setTreeOptions = function (options) {
    if (this.tree) this.tree.tbs_setTreeOptions(options);
    else {
        this.tree = new TbsGridTree(this);
        this.tree.tbs_setTreeOptions(options);
    }
}
TbsGrid.prototype.setTreeData = function (data, isPartData= false) {
    if (this.tree) this.tree.tbs_setTreeData(data, isPartData);
    else {
        this.tree = new TbsGridTree(this);
        this.tree.tbs_setTreeData(data, isPartData);
    }
}
TbsGrid.prototype.setTreeSortColumn = function (sortColumn) {
    if (this.tree)
        this.tree.tbs_setTreeSortColumns(sortColumn);
    else {
        this.tree = new TbsGridTree(this);
        this.tree.tbs_setTreeSortColumns(sortColumn);
    }
}
