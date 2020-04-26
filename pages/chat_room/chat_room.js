import NotificationModel from '../../models/notificationModel'
import { CommonData } from '../../utils/commonData'
const notificationModel = new NotificationModel();
Page({
  data: {
    active: false,
    msgs: [],
    isMe: false,
    inputValue: '',
    senderId: '',
    receiverId: '',
    sendDisabled: true,
    isOpen: false,   // socket open
    scrollTop: 0,//控制上滑距离
    windowHeight: 0,//页面高度
    page: 1,
    enableLoad: true,
    images: []
  },
  async onLoad(options) {
    console.log(options);
    // let height = wx.getSystemInfoSync().windowHeight;
    // this.setData({
    //   windowHeight: height
    // });
    this._toPageBottom();
    this.data.senderId = wx.getStorageSync('openId');;
    this.data.receiverId = options.receiverId;
    // 设置导航栏标题
    wx.setNavigationBarTitle({
      title: options.title || '会话'
    });
    // 获取历史记录
    let histories = await notificationModel.getHistory(this.data.senderId, this.data.receiverId);
    histories && histories.length > 0 ? histories = this._convertMsgFormat(histories) : null;
    console.log("histories:::", histories);
    this.setData({
      msgs: histories
    })
    histories.map((item) => {
      if(item.type === 'image') {
        this.setData({
          urls: this.data.images.push(item.value)
        })
      }
    })
    // 建立连接
    notificationModel.connectSocket(this.data.senderId);
    // 监听socketOpen
    wx.onSocketOpen(() => {
      console.log("socket连接已打开")
      this.data.isOpen = true;
    })
    // 监听socketClose
    wx.onSocketClose((code, reason) => {
      console.log(code, reason, 'socket连接已关闭');
      this.data.isOpen = false;
    })
    // 监听服务器返回的数据
    wx.onSocketMessage((data) => {
      console.log("从服务器得到", JSON.parse(data.data));
      data = JSON.parse(data.data);
      this.data.msgs.push({
        type: data.type === 0 ? 'text' : 'image',
        isMe: data.sender.userId === this.data.senderId ? true : false,
        value: data.content,
        sender: data.sender,
        receiver: data.receiver 
      });
      if(data.type === 1) {
        this.data.urls.push(data.content);
      }
      console.log("after get:::", this.data.msgs);
      this.setData({
        msgs: this.data.msgs,
        urls: this.data.urls
      });
      this._toPageBottom();
    })
  },
  onUnload() {
    notificationModel.closeSocket();
  },
  /**
   *滚动到顶部
   */
  async onTop() {
    if(!this.data.enableLoad) return;
    this.data.page++;
    let tmp = await notificationModel.getHistory(this.data.senderId, this.data.receiverId, this.data.page);
    tmp && tmp.length > 0 ? tmp = this._convertMsgFormat(tmp) : null;
    this.data.enableLoad = tmp.length === 0 ? false : true;
    this.data.msgs = tmp.concat(this.data.msgs);
    this.setData({
      msgs: this.data.msgs
    })
  },
  /**
   *正在输入
   *
   * @param {*} e
   */
  onInput(e) {
    // console.log(e);
    this.data.inputValue = e.detail.value.trim();
    this.setData({
      sendDisabled: !this.data.inputValue
    })
  },
  /**
  *文字发送消息
  *
  * @param {*} e
  */
  send(e) {
    if(!this.data.isOpen || this.data.sendDisabled) return;
    notificationModel.sendMessage({
      receiverId: this.data.receiverId,
      type: 0,
      content: this.data.inputValue
    });
    // 输入框清空
    this.setData({
      inputValue: ''
    })
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
        // console.log(res)
        wx.uploadFile({
          url: CommonData.baseUrl + '/commodity/pic',
          filePath: res.tempFilePaths[0],
          name: 'pic',
          formData: {
            'user': 'test'
          },
          success: (result)=>{
            // console.log("uploadRes:::", result);
            let data = JSON.parse(result.data);
            if(data.status === 'success') {
              this.setData({
                images: this.data.images.concat(data.data)
              });
              notificationModel.sendMessage({
                receiverId: this.data.receiverId,
                type: 1,
                content: data.data
              });
            }
          }
        });
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
   *预览图片
   *
   * @param {*} e
   */
   preview(e) {
    console.log(e);
    const currentUrl = e.currentTarget.dataset.url;
    console.log(this.data.images);
    wx.previewImage({
      current: currentUrl,
      urls: this.data.images
    });
  },

  /**
   *转换消息格式
   *
   * @param {*} msg
   * @returns
   */
  _convertMsgFormat(msgs) {
    let res = msgs.map((msg) => {
      let tmp = {
        type: msg.type === 0 ? 'text' : 'image',
        isMe: msg.sender.userId === this.data.senderId ? true : false,
        value: msg.content,
        sender: msg.sender,
        receiver: msg.receiver
      };
      return tmp;
    })
    return res;
  },
  /**
   *自动滚动到页面底部
   */
   _toPageBottom() {
    var that = this;
    var height = wx.getSystemInfoSync().windowHeight;
    wx.createSelectorQuery().select('#scroll-page').boundingClientRect(function(rect) {
      if (rect){
        that.setData({
          windowHeight: height,
          scrollTop: rect.height
        })
        wx.pageScrollTo({
          scrollTop: rect.bottom
        });
      }
    }).exec();
  }
})
