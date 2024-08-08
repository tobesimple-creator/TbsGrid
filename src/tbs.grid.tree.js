TbsGridTree = function(grid) {
    this.grid = grid;
    this.gridId = grid.gridId;

    /**
     * @description codes
     *
     */
    this.code_expand         = 'expand';
    this.code_expand_all     = 'expandAll';
    this.code_collapse       = 'collapse';
    this.code_collapse_all   = 'collapseAll';
    /**
     * @description options properties
     *
     * @example tree.options.treeColumnId = value;
     */
    this.options = {}
    this.options.treeColumnId;    // Tree node Column
    this.options.childColumnId;   // relation key
    this.options.parentColumnId;  // parent relation key
    this.options.rootValue;       // start level value
    this.options.sortColumns = []; // sorting data column

}