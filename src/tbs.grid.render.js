/**
 * tbs.grid.render.js
 *
 */
TbsGrid.prototype.tbs_renderCode = function(col, value){
    let result = this.tbs_render(col, value);
    return result.value;
}
TbsGrid.prototype.tbs_renderText = function(col, value){
    let result = this.tbs_render(col, value);
    return result.text;
}
TbsGrid.prototype.tbs_render = function (column, value) {
    let grid = this;

    let result = {};
    result.value = value;
    result.text = value;

    let colType = column[grid.column_type];
    let combo   = column[grid.column_combo];
    let format  = column[grid.column_format];

    if (colType == 'number') {
        result = this.tbs_number_render(column, value);
        if (column[grid.column_visible] == false || (column[grid.column_zero] == false && parseInt(result.text) == 0)) {
            result.text = this.options[grid.option_zeroChar];
        }
        return result;
    }
    else {
        if (this.null(value)) {
            result.value = '';
            result.text = '';
            return result;
        }
        if (colType == 'combo') {
            let data = combo.data;
            let key = combo.key;
            let val = combo.val;

            for (let i = 0, len = data.length; i < len; i++) {
                if (data[i][key] == value) {
                    result.text = data[i][val];
                    break;
                }
            }
            return result;
        }
        else if (colType == 'date') {
            return this.tbs_date_render(column, value);
        }
        else {
            result.text = value;
            return result;
        }
    }
}

TbsGrid.prototype.tbs_number_render = function (column, value) {
    let grid = this;
    const formatWon = function (n) {
        //return val.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","); safari error
        //return val.toString().replace(/\B(?=(?=\d*\.)(\d{3})+(?!\d))/g, ','); int type error
        let parts = n.toString().split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return parts.join(".");
    };
    let result = {}; //realValue, value
    result.value = (this.null(value) || value == '' || grid.tbs_substr(value.toString(), 0, 1) == '.') ? 0 : value.toString().replace(/,/gi, '');
    result.text = result.value;

    
    let type = column[grid.column_type];
    let scale = column[grid.column_scale];
    let arr = scale.split(',');
    let decimalPoint = (arr.length > 1) ? this.tbs_trim(arr[1]) : '0';

    let scaletype = column[grid.column_scaletype];
    if (type != 'number' || decimalPoint == '' || value == null) return result;

    let n = (result.value == undefined || result.value == '') ? '0' : result.value.toString(); //전체값
    let dpLen = 0; //decimal length
    //========================================================
    if (decimalPoint == '0') {
        dpLen = 0;
        if      (scaletype == 'round') n = parseFloat(this.tbs_round(n, dpLen));
        else if (scaletype == 'ceil' ) n = parseFloat(this.tbs_ceil(n, dpLen));
        else if (scaletype == 'floor') n = parseFloat(this.tbs_floor(n, dpLen));
        else     parseFloat(this.tbs_round(n, dpLen));
        result.text = column[grid.column_comma] == '0' ? n : formatWon(n);
    }
    //========================================================
    else if (decimalPoint != '0') {
        result.text = formatWon(parseFloat(n));
        if (column[grid.column_scalefixed]) {
            dpLen = parseInt(decimalPoint);
            n =   (scaletype == 'round') ? this.tbs_round(n, dpLen).toFixed(dpLen)
                : (scaletype == 'ceil')  ? this.tbs_ceil(n, dpLen).toFixed(dpLen)
                    : (scaletype == 'floor') ? this.tbs_floor(n, dpLen).toFixed(dpLen)
                        : this.tbs_round(n, dpLen).toFixed(dpLen);
            result.text = column[grid.column_comma] == '0' ? n : formatWon(n);
        }
        else {
            dpLen = parseInt(decimalPoint);
            n =   (scaletype == 'round') ? parseFloat(this.tbs_round(n, dpLen))
                : (scaletype == 'ceil')  ? parseFloat(this.tbs_ceil(n, dpLen))
                    : (scaletype == 'floor') ? parseFloat(this.tbs_floor(n, dpLen))
                        : parseFloat(this.tbs_round(n, dpLen));
            result.text = column[grid.column_comma] == '0' ? n : formatWon(n);
        }
    }
    return result;
}
/**
 * tbs_date_render 
 *
 * @param column
 * @param value
 * @returns {{}}
 */
TbsGrid.prototype.tbs_date_render = function(column, value) {
    let grid = this;

    let result = {};
    value = value.replace(/\./gi, '');
    value = value.replace(/\-/gi, '');
    value = value.replace(/\//gi, '');

    result.value = this.tbs_trim(value);
    result.text = result.value;

    //date : 8 char
    if (result.value == '' || result.value.length != 8) {
        result.value = '';
        result.text = '';
        return result;
    }
    let format = column[grid.column_format];

    // date char : . - /
    let formatText = format.replace(/\./gi, '');
    formatText = formatText.replace(/\-/gi, '');
    formatText = formatText.replace(/\//gi, '');

    let dateText = result.text;
    let yyyy = '';
    let MM = '';
    let dd = '';

    if (formatText == 'yyyyMMdd') {
        yyyy = grid.tbs_substr(result.text,0, 4);
        MM = grid.tbs_substr(result.text,4, 2);
        dd = grid.tbs_substr(result.text,6, 2);
    }
    else if (formatText == 'ddMMyyyy') {
        yyyy = grid.tbs_substr(result.text, 4, 4);
        MM = grid.tbs_substr(result.text, 2, 2);
        dd = grid.tbs_substr(result.text, 0, 2);
    }
    else if (formatText == 'MMddyyyy') {
        yyyy = grid.tbs_substr(result.text, 4, 4);
        MM = grid.tbs_substr(result.text, 0, 2);
        dd = grid.tbs_substr(result.text, 2, 2);
    }

    if (new Date(yyyy + '-' + MM + '-' + dd).toString() == "Invalid Date") {
        result.value = '';
        result.text = '';
        return result;
    }

    format = format.replace('yyyy', yyyy);
    format = format.replace('MM', MM);
    format = format.replace('dd', dd);

    result.value = format;
    result.text = format;
    return result;
}

