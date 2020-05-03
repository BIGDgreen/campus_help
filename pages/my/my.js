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
  onShow: function (options) {
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
    // 登录
    loginModel.login(userInfo, (res) => {
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
    let type = '';
    let fromTitle = '';
    const mytype = event.currentTarget.dataset.mytype;
    switch (mytype) {
      case 'collection':
        fromTitle = '我的收藏';
        type = 'product';
        break;
      case 'recycle':
        fromTitle = '我的回收';
        type = 'recycle';
        break;
      case 'sold':
        fromTitle = '我卖出的';
        type = 'sell';
        break;
      case 'bought':
        fromTitle = '我购买的';
        type = 'buy'
        break;
      case 'publish':
        fromTitle = '我发布的';
        type = 'publish';
        break;
      default:
        console.log("default");
    }
    wx.navigateTo({
      url: `/pages/category_detail/category_detail?type=${type}&fromTitle=${fromTitle}&title=${mytype}`,
    });
  },
  /**
   * 联系客服
   */
  contactService() {
    wx.navigateTo({
      url: `/pages/chat_room/chat_room?receiverId=admin&title=客服` 
    });
  },
   /**
   *若用户已经授权，直接获取用户信息
   *
   */
  _userAuthorized() {
    if(loginModel.userLogined()) {
      loginModel.userAuthorized((result) => {
        this.setData({
          authorized: true,
          userInfo: result.userInfo
        });
      })
    }
  }
})
