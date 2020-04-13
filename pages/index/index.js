//index.js
//获取应用实例
const app = getApp()
import iconsData from './icons'
import ProductModel from '../../models/productModel'
const productModel = new ProductModel();
Page({
  data: {
    backgrounds: ['/images/home/backgrounds/swiper1.jpg', '/images/home/backgrounds/swiper2.jpg'],
    icons: iconsData,
    hotLists: []
  },
  async onLoad() {
    const hotLists = await productModel.getHotList();
    console.log("hotList:::", hotLists);
    // 获取热门闲置列表
    this.setData({
      hotLists
    })
  },
  /**
   *跳转到搜索页
   *
   * @param {*} event
   */
  onSearch(event) {
    wx.navigateTo({
      url: '/pages/search/search'
    })
  },
  /**
   *跳转到分类详情页面，并转递图标名称参数
   *
   * @param {*} event
   */
  tapGrid(event) {
    const iconText = event.detail.iconText;
    // console.log(iconText);
    wx.navigateTo({
      url: `/pages/category_detail/category_detail?type=product&category=${iconText}`,
    });
  },
  /**
   *跳转到商品详情
   */
  toCategory(e) {
    console.log("detail:::" ,e);
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/product_detail/product_detail?type=product&id=${id}`
    });
  }
})
