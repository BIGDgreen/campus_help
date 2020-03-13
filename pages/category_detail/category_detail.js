// pages/category_detail/category_detail.js
import ProductModel from '../../models/productModel'
const productModel = new ProductModel();
Component({
  properties: {
    type: String
  },
  data: {
    type: '',
    categoryList: []
  },
  attached(options) {
    console.log("category_detail:::", this.properties.type); // 当前分类
    this.data.type = this.properties.type;
    const categoryList = productModel.getCategoryList();
    this.setData({
      categoryList
    })
  },
  methods: {
    /**
    *跳转到相关详情页面
    */
    toCategory() {
      const type = this.data.type;
      wx.navigateTo({
        url: `/pages/product_detail/product_detail?type=${type}`
      });
    }
  }
});
