Component({
    externalClasses: ['icon-class'],
    properties: {
        icon: Object
    },
    methods: {
        /**
         * 点击分类图标，触发事件
         */
        onTap(event) {
            const iconText = this.properties.icon.text;
            this.triggerEvent('tapGrid',{iconText},{})
        }
    }
});
