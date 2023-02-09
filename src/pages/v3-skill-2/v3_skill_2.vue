<template>
    <div class="skill2">
        <!-- skl-22.通过组件来减少嵌套代码 -->
        <!-- 进行某些v-for、v-if操作时，若操作内容较复杂，可考虑封装为一个组件，使在父组件中永远看到的是第一层 -->
        <BookSell
            v-for="item in bookList"
            :key="item.name"
            :name="item.name"
            :price="item.price"
            :isSell="item.isSell"
            @sell-book="handleSellBook"
            @click="item.isSell = true"
        />
        <h3>已销售{{ sellBookCount }}本书</h3>
        <div style="padding: 10px 0;">------------------------------------------------</div>
        <!-- skl-25.联系 -->
        <UserList
            userUname="张三丰"
            :userAge="22"
            userSex="男"
            userUlStyle="black"
            title="用户列表"
        />
        <div style="padding: 10px 0;">------------------------------------------------</div>
        <!-- skl-26. Vue3中可以使用多个v-model -->
        <!-- v-model双向绑定  v-bind:model父组件绑定向子组件传递的元素 -->
        <AddressForm
            v-model:street-name="addressForm.streetName"
            v-model:street-number="addressForm.streetNumber"
            v-model:country="addressForm.country"
            :isDisabled="true"
        />
        <!-- skl-27.响应式SVG组件的联系 -->
        <SVGComponent :color="isGreen ? 'green' : 'orange'" />

        <div style="padding: 10px 0;">------------------------------------------------</div>

        <!-- skl-28.配置模板的驱动，减少冗余的重复 -->
        <!-- 这里有一个菜单栏，里面有每一项操作；如果有很多项的话不做配置会重复写一个组件多遍 -->
        <!--
            <MenuItem @click="onCreate">增加</MenuItem>
            <MenuItem @click="onDelete">删除</MenuItem>
            <MenuItem @click="onModify">修改</MenuItem>
            <MenuItem @click="onSearch">查询</MenuItem>
        -->
        <!-- 配置模板驱动，逻辑清晰，并能更好的阅读 -->
        <MenuItem v-for="menu in menuItems" @click="menu.action">{{ menu.text }}</MenuItem>

        <div style="padding: 10px 0;">------------------------------------------------</div>

        <!-- skl-29.模板中的计算属性v-memo -->
        <!-- 只有该项的被售出状态改变才需要更新，使得每个选中状态没有变的项能完全重用之前的vnode并跳过差异比较 -->
        <BookSell
            v-for="item in bookList"
            :key="item.name"
            :name="item.name"
            :price="item.price"
            :is-sell="item.isSell"
            @click="item.isSell = true"
            v-memo="[item.isSell === true]"
        />

        <div style="padding: 10px 0;">------------------------------------------------</div>

        <!-- skl-30.template标签另一种用途 -->
        <!-- 一般可以用来简化v-if逻辑，有时也用于v-for -->
        <!-- 如果多个标签都用了v-if控制，且条件相同，则可以提升至最外层template -->
        <template v-if="!fruitList.length">
            <p style="color: red">水果售空了！</p>
            <img style="width: 50px" :src="noData" alt="">
            <div>种类: ---- ; 价格: ----</div>
        </template>
        <!-- skl-30.v-show和v-if -->
        <!-- v-show适用于频繁切换的场景，因为其有css控制显示隐藏，开销小 -->
        <!-- v-if会使涉及到条件的内容被销毁和重建，开销大 -->
        <p v-show="fruitList.length" style="color: orange">水果有售</p>
        <div v-show="fruitList.length">种类: 橙子 ; 价格: 6.8元/斤</div>
        
        <div style="padding: 10px 0;">------------------------------------------------</div>

        <!-- skl-32.联系 -->
        <Book />

        <div style="padding: 10px 0;">------------------------------------------------</div>

        <!-- 测试用 -->
        <!-- <PorePlate /> -->

        <!-- skl-37.组件的懒加载 -->
        <!-- 项目中加载列表数据时，通常加上loading来使用户感知；如果加载只要10ms，则页面loading会一闪而过 -->
        <!-- 此时为了更好的体验，我们一般会延迟200ms来让用户有一个感知的过程 -->
        <AsyncPorePlate :col="8" />

        <div style="padding: 10px 0;">------------------------------------------------</div>

        <div>
            <button @click="toggleError = !toggleError">切换</button>
            <span v-if="toggleError">
                <!-- skl-34.联系 这里引发一个错误（可以先忽略ts提醒） -->
                {{ fruitList.oops() }}
            </span>
            <span v-else>
                <!-- 警告 -->
                {{ fruitLists }}
            </span>
        </div>

        <div style="padding: 10px 0;">------------------------------------------------</div>

        <!-- skl-38.联系 Vue3 -->
        <FooterV3>
            <!-- 加上插槽的内容才能显示 -->
            <template #footer>
                <p>我是插槽名为footer的显示内容, Vue3</p>
            </template>
        </FooterV3>

        <!-- skl-38.联系 Vue2 -->
        <FooterV2>
            <!-- 加上插槽的内容才能显示 -->
            <template #footer>
                <p>我是插槽名为footer的显示内容, Vue2</p>
            </template>
        </FooterV2>

        <!-- skl-39.使用透传Attributes -->
        <!-- 指的是传递给一个组件，却没有被该组件声明为props或emits的attribute或者v-on事件监听器 -->
        <!-- 常见的有class, style, id -->
        <!-- 可以在生成环境调用vue-devtools调试，设置Vue.config.devtools = true，开发环境默认为true -->
        <MyButton class="bgColor" />

    </div>
</template>

<script lang="ts" setup>
    import { reactive, ref, watchEffect, computed, defineAsyncComponent, useSlots } from 'vue';
    import BookSell from '@/components/v3skills/BookSell.vue';
    import UserList from '@/components/v3skills/UserList.vue';
    import AddressForm from '@/components/v3skills/AddressForm.vue';
    import SVGComponent from '@/components/v3skills/SVGComponent.vue';
    import MenuItem from '@/components/v3skills/MenuItem.vue';
    import Book from '@/components/v3skills/Book.vue';
    import PorePlate from '@/components/v3skills/PorePlate.vue';
    import Loading from '@/components/v3skills/Loading.vue';
    import noData from '@/assets/images/nodata.png';
    import FooterV3 from '@/pages/v3-skill-2/components/FooterV3.vue'
    import FooterV2 from '@/pages/v3-skill-2/components/FooterV2.vue'
    import MyButton from '@/pages/v3-skill-2/components/MyButton.vue'

    const toggleError = ref<boolean>(false)

    const fruitList = reactive<string[]>([''])

    const isGreen = ref(true)

    const bookList = ref<any[]>([
        { name: '三国演义', price: '$19', isSell: false },
        { name: '水浒传', price: '$22', isSell: false },
        { name: '西游记', price: '$30', isSell: false },
        { name: '红楼梦', price: '$15', isSell: false }
    ]);

    const addressForm = reactive({
        streetName: '',
        streetNumber: '',
        country: ''
    })

    const sellBookCount = ref<number>(0)

    // skl-37.联系
    // defineAsyncComponent接受一个返回Promise的加载器函数；组件已加载，调用resolve回调，而reject回调则表示加载组件失败
    const AsyncPorePlate: unknown = defineAsyncComponent({
        loader: () => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(import('@/components/v3skills/PorePlate.vue') as any)
                }, 2000)
            })
        },
        // 在异步组件加载时使用的组件
        loadingComponent: Loading,
        // 显示加载组件前的延迟，默认：200ms
        delay: 500
    })

    const handleSellBook = () => {
        sellBookCount.value += 1;
    }

    // skl-40.调试计算属性
    // 计算属性第二个参数是一个对象，接收onTrack和onTrigger回调
    // 推荐在这些回调内放置一个debugger语句可以调试依赖
    const bookCount = computed(() => sellBookCount.value * 2, {
        onTrack(e) {
            // 当某个响应式property或ref（这里是sellBookCount）作为依赖被追踪时调用
            debugger
        },
        onTrigger(e) {
            // 会在侦听回调被某个依赖（这里是sellBookCount.value被修改时）的修改触发时调用
            debugger
        }
    })

    // skl-28.联系
    // 模板驱动
    const onCreate = () => {
        console.log('onCreate')
    }
    const onDelete = () => {
        console.log('onDelete')
    }
    const onModify = () => {
        console.log('onModify')
    }
    const onSearch = () => {
        console.log('onSearch')
    }
    const menuItems = [
        {
            text: '增加',
            action: onCreate
        },
        {
            text: '删除',
            action: onDelete
        },
        {
            text: '修改',
            action: onModify
        },
        {
            text: '查询',
            action: onSearch
        }
    ]

    // setInterval(() => {
    //     isGreen.value = !isGreen.value
    // }, 500)

    watchEffect(() => {
        console.log(addressForm.streetName, 'addressForm')
    })
</script>

<style>

</style>