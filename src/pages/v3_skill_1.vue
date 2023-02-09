<template>
    <div class="skill1">
        <!-- skl-1.对于子组件接收多个props时，可以使用v-bind将包含多个props的响应式对象传递 -->
        <!-- 1.1.对于事件函数，可以使用v-on -->
        <User ref="userRef" v-bind="userState" v-on="executeEvents">
            <!-- skl-6.联系 -->
            <li class="slot-color">工资15k</li>
            <li class="orange">前端开发</li>
        </User>

        <div style="padding: 10px 0;">------------------------------------------------</div>

        <UserOption :userInfo="userOptionState" ref="userOptionRef">
            <!-- skl-9.联系 在父组件中使用插槽 -->
            <span class="slot-default">使用了默认插槽</span>
            <template #header><span class="slot-header">使用了具名插槽</span></template>
        </UserOption>
        <button @click="userOptionState.detail.name = '王飞发'">改变姓名</button>

        <div style="padding: 10px 0;">------------------------------------------------</div>

        <FontSizeColor />

        <div style="padding: 10px 0;">------------------------------------------------</div>

        <div>
            <p>v-for的几种解构技巧</p>
            <ul>
                <!-- skl-8. v-for的几种解构技巧 -->
                <!-- 数组解构 -->
                <li v-for="(item, index) in ['Javascript', 'Node', 'Java', 'PHP']">{{ index }} : {{ item }}</li>
                <!-- 对象解构 第三个参数为index -->
                <li v-for="(value, key, index) in {
                    uname: '张三',
                    age: 18,
                    sex: '男',
                    ulStyle: 'red'
                }">
                    {{ index + 1 }}. {{  key }} : {{ value }}
                </li>
                <!-- 字符串解构 -->
                <li v-for="character in 'HelloWorld'">
                    s: {{ character }}
                </li>
            </ul>
        </div>

        <div style="padding: 10px 0;">------------------------------------------------</div>

        <div class="slot-section">
            <!-- skl-10.联系 -->
            <VFor :list="[1, 2, 3]">
                <template v-slot="{ item }">
                    <!-- 拿到子组件递归插槽传出来的值，进行加粗 -->
                    <strong>{{ item }}</strong>
                </template>
            </VFor>
        </div>

        <div style="padding: 10px 0;">------------------------------------------------</div>

        <!-- skl-11.联系，slot封装的组件可以进行额外的改造 -->
        <Buttons text="正在学习Vue">
            正在学习<strong>Vue</strong>
        </Buttons>

        <div style="padding: 10px 0;">------------------------------------------------</div>

        <!-- skl-16. v-lazy-image一行懒加载图片 暂时搁置 -->
        <div>打开 `Devtools NetWork` 选项卡，检查 `Img` 过滤器看是否有效。</div>
        <!-- <v-lazy-image src="../assets/images/nodata.png"></v-lazy-image> -->

        <div style="padding: 10px 0;">------------------------------------------------</div>

        <!-- skl-17. Vue动态样式类的几种方式 -->
        <div style="display: flex; justify-content: center;">
            <!-- 1 -->
            <div style="width: 50px; height: 50px; margin: 5px;" :class="isDisabled ? 'disabledCss': 'notDisabledCss'"></div>
            <!-- 2 -->
            <div style="width: 50px; height: 50px; margin: 5px;" :class="{ isHasBorderRadius : classSign.isLoading, isHasBorderWidth: classSign.disabled }"></div>
            <!-- 3 -->
            <div style="width: 50px; height: 50px; margin: 5px; background-color: green;" :class="[ classSign.disabled && 'isHasBorderRadius', classSign.isLoading && 'isHasBorderWidth' ]"></div>
        </div>

        <div style="padding: 10px 0;">------------------------------------------------</div>

        <!-- skl-18. 从组件外部调用一个方法 -->
        <ChildOption ref="childOptionRef" />

        <div style="padding: 10px 0;">------------------------------------------------</div>
        <!-- skl-20. 联系 -->
        <!-- 这里希望在父组件特定的事件场景中去触发显示子组件的内容，则可使用props控制子组件状态 -->
        <!-- 此时子组件内有自己控制显隐的状态hidden，与父组件传入的props属性hidden相同，父组件传入的prop无法覆盖子组件的状态 -->
        <Toggle title="点击标题可以显示隐藏" :hidden="hiddle" @toggle-hidden="hiddle = !hiddle">
            <p>这是显示隐藏的内容</p>
        </Toggle>
    </div>
</template>

<script lang="ts" setup>
    import { reactive, toRef, ref, onMounted, getCurrentInstance, watch, watchEffect, computed } from 'vue';
    import User from '@/components/v3skills/User.vue'
    import VFor from '@/components/v3skills/VFor.vue'
    import FontSizeColor from '@/components/v3skills/FontSizeColor.vue'
    import Buttons from '@/components/v3skills/Button.vue'
    import Toggle from '@/components/v3skills/Toggle.vue';

    // skl-21.联系 外部组件访问元数据
    const { columns } = Toggle;
    console.log('外部组件访问元数据', columns)

    const hiddle = ref<boolean>(false)

    const classes = reactive(['Javascript', 'Node', 'Java', 'PHP'])

    // skl-15. ref比reactive使用更好的一个场景
    // 对象上使用ref，很容易看出是响应式对象
    const bookInfo = ref({
        name: 'English',
        author: 'Eric'
    })  // bookInfo.value.name
    // 使用watch时，ref可以自动解开
    watch(bookInfo, () => { console.log('bookInfo变化了') }, { deep: true })
    // 而reactive需要一个回调函数返回
    watch(() => classes, () => { console.log('classes变化了') }, { deep: true })
    // 可以将ref放进reactive对象中，这样在reactive对象中访问ref时，可以自动脱ref
    const bookName = ref('Math');
    const bookInfoRive = reactive({ bookName })
    watchEffect(() => { console.log(bookInfoRive.bookName, 'reactive includes ref change') }) // 直接监听
    watch(bookName, () => console.log('bookInfoRive has changed'))

    const userState = reactive<any>({
        uname: '张三',
        age: 18,
        sex: '男',
        ulStyle: 'red'
    })

    const userOptionState = reactive({
        detail: {
            name: '刘清风'
        },
        job: '前端开发',
        age: '25'
    })

    // v3
    const userRef = ref(null)
    // v2
    const userOptionRef = ref(null)

    // skl-18.联系
    const childOptionRef = ref<any>(null)

    // skl-4. toRef保持对其源对象的响应链接
    const ageRef = toRef(userState, "age");
    ageRef.value++;
    console.log(userState.age, 'userState.age')  // 19
    userState.age++;
    console.log(ageRef.value, 'ageRef.value')  // 20
    // 如果要对源对象的某个可能不存在的属性用toRef保持响应链接，可以添加一个默认值
    const salaryRef = toRef(userState, "salary", 100);
    console.log(salaryRef.value, 'salaryRef.value')

    const classSign = ref({
        isLoading: false,
        disabled: true
    })
    const isDisabled = computed(() => classSign.value.isLoading || classSign.value.disabled)
    
 
    const executeEvents = {
        showUname(uname: string) {
            console.log(uname, 'receive uname...')
        },
        showUage(age: number) {
            console.log(age, 'receive age...')
        }
    }

    onMounted(() => {
        // skl-5.在Vue2选项式api中，父组件可以通过$ref访问子组件的属性：
        // console.log(userOptionRef.value.privateData, '访问子组件的属性')   // secrecy 
        // console.log(userOptionRef.value.upperCasePrivateData, '访问子组件的属性2')  // SECRECY 
        // 如果想让组件里的某个属性不被访问，可以在子组件中使用expose暴露允许被访问的属性，不被暴露则不能访问
        // console.log(userOptionRef.value.privateData, '访问子组件的属性 可直接访问（没有暴露）')   // undefined 
        // console.log(userOptionRef.value.upperCasePrivateData, '访问子组件的属性2 可直接访问 已暴露')  // SECRECY 

        // 在Vue3组合式api中，父组件通过$ref访问子组件的属性是访问不到的，除非子组件使用defineExpose暴露可被访问的属性
        console.log(userRef.value.privateData, '访问子组件的属性 不可直接访问（没有暴露）')  // undefined
        console.log(userRef.value.v3UpperCasePrivateData, '访问子组件的属性2 不可直接访问 已暴露')  // SECRECY 

        // skl-18.联系 从组件外部调用方法(实用)
        childOptionRef.value.childMethod()
        // 最佳实践: 传递一个prop，子组件通过watch监听prop做修改。
        // 为了进行多次操作，在子组件根据prop的修改操作完成后，通过emit通知父组件，由父组件重置prop的状态

        setTimeout(() => {
            bookInfo.value.name = 'Math';
            classes.push('React')
            bookInfoRive.bookName = 'Chinese'
        }, 1000)
    })
    
</script>

<!-- skl-31.何时在Vue中使用两个script（因为<script setup>块是被编译到组件的setup()函数中的） -->
<!-- 1-需要使用选项API时，例如inheritAttrs -->
<!-- 2-只需运行一次的setup代码，因为setup()是为每个组件运行的 -->
<!-- 3-命名导出 -->
<script lang="ts">
    import UserOption from '@/components/v3skills/UserOption.vue';
    import ChildOption from '@/components/v3skills/ChildOption.vue';
    import { version } from 'vue';
    // skl-31.如何检查Vue的版本
    if (version.split(',')[0] === '2') {
        console.log('请升级到 Vue3!')
    } else {
        console.log(version, 'version')
    }
    export default {
        components: {
            UserOption,
            ChildOption
        },
    }
</script>

<style lang="scss">
    .disabledCss {
        background-color: skyblue;
    }

    .notDisabledCss {
        background-color: pink;
    }
    .isHasBorderRadius {
        border-radius: 10px;
    }
    .isHasBorderWidth {
        border: 3px solid orange;
    }
</style>