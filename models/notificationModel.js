import {HTTP} from '../utils/http'

class NotificationModel extends HTTP {
  /**
   *获取消息列表
   *
   * @returns
   * @memberof NotificationModel
   */
  getNotifications() {
    const notifications = [
      {
        avatar: 'http://qz.faisys.com/image/wxImage/default_ablum.jpg',
        unreadNum: 1,
        name: '张三',
        latestNote: '在吗'
      },
      {
        avatar: 'http://qz.faisys.com/image/wxImage/default_ablum.jpg',
        unreadNum: 0,
        name: '李四',
        latestNote: '吃了吗'
      },
    ]

    return notifications;
  }
  /**
   *获取消息历史记录，一次十条
   *
   * @memberof MessageModel
   * @returns {Array}
   */
  getHistory() {
    const histories = [
      {
        type: 'text',
        isMe: false,
        value: 'hello'
      },
      {
        type: 'image',
        isMe: false,
        imgSrc: 'http://qz.faisys.com/image/wxImage/default_ablum.jpg'
      },
      {
        type: 'time',
        dateTime: '3月20日 上午8：00'
      },
      {
        type: 'text',
        isMe: true,
        value: '!!!'
      }
    ];
    return histories;
  }
}

export default NotificationModel