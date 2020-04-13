class Filter {
 /**
  * 时间格式转换
  *
  * @param {*} date
  * @returns
  * @memberof Filter
  */
 formatDate(date) {
    let time = new Date(Date.parse(date));
    time.setTime(time.setHours(time.getHours() + 8));
    let Y = time.getFullYear() + '/';
    let M = this._addZero(time.getMonth() + 1) + '/';
    let D = this._addZero(time.getDate()) + ' ';
    let h = this._addZero(time.getHours()) + ':';
    let m = this._addZero(time.getMinutes()) + ':';
    let s = this._addZero(time.getSeconds());
    return Y + M + D;
   
  }
  // 数字补0操作
  _addZero(num) {
    return num < 10 ? '0' + num : num;
  }
}



export { Filter }
