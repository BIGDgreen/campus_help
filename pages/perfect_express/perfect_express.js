// pages/perfect_express/perfect_express.js
import { UserModel } from '../../models/userModel.js'
const userModel = new UserModel();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      showTopTips: false,
      rules: [
        {
            name: 'sender_name',
            rules: {required: true, message: '收货人姓名是必选项'},
        }, {
            name: 'sender_phone',
            rules: [{required: true, message: '发货人手机号必填'}, {mobile: true, message: '手机号格式不对'}],
        }, {
          name: 'weight',
          rules: [{required: true, message: '货物重量必填'}, {range: [0,100], message: '货物重量为0到100之间的数字'}],
        },{
          name: 'recipient_name',
          rules: {required: true, message: '收货人姓名必填'},
        },{
          name: 'recipient_phone',
          rules: [{required: true, message: '收货人手机号必填'}, {mobile: true, message: '手机号格式不对'}],
        }
      ],
      formData: {},
      deliveryCompanies: ['申通','中通','圆通','邮政','顺丰','韵达','百世','宅急送','德邦','京东','天天'],
      companyIndex: 0,
      types: ['床上用品','电子产品','书籍文具','生活用品','美妆用品','衣物鞋包','运动休闲','其他物品'],
      typeIndex: 0,
      sender_region: ['广东省', '广州市', '海珠区'],
      sender_region_detail: '',
      // sender_customItem: '全部',
      recipient_region: ['广东省', '广州市', '海珠区'],
      recipient_region_detail: '',
      // recipient_customItem: '全部'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  /**
   * 监听发货地详细地址输入
   * @param {Object} e 
   */
  onSenderOrginInput(e) {
    this.setData({
      sender_region_detail: e.detail.value
    })
  },
  /**
   * 监听收货地详细地址输入
   * @param {Object} e 
   */
  onRecipientOrginInput(e) {
    this.setData({
      recipient_region_detail: e.detail.value
    })
  },
  /**
   * 监听输入框变化
   * @param {Object}} e 
   */
  formInputChange(e) {
    const {field} = e.currentTarget.dataset
    this.setData({
        [`formData.${field}`]: e.detail.value
    })
  },
  /**
   * 选择快递公司
   * @param {*} e 
   */
  bindCompanyChange: function(e) {
    this.setData({
      companyIndex: e.detail.value
    })
  },
  /**
   * 选择货物类型
   * @param {Object} e 
   */
  bindTypeChange: function(e) {
    this.setData({
      typeIndex: e.detail.value
    })
  },
  /**
   * 选择发货地
   * @param {Object} e 
   */
  bindSenderRegionChange: function (e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      sender_region: e.detail.value
    })
  },
  /**
   * 选择收货地
   * @param {Object} e 
   */
  bindRecipientRegionChange: function (e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      recipient_region: e.detail.value
    })
  },
  /**
   * 表单提交
   */
  submitForm() {        
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
        // 校验通过
        const recipient_address = this.data.recipient_region[0] + this.data.recipient_region[1] + this.data.recipient_region[2] + this.data.recipient_region_detail;
        const sender_address = this.data.sender_region[0] + this.data.sender_region[1] + this.data.sender_region[2] + this.data.sender_region_detail;
        // console.log(userModel);
        userModel.perfectExpress({
          delivery_company: this.data.deliveryCompanies[this.data.companyIndex],
          recipient_address,
          recipient_name: this.data.formData.recipient_name,
          recipient_phone: this.data.formData.recipient_phone,
          sender_address,
          sender_name: this.data.formData.sender_name,
          sender_phone: this.data.formData.sender_phone,
          type: this.data.types[this.data.typeIndex],
          weight: parseFloat(this.data.formData.weight)
        }).then((res) =>{
          console.log(res);
        }).catch(err => {
          console.error(err);
        })
      }
    })
  }
})