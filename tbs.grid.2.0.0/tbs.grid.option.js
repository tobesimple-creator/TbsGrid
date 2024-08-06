/**
 * [tobesimple grid] tbs.grid.1.0.0.option.js
 *
 * Copyrightⓒ2022 by tobesimple.net. All rights reserved.
 *
 */
TbsGrid.prototype.tbs_createOption = function (options) {
    let grid = this;
    if (Object.keys(options).length == 0) return;
    if (options[grid.option_selectMode]    != undefined) this.options[grid.option_selectMode]    = options[grid.option_selectMode]   ;
    if (options[grid.option_sortable]          != undefined) this.options[grid.option_sortable]          = options[grid.option_sortable]         ;
    if (options[grid.option_resizable] 	   != undefined) this.options[grid.option_resizable] 	 = options[grid.option_resizable] 	 ;
    if (options[grid.option_autoResize]    != undefined) this.options[grid.option_autoResize]    = options[grid.option_autoResize]   ;
    if (options[grid.option_rowMode]       != undefined) this.options[grid.option_rowMode]    	 = options[grid.option_rowMode]      ;
    if (options[grid.option_checkbox]      != undefined) this.options[grid.option_checkbox]   	 = options[grid.option_checkbox]     ;
    if (options[grid.option_addRow]	       != undefined) this.options[grid.option_addRow]	   	 = options[grid.option_addRow]	     ;
    if (options[grid.option_delRow]	       != undefined) this.options[grid.option_delRow]	   	 = options[grid.option_delRow]	     ;
    if (options[grid.option_colMove]       != undefined) this.options[grid.option_colMove]    	 = options[grid.option_colMove]      ;
    if (options[grid.option_colSizeType]   != undefined) this.options[grid.option_colSizeType]   = options[grid.option_colSizeType]  ;
    if (options[grid.option_zeroChar]      != undefined) this.options[grid.option_zeroChar]      = options[grid.option_zeroChar]     ;
    if (options[grid.option_numWidth]      != undefined) this.options[grid.option_numWidth]      = options[grid.option_numWidth]     ;
    if (options[grid.option_rowModeWidth]  != undefined) this.options[grid.option_rowModeWidth]  = options[grid.option_rowModeWidth] ;
    if (options[grid.option_checkBoxWidth] != undefined) this.options[grid.option_checkBoxWidth] = options[grid.option_checkBoxWidth];
}
TbsGrid.prototype.tbs_setOption = function (options) {
    let grid = this;

    if (Object.keys(options).length == 0) return;
    if (options[grid.option_selectMode]    != undefined) this.options[grid.option_selectMode]    = options[grid.option_selectMode]   ;
    if (options[grid.option_sortable]          != undefined) this.options[grid.option_sortable]          = options[grid.option_sortable]         ;
    if (options[grid.option_resizable] 	   != undefined) this.options[grid.option_resizable] 	 = options[grid.option_resizable] 	     ;
    if (options[grid.option_autoResize]    != undefined) this.options[grid.option_autoResize]    = options[grid.option_autoResize]   ;
    if (options[grid.option_rowMode]       != undefined) this.options[grid.option_rowMode]    	 = options[grid.option_rowMode]      ;
    if (options[grid.option_checkbox]      != undefined) this.options[grid.option_checkbox]   	 = options[grid.option_checkbox]     ;
    if (options[grid.option_addRow]	       != undefined) this.options[grid.option_addRow]	   	 = options[grid.option_addRow]	     ;
    if (options[grid.option_delRow]	       != undefined) this.options[grid.option_delRow]	   	 = options[grid.option_delRow]	     ;
    if (options[grid.option_colMove]       != undefined) this.options[grid.option_colMove]    	 = options[grid.option_colMove]      ;
    if (options[grid.option_colSizeType]   != undefined) this.options[grid.option_colSizeType]   = options[grid.option_colSizeType]  ;
    if (options[grid.option_zeroChar]      != undefined) this.options[grid.option_zeroChar]      = options[grid.option_zeroChar]     ;
    if (options[grid.option_numWidth]      != undefined) this.options[grid.option_numWidth]      = options[grid.option_numWidth]     ;
    if (options[grid.option_rowModeWidth]  != undefined) this.options[grid.option_rowModeWidth]  = options[grid.option_rowModeWidth] ;
    if (options[grid.option_checkBoxWidth] != undefined) this.options[grid.option_checkBoxWidth] = options[grid.option_checkBoxWidth];
}