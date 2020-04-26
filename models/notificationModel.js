import {HTTP} from '../utils/http'

class NotificationModel extends HTTP {
  /**
   *获取消息列表
   *
   * @returns
   * @memberof NotificationModel
   */
  getNotifications() {
    return this.request({
      url: '/communication/chatList'
    });
  }
  /**
   *获取消息历史记录，一次十条
   *
   * @memberof MessageModel
   * @returns {Array}
   */
  getHistory(senderId, receiverId, page = 1, size = 10) {
    return this.request({
      url: `/communication/${senderId}/chat/${receiverId}/history`,
      data: {
        page,
        size
      }
    })
  }
  /**
   *建立socket连接
   *
   * @memberof NotificationModel
   */
  connectSocket(userId) {
    wx.connectSocket({
      url: `wss://wx.nightnessss.cn:8011/chat/${userId}`,
      success: () => {
        console.log("socket连接已建立！");
      }
    })
  }
  /**
   *关闭socket连接
   *
   * @memberof NotificationModel
   */
  closeSocket() {
    wx.closeSocket()
  }
  /**
   *发送消息
   *
   * @param {String} data
   * @memberof NotificationModel
   */
  sendMessage(sendMsg) {
    return new Promise((resolve, reject) => {
      console.log("sendContent:::", sendMsg);
      wx.sendSocketMessage({
        data: JSON.stringify(sendMsg),
        success: () => {
          console.log("发送成功");
          resolve();
        },
        fail: () => {
          console.error("发送失败");
          reject();
        }
      })
    })
  }
}

export default NotificationModel