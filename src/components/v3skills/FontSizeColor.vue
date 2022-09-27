<template>
    <!-- skl-7.自定义指令单纯的改变字体 -->
    <!-- <div v-font-size-color="20">自定义指令改变字体</div> -->
    <!-- 自定义指令既想改字体又想改颜色 -->
    <div v-font-size-color:[styleField]="styleValue">自定义指令改变字体或颜色</div>
    <button @click="changeFontSize">改变大小</button>
    <button @click="changeColor">改变颜色</button>

    <!-- $3 -->
    <div v-font-size-color-together="{'fontSize': fontSize, 'color': color}">自定义指令同时改变字体或颜色</div>
    <button @click="changeFontSizeAndColor">改变字体与颜色</button>
</template>

<script lang="ts" setup>
    import { ref } from 'vue';

    const styleField = ref('fontSize')
    const styleValue = ref('10px')

    const changeFontSize = () => {
        styleField.value = 'fontSize';
        styleValue.value = '20px'
    }

    const changeColor = () => {
        styleField.value = 'color';
        styleValue.value = 'red'
    }   

    const fontSize = ref('16px')
    const color = ref('#333')

    const changeFontSizeAndColor = () => {
        fontSize.value = '22px';
        color.value = 'orange';
    }

</script>

<style>

</style>