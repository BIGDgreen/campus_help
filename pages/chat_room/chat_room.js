import NotificationModel from '../../models/notificationModel'
const notificationModel = new NotificationModel();
Page({
  data: {
    active: false,
    userInfo: '',
    othersideAvatar: 'http://qz.faisys.com/image/wxImage/default_ablum.jpg',
    msgs: [],
    isMe: false,
    inputValue: '',
  },
  onLoad(options) {
    // 获取用户信息
    wx.getUserInfo({
      success: (result)=>{
        // console.log("直接获取userInfo:::", result.userInfo);
        this.setData({
          userInfo: result.userInfo
        })
      }
    })
    // 获取历史记录
    const histories = notificationModel.getHistory();    
    this.setData({
      msgs: histories
    })
    console.log(this.data.msgs)
  },
  /**
   *上拉刷新
   *
   */
  onPullDownRefresh(){
    console.log("refresh")
    // wx.startPullDownRefresh({
    //   success: (result)=>{
    //   },
    //   fail: ()=>{},
    //   complete: ()=>{}
    // });
    // wx.stopPullDownRefresh();
  },
  /**
   *正在输入
   *
   * @param {*} e
   */
  onInput(e) {
    // console.log(e);
    this.data.inputValue = e.detail.value;
  },
  /**
   *发送图片
   *
   * @param {*} e
   */
  sendImg(e) {
    this.setData({
      active: true
    })
    wx.chooseImage({
      count: 1,
      sizeType: ['original','compressed'],
      sourceType: ['album','camera'],
      success: (res)=>{
        console.log(res)
        wx.getFileSystemManager().readFile({
          filePath: res.tempFilePaths[0], //选择图片返回的相对路径
          encoding: 'base64', //编码格式
          success: res => { //成功的回调
            // console.log('data:image/png;base64,' + res.data)
            // 发送出去
            this.data.msgs.push({
              type: 'image',
              isMe: true,
              imgSrc: 'data:image/png;base64,' + res.data
            })
            this.setData({
              msgs: this.data.msgs
            })
          }
        })
      },
      fail: ()=>{},
      complete: ()=>{
        this.setData({
          active: false
        })
      }
    });
  },
  /**
   *发送消息
   *
   * @param {*} e
   */
  send(e) {
    this.data.msgs.push({
      type: 'text',
      isMe: true,
      value: this.data.inputValue
    })
    console.log(this.data.msgs)
    this.setData({
      msgs: this.data.msgs
    })
    // 输入框清空
    this.setData({
      inputValue: ''
    })
  },

  /**
   *预览图片
   *
   * @param {*} e
   */
  preview(e) {
    console.log(e);
    const currentUrl = e.currentTarget.dataset.url;
    wx.previewImage({
      current: currentUrl,
      urls: [currentUrl],
      success: (result)=>{
        
      },
      fail: ()=>{},
      complete: ()=>{}
    });
  }
})
