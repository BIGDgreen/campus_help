// pages/pay/pay.js
import ProductModel from '../../models/productModel'
const productModel = new ProductModel();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    curProduct: {},
    currentId: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    this.currentId = options.id;
    const curProduct = await productModel.getProductDetail(this.currentId);
    console.log(curProduct)
    this.setData({
      curProduct
    })
  },
  /**
   *下单
   *
   * @param {*} event
   */
  onTap(event) {
    // console.log(event);
    productModel.payCommdity(this.currentId)
      .then(() => {
        wx.showToast({
          title: '目前不提供实际的支付功能~默认您已支付成功',
          duration: 2000,
          icon: "none"
        })
        setTimeout(() => {
          wx.switchTab({
            url: '/pages/index/index'
          });
        }, 2000);
      })
  }
})
