<template>
    <!-- skl-38. 检查slot是否为空 Vue3 -->
    <!-- $slots代表父组件传递的插槽的对象 -->
    <!-- 这里只有当名称为footer的插槽存在时，才会渲染footer标签 -->
    <!-- <footer v-if="$slots.footer">
        <h3>来自底层的仰望</h3>
        <slot name="footer"></slot>
    </footer> -->
    <!-- 来自useSlots -->
    <footer v-if="isShowFooter">
        <h3>来自底层的仰望useSlots vue3</h3>
        <slot name="footer"></slot>
    </footer>
</template>

<script lang="ts" setup>
import { useSlots, computed } from 'vue';

// skl-38.联系 Vue3
// 在setup中使用插槽可以使用useSlots, useSlots相当于setup中Context.slots的值
const slots = useSlots();
const isShowFooter = computed(() => {
    return !!slots.footer;
}) 

</script>