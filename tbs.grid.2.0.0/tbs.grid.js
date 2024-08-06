/**
 * [tobesimple grid] tbs.grid.2.0.0.js
 *
 * Copyrightⓒ2022 by tobesimple.net. All rights reserved.
 */
TbsGrid = function (gridId) {
	this.gridId = gridId;
	this.maxRowId = -1; // maxRowId

	this.debug_mode           = true    ;
	//================================================================
	//
	// const
	//
	//================================================================
	this.const_mode           = '_mode' ;
	this.const_rowId          = '_rowId';
	this.const_toolbar        = 'toolbar' ;
	this.const_header         = 'header'  ;
	this.const_content        = 'content' ;
	this.const_summary_header = 'top'     ;
	this.const_summary_footer = 'footer'  ;
	this.const_horizontal     = 'horizontal';
	this.const_vertical       = 'vertical';

	this.const_column_type        = 'string';
	this.const_column_width       = '100';
	this.const_column_editable    = false;
	this.const_column_visible     = true;
	this.const_column_align       = 'left';
	this.const_column_scale       = '18,0';
	this.const_column_scaletype   = 'round';
	this.const_column_scalefixed  = true;
	this.const_column_scalemax    = null;
	this.const_column_scalemin    = null;
	this.const_column_comma       = '3';
	this.const_column_zero        = false;
	this.const_column_resizable   = true;
	this.const_column_sort        = true;
	this.const_column_autosize    = false;
	this.const_column_combo       = {};
	this.const_column_format      = 'yyyy-MM-dd';

	this.const_up             = 'up'   ;
	this.const_down           = 'down' ;
	this.const_left           = 'left' ;
	this.const_right          = 'right';

	this.column_id            = 'id'         ;
	this.column_text          = 'text'       ;
	this.column_type          = 'type'       ;
	this.column_width         = 'width'      ;
	this.column_editable      = 'editable'   ;
	this.column_visible       = 'visible'    ;
	this.column_align         = 'align'      ;
	this.column_scale         = 'scale'      ;
	this.column_scaletype     = 'scaletype'  ;
	this.column_scalefixed    = 'scalefixed' ;
	this.column_scalemax      = 'scalemax'   ;
	this.column_scalemin      = 'scalemin'   ;
	this.column_comma         = 'comma'      ;
	this.column_zero          = 'zero'       ;
	this.column_resizable     = 'resizable'  ;
	this.column_sort   	      = 'sort'       ;
	this.column_summary       = 'summarytype';
	this.column_required      = 'required'   ;
	this.column_autosize      = 'autosize'   ;
	this.column_combo         = 'combo'      ;
	this.column_format        = 'format'     ;
	this.header_id            = 'headerId'   ;
	this.header_align         = 'headerAlign';
	this.column_children      = 'children'   ;
	this.column_kind          = 'kind'       ; //header, column, empty
	this.column_rowspan       = 'rowspan'	 ;
	this.column_colspan       = 'colspan' 	 ;
	this.column_rowindex      = 'rowindex' 	 ;
	this.column_colindex      = 'colindex' 	 ;
	this.column_fromcol       = 'fromcol' 	 ;
	this.column_tocol         = 'tocol'	     ;
	this.column_num           = 'number'     ;
	this.column_parentNum     = 'parentNumber';
	this.column_subRowspan    = 'subRowSpan' ;
	this.column_subColspan    = 'subColSpan' ;
	this.column_money         = '$'          ;

	this.layout_visible       = 'visible'   ;
	this.layout_rowspan       = 'rowspan'   ;
	this.layout_colspan       = 'colspan'   ;
	this.layout_subrowspan    = 'subrowspan';
	this.layout_subcolspan    = 'subcolspan';
	this.layout_color         = 'color'     ;
	this.layout_background    = 'background';
	this.layout_text          = 'text'      ;

	this.option_selectMode	  = 'selectMode'   ;
	this.option_dateChar	  = 'dateChar'	   ;
	this.option_addRow	  	  = 'addRow'	   ;
	this.option_delRow	  	  = 'delRow'	   ;
	this.option_sortable	  = 'sortable'	   ;
	this.option_resizable	  = 'resizable'	   ;
	this.option_colMove	  	  = 'colMove'	   ;
	this.option_autoResize	  = 'autoResize'   ;
	this.option_colSizeType	  = 'colSizeType'  ;
	this.option_rowMode	      = 'rowMode'	   ;
	this.option_checkbox	  = 'checkbox'	   ;
	this.option_fixedColIndex = 'fixedColumnIndex'; //사용안함
	this.option_fixedRowIndex = 'fixedRowIndex'; //사용안함
	this.option_insertRow	  = 'insertRow'	   ;
	this.option_updateRow	  = 'updateRow'	   ;
	this.option_deleteRow	  = 'deleteRow'	   ;
	this.option_zeroChar	  = 'zeroChar'	   ;
	this.option_numWidth	  = 'numWidth'	   ;
	this.option_rowModeWidth  = 'rowModeWidth' ;
	this.option_checkBoxWidth = 'checkBoxWidth';
	this.option_useToolbar	  = 'useToolbar'   ;

	//================================================================
	//
	// Columns
	//
	//================================================================
	this.sortColumns = []; 		//[{ id : 'layout', order : 'asc'}, { id : 'layout', order : 'asc'}]
	this.groupColumns = [];		//[{ id : 'layout'}, { id : 'layout']
	this.groupView = [];

	this.columns = [];
	this.headerColumns = [];
	this.topColumns = [];
	this.footerColumns = [];
	this.headerRowCount = 0;

	//================================================================
	//
	// Sptions
	//
	//================================================================
	this.options = {}
	this.options[this.option_selectMode]   = 'cells';	//@value : cell, cells(default), row, rows
	this.options[this.option_dateChar]     = '.'; 		//== date option
	this.options[this.option_addRow]       = false; 	//== row option
	this.options[this.option_delRow]       = false;
	this.options[this.option_sortable]     = true;		//value : sort, 빈값 (기본값 sort)
	this.options[this.option_resizable]    = true;  	//value : resize, 빈값(기본값 resize);
	this.options[this.option_colMove]      = true;
	this.options[this.option_autoResize]   = true;
	this.options[this.option_colSizeType]  = ''; 		//value : blank(default), auto
	this.options[this.option_rowMode]      = false;		//value : true, false, null
	this.options[this.option_checkbox]     = false;		//value : true, false
	this.options[this.option_fixedColIndex]  = -1;
	this.options[this.option_fixRowCount]  =  0;
	this.options[this.option_insertRow]    = false;
	this.options[this.option_updateRow]    = false;
	this.options[this.option_deleteRow]    = false;
	this.options[this.option_zeroChar]     = '-';
	this.options[this.option_numWidth]     = 50;
	this.options[this.option_rowModeWidth] = 15;
	this.options[this.option_checkBoxWidth]= 18;
	this.options[this.option_useToolbar]   = true;


	this.grid_mousePointRange = 5;
	this.grid_event = '';
	this.popupActive = 0;
	//================================================================
	//
	// tool bar
	//
	//================================================================
	this.toolbar_filter_placeholder = 'Search'; //Integrated filter(space key unit)
	this.toolbar_visible = true;

	//================================================================
	//
	// frozen row, column (fixRow : fixedRowCount, fixCol : fixedColumnIndex)
	//
	//================================================================
	this.fixedColumnIndex = -1;
	this.fixedRowCount = 0;  // required
	this.fixedRowIndex = -1;
	//================================================================
	//
	// merge
	//
	//================================================================
	this.merge = false;
	this.mergeType = 0;

	//================================================================
	//
	// data
	//
	//================================================================
	this.data_provider   	 = []; //User Data
	this.data_source 	 	 = []; //Conversion Data, fixed data, filter, sort가 되더라도 남는 data, 수정, 삭제 발생시 사용

	this.data_panel30  	 	 = []; //content data
	this.data_panel31  	 	 = []; //content left data

	this.data_select_panel30 = [];
	this.data_select_panel31 = [];
	this.data_select_panel40 = [];
	this.data_select_panel41 = [];
	this.data_select_panel50 = [];
	this.data_select_panel51 = [];
	//================================================================
	//
	// layout
	//
	//================================================================
	this.layout_source 	 	 = []; //Conversion Data, fixed data, filter, sort가 되더라도 남는 data, 수정, 삭제 발생시 사용
	this.layout_panel30  	 = []; //content data

	//================================================================
	//
	// insert, delete, update Data
	//
	//================================================================
	this.data_update = [];	//값이 변경된 데이타
	this.data_insert = [];	//신규 데이타
	this.data_delete = [];	//삭제 데이타. push 순으로 올라오겠지.

	/*
	tbs_getRemoveRows();
	tbs_getAddRows();

	* MODE : I, U, D
	* CTRL + Z, CTRL + Y
	* rowId : currentRowId 활용
	0. 히스토리 관리를 하자는 거지.
		ㄴ MODE : I, U, D
		ㄴ INSERT : ROW 전체
		ㄴ UPDATE : 변경된  COLUMN 만
		ㄴ DELETE : rowId 만.
	1. 수정
		ㄴ 삭제 후 수정
		ㄴ
	2. 삭제
		ㄴ 변경 후 삭제
		ㄴ 삭제
	3. 신규
		ㄴ rowSeq 관리 할 것.
	*/

	//================================================================
	//
	// Row Count / Select Range
	//
	//================================================================
	this.pageRowCount = 0;	 	// 몫 + 나머지(나머지를 1로 본다)
	this.pageIntRowCount = 0; 	// 몫만 본다.

	this.startRowIndex  = -1; //선택한 순서
	this.startCellIndex = -1;
	this.lastRowIndex   = -1;
	this.lastCellIndex  = -1;

	this._startRowIndex = -1;  //순서가 낮은 순서
	this._startCellIndex = -1;
	this._lastRowIndex = -1;
	this._lastCellIndex = -1;

	this.selectRangeArray = [];
	//selectRangeArray[0].startRowIndex  = -1; //선택한 순서
	//selectRangeArray[0].startCellIndex = -1;
	//selectRangeArray[0].lastRowIndex   = -1;
	//selectRangeArray[0].lastCellIndex  = -1;

	//selectRangeArray[0]._startRowIndex = -1;  //순서가 낮은 순서
	//selectRangeArray[0]._startCellIndex = -1;
	//selectRangeArray[0]._lastRowIndex = -1;
	//selectRangeArray[0]._lastCellIndex = -1;
	this.startX = 0;
	this.startY = 0;
	this.lastX = 0;
	this.lastY = 0;

	//================================================================
	//
	// scroll
	//
	//================================================================
	this.scroll = {};
	this.scroll.yBarSize 	= 0;
	this.scroll.yRailSize 	= 0;
	this.scroll.yMoveCount 	= 0; // table Rows Count per 1px
	this.scroll.margin 		= '14px';

	this.scroll.xBarSize 	= 0;
	this.scroll.xRailSize 	= 0;
	this.scroll.xHiddenSize = 0;

	//================================================================
	//
	// user event
	//
	//================================================================
	this.user_click		 = [];
	this.user_dblclick	 = [];
	this.user_keydown	 = [];
	this.user_keyup		 = [];
	this.user_blur		 = [];
	this.user_edit       = '';
	//================================================================
	//
	// constant value
	//
	//================================================================
	this.TBS_PATH = '#' + this.gridId;
	this.headerRowHeight = 25;
	this.rowHeight       = 25;
	this.sumRowHeight    = 25;
	this.footerRowHeight = 25;
	//================================================================
	//
	// calendar, date class
	//
	//================================================================
	this.tbsGridDate;
	this.tbsGridCombo;
	//================================================================
	//
	// mobile, user agent
	//
	//================================================================
	this.md = new MobileDetect(window.navigator.userAgent);
	this.mobile = this.md.mobile(); // not mobile : null
	this.userAgent = this.md.userAgent(); // safari



}

