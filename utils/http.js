import { CommonData } from './commonData.js'

/**
 * 请求封装，返回Promise对象
 */
class HTTP {
  request({url, data = {}, method = 'GET', needToken = true, header = {'content-type': 'application/x-www-form-urlencoded'}}) {
    let tokenHeader;
    if(needToken) {
      // 需要token验证
      tokenHeader = {'Authorization': wx.getStorageSync('token')}
      header = Object.assign(header, tokenHeader);
    }
    return new Promise((resolve, reject) => {
      wx.request({
        url: CommonData.baseUrl + url,
        method: method,
        data: data,
        header: header,
        success: (res) => {   
          console.log("from http:::",res);
          let code = res.statusCode.toString();
          if(code.startsWith('2') && res.data.status === 'success') {
            resolve(res.data.data);
          } else {
            reject();
            // 服务器异常
            const err_code = res.data.data.errorCode;
            let err_msg = res.data.data.errorMsg;
            if(code === '403' || code === '10002') {
              // 登录失败
              err_msg = '您未登录';
              wx.clearStorageSync('token');
              wx.switchTab({
                url: '/pages/my/my'
              })
            }
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
