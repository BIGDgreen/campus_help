// pages/category_detail/category_detail.js
import ProductModel from '../../models/productModel'
const productModel = new ProductModel();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    categoryList: [],
    type: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("category_detail:::", options); // 当前分类
    this.data.type = options.type;
    const categoryList = productModel.getCategoryList();
    this.setData({
      categoryList
    })
  },

  /**
   *跳转到相关详情页面
   */
  toCategory() {
    const type = this.data.type;
    wx.navigateTo({
      url: `/pages/product_detail/product_detail?type=${type}`
    });
  }
})