<template>
    <button>
        <!-- skl-47.联系 在<template>中访问$attrs和$slot -->
        <!-- Vue2和Vue3用法一样，可以在template中使用$attrs和$slot进行访问 -->
        <span
            :id="($attrs.class as string)"
            :aria-label="($attrs['aria-label'] as string)"
        >
            <slot></slot>
        </span>
    </button>
    <button style="margin-left: 5px;">
        {{ $attrs.nextBtn }}
    </button>
</template>

<script lang="ts" setup>
import { useAttrs, useSlots, watchEffect } from 'vue';

// skl-47.联系 在组合api 语法糖访问attrs和slot
const attrs = useAttrs() as any
const slot = useSlots() as any
watchEffect(() => {
    console.log('attrs', attrs)
    console.log('slot', slot)
})
</script>

<!-- <script lang="ts">
export default {
    setup(props, context) {
        // 组合式api访问attrs和slot
        console.log( context.attrs )
        console.log( context.slots )
    }
}
</script> -->