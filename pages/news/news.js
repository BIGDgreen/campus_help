// pages/news/news.js
import NotificationModel from '../../models/notificationModel'
const notificationModel = new NotificationModel();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    notifications: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const notifications = notificationModel.getNotifications();
    this.setData({
      notifications
    })
  },

  toChat(e) {
    wx.navigateTo({
      url: '/pages/chat_room/chat_room'
    });
  }
})