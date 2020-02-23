import {HTTP} from '../utils/http'

class NotificationModel extends HTTP {
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
}

export default NotificationModel