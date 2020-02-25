// components/panel/index.js
Component({
  options: {
    multipleSlots: true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    id: String,
    imageSrc: String,
    title: String,
    updateTime: String
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 跳转到相应页面
    toDetail() {
      const id = this.properties.id;
      this.triggerEvent('toDetail',{id},{});
    }
  }
})
