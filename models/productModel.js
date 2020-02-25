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
        title: '床上三件套',
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
   *获取当前商品详情
   *
   * @returns
   * @memberof ProductModel
   */
  getProductDetail() {
    let productDetail = {
      title: '床上三件套',
      tags: ['全新','女生用','卡通'],
      updateTime: '2020-1-2 14:00',
      images: [
        'http://qz.faisys.com/image/wxImage/default_ablum.jpg',
        'http://qz.faisys.com/image/wxImage/default_ablum.jpg'
      ],
      content: '当有var时，输出undefined。当没有var时，抛出ReferenceError错误。可见在这里没有出现变量提升，也就是说全局变量a并没有被创建。因为代码在编译时，没有找到a的声明，在执行阶段中，console.log(a)发生RHS查询，找不到变量a。自然抛出ReferenceError错误。由此可见，a = 1创建一个具有名称a的全局变量这个过程是在执行阶段发生的。当没有执行到这一步时，就没有变量a。'
    }
    return productDetail;
  }
}

export default ProductModel
