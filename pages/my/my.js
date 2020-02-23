// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    authorized: false,
    userInfo: null,
    studentNum: 12343412,
    introduce: '神仙本仙'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._userAuthorized();
  },
  
  getUserinfo(event) {
    console.log("getUserInfo:::", event.detail.userInfo);
    const userInfo = event.detail.userInfo;
    if(userInfo) {
      this.setData({
        authorized: true,
        userInfo
      });
    }
  },

   /**
   *若用户已经授权，直接获取用户信息
   *
   */
  _userAuthorized() {
    wx.getSetting({
      success: (result)=>{
        // console.log("getSetting:::", result);
        if(result.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: (result)=>{
              // console.log("userInfo:::", result.userInfo);
              this.setData({
                authorized: true,
                userInfo: result.userInfo
              });
            }
          });
        }
      },
    });
  }
})