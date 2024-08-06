/**
 * tbs.grid.sort.js
 *
 */
TbsGrid.prototype.setSort = function (sortColumns, display) {
    let grid = this;
    let view = this.data_panel30;
    //============================================================= Filter 데이타 삭제
    //for (let i = data_panel30.length - 1; i >= 0; i--) { if (data_panel30[i].mode == 'S') { data_panel30.splice(i, 1); }}
    //=============================================================
    // for (let i = 0, len = data_panel30.length; i < len; i++) {
    // 	let row = data_panel30[i];
    // 	if (row.mode != 'S') continue;
    // 	if (!!row.layout) row.layout = {};
    // 	for (let x = 0, len = column.length; x < len; x++) {
    // 		row.layout[column[i][grid.column_id]] = {};
    // 		row.layout[column[i][grid.column_id]][grid.column_visible] = true;
    // 		row.layout[column[i][grid.column_id]].rowSpan = 1;
    // 	}
    // }
    this.sortColumns = sortColumns;
    let len = sortColumns.length;
    if (len == 0) return;
    this.data_panel30.sort(function (a, b) {
        for (let i = 0; i < len; i++) {
            let row = sortColumns[i];
            let type = (grid.tbs_getColumn(row.id))[grid.column_type];
            // null value check
            if (row['order'] == 'asc') {
                if (type == 'number'){
                    let x = a.data[row.id] != null && isNaN(a.data[row.id]) == false ? Number(a.data[row.id].toString().replace(/\,/g, '')): 0;
                    let y = b.data[row.id] != null && isNaN(b.data[row.id]) == false ? Number(b.data[row.id].toString().replace(/\,/g, '')): 0;
                    if (x < y) return -1;
                    if (x > y) return 1;
                }
                else {
                    if ((a.data[row.id] == null ? '' : a.data[row.id]).toString().toLowerCase() < (b.data[row.id] == null ? '' : b.data[row.id]).toString().toLowerCase()) return -1;
                    if ((a.data[row.id] == null ? '' : a.data[row.id]).toString().toLowerCase() > (b.data[row.id] == null ? '' : b.data[row.id]).toString().toLowerCase()) return 1;
                }
            }
            else if (row['order'] == 'desc') {
                if (type == 'number'){
                    let x = a.data[row.id] != null && isNaN(a.data[row.id]) == false ? Number(a.data[row.id].toString().replace(/\,/g, '')) : 0;
                    let y = b.data[row.id] != null && isNaN(b.data[row.id]) == false ? Number(b.data[row.id].toString().replace(/\,/g, '')) : 0;
                    if (x < y) return 1;
                    if (x > y) return -1;
                }
                else {
                    if ((a.data[row.id] == null ? '' : a.data[row.id]).toString().toLowerCase() < (b.data[row.id] == null ? '' : b.data[row.id]).toString().toLowerCase()) return 1;
                    if ((a.data[row.id] == null ? '' : a.data[row.id]).toString().toLowerCase() > (b.data[row.id] == null ? '' : b.data[row.id]).toString().toLowerCase()) return -1;
                }
            }
        }
    });
    if (display == undefined || display) this.tbs_displayPanel30(0);
}