// pages/publish/publish.js
import { LoginModel } from '../../models/loginModel'
const loginModel = new LoginModel();
const fileBhv = require('./fileBhv')
Page({
  behaviors: [fileBhv],
  /**
   * 页面的初始数据
   */
  data: {
    logined: false,
    accounts: ["床上用品", "电子产品", "书籍文具", "生活用品", "美妆用品", "衣物鞋包", "运动休闲", "其他"],
    tags: ['女生','全新','九成新','不讲价','仅自提','卡通','文艺'],
    accountIndex: 0,
    tagSelected: [false],
    checked: false,
    formData: {
      commodity_name: '无',
      price: '0',
      type: '床上用品',
      tags: [],
      content: '',
      pics: []
    },
    isAgree: false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const logined = loginModel.userLogined();
    this.setData({
      logined
    })
    // this.setData({
    //   selectFile: this.selectFile.bind(this),
    //   uploadFile: this.uploadFile.bind(this)
    // })
  },

  /**
   *选中标签
   *
   * @param {*} event
   */
  onTag(event) {
    console.log("tagIndex:::",event);
    this._tagOption(event, 'click');
  },

  /**
   *取消当前标签
   *
   * @param {*} event
   */
  onCancel(event) {
    console.log("cancel:::", event);
    this._tagOption(event, 'cancel');
  },
  /**
   *勾选是否同意商品回收计划
   * @param {*} event
   */
  checkboxChange(event) {
    console.log("checkbox:::", event);
  },
  /**
   *查看商品回收计划
   *
   */
  joinRecycle() {
    wx.navigateTo({
      url: '/pages/recycle_plan/recycle_plan'
    });
  },
  titleInput(event) {
    // console.log("input:::", event);
    this._bindFormItem(event, 'commodity_name');
  },
  priceInput(event) {
    this._bindFormItem(event, 'price');
  },
  typeInput(event) {
    const type = this.data.accounts[this.data.accountIndex];
    this.setData({
      accountIndex: event.detail.value,
      ['formData.type']: type
    });
  },
  descriptionInput(event) {
    // console.log("des:::", event);
    this._bindFormItem(event, 'content');
  },
  bindAgreeChange: function (e) {
    this.setData({
        isAgree: !!e.detail.value.length
    });
  },
  /**
   *提交商品信息表单
   *
   * @param {*} event
   */
  submitForm(event) {
    console.log("submitForm:::", this.data.formData);
    wx.showToast({
      title: '提交成功'
    });
  },
  /**
   *绑定表单数据
   *
   * @param {*} event
   * @param {String} attr
   */
  _bindFormItem(event, attr) {
    const value = event.detail.value;
    this.setData({
      ['formData.'+attr]: value
    })
  },
  /**
   *与标签相关的操作
   *
   * @param {*} event
   * @param {*} clickOrCancel
   */
  _tagOption(event, clickOrCancel) {
    const index = event.currentTarget.dataset.index;
    if(clickOrCancel == 'click') {
      // 选中
      this.setData({
        ['tagSelected['+index+']']: true
      });
      this.data.formData.tags.push(this.data.tags[index]);
    } else {
      // 取消
      this.setData({
        ['tagSelected['+index+']']: false
      });
      this.data.formData.tags.splice(index, 1);
    }
  }
})
