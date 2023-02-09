<template>
    <div class="book-sell">
        <p :style="{ textDecoration: isSell ? 'line-through' : 'none'}">《{{ name }}》 ---- 价格：{{ price }} ---- 出售情况：{{ bookSellStatus }}</p>
    </div>
</template>

<script lang="ts" setup>
    import { watch, computed } from 'vue'
    const props = defineProps({
        name: {
            type: String,
            required: true
        },
        price: {
            type: String,
            required: true
        },
        isSell: {
            type: Boolean,
            required: true
        }
    })

    const emits = defineEmits(['sell-book'])

    const bookSellStatus = computed(() => {
        // skl-24.正确使用计算属性
        // Vue中的计算属性不应该有副作用，例如:
        // if (props.isSell) {
        //     emits('sell-book')  // 这会打破计算属性的概念模型；使代码更难理解；重构变得更加困难
        // }
        return props.isSell ? '已售罄' : '正在出售'
    })

    // skl-24.联系
    // 可以用watch解决这个问题
    watch(() => props.isSell, (newValue) => {
        if (newValue) {
            emits('sell-book')
        }
    })
</script>

<style lang="scss" scoped>

</style>