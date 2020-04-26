//index.js
//获取应用实例
const app = getApp()
import iconsData from './icons'
import ProductModel from '../../models/productModel'
const productModel = new ProductModel();
Page({
  data: {
    backgrounds: ['http://39.106.103.198/7ecf70ce4eab48818ee17c19e2a7e490.jpg',
     'http://39.106.103.198/142d9ac630eb491893b2a1ae5c5918ac.jpg'],
    icons: iconsData,
    hotLists: [],
    page: 1,
    noMore: false,
    windowHeight:"",     //适配设备的高度
  },
  async onLoad() {
    const hotLists = await productModel.getHotList();
    console.log("hotList:::", hotLists);
    // 获取热门闲置列表
    this.setData({
      hotLists
    })
    //获取设备信息，获取屏幕的Height属性
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          windowHeight : res.windowHeight
        })
      }
    })
  },
  /**
   *加载更多
   *
   * @returns
   */
  async loadMore() {
    if(this.data.noMore) return;
    this.data.page ++;
    const tmp = await productModel.getHotList(this.data.page);
    this.data.noMore = (!tmp || tmp.length === 0);
    if(!this.data.noMore) {
      this.setData({
        hotLists: this.data.hotLists.concat(tmp)
      })
    }
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
    wx.navigateTo({
      url: `/pages/category_detail/category_detail?type=product&fromTitle=${iconText}&title=category`,
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
