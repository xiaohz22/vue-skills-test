<template>
    <!-- skl-27.响应式svg组件 -->
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="50" :fill="color"></circle>
    </svg>
</template>

<script setup lang="ts">
    defineProps(['color'])
</script>

<style scoped>
    svg {
        max-width: 200px;
    }
</style>