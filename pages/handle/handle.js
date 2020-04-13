import { LoginModel } from '../../models/loginModel'
const loginModel = new LoginModel();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    logined: false,
    buttons: [{text: '取消'}, {text: '确定'}],
    dialogShow: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      logined: loginModel.userLogined()
    })
  },
  
  /**
   *以物易物
   */
  changeProject() {
    this.setData({
      dialogShow: true
    })
  },

  /**
   *确定框操作
   *
   * @param {*} e
   */
  tapDialogButton(e) {
    console.log(e);
    if(e.detail.index === 1) {
      wx.showToast({
        title: '加入成功',
        icon: 'none'
      });
    }
    this.setData({
      dialogShow: false
    })
  },
  /**
   *进入发布回收信息页面
   */
  addRecycle() {
    wx.navigateTo({
      url: '/pages/post_recycle/post_recycle',
    });
  },
  /**
   *进入完善快递信息页面
   */
  perfectExpress() {
    console.log("111");
    wx.navigateTo({
      url: '/pages/perfect_express/perfect_express'
    });
  }
})