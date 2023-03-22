<template>
    <div class="box">
        <p>自定义emit事件验证</p>
        <button @click="$emit('ValidatedEvent', 'None')">验证事件的错误值</button>
        <button @click="$emit('ValidatedEvent', 'top')">验证事件的正确值</button>
    </div>
</template>

<script lang="ts">
export default {
    name: 'EmitValid',
    // skl-48.联系 emit事件验证（验证失败控制台发出警告）
    emits: {
        ValidatedEvent: (value: string): boolean => ['top', 'middle', 'bottom'].includes(value)
    }
}
</script>

<style lang="scss">
.box {
    > button {
        &:nth-of-type(1) {
            margin-right: 5px;
        }
    }
}
</style>