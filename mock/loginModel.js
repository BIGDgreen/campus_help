import { CommonData } from '../utils/commonData.js'
class LoginModel {
  /**
   *登录，向后台发送code
   *
   * @memberof LoginModel
   */
  login(fun) {
    wx.showLoading({
      title: '登录中，请稍候...',
      mask: true
    })
    wx.login({
      success: (res)=>{
        console.log("code:::", res);
        // 发送请求，获取token
        wx.request({
          url: CommonData.url + '/wx/login',
          data: {
            code: res.code
          },
          success: (res) => {
            console.log("loginRes:::", res);
            const token = res.header.token;
            wx.setStorageSync("token",token);
            fun('success');
          },
          complete: () => {
            wx.hideLoading();
          }
        });
      },
      fail: (err)=>{
        fun('fail');
      },
      complete: ()=>{}
    });
  }
  /**
   *用户是否授权过
   *
   * @param {*} fun
   * @memberof LoginModel
   */
  userAuthorized(fun) {
    wx.getSetting({
      success: (result)=>{
        // console.log("getSetting:::", result);
        if(result.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: (result)=>{
              fun(result)
            }
          })
        }
      },
    })
  }

  /**
   *用户是否登录过
   *
   * @returns {Boolean}
   * @memberof LoginModel
   */
  userLogined() {
    return wx.getStorageSync('token') ? true : false;
  }
}

export { LoginModel }
