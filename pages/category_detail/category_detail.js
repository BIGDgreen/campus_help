// pages/category_detail/category_detail.js
import ProductModel from '../../models/productModel'
const productModel = new ProductModel();
Component({
  properties: {
    type: {
      type: String,
      value: ''
    },
    category: {
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
  async attached() {
    if(this.properties.categoryList.length > 0) {
      // 根据搜索结果显示
      this.setData({
        categoryList: this.properties.categoryList
      })
      return;
    }
    // 根据分类显示
    // console.log("category_detail:::", this.properties.category); // 当前分类
    const category = this.properties.category;
    const categoryList = await productModel.getCategoryList(category).catch(err => {console.error("categoryList:::", err)});
    if(categoryList.length === 0) {
      this.setData({
        noResult: true
      })
    }
    this.setData({
      categoryList
    })
  
  },
  methods: {
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
