// components/like/index.js
Component({
  /**
   * 组件的属性列表
   * (开放性数据)
   */
  properties: {
    favor: {
      type: Boolean,
      value: false
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
    yesSrc: 'images/favor@active.png',
    noSrc: 'images/favor@default.png',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 点击爱心，点赞数加一或减一，切换爱心状态
    onFavor(event) {
      if(this.properties.readOnly) return;  // 只读时，不做任何处理
      const favor = this.properties.favor;
      // 更新数据
      this.setData({
        favor: !favor,
      })
      // 激活自定义事件like
      let behavior = this.properties.favor ? 'favor' : 'cancel';
      this.triggerEvent('tapFavor',{ behavior }, {});
    }
  }
})
