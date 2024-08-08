/**
 * @function tbs_createTreeData
 *
 * @description create tree data
 * @param dataRows
 * @returns {*[]}
 */
TbsGridTree.prototype.tbs_createTreeData = function(dataRows) {
    let selector = '#' + this.gridId;
    let grid = this.grid;
    let tree = this;

    let nodeRows = [];
    let lastRows = [];

    dataRows.map(row => nodeRows.push(grid.tbs_copyJson(row)));

    const fn_getChildrenRowIds = function(nodeRow) {
        nodeRow['children'] = [];
        for (let i = 0, len = nodeRows.length; i < len; i++) {
            if (nodeRow[tree.options['childColumnId']] == nodeRows[i][tree.options['parentColumnId']]) {
                nodeRow['children'].push(nodeRows[i][grid.const_rowId]);
            }
        }
    }
    const fn_addChildrenRows = function(row, depth = 1) {
        fn_getChildrenRowIds(row); // return rowId Array
        let arr = row['children'];
        row['depth'] = depth;

        if (arr.length > 0) {
            for (let i = 0, len = nodeRows.length; i < len; i++) {
                let nodeRow = nodeRows[i];
                if (arr.indexOf(nodeRow[grid.const_rowId]) != -1) fn_addChildrenRows(nodeRow, depth + 1);
            }
        }
        else {
            lastRows.push(grid.tbs_copyJson(row));
        }
    }
    for (let i = 0, len = nodeRows.length; i < len; i++) {
        let nodeRow = nodeRows[i];
        if (tree.options['rootValue'] == nodeRow[tree.options['parentColumnId']]) {
            fn_addChildrenRows(nodeRow);
        }
    }
    return lastRows;
}
TbsGridTree.prototype.tbs_setTreeOption = function (property, value) {
    let selector = '#' + this.gridId;
    let grid = this.grid;
    let tree = this;

    tree.options[property] = value;
}
TbsGridTree.prototype.tbs_setTreeOptions = function (options) {
    let selector = '#' + this.gridId;
    let grid = this.grid;
    let tree = this;

    for (let key in options) tree.tbs_setTreeOptions(key, options[key]);
}
/**
 * @function tbs_setTreeSortColumns
 *
 * @description set sort columnId, columnOrder
 * @param sortColumns : [{ id : userName, order : asc }, { id : userName, order : asc }]
 */
TbsGridTree.prototype.tbs_setTreeSortColumns = function (sortColumns) {
    let selector = '#' + this.gridId;
    let grid = this.grid;
    let tree = this;
    this.sortColumns = grid.tbs_copyJson(sortColumns);
}
/**
 * @function tbs_setTreeData
 *
 * @description set data in tree grid
 * @param data : json data
 * @param isPartData : true, false
 */
TbsGridTree.prototype.tbs_setTreeData = function (data, isPartData= false) {
    let selector = '#' + this.gridId;
    let grid = this.grid;
    let tree = this;

    grid.const_grid_mode = grid.code_tree;
    if (grid.null(data)) return;

    grid.data_provider = [];
    grid.data_source = [];

    grid.data_panel31 = [];
    grid.data_panel30 = [];

    grid.data_select_panel30 = [];
    grid.data_select_panel31 = [];

    let columns = grid.columns;
    let dataRows= data;

    dataRows.map((dataRow, rowIndex) => dataRow[grid.const_rowId] = rowIndex);

    // 1) data sorting (to do : sorting)

    // 2) data setting
    dataRows = grid.tree.tbs_createTreeData(dataRows);

    dataRows.map((dataRow, i) => {
        let data= {};
        data['num']   = parseInt(i + 1);
        data[grid.const_mode]  = '';
        data[grid.const_rowId] = dataRow[grid.const_rowId];
        grid.data_panel31.push(data);
    });

    let count = dataRows.length;
    for (let i = 0; i < count; i++) {
        let provider = {};
        let source = {};
        let data30 = {};
        let row = dataRows[i];

        provider[grid.const_rowId] = source[grid.const_rowId] = data30[grid.const_rowId] = row[grid.const_rowId];
        provider[grid.const_mode]  = source[grid.const_mode]  = data30[grid.const_mode]  = '';// S, U, I, D, blank

        provider.data = {};
        source.data = {}; source.layout = {};
        data30.data = {}; data30.layout = {};

        for (let colIndex= 0, len= columns.length; colIndex < len; colIndex++) {
            let col = columns[colIndex];
            let id  = col[grid.column_id];
            let val = grid.null(row[id]) ? null : grid.tbs_renderCode(col, row[id]);
            provider.data[id] = row[id];
            let colType = columns[colIndex][grid.column_type];

            source.data[id] = val;
            data30.data[id] = val;

            source.layout[id] = {};
            source.layout[id][grid.layout_visible] = col[grid.column_visible]; //for merge cell
            source.layout[id][grid.layout_text] = grid.tbs_renderText(col, row[id]);
            source.layout[id][grid.layout_rowspan] = 1;
            source.layout[id][grid.layout_colspan] = 1;
            source.layout[id][grid.layout_subrowspan] = 1;
            source.layout[id][grid.layout_subcolspan] = 1;
            source.layout[id][grid.layout_color]     = '';
            source.layout[id][grid.layout_background]= '';

            data30.data[id] = val;
            data30.layout[id] = {};
            data30.layout[id][grid.layout_visible] = col[grid.column_visible];
            data30.layout[id][grid.layout_text] = grid.tbs_renderText(col, row[id]);
            data30.layout[id][grid.layout_rowspan] = 1;
            data30.layout[id][grid.layout_colspan] = 1;
            data30.layout[id][grid.layout_subrowspan] = 1;
            data30.layout[id][grid.layout_subcolspan] = 1;
            data30.layout[id][grid.layout_color]     = '';
            data30.layout[id][grid.layout_background]= '';

        }
        grid.data_provider.push(provider);
        grid.data_source.push(source);
        grid.data_panel30.push(data30);
    }

    grid.maxRowId = dataRows.length;

    document.querySelector(selector + ' .tbs-grid-panel10-filter').value = '';
    if (dataRows.length == 0) {
        document.querySelector(selector + ' .tbs-grid-panel21 td div').textContent = '0';
        grid.tbs_setScroll(grid.const_vertical);
        grid.tbs_displayPanel30(0);
    }
    else {
        document.querySelector(selector + ' .tbs-grid-panel21 td div').textContent = dataRows.length;
        grid.tbs_setScroll(grid.const_vertical);
        grid.tbs_displayPanel30(0);
        grid.tbs_displayPanel40('panel40', grid.topColumns);
        grid.tbs_displayPanel50('panel50', grid.footerColumns);
    }
    if (grid.options[grid.option_colSizeType] == 'auto')  grid.colSizeType();

    grid.tbs_clearRange(0, -1);
    grid.tbs_selectedRange(0, 0, 0, 0);
}