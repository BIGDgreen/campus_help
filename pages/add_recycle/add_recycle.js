// pages/add_recycle/add_recycle.js
import ProductModel from '../../models/productModel'
const productModel = new ProductModel();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rules: [
      {
        name: 'weight',
        rules: [{required: true, message: '货物重量必填'}, {range: [0,100], message: '货物重量为0到100之间的数字'}],
      },{
        name: 'apartment',
        rules: {required: true, message: '公寓必填'},
      }
    ],
    startDate: '',
    currentStartDate: '',
    currentEndDate: '',
    endDate: '',
    currentId: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options);
    this.data.currentId = options.id;
    let date = new Date();
    this.setData({
      startDate: this._transDate(date),
      currentStartDate: this._transDate(date),
      currentEndDate: this._transDate(date),
      [`formData.start_time`]: this._transDate(date),
      [`formData.end_time`]: this._transDate(date)
    })
  },
   /**
   * 时间格式转换
   * @param {Date} date 
   */
  _transDate(date) {
    let month = date.getMonth() + 1 > 9 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1);
    let day = date.getDate() > 9 ? date.getDate() : '0' + date.getDate();
    return `${date.getFullYear()}-${month}-${day}`;
  },
  formInput(event) {
    // console.log("input:::", event);
    const value = event.detail.value;
    const attr = event.currentTarget.dataset.field;
    this.setData({
      ['formData.'+attr]: value
    })
  },
  bindStartDateChange: function (e) {
    this.setData({
      currentStartDate: e.detail.value,
        [`formData.start_time`]: e.detail.value
    })
  },
  bindEndDateChange: function (e) {
    this.setData({
      currentEndDate: e.detail.value,
        [`formData.end_time`]: e.detail.value
    })
  },
  /**
   *提交商品信息表单
   *
   * @param {*} event
   */
  submitForm(event) {
    this.selectComponent('#form').validate((valid, errors) => {
      console.log('valid', valid, errors)
      if (!valid) {
          const firstError = Object.keys(errors)
          if (firstError.length) {
              this.setData({
                  error: errors[firstError[0]].message
              })
          }
      } else {
          console.log("submitForm:::", this.data.formData);
          productModel.addRecycle(this.data.currentId, this.data.formData)
            .then(() => {
              wx.showToast({
                title: '加入回收成功！',
                icon: 'none'
              });
              wx.switchTab({
                url: '/pages/my/my'
              })
            })
            .catch(() => {
              wx.switchTab({
                url: '/pages/my/my'
              })
            })
      }
    })
  },
})