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
  async onShow(options) {
    const logined = loginModel.userLogined()
    this.setData({
      logined
    })
    if(logined) {
      const notifications = await notificationModel.getNotifications();
      notifications.forEach(element => {
        element.unread = element.lastChat.senderId === element.userId ? false : element.lastChat.hasRead;
        element.latestNote = element.lastChat.type === 0 ? element.lastChat.content : '[图片]';
      });
      this.setData({
        notifications
      })
    }
  },

  toChat(e) {
    console.log(e);
    const senderId = e.currentTarget.dataset.senderid;
    const receiverId = e.currentTarget.dataset.receiverid;
    const title = e.currentTarget.dataset.title;
    wx.navigateTo({
      url: `/pages/chat_room/chat_room?senderId=${senderId}&receiverId=${receiverId}&title=${title}` 
    });
  }
})