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
  
  /**
   *获取用户信息
   *
   * @param {*} event
   */
  getUserinfo(event) {
    // console.log("getUserInfo:::", event.detail.userInfo);
    const userInfo = event.detail.userInfo;
    if(userInfo) {
      this.setData({
        authorized: true,
        userInfo
      });
    }
  },

  /**
   *跳转到与我有关的相应类别列表
   *
   * @param {*} event
   */
  inquireMy(event) {
    console.log("inquireMy:::", event);
    const category = event.currentTarget.dataset.type;
    wx.navigateTo({
      url: `/pages/category_detail/category_detail?category=${category}`,
    });
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