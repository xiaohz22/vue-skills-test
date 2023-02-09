// skl-32.联系
// 浏览器内模板编译：
// vue.runtime.esm-bundler.js（默认）仅运行时，并要求所有模板都要预先编译
// vue.esm-bundler.js 包含运行时编译器
// import { createApp } from 'vue'
import { createApp } from 'vue/dist/vue.esm-bundler.js' // 引入createApp用此替换

import './style.css'
import router from './router/index'
import store from './store'
import App from './App.vue'


const app = createApp(App)

// skl-7.自定义指令传参小窍门
// 这里有一个自定义指令，使字体变大
app.directive('font-size-color', {
    mounted(el, binding) {
        console.log(binding, 'binding')
        console.log(el, 'el') // 使用该指令的元素
        console.log(binding.arg)    // 传递给自定义指令的参数 例如 v-font-size-color:foo => arg = foo
        /* 自定义指令改变字体大小 */
        // el.style.fontSize = binding.value + 'px';
        /* 自定义指令动态绑定参数 可以改变字体或颜色 */
        el.style[binding.arg as string] = binding.value;
    },
    updated(el, binding) {
        el.style[binding.arg as string] = binding.value;
    }
})
// mounted和updated触发的行为相同，不考虑其他钩子函数，可以通过架设函数传递给指令实现
app.directive('font-size-color', (el, binding) => {
    el.style[binding.arg as string] = binding.value;
})
// 如果需要一个同时改变字体大小和颜色的自定义函数，可以给指令传入一个包含多个值的js对象字面量 $3
app.directive('font-size-color-together', (el, binding) => {
    // 此时binding.value => {'fontSize': fontSize, 'color': color}
    // 循环 依次赋值改变
    Object.keys(binding.value).forEach((key: string) => {
        el.style[key] = binding.value[key];
    })
})

app.use(router)
app.use(store)

// skl-12.Vue2和Vue3的全局属性
// Vue2声明全局属性
// import Vue from 'vue'  // 引入Vue2
// Vue.prototype.$myGlobal = "Vue2全局属性"
// Vue3声明全局属性
app.config.globalProperties.$myGlobal = "Vue3全局属性";

// skl-33.Vue性能追踪
// true可以在浏览器开发工具的"性能/时间线"页中启用对组件初始化、编译、渲染和修补的性能表现追踪
// 仅在开发模式和支持 performance.mark API的浏览器中工作
app.config.performance = true;

// skl-34.处理错误和警告的更好方法
// 添加一个自定义的错误处理程序，对记录错误很有用
// 或更优雅地处理错误
app.config.errorHandler = (err: unknown) => {
    alert(err);
}
// 自定义警告处理程序（只在开发中环境有效）
app.config.warnHandler = (warn: unknown) => {
    console.warn(`[CUSTOM WARNING] ${warn}`)
}

app.mount('#app')

