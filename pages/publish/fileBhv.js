module.exports = {
  data: {
    files: [],
    urlArr: [],
  },
  onLoad() {
    this.setData({
        selectFile: this.selectFile.bind(this),
        uplaodFile: this.uplaodFile.bind(this)
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
          urls: this.data.files // 需要预览的图片http链接列表
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
      that.setData({
        urlArr: [], //这用来存放上传多张时的路径数组
      });
      var object = {};
      for (var i = 0; i < tempFilePaths.length; i++) {
        const upload_task = wx.uploadFile({
          // 模拟https
          url: app.globalData.uploadUrl, //需要用HTTPS，同时在微信公众平台后台添加服务器地址  
          filePath: files.tempFilePaths[i], //上传的文件本地地址    
          name: 'file',
          //附近数据，这里为路径     
          success: function(res) {
            var images = that.data.images;
            var data = JSON.parse(res.data);
            if (data.status == "ok") {
              var url = data.url
              that.setData({
                urlArr: that.data.urlArr.concat(app.globalData.zzbHttp + url), //拼接多个路径到数组中
              });
              object['urls'] = that.data.urlArr;
              that.setData({
                images: images + data.url + ";", //images用来存放路径字符串，保存到数据库中的是这个，用“;”分割，但是返回的路径没有“;”，就自己拼上了
              });
              console.log("urlArr:" + that.data.urlArr.length,tempFilePaths.length)
              console.log(that.data.images);
              if (that.data.urlArr.length == tempFilePaths.length) {
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
    console.log('upload success', e.detail)
  }
}