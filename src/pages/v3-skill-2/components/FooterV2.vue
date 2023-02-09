<template>
    <!-- skl-38. 检查slot是否为空 Vue2 -->
    <footer v-if="isShowFooter">
        <h3>来自底层的仰望useSlots vue2</h3>
        <slot name="footer"></slot>
    </footer>
</template>

<script lang="ts">
export default {
    data() {
        return {
            isShowFooter: false
        }
    },
    created() {
        this.setShowSlots()
    },
    beforeUpdate() {
        this.setShowSlots()
    },
    methods: {
        // skl-38.联系 Vue2
        setShowSlots() {
            console.log('this.$slots.footer', this.$slots)
            this.isShowFooter = !!this.$slots.footer
        }
        // skl-40.methods中方法可以赋值为高阶函数返回的结果
        // debounce为lodash的防抖函数，search函数被赋值为debounce返回的结果即具有防抖功能的请求函数
        // search: debounce(async function(keyword) {
        //     // 逻辑
        // }, 500)
    },
    computed: {

    }
}
</script>