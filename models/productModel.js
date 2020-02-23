import {HTTP} from '../utils/http'

class ProductModel extends HTTP {
  /**
   *获取热门闲置列表
   *
   * @returns
   * @memberof ProductModel
   */
  getHotList() {
    // this.request()
    let hotLists = [
      {
        imageSrc: 'http://qz.faisys.com/image/wxImage/default_ablum.jpg',
        title: '标题1',
        updateTime: '2020-1-2'
      },
      {
        imageSrc: 'http://qz.faisys.com/image/wxImage/default_ablum.jpg',
        title: '标题2',
        updateTime: '2019-12-12'
      }
    ]
    return hotLists;
  }

  /**
   *获取当前分类下的列表
   *
   * @returns
   * @memberof ProductModel
   */
  getCategoryList() {
    let categoryList = [
      {
        id: 1,
        imageSrc: 'http://qz.faisys.com/image/wxImage/default_ablum.jpg',
        title: '标题1',
        updateTime: '2019-12-12',
        tags: ['全新','卡通图案']
      },
      {
        id: 2,
        imageSrc: 'http://qz.faisys.com/image/wxImage/default_ablum.jpg',
        title: '标题2',
        updateTime: '2019-12-12',
        tags: ['全新','卡通图案']
      }
    ]
    return categoryList;
  }

  /**
   *获取商品标签
   *
   * @returns
   * @memberof ProductModel
   */
  getTags() {
    let tags = ['全新','卡通图案'];
    return tags;
  }
}

export {ProductModel}
