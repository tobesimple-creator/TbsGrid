/**
 *
 * [tobesimple grid] tbs.grid.2.0.0.js
 *
 * Copyrightⓒ2022 by tobesimple.net. All rights reserved.
 *
 */
TbsGrid.prototype.panel10_init = function(){
    let selector = '#' + this.gridId;
    let grid = this;
    const setTotalFilterEvent = function(e) {
        e.stopPropagation();
        grid.totalFilterSearch(this.value);
    }
    if (document.querySelector(selector + ' .tbs-grid-panel10-filter'))
        document.querySelector(selector + ' .tbs-grid-panel10-filter').addEventListener('keyup', setTotalFilterEvent);
}
