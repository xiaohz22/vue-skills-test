<template>
    <input type="text" :value="modelValue" @input="emitValue">    
</template>

<script lang="ts" setup>
// 01.在这个组件中，声明了modelModifiers这个props，默认值是一个空对象{}
const props = defineProps({
    // skl-42.联系 组件的v-model上所添加的修饰符可以通过modelModifiers这个props在组件内访问到
    modelValue: String,
    // 绑定了no-underscore，即v-model.no-underscore，则为{no-underscore: true}
    modelModifiers: { default: (): any => ({}) } 
})
const emits = defineEmits(['update:modelValue'])
const emitValue = (e: any) => {  
    let value = e.target.value
    if (props.modelModifiers['no-underscore']) {
        value = value.replaceAll('_','')    // 删除所有下划线
        emits('update:modelValue', value)
    }
}
// 02.对于有参数又有修饰符的v-model，相应的声明
// const props = defineProps({
//     name: String,
//     nameModifiers: { default: (): any => ({}) } 
// })
// const emits = defineEmits(['update:name'])

</script>