// pages/category_detail/category_detail.js
import ProductModel from '../../models/productModel'
import { UserModel } from '../../models/userModel'
const productModel = new ProductModel();
const userModel = new UserModel();
Component({
  properties: {
    type: {
      type: String,
      value: ''
    },
    fromTitle: {
      type: String,
      value: ''
    },
    title: {
      type: String,
      value: ''
    },
    categoryList: {
      type: Array,
      value: []
    }
  },
  data: {
    page: 1,
    noMore: false,
    windowHeight: ''
  },
  attached() {
    this._setNavigationTitle();
    this._showCategoryList((categoryList) => {
      this.setData({
        categoryList
      });
    });
    //获取设备信息，获取屏幕的Height属性
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          windowHeight : res.windowHeight
        })
      }
    })
  },
  methods: {
    loadMore() {
      if(this.data.noMore) return;
      this.data.page++;
      this._showCategoryList((tmp) => {
        this.data.noMore = (!tmp || tmp.length === 0);
        if(!this.data.noMore) {
          this.setData({
            categoryList: this.data.categoryList.concat(tmp)
          })
        }
      },this.data.page, 10);
    },
   /**
    *获取列表
    *
    * @param {Function} fun
    * @param {number} [page=1]
    * @param {number} [size=10]
    */
   async _showCategoryList(fun, page = 1, size = 10) {
      const fromTitle = this.properties.fromTitle;
      const title = this.properties.title
      let categoryList = [];
      switch (title) {
        case 'category':
          categoryList = await productModel.getCategoryList(fromTitle, page, size);
          break;
        case 'collection':
          categoryList = await userModel.getMyList('collection', page, size);
          break;
        case 'recycle':
          categoryList = await userModel.getMyList('recycle', page, size);
          break;
        case 'sold':
          categoryList = await userModel.getMyList('sold', page, size);
          break;
        case 'bought':
          categoryList = await userModel.getMyList('bought', page, size);
          break;
        case 'publish':
          categoryList = await userModel.getMyList('sub', page, size);
          break;
        case 'search':
          categoryList = this.properties.categoryList;
          break;
        default:
          categoryList = [];
      };
      fun(categoryList);
    },
    /**
    *跳转到相关详情页面
    */
    toCategory(e) {
      const type = this.properties.type;
      const id = e.currentTarget.dataset.id;
      wx.navigateTo({
        url: `/pages/product_detail/product_detail?type=${type}&id=${id}`
      });
    },
    /**
     *自定义导航栏标题
     */
    _setNavigationTitle() {
      wx.setNavigationBarTitle({
        title: this.properties.fromTitle
      });
    }
  }
});
