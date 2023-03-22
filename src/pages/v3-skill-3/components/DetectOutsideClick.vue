<template>
    <div ref="root">
        <slot></slot>
    </div>
</template>

<script lang="ts" setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';

const emits = defineEmits(['detect'])
const root = ref<any>(null)

// skl-50.联系 如果点击是当前元素，或者是当前元素的子元素则直接返回；反之使用emit发出一个自定义事件。
const onClick = (e: any) => {
    if (e.target === root.value || root.value?.contains(e.target)) {
        console.log('return')
        return
    }
    console.log('emits')
    emits('detect')
}

onMounted(() => {
    document.body.addEventListener('click', onClick)
})

onBeforeUnmount(() => {
    document.body.removeEventListener('click', onClick)
})

</script>