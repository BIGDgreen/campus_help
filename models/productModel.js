import { HTTP } from '../utils/http'
class ProductModel extends HTTP {
  /**
   *获取热门闲置列表
   *
   * @returns
   * @memberof ProductModel
   */
  getHotList(page = 1, size = 10) {
    return this.request({
      url: '/commodity/hots',
      needToken: false,
      data: {
        page,
        size
      }
    })
  }

  /**
   *获取当前分类下的列表
   *
   * @returns
   * @memberof ProductModel
   */
  getCategoryList(category, page = 1, size = 10) {
    return this.request({
      url: '/commodity/type',
      data: {
        type: category,
        page,
        size
      },
      needToken: false
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
      url: `/commodity/detail/${id}`,
      needToken: false
    })
  }
   /**
   *获取当前回收商品详情
   *
   * @returns
   * @memberof ProductModel
   */
  getRecycleDetail(id) {
    return this.request({
      url: `/commodity/recycleDetail/${id}`
    })
  }
  /**
   *收藏该商品
   *
   * @param {*} id
   * @returns
   * @memberof ProductModel
   */
  markCategory(id) {
    return this.request({
      url: `/commodity/detail/${id}/mark`
    })
  }

  /**
   *取消收藏该商品
   *
   * @param {*} id
   * @returns
   * @memberof ProductModel
   */
  unMarkCategory(id) {
    return this.request({
      url: `/commodity/detail/${id}/mark`
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
      },
      needToken: false
    })
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
  /**
   * 发布回收
   * @param {Object} formData 
   */
  postRecycle(formData) {
    return this.request({
      url: '/recycle/submit',
      method: 'POST',
      data: formData
    })
  }
  /**
   * 将我发布的物品添加到回收
   * @param {Object} formData 
   */
  addRecycle(id, formData) {
    return this.request({
      url: `/recycle/${id}/submit`,
      method: 'POST',
      data: formData
    })
  }
  /**
   *支付
   *
   * @param {*} id
   * @returns
   * @memberof ProductModel
   */
  payCommdity(id) {
    return this.request({
      url: `/commodity/${id}/pay`
    })
  }

  /**
   *建立当前用户和物品拥有者用户的联系
   *
   * @param {*} id
   * @returns
   * @memberof ProductModel
   */
  buildConnection(id) {
    return this.request({
      url: `/commodity/${id}/communication`
    })
  }
}

export default ProductModel
