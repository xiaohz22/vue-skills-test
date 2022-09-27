<template>
    <div class="user">
        <ul :class="ullStyle">
            <li @click="emit('showUname', uname)">{{ uname }}</li>
            <li @click="emit('showUage', age)">{{ age }}</li>
            <li>{{ sex }}</li>
            <slot></slot>
        </ul>
    </div>
</template>

<script setup lang="ts">
    import { computed, ref } from 'vue';

    const props = defineProps({
        uname: String,
        age: Number,
        sex: String,
        ulStyle: {
            type: String,
            default: 'black',
            // skl-2. validator的验证限制了在使用组件时传入的props类型
            // 例如使用这个User组件，如果ulStyle不为'black'和'red'则控制台会警告
            validator: (value: string) => {
                return ['black', 'red'].includes(value)
            }
        },
    })

    const privateData = ref<string>('secrecy')

    const emit = defineEmits(['showUname', 'showUage'])

    const ullStyle = computed(() => {
        return {
            black: props.ulStyle === 'black',
            red: props.ulStyle === 'red'
        }
    })

    const v3UpperCasePrivateData = computed(() => {
        return privateData.value.toUpperCase();
    })

    // skl-5. Vue3组合式api中暴露允许被访问的属性
    defineExpose({
        v3UpperCasePrivateData
    })

</script>

<style scoped>
    .black {
        color: #333;
    }
    .red {
        color: red;
    }
    /* skl-6.特殊CSS伪选择器 :slotted（插槽伪类选择器）:global（全局伪类选择器） */
    /* 这里页面加了scoped，所以这里的样式对slot插槽的内容不生效，可以用:slotted解决 */
    :slotted(.slot-color) {
        color: blue
    }
    /* 让其中一个样式应用全局 可以使用:global */
    :global(.orange) {
        color: orange
    }
</style>