import { HTTP } from '../utils/http'
class ProductModel extends HTTP {
  /**
   *获取热门闲置列表
   *
   * @returns
   * @memberof ProductModel
   */
  getHotList() {
    return this.request({
      url: '/commodity/hots'
    })
  }

  /**
   *获取当前分类下的列表
   *
   * @returns
   * @memberof ProductModel
   */
  getCategoryList(category) {
    return this.request({
      url: '/commodity/type',
      data: {
        type: category
      }
    })
  }

  /**
   *获取当前商品详情
   *
   * @returns
   * @memberof ProductModel
   */
  getProductDetail(id) {
    return this.request({
      url: `/commodity/detail/${id}`
    })
  }

  /**
   *获取搜索结果
   *
   * @param {String} value
   * @returns
   * @memberof ProductModel
   */
  getSearchRes(value) {
    return this.request({
      url: '/commodity/search',
      data: {
        search: value
      }
    })
  }
  /**
   *获取选中商品的支付信息
   *
   * @returns
   * @memberof ProductModel
   */
  getCurProduct() {
    const curProduct = {
      imageSrc: 'http://qz.faisys.com/image/wxImage/default_ablum.jpg',
      title: '标题1',
      price: 100
    };
    return curProduct;
  }

  /**
   *发布商品
   *
   * @param {Object} formData
   * @returns
   * @memberof ProductModel
   */
  postCommdity(formData) {
    console.log("postData:::", formData);
    return this.request({
      url: '/commodity/submit',
      method: 'POST',
      data: formData
    })
  }
  
}

export default ProductModel
