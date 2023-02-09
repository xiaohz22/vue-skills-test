<template>
    <div class="menu-item">
        <slot></slot>
    </div>
</template>

<script lang="ts" setup>
</script>

<style>
    .menu-item {
        width: 100px;
        height: 50px;
        border-radius: 8px;
        text-align: center;
        line-height: 50px;
        border: 1px solid #ccc;
        margin-bottom: 10px;
    }
</style>