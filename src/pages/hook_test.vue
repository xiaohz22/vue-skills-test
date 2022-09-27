<script lang="ts" setup>
    // 调用自定义的hooks函数
    import useMousePosition from '../hooks/useMousePosition'
    import useTitle from '../hooks/useTitle'
    let point = useMousePosition()
    // skl-13.联系
    let title = useTitle();
</script>

<script lang="ts">
    export default {
        name: 'hooktest',
        beforeRouteEnter(to, from, next) {
            // console.log('to, before', to) 
            // console.log('from, before', from) 
            // console.log('next', next) 
            next()  // 放行
        },
        mounted() {

        }
    }
</script>

<template>
    <div class="hookTest">
        <div>鼠标坐标: {{ point }}</div>
        <div>我的标题: {{ title }}</div>
        <router-link to="/main">跳转至main</router-link>
    </div>
</template>

<style lang="scss">

</style>