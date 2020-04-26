// pages/publish/publish.js
import { LoginModel } from '../../models/loginModel'
import { CommonData } from '../../utils/commonData'
import ProductModel from '../../models/productModel';
const loginModel = new LoginModel();
const productModel = new ProductModel();
Page({
  data: {
    logined: false,
    accounts: ["床上用品", "电子产品", "书籍文具", "生活用品", "美妆用品", "衣物鞋包", "运动休闲", "其他"],
    tags: ['女生','全新','九成新','不讲价','仅自提','卡通','文艺'],
    accountIndex: 0,
    tagSelected: [false],
    checked: false,
    rules: [
      {
          name: 'commodity_name',
          rules: {required: true, message: '商品名称必填'},
      }, {
          name: 'price',
          rules: [{required: true, message: '价格必填'}, {range: [0,100000000], message: '价格为0到100000000之间的数字'}],
      }
    ],
    formData: {
      commodity_name: '无',
      price: 0,
      type: '床上用品',
      tags: [],
      content: '',
      pics: []
    },
    // isAgree: false,
    urlArr: [],
    images: []
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const logined = loginModel.userLogined();
    this.setData({
      logined
    })
    this.setData({
      selectFile: this.selectFile.bind(this),
      uploadFile: this.uploadFile.bind(this)
    })
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
  // bindAgreeChange: function (e) {
  //   this.setData({
  //       isAgree: !!e.detail.value.length
  //   });
  // },
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
        this.data.formData.price = parseFloat(this.data.formData.price);
        this.data.formData.pics = this.data.urlArr;
        console.log("submitForm:::", this.data.formData);
        productModel.postCommdity(this.data.formData)
          .then(() => {
            wx.showToast({
              title: '发布成功'
            });
            wx.switchTab({
              url: '/pages/index/index'
            })
          })
        }
      })
  },
  /**
   * 图片上传相关操作
   */
  chooseImage: function (e) {
    console.log("chooseImage:::", e);
    var that = this;
    wx.chooseImage({
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
            // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
            that.setData({
                files: that.data.files.concat(res.tempFilePaths)
            });
        }
    })
  },
  previewImage: function(e){
      wx.previewImage({
          current: e.currentTarget.id, // 当前显示图片的http链接
          urls: this.data.urlArr // 需要预览的图片http链接列表
      })
  },
  selectFile(files) {
      console.log('files', files)
      // 返回false可以阻止某次文件上传
  },
  uploadFile(files) {
    console.log('upload files', files)
    // 文件上传的函数，返回一个promise
    return new Promise((resolve, reject) => {
      var tempFilePaths = files.tempFilePaths;
      //上传返回值
      var app = getApp();
      var that = this;
      var object = {};
      this.setData({
        urls: []
      });
      for (var i = 0; i < tempFilePaths.length; i++) {
        const upload_task = wx.uploadFile({
          // 模拟https
          url: CommonData.baseUrl + '/commodity/pic', //需要用HTTPS，同时在微信公众平台后台添加服务器地址
          filePath: files.tempFilePaths[i], //上传的文件本地地址
          name: 'pic',
          formData: {
            'user': 'test'
          },
          //附近数据，这里为路径     
          success: function(res) {
            var images = that.data.images;
            var data = JSON.parse(res.data);
            console.log("上传图片", data);
            if (data.status == "success") {
              var url = data.data;
              that.setData({
                urls: that.data.urls.concat(url), //拼接多个路径到数组中
              });
              object['urls'] = that.data.urls;
              that.setData({
                images: images + data.data + ";", //images用来存放路径字符串，保存到数据库中的是这个，用“;”分割，但是返回的路径没有“;”，就自己拼上了
              });
              // console.log("urlArr:" + that.data.urls.length,tempFilePaths.length)
              // console.log(that.data.images);
              if (that.data.urls.length == tempFilePaths.length) {
                resolve(object)  //这就是判断是不是最后一张已经上传了，用来返回，
              }
            } else {
              reject(res)
            }
          },
          fail: function(err) {
            console.log(err)
          }
        })
      }
    })
  },
  uploadError(e) {
      // console.log('upload error', e.detail)
      wx.showToast({
        title: '上传失败！',
        icon: 'none',
        duration: 1500,
      });
  },
  uploadSuccess(e) {
    console.log("upload success", e.detail);
    this.setData({
      urlArr: this.data.urlArr.concat(e.detail.urls)
    })
    console.log('urlArr:::', this.data.urlArr);
    // this.data.urlArr.concat(e.detail.urls);
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
