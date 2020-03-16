// pages/pay/pay.js
import ProductModel from '../../models/productModel'
const productModel = new ProductModel();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    curProduct: {},
    username: '张三'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const curProduct = productModel.getCurProduct();
    console.log(curProduct)
    this.setData({
      curProduct
    })
  },
  onTap(event) {
    console.log(event);
  }
})