// pages/hot-detail/hot_detail.js
import ProductModel from '../../models/productModel'
import { Filter } from '../../utils/filter';
const productModel = new ProductModel();
const filter = new Filter();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentId: '',    // 当前商品的id
    productDetail: null,
    btnValueLeft: '',
    btnValueRight: '',
    disableBtn: false,
    enFavor: false, // 是否允许收藏
    dialogShow: false,
    dialogContent: null,
    btnType: '',
    buttons: [{text: '取消'}, {text: '确定'}],
    showRightBtn: true,
    showFooter: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    console.log(options);
    const id = options.id;
    this.data.currentId = id;
    const btnType = options.type;
    if(btnType === 'buy') {
      // 已购买的商品不再提供底部footer
      this.setData({
        showFooter: false
      })
    } else {
      this._decideBtn(btnType);
      this.setData({
        btnType
      })
    }
    // 显示商品详情
    const productDetail = btnType === 'recycle' ? await productModel.getRecycleDetail(id) : await productModel.getProductDetail(id);
    productDetail.updateTime = filter.formatDate(productDetail.updateTime);
    // console.log(productDetail);
    this.setData({
      productDetail
    })
  },
  /**
   *点击按钮，触发收藏事件
   */
  onFavor(event) {
    const behavior = event.detail.behavior;
    // console.log(behavior);
    if(behavior === 'favor') {
      productModel.markCategory(this.data.currentId)
        .then(() => {
          wx.showToast({
            title: '收藏成功！',
            icon: 'none',
          });
        })
    } else if(behavior === 'cancel') {
      productModel.unMarkCategory(this.data.currentId)
        .then(() => {
          wx.showToast({
            title: '您已取消收藏',
            icon: 'none',
          });
        })
    }
  },
  /**
   *点击按钮，当进入我发布的页面时，处理事件
   *
   * @param {*} event
   */
  async onTapLeft(event) { 
    console.log(this.data.btnType);
    if(this.data.btnType === 'publish') {
      // 完善回收信息
      wx.navigateTo({
        url: `/pages/add_recycle/add_recycle?id=${this.data.currentId}`,
      })
    } else if(this.data.btnType === 'product') {
      const senderId = wx.getStorageSync('openId');
      if(!senderId) {
        wx.showToast({
          title: '您未登录',
          icon: 'none',
          duration: 1500
        });
        setTimeout(() => {
          wx.switchTab({
            url: '/pages/my/my'
          });
        }, 1500);
        return;
      }
      const receiverId = await productModel.buildConnection(this.data.currentId);
      wx.navigateTo({
        url: `/pages/chat_room/chat_room?senderId=${senderId}&receiverId=${receiverId}`,
      });
    }
  },
  /**
   *立即购买
   *
   * @param {*} event
   */
  onTapRight(event) {
    console.log(this.data.btnType);
    if(this.data.btnType == 'product') {
      // 立即购买
      wx.navigateTo({
        url: `/pages/pay/pay?id=${this.data.currentId}`
      });
    }
    // else {
    //   // 下架商品
    //   this.setData({
    //     dialogShow: true,
    //     dialogContent: {
    //       type: 1,
    //       text: '是否确定下架该商品？'
    //     }
    //   })
    // }
  },
  /**
   *点击弹出框按钮
   *
   * @param {*} event
   */
  // tapDialogButton(event) {
  //   console.log("弹出框:::",event);
  //   this.setData({
  //       dialogShow: false
  //   })
  //   if(event.detail.index == 1) {
  //     // 点击了确定
  //     if(event.currentTarget.dataset.type == 0) {
  //       // 已卖出
  //       this._decideBtn('sell');
  //     } else {
  //       // 下架
  //       this._decideBtn('takeOff');
  //     }
  //   }
  // },
  /**
   *更改按钮文字和状态
   *
   * @param {String} value
   */
  _decideBtn(value) {
    const btnValue = {
      'product': ['马上咨询', '立即购买'],
      'publish': ['加入回收'],
      'sell': ['已卖出'],
      'buy': ['已购买'],
      'recycle': ['已回收']
    }[value];
    this.setData({
      btnValueLeft: btnValue[0],
      btnValueRight: btnValue[1] || '',
      showRightBtn: btnValue[1]
    });
    // 已卖出、已下架和已回收的按钮禁用
    if(value == 'sell' || value == 'takeOff' || value == 'recycle') {
      this.setData({
        disableBtn: true,
        showRightBtn: false
      })
    }
    // 添加收藏按钮和立即购买
    if(value == 'product') {
      this.setData({
        enFavor: true,
        btnValueRight: '立即购买'
      })
    }
    if(value == 'publish') {
      this.setData({
        showRightBtn: false
      })
    }
  }
})