<template>
    <!-- skl-11.封装组件时考虑将props转换成slot提供组件可用性 -->
    <!-- props方式 -->
    <button>{{ text }}</button>
    <!-- slot方式 -->
    <button><slot></slot></button>
</template>

<script lang="ts">
    export default {
        name: 'Button',
        props: {
            text: {
                type: String,
                required: true
            }
        }
    }
</script>