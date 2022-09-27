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
    </div>
</template>

<script lang="ts" setup>
    import { reactive, toRef, ref, onMounted, getCurrentInstance } from 'vue';
    import User from '@/components/v3skills/User.vue'
    import VFor from '@/components/v3skills/VFor.vue'
    import FontSizeColor from '@/components/v3skills/FontSizeColor.vue'
    import Buttons from '@/components/v3skills/Button.vue'

    const classes = reactive(['Javascript', 'Node', 'Java', 'PHP'])

    const userState = reactive({
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

    // skl-4. toRef保持对其源对象的响应链接
    const ageRef = toRef(userState, "age");
    ageRef.value++;
    console.log(userState.age, 'userState.age')  // 19
    userState.age++;
    console.log(ageRef.value, 'ageRef.value')  // 20
    // 如果要对源对象的某个可能不存在的属性用toRef保持响应链接，可以添加一个默认值
    const salaryRef = toRef(userState, "salary", 100);
    console.log(salaryRef.value, 'salaryRef.value')
    
 
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

    })
    
</script>

<script lang="ts">
    import UserOption from '@/components/v3skills/UserOption.vue';
    export default {
        components: {
            UserOption
        },  
    }
</script>

<style>
    
</style>