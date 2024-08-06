/**
 * tbs.grid.1.0.0.header.js
 *
 * Copyrightⓒ2022 by tobesimple.net. All rights reserved.
 *
 */
TbsGrid.prototype.tbs_createHeader = function (userColumns, userHeaders) {
    let selector = '#' + this.gridId;
    let grid = this;

    if (userHeaders.length == 0) grid.tbs_setHeaderByTree(userColumns);
    else if (userHeaders.length > 0) grid.tbs_setHeaderByTable(userColumns, userHeader);
}
TbsGrid.prototype.tbs_setHeaderByTable = function (userColumns, userHeader) {
    /*
    TbsGrid.prototype.tbs_createHeader = function (headers, columns, options) {
        let selector = '#' + this.gridId;
        let grid = this;
        //=======================================
        // headerColums setting
        //=======================================
        //속성을 만들어줘야 한다.
        //깊은 복사를 해야할 것 같다.
        // * headerColumns == headerColumns > headerRows > headeColumn 이렇게 되겠지
        // *                  itemList      > items      > item <===== header
        let headerColumns = [];
        for (let i = 0, len = headers.length; i < len; i++) {
            items = this.tbs_createHeaderColumns(headers[i], columns, options);

            items.forEach(item => headerColumns.push(item));
        }
        this.headerColumns = headerColumns;
    }
    TbsGrid.prototype.tbs_createHeaderColumns = function (header, headers, columns, options) {
        let selector = '#' + this.gridId;
        let grid = this;

        // header display / header event 가 변경될 것 같아
        // rowspan  : 사용자가 정의
        // colspan  : 자동으로 구함
        // rowindex : 자동으로 구함
        // colindex : 자동으로 구함

        let headerColumns = [];
        for (let i = 0, len = header.length; i < len; i++) {
            let item = header[i];

            let headerColumn = {};
            headerColumn[grid.header_id      ] = grid.null(item[grid.header_id      ]) ? ''         : item[grid.header_id      ];
            headerColumn[grid.column_text    ] = grid.null(item[grid.column_text    ]) ? ''         : item[grid.column_text    ];
            headerColumn[grid.column_rowspan ] = grid.null(item[grid.column_rowspan ]) ? 1          : item[grid.column_rowspan ];
            headerColumn[grid.column_colspan ] = grid.null(item[grid.column_colspan ]) ? 1          : item[grid.column_colspan ];
            headerColumn[grid.column_rowindex] = grid.null(item[grid.column_rowindex]) ? 1          : item[grid.column_rowindex];
            headerColumn[grid.column_colindex] = grid.null(item[grid.column_colindex]) ? 1          : item[grid.column_colindex];
            headerColumn[grid.column_fromcol ] = grid.null(item[grid.column_fromcol ]) ? ''         : item[grid.column_fromcol ];
            headerColumn[grid.column_tocol   ] = grid.null(item[grid.column_tocol   ]) ? ''         : item[grid.column_tocol   ];
            headerColumn[grid.column_visible ] = grid.null(item[grid.column_visible ]) ? true       : item[grid.column_visible ];
            headerColumn[grid.column_align   ] = grid.null(item[grid.column_align   ]) ? 'center'   : item[grid.column_align   ];
            headerColumn[grid.column_type    ] = grid.null(item[grid.column_type    ]) ? 'string'   : item[grid.column_type    ];

            // colspan 구하기... from, to 가 있어야함. 자동으로 구함



            headerColumns.push(headerColumn);
        }
        return headerColumns;
    }
    */
}
TbsGrid.prototype.tbs_setHeaderByTree = function (userColumns) {
    let selector = '#' + this.gridId;
    let grid = this;

    let userHeaderColumns = JSON.parse(JSON.stringify(userColumns))
    let colIndex = -1;
    const fn_getTreeDepth = function(columns) {
        let column_children = grid.column_children;
        const getDepth = (column) => {
            return 1 + (column[column_children] ? Math.max(...column[column_children].map(getDepth)) : 0);
        }
        let depthList = [];
        for (let i = 0, len = columns.length; i < len; i++) {
            depthList.push(getDepth(columns[i]));
        }
        return Math.max(0, ...depthList);
    }
    const fn_setNumber = function(columns, rowIndex) {
        columns.map(column => {
            column[grid.column_num] = num = num + 1;
            column[grid.column_rowindex] = rowIndex;
            column[grid.column_rowspan] = column[grid.column_children] ? 1 : headerRowCount - rowIndex;
            column[grid.column_colspan] = column[grid.column_children] ? column[grid.column_children].length : 1;
            if (column[grid.column_children]) {
                let parentNum = column['num'];
                column[grid.column_children].map(column => column[grid.column_parentNum] = parentNum);
                fn_setNumber(column[grid.column_children], rowIndex + 1);
            }
        });
    }
    const fn_createHeaderColumns = function (columns) {
        columns.map(column => {
            let headerColumn = {};
            let kind = column[grid.column_id] ? 'column' : 'header';
            if (kind == 'column') {
                column2 = grid.tbs_getColumn(column[grid.column_id]);
                headerColumn[grid.column_id         ] = column2[grid.column_id         ];
                headerColumn[grid.column_text       ] = column2[grid.column_text       ];
                headerColumn[grid.column_type       ] = column2[grid.column_type       ];
                headerColumn[grid.column_width      ] = column2[grid.column_width      ];
                headerColumn[grid.column_editable   ] = column2[grid.column_editable   ];
                headerColumn[grid.column_visible    ] = column2[grid.column_visible    ];
                headerColumn[grid.column_align      ] = column2[grid.column_align      ];
                headerColumn[grid.column_scale      ] = column2[grid.column_scale      ];
                headerColumn[grid.column_scaletype  ] = column2[grid.column_scaletype  ];
                headerColumn[grid.column_scalefixed ] = column2[grid.column_scalefixed ];
                headerColumn[grid.column_scalemax   ] = column2[grid.column_scalemax   ];
                headerColumn[grid.column_scalemin   ] = column2[grid.column_scalemin   ];
                headerColumn[grid.column_comma      ] = column2[grid.column_comma      ];
                headerColumn[grid.column_zero       ] = column2[grid.column_zero       ];
                headerColumn[grid.column_resizable  ] = column2[grid.column_resizable  ];
                headerColumn[grid.column_sort   	] = column2[grid.column_sort   	   ];
                headerColumn[grid.column_summary    ] = column2[grid.column_summary    ];
                headerColumn[grid.column_required   ] = column2[grid.column_required   ];
                headerColumn[grid.column_autosize   ] = column2[grid.column_autosize   ];
                headerColumn[grid.column_combo      ] = column2[grid.column_combo      ];
                headerColumn[grid.column_format     ] = column2[grid.column_format     ];

                headerColumn[grid.column_kind       ] = kind;
                headerColumn[grid.column_rowspan    ] = column[grid.column_rowspan    ];
                headerColumn[grid.column_colspan    ] = column[grid.column_colspan    ];
                headerColumn[grid.column_rowindex   ] = column[grid.column_rowindex   ];
                headerColumn[grid.column_colindex   ] = column[grid.column_colindex   ];
                headerColumn[grid.header_id         ] = '';
                headerColumn[grid.header_align      ] = column[grid.header_align] ? column[grid.header_align] : 'center';


            }
            else {
                headerColumn[grid.header_id        ] = column[grid.header_id]    ? column[grid.header_id]    : '';
                headerColumn[grid.header_align     ] = column[grid.header_align] ? column[grid.header_align] : 'center';

                headerColumn[grid.column_children  ] = column[grid.column_children  ];
                headerColumn[grid.column_text      ] = column[grid.column_text      ];
                headerColumn[grid.column_kind      ] = kind;
                headerColumn[grid.column_rowspan   ] = column[grid.column_rowspan   ];
                headerColumn[grid.column_colspan   ] = column[grid.column_colspan   ];
                headerColumn[grid.column_rowindex  ] = column[grid.column_rowindex  ];
                headerColumn[grid.column_colindex  ] = column[grid.column_colindex  ];
                headerColumn[grid.column_fromcol   ] = column[grid.column_fromcol   ];
                headerColumn[grid.column_tocol     ] = column[grid.column_tocol     ];
                headerColumn[grid.column_visible   ] = column[grid.column_visible   ];
                headerColumn[grid.column_type      ] = column[grid.column_type      ];
                headerColumn[grid.column_width     ] = column[grid.column_width     ];
                headerColumn[grid.column_num       ] = column[grid.column_num       ];
                headerColumn[grid.column_parentNum ] = column[grid.column_parentNum ];
                headerColumn[grid.column_subRowspan] = 1;
                headerColumn[grid.column_subColspan] = 1;

                if (grid.null(headerColumn[grid.column_visible])) headerColumn[grid.column_visible] = true;
            }

            let rowIndex      = headerColumn[grid.column_rowindex];
            let childrenCount = (headerColumn[grid.column_children]) ? headerColumn[grid.column_children].length : 0;
            headerColumns[rowIndex].push(headerColumn);

            let blankColumn = {};
            blankColumn[grid.column_text       ] = headerColumn[grid.column_text];
            blankColumn[grid.column_kind       ] = 'empty';
            blankColumn[grid.column_rowspan    ] = 1;
            blankColumn[grid.column_colspan    ] = 1;
            blankColumn[grid.column_rowindex   ] = 0;
            blankColumn[grid.column_colindex   ] = 0;
            blankColumn[grid.column_visible    ] = false;
            blankColumn[grid.column_align      ] = '';
            blankColumn[grid.column_subRowspan ] = 1;
            blankColumn[grid.column_subColspan ] = 1;

            //make blank column(row)
            if (childrenCount == 0) {
                for (let i = rowIndex + 1; i < headerRowCount; i++) headerColumns[i].push(blankColumn);
            }
            //make blank column(colums)
            if (childrenCount > 1) {
                for (let i =  1; i < childrenCount; i++) headerColumns[rowIndex].push(blankColumn);
            }
            if (column['children']) {
                fn_createHeaderColumns(column[grid.column_children]);
            }
        });
    }

    let num = 0;
    let parentNum = 0;
    let headerColumns= [];  //flatNodes
    let headerRowCount = this.headerRowCount = fn_getTreeDepth(userHeaderColumns);

    fn_setNumber(userHeaderColumns, 0); //num, parentNum
    for (let i = 0; i < headerRowCount; i++) headerColumns[i] = [];
    fn_createHeaderColumns(userHeaderColumns); //headerColumns

    headerColumns.map((columns, rowIndex) => {
        columns.map((column, colIndex) => {
            column[grid.column_rowindex] = rowIndex;
            column[grid.column_colindex] = colIndex;
            delete column[grid.column_children];
        })
    })
    this.headerColumns = headerColumns;
}
TbsGrid.prototype.tbs_getDisplayedHeaderColumn = function(panelName = 'panel30') {
    // panel 영역에서 보여줄수 있는 startRowIndex, lastRowIndex 를 구함
    let selector = '#' + this.gridId;
    let grid = this;

    let rectPanel = document.querySelector(selector + ' .tbs-grid-' + panelName).getBoundingClientRect();
    let rectTable = document.querySelector(selector + ' .tbs-grid-' + panelName + ' > table').getBoundingClientRect();
    let styleLeft = document.querySelector(selector + ' .tbs-grid-' + panelName + ' > table').style.left;
    styleLeft = parseInt(styleLeft, 10);

    let columns = this.columns;
    if (panelName == 'panel32' || panelName == 'panel42' || panelName == 'panel52' || panelName == 'panel62') {
        let startColumnIndex = 0;
        let lastColumnIndex = this.fixedColumnIndex;

        let sumWidth = 0;
        // get startColumnIndex
        for (let i = 0; i < this.fixedColumnIndex; i++) {
            let column = columns[i];
            if (column[grid.column_visible] == false) continue;
            sumWidth += parseInt(column[grid.column_width]);
            if (sumWidth + styleLeft > 0) {
                startColumnIndex = i;
                break;
            }
        }
        sumWidth = rectTable.width;
        // get lastColumnIndex
        for (let i = this.fixedColumnIndex; i >= 0; i--) {
            let column = columns[i];
            if (column[grid.column_visible] == false) continue;
            sumWidth -= parseInt(column[grid.column_width]);
            if (sumWidth + styleLeft < rectPanel.width) {
                lastColumnIndex = i;
                break;
            }
        }
        return { startColumnIndex: startColumnIndex, lastColumnIndex: lastColumnIndex };
    }
    else {
        let startColumnIndex = 0;
        let lastColumnIndex = columns.length - 1;

        let sumWidth = 0;
        for (let i = 0, len = columns.length; i < len; i++) {
            let column = columns[i];
            if (column[grid.column_visible] == false) continue;
            sumWidth += parseInt(column[grid.column_width]);
            if (sumWidth + styleLeft > 0) {
                startColumnIndex = i;
                break;
            }
        }
        sumWidth = rectTable.width;
        for (let i = columns.length - 1; i >= 0; i--) {
            let column = columns[i];
            if (column[grid.column_visible] == false) continue;
            sumWidth -= parseInt(column[grid.column_width]);
            if (sumWidth + styleLeft < rectPanel.width) {
                lastColumnIndex = i;
                break;
            }
        }
        return { startColumnIndex: startColumnIndex, lastColumnIndex: lastColumnIndex };
    }
}