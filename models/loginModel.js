import { CommonData } from '../utils/commonData.js'
class LoginModel {
  /**
   *登录，向后台发送code
   *
   * @memberof LoginModel
   */
  login(userInfo, fun) {
    let { avatarUrl, city, country, gender, nickName, province } = userInfo;
    wx.showLoading({
      title: '登录中，请稍候...',
      mask: true
    })
    wx.login({
      success: (res)=>{
        // console.log("code:::", res);
        // 发送请求，获取token
        wx.request({
          url: CommonData.baseUrl + '/wx/login',
          data: {
            code: res.code,
            avatarUrl,
            country,
            city,
            gender,
            nickName,
            province
          },
          success: (res) => {
            // console.log("loginRes:::", res);
            const token = res.header.token;
            const openId = res.data.data.openId;
            wx.setStorageSync("token",token);
            wx.setStorageSync("openId", openId);
            fun('success');
          },
          fail: (err) => {
            fun('fail');
            console.error(err);
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
    if(!this.userLogined()) return;
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
