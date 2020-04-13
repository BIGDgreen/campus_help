import { CommonData } from './commonData.js'

/**
 * 请求封装，返回Promise对象
 */
class HTTP {
  request({url, data = {}, method = 'GET'}) {
    return new Promise((resolve, reject) => {
      this._request(url, data, method, resolve, reject);
    })
  }
  _request(url, data = {}, method = 'GET', resolve, reject) {
    wx.request({
      url: CommonData.baseUrl + url,
      method: method,
      data: data,
      header: {
        'content-type': 'application/json',
        'Authorization': wx.getStorageSync('token')
      },
      success: (res) => {   
        // console.log("res:::",res);
        let code = res.statusCode.toString();
        if(code.startsWith('2') && res.data.status === 'success') {
          resolve(res.data.data);
        } else {
          reject();
          // 服务器异常
          const err_code = res.data.error_code;
          const err_msg = res.data.msg;
          this._show_err(err_code,err_msg);
        }
      },
      // api调用失败
      fail: (err) => {
        reject();
        console.error("fail_err",err);
        this._show_err();
      }
    })
  }

  _show_err(err_code,err_msg) {
    if(!err_code) {
      err_msg = '出现了一个错误~';
    }
    wx.showToast({
      title: err_msg,
      icon: "none",
      duration: 3000
    })
  }
}

export { HTTP }