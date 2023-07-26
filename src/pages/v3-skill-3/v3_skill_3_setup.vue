<template>
    <!-- skl-41.使用Lazy v-model在变更事件后同步状态 -->
    <!-- v-model默认在input事件后更新数据，添加lazy修饰符改为在每次change事件后更新数据 -->
    触发onChange事件更新数据: <input v-model.lazy="message" type="text"><br />
    <!-- skl-41. .number修饰符：输入自动转换为数字 .trim修饰符：消除两边空格 -->
    <!-- 修饰符可以链式调用 -->
    输入框数据自动去掉两边空白: <input v-model.trim.lazy="message1" type="text">
    
    <div style="padding: 10px 0;">------------------------------------------------</div>
    
    <!-- skl-42.创建自定义v-model修饰符 -->
    <!-- 有时候v-model内置的修饰符不能满足我们要求，我们需要一个自定义组件的v-model支持自定义的修饰符 -->
    <!-- 01.这里是一个自定义的修饰符no-underscore，它会自动删除将v-model绑定输入的字符串中所有下划线"_" -->
    <MyCustomInput v-model.no-underscore="custInputText" />
    <!-- 02.对于又有参数又有修饰符的v-model绑定即:name.no-underscore，生成的prop是arg + "Modifers" -->
    <!-- <MyCustomInput v-model:name.no-underscore="custInputText" /> -->

    <div style="padding: 10px 0;">------------------------------------------------</div>

    <!-- skl-43.在路由离开前动画子组件 -->
    <!-- <Transition> 是一个内置组件，可以就将进入和离开动画通过默认插槽传递给它的元素或组件上 -->
    <!-- 进入或离开可以以下条件之一触发：v-if, v-show, 由特殊元素<component>切换的动态组件 -->
    <button @click="show = !show">切换</button>
    <Transition>
        <p v-if="show">transition内置组件应用</p>
    </Transition>
    <!-- (2) -->
    <div style="margin-top: 5px;">
        <router-link to="/v3">返回</router-link>
        <Transition name="image">
            <img v-if="showUI" src="../../assets/images/nodata.png" alt="image">
        </Transition>
    </div>

    <div style="padding: 10px 0;">------------------------------------------------</div>

    <!-- skl-47.如何在组合API中使用slots和attrs -->
    <!-- $attrs表示一个包含了组件所有透传attributes的对象 -->
    <!-- 透传attributes是指由父组件传入，且没有被子组件声明为props或是组件自定义事件的attributes和事件处理函数 -->
    <MyButton
        data-cy="button"
        class="dark-button"
        id="the-button"
        @click="doSomething()"
        aria-label="A nice button"
        disabled="true"
        undefineProperty="ops"
        nextBtn="Next"
    >按钮</MyButton>

    <div style="padding: 10px 0;">------------------------------------------------</div>

    <!-- skl-48.如何在Vue3中自定义事件声明 -->
    <!-- Vue2使用 $emit -->
    <!-- Vue3使用需要 emits: ['event'] 或 defineEmits['event']声明（setup语法糖） -->
    <EmitValid
        @validated-event="receiveIsValidValue"
    />

    <div style="padding: 10px 0;">------------------------------------------------</div>

    <!-- skl-50.在Vue中如何检测外部点击 -->
    <DetectOutsideClick @detect="onOutsizeClick">
        <div class="popup">
            <div>点我呀</div>
        </div>
    </DetectOutsideClick>

    <div style="padding: 10px 0;">------------------------------------------------</div>
    
    <!-- skl-51.暴露第三方组件的所示插槽 -->
    <MyEleInput v-model="myValue">
        <!-- 这样就可以使用第三方组件暴露的插槽 -->
        <template #prepend>Http://</template>
        <template #append>.com</template>
    </MyEleInput>

    <!-- WebSorket练习 -->
    <WebSocketTest ref="webSocketRef" @success-web="successWeb" @success-new-receive="successNewReceive" />

</template>

<script lang="ts" setup>
import { ref, watchEffect } from 'vue';
import MyCustomInput from '@/pages/v3-skill-3/components/MyCustomInput.vue'
import MyButton from '@/pages/v3-skill-3/components/MyButton.vue';
import EmitValid from '@/pages/v3-skill-3/components/EmitValid.vue';
import DetectOutsideClick from '@/pages/v3-skill-3/components/DetectOutsideClick.vue';
import MyEleInput from '@/pages/v3-skill-3/components/MyEleInput.vue';
import WebSocketTest from './components/WebSocketTest.vue';
import { onBeforeRouteLeave } from 'vue-router';

// skl-41.联系
const message = ref('');
const message1 = ref('');
const saveMessage = () => {
    console.log('保存数据')
}
watchEffect(() => {
    // 这里只有在触发input的change事件时才会调用【change: 输入框失焦触发】
    message.value !== '' && saveMessage();
    message1.value !== '' && saveMessage();
    message1.value !== '' && console.log('message1.value:', message1.value)
})

// skl-42.联系
const custInputText = ref<string>('')
watchEffect(() => {
    console.log('custInputText:', custInputText.value)
})

// skl-43.联系
const show = ref(false)
// 如果想在路由离开之前对一个特定的子组件进行动画处理：(2)
// 使用onBeforeRouterLeave导航守卫结合一个ref来切换组件的可见性
const showUI = ref(true)
onBeforeRouteLeave((to, from, next) => {
    if (to.path === '/v3') {
        showUI.value = false
        setTimeout(() => {
            next()
        }, 1000)
    } else {
        next()
    }
})

// skl47.联系
const doSomething = () => {

}

// skl-48.联系
const receiveIsValidValue = () => {
    console.log('接收到验证通过的值:')
}

// skl-50.联系
const onOutsizeClick = () => {
    alert('点击了')
}

// skl-51.联系
const myValue = ref<string>('')

// webSocket练习
const webSocketRef = ref<any>(null);
const successWeb = () => {
    // 连接成功
    webSocketRef.value?.sendTest('userId=12345678')
}
const successNewReceive = (recMsg: unknown) => {
    // 拿到服务端实时发送的数据
    console.log('recMsg', recMsg)
}

</script>

<style lang="scss" scoped>
// skl-43.联系 如果Transition内置组件没有name属性，则css类默认以"v-"开头，否则以name属性的值开头
.v-enter-active,
.v-leave-active {
    transition: opacity 0.5s ease;
}
.v-enter-from,
.v-leave-to {
    opacity: 0;
}
// (2)
.image-leave-active {
    transition: transform 0.5s ease;
}
.image-leave-to {
    transform: translateY(30vw) translateX(40vw) rotate(30deg)
}
</style>