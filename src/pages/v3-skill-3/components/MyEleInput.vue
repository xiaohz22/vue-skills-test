<template>
    <!-- skl-51.联系 假设这里element-plus的input组件 在myEleInput组件中进行二次封装 -->
    <el-input v-bind="$attrs" placeholder="请输入" @change="handleChange">
        <!-- 暴露第三方组件的插槽 -->
        <template v-for="(_, name) in $slots" #[name]="slotProps">
            <slot :name="name" v-bind="slotProps || {}"></slot>
        </template>
    </el-input>
</template>

<script lang="ts" setup>
import { useAttrs, watchEffect } from 'vue'

const attr = useAttrs() as any

watchEffect(() => {
    console.log(attr, 'attr')
    console.log(attr.modelValue, 'attr.myValue')
})

const handleChange = () => {
    console.log('change')
}
</script>

<style lang="scss">

</style>