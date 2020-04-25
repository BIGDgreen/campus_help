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
    noResult: false,
  },
  attached() {
    this._setNavogationTitle();
    this._showCategoryList();
  },
  methods: {
    _setNavogationTitle() {
      wx.setNavigationBarTitle({
        title: this.properties.fromTitle
      });
    },
    /**
     * 显示列表
     */
    async _showCategoryList() {
      const fromTitle = this.properties.fromTitle;
      const title = this.properties.title
      let categoryList = [];
      switch (title) {
        case 'category':
          categoryList = await productModel.getCategoryList(fromTitle);
          break;
        case 'collection':
          categoryList = await userModel.getMyList('collection');
          break;
        case 'recycle':
          categoryList = await userModel.getMyList('recycle');
          break;
        case 'sold':
          categoryList = await userModel.getMyList('sold');
          break;
        case 'bought':
          categoryList = await userModel.getMyList('bought');
          break;
        case 'publish':
          categoryList = await userModel.getMyList('sub');
          break;
        default:
          categoryList = [];
      }
      if(categoryList.length === 0) {
        this.setData({
          noResult: true
        })
      } else {
        this.setData({
          categoryList
        })
      }
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
    }
  }
});
