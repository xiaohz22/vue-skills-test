<template>
    <!-- skl-26.v-pre -->
    <!-- 如果有大块静态内容，可以使用v-pre忽略它 -->
    <!-- 跳过其所在节点的编译过程，可以利用它通过没有使用指令语法、没有使用插值语法的节点，会加快编译速度 -->
    <div v-pre>
        <p>我是一大片静态内容1</p>
        <p>我是一大片静态内容2</p>
        <p>我是一大片静态内容3</p>
    </div>
    <!-- skl-26.v-once -->
    <!-- v-once所在节点在初次动态渲染后，就视为静态内容，以后数据的改变不会引起v-once所在结构的更新，可以用于性能优化 -->
    <div v-once>
        <p>{{ streetName || '【初次动态渲染的内容, 用了v-once】' }}</p>
    </div>
    <div>
        <p>{{ streetName || '【初次动态渲染的内容, 没用v-once】' }}</p>
    </div>
    <form>
        <p>
            街道：
            <!-- skl-27.动态指令 -->
            <!-- 其中[]部分是指令的参数，当参数值为null时，该属性或事件就会被删除 -->
            <!-- 这里当prop.isDisabled = true时，input:disabled属性生效，input框被禁用；为false则该属性被删除 -->
            <input type="text" v-bind:[disabledAttr]="true" :value="streetName" @input="$emit('update:streetName', $event.target?.value)">
        </p>
        <p>
            街道号码：
            <input type="text" :value="streetNumber" @input="$emit('update:streetNumber', $event.target?.value)">
        </p>
        <p>
            国家：
            <input ref="countryIpt" type="text" :value="country" @input="$emit('update:country', $event.target?.value)">
        </p>
    </form>
</template>

<script lang="ts" setup>
    import { computed, ref } from 'vue'
    // 定义props
    // skl-26.联系
    // 使用多个v-model
    const { isDisabled } = defineProps<{
        streetName: string,
        streetNumber: string,
        country: string,
        isDisabled: boolean
    }>()

    // skl-36.避免直接对DOM进行操纵
    const countryIpt = ref(null); // DOM

    // update:xxx 双向绑定规定写法
    defineEmits([
        'update:streetName',
        'update:streetNumber',
        'update:country'
    ])

    // skl-27.联系
    const disabledAttr: any = computed(() => isDisabled ? 'disabled' : null)
</script>

<style scoped>

</style>