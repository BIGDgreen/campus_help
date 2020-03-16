// components/panel/index.js
Component({
  options: {
    multipleSlots: true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    id: {
      type: String,
      value: ''
    },
    imageSrc: {
      type: String,
      value: ''
    },
    title: {
      type: String,
      value: ''
    },
    price: {
      type: String,
      value: ''
    },
    readOnly: {
      type: Boolean,
      value: false
    }
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
      if(!this.properties.readOnly) {
        const id = this.properties.id;
        this.triggerEvent('toDetail',{id},{});
      }
    }
  }
})
