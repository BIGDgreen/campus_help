import { LoginModel } from '../../models/loginModel'
const loginModel = new LoginModel(); 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    authorized: false,
    userInfo: null,
    studentNum: 12343412,
    introduce: '一段描述'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._userAuthorized();
  },
  
  /**
   *获取用户信息并登录
   *
   * @param {*} event
   */
  getUserinfo(event) {
    // console.log("getUserInfo:::", event.detail.userInfo);
    const userInfo = event.detail.userInfo;
    loginModel.login((res) => {
      if(res !== 'fail') {
        const logined = loginModel.userLogined();
        if(userInfo && logined) {
          this.setData({
            authorized: true,
            userInfo
          });
        }
      }
    });
  },

  /**
   *跳转到与我有关的相应类别列表
   *
   * @param {*} event
   */
  inquireMy(event) {
    console.log("inquireMy:::", event);
    const type = event.currentTarget.dataset.type;
    wx.navigateTo({
      url: `/pages/category_detail/category_detail?type=${type}`,
    });
  },

   /**
   *若用户已经授权，直接获取用户信息
   *
   */
  _userAuthorized() {
    loginModel.userAuthorized((result) => {
      this.setData({
        authorized: true,
        userInfo: result.userInfo
      });
    })
  }
})
