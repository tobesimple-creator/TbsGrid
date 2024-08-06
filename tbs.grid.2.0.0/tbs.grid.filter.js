/**
 * [tobesimple grid] tbs.grid.2.0.0.js
 *
 * Copyrightⓒ2022 by tobesimple.net. All rights reserved.
 */
TbsGrid.prototype.totalFilterSearch = function (s) {
    let grid = this;
    let filterArray = [];
    //=============================================================  set filterArray
    let arr = this.tbs_trim(s).split(' ');
    for (let i = 0; i < arr.length; i++) {
        if (this.tbs_trim(arr[i]) !== '') {
            filterArray.push(arr[i].toLowerCase());
        }
    }
    //=============================================================
    const data = this.data_source.filter(function(item) {
        let bool = true;
        let count = [];
        for (let i = 0; i < filterArray.length; i++) {
            count[i] = 0;
        }
        let columnArray = [];
        for (let key in item.data){
            let column = grid.tbs_getColumn(key);
            if (column[grid.column_visible] === false) continue;
            else columnArray.push(item.data[key]);
        }
        //columnArray = Object.values(item.data);

        if (filterArray.length === 0) {
            return true;
        }
        else {
            filterArray.forEach(function(cond, i) {
                for (let colIndex = 0, len = columnArray.length; colIndex < len; colIndex++) {
                    if (columnArray[colIndex] == null) count[i] = count[i];
                    else {
                        count[i] = columnArray[colIndex].toString().toLowerCase().includes(cond) === true ? count[i] + 1 : count[i];
                    }
                }
            })
            for (let i = 0; i < filterArray.length; i++) {
                if (count[i] == 0) { bool = false; break; }
            }
            return bool;
        }
    });
    if (data.length > 0) {
        this.data_panel30 = JSON.parse(JSON.stringify(data));
        if (this.merge) this.setGroup(this.sortColumns, this.groupColumns, this.mergeType);
    }
    else {
        this.data_panel30 = [];
    }
    this.tbs_setScroll(this.const_horizontal);
    this.tbs_setScroll(this.const_vertical);
    this.tbs_setBarPosition(this.const_vertical, 0);
    this.tbs_refreshRefData();
}