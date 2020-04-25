import { HTTP } from '../utils/http'
class UserModel extends HTTP {
  /**
   *获取与我有关的商品列表
   *
   * @param {String} type
   * @param {*} page
   * @param {*} size
   * @returns
   * @memberof UserModel
   */
  getMyList(type, page, size) {
    return this.request({
      url: `/user/${type}` 
    })
  }
  /**
   *完善快递信息
   *
   * @param {Object} expressInfo
   * @returns
   * @memberof UserModel
   */
  perfectExpress(expressInfo) {
    console.log(expressInfo);
      return this.request({
        url: '/recycle/delivery',
        data: expressInfo,
        method: 'POST'
      })
  }
}

export { UserModel } 
