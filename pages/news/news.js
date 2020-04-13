// pages/news/news.js
import NotificationModel from '../../models/notificationModel'
import { LoginModel } from '../../models/loginModel'
const notificationModel = new NotificationModel();
const loginModel = new LoginModel();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    notifications: [],
    logined: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const logined = loginModel.userLogined()
    this.setData({
      logined
    })
    if(logined) {
      const notifications = notificationModel.getNotifications();
      this.setData({
        notifications
      })
    }
  },

  toChat(e) {
    wx.navigateTo({
      url: '/pages/chat_room/chat_room'
    });
  }
})