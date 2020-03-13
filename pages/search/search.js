// pages/search/search.js
import KeywordModel from '../../models/keywordModel'
import ProductModel from '../../models/productModel'
const keywordModel = new KeywordModel()
const productModel = new ProductModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    historyWords: [], // 历史记录
    hotWords: [], // 热门搜索
    searched: false,  // 控制搜索结果的显示
    loadingCenter: false,
    inputValue: '',
    dataArray: [] // 搜索结果
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log("histories:::", this.data.historyWords)
    this.setData({
      historyWords: keywordModel.getHistory()
    });
    const hotWords = keywordModel.getHot()
    this.setData({
      hotWords
    })
      // .then(res => {
      //   // console.log("hotTags:::", res.hot);
      //   this.setData({
      //     hotWords: res.hot
      //   })
      // })
  },

  onConfirm(event) {
    console.log("confirm", event)
    const input = event.detail.value || event.detail.tagContent
    if(input && input.trim()) {
      // 将本次搜索加入历史记录
      keywordModel.addHistory(input)
      // 获取搜索结果
      productModel.getCategoryList();
      // 显示搜索结果
      this.setData({
        searched: true,
        inputValue: input,
      })
    }
  },

  /**
   *删除当前搜索内容
   *
   */
  onDelete() {
    this.init();
  },
  /**
   *取消搜索，回到主页
   *
   * @param {*} event
   */
  onCancel(event) {
    console.log(event)
    this.init();
    wx.navigateBack({
      delta: 1
    });
  },
  /**
   *回到搜索页面初始状态
   *
   */
  init() {
    this.setData({
      inputValue: '',
      searched: false
    }) 
  }
})