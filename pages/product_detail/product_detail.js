// pages/hot-detail/hot_detail.js
import ProductModel from '../../models/productModel'
const productModel = new ProductModel();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    productDetail: null,
    btnValue: '',
    disableBtn: false,
    enFavor: false, // 是否允许收藏
    favor: false,
    dialogShow: false,
    dialogContent: null,
    btnType: '',
    buttons: [{text: '取消'}, {text: '确定'}],
    showTakeOff: true,
    showFooter: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options);
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
    const productDetail = productModel.getProductDetail();
    this.setData({
      productDetail
    })
  },
  /**
   *点击按钮，触发收藏事件
   */
  onFavor(event) {
    const behavior = event.detail.behavior;
    const showText = behavior == 'favor' ? '收藏成功！' : '您已取消收藏';
    wx.showToast({
      title: showText,
      icon: 'none',
    });
  },
  /**
   *点击按钮，当进入我发布的页面时，处理事件
   *
   * @param {*} event
   */
  onTap(event) { 
    console.log(this.data.btnType);
    if(this.data.btnType == 'publish') {
      this.setData({
        dialogShow: true,
        dialogContent: {
          type: 0,
          text: '是否确定将该商品的状态改为已卖出？'
        }
      })
    }
  },
  /**
   *下架商品
   *
   * @param {*} event
   */
  onTakeoff(event) {
    this.setData({
      dialogShow: true,
      dialogContent: {
        type: 1,
        text: '是否确定下架该商品？'
      }
    })
  },
  /**
   *点击弹出框按钮
   *
   * @param {*} event
   */
  tapDialogButton(event) {
    console.log("弹出框:::",event);
    this.setData({
        dialogShow: false
    })
    if(event.detail.index == 1) {
      // 点击了确定
      if(event.currentTarget.dataset.type == 0) {
        // 已卖出
        this._decideBtn('sell');
      } else {
        // 下架
        this._decideBtn('takeOff');
      }
    }
  },
  /**
   *更改按钮文字和状态
   *
   * @param {String} value
   */
  _decideBtn(value) {
    const btnValue = {
      'product': '马上咨询',
      'publish': '我已卖出',
      'sell': '已卖出',
      'takeOff': '已下架',
      'recycle': '已回收'
    }[value];
    this.setData({
      btnValue
    });
    if(value == 'sell' || value == 'takeOff' || value == 'recycle') {
      this.setData({
        disableBtn: true,
        showTakeOff: false
      })
    }
    // 添加收藏按钮
    if(value == 'product') {
      this.setData({
        enFavor: true
      })
    }
  }
})