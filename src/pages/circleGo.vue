<template>
    <CircleGo :timeList="timeList" @updateCurPointTime="updateCurPointTime" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import CircleGo from '@/components/CircleGo.vue'

const timeList = ref<number[]>([478, 880, 1080])

const updateCurPointTime = (mins: number, pointIndex: number) => {
    timeList.value.splice(pointIndex, 1, Number(mins.toFixed()))
}
</script>

<script lang="ts">
</script>

<style lang="scss" scoped>

</style>