<template>
    <!-- skl-10.递归插槽及使用方式 -->
    <!-- 子组件有插槽，我们想让父组件控制插槽的样式和获得插槽的内容 -->
    <div class="section-slot">
        <!-- 使用作用域插槽-->
        <slot :item="list[0]"></slot>
        <!-- 递归插槽 -->
        <VFor v-if="list.length > 1" :list="list.slice(1)">
            <!-- 这里若list长度大于1，则一直递归使用自己的组件 -->
            <!-- 下面v-slot的解构值item是上面默认插槽slot传递的值为list[0]的属性item，v-slot="{ item }" 等于 v-slot="slotProps.item" -->
            <template v-slot="{ item }">
                <slot :item="item"></slot>
            </template>
        </VFor>
    </div>
</template>

<script lang="ts">
    export default {
        name: 'VFor',
        props: {
            list: {
                required: true,
                type: Array
            }
        }
    }

</script>

<style scoped>

</style>