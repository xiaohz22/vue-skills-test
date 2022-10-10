import * as VueRouter from 'vue-router';
import AppTest from '../pages/app_test.vue';
import HookTest from '../pages/hook_test.vue';
import AppTest2 from '../pages/app_test2.vue';
import PiniaTest from '../pages/pinia_test.vue';
import V3Page from '../pages/v3Page.vue';


const routes = [
    { path: '/', redirect: { name: 'main' }, alias: '/s' }, // 访问'/'和'/s' 都会 => redirect: '/main'  重定向
    // { path: '/', component: AppTest, alias: '/home' },    // 路由别名  有两个名字得意思（即访问'/'和'/home'都能访问到组件AppTest）
    { path: '/main', component: AppTest, name: 'main', alias: '/aligsMain' },
    // { path: '/about', component:  },
    { path: '/hooktest', component: HookTest, name: 'hookTest' },
    { path: '/apptest2', component: AppTest2, name: 'appTest2'},
    { path: '/piniatest', component: PiniaTest, name: 'piniaTest'},
    { path: '/v3', component: V3Page, children: [
        { path: '', component: () => import('../components/HelloVue3.vue') },
        { path: 'v3-skill1', component: () => import('../pages/v3_skill_1.vue') },
        { path: 'v3-skill2', component: () => import('../pages/v3_skill_2.vue') }
    ] }
]

const router = VueRouter.createRouter({
    // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: VueRouter.createWebHashHistory(),
    routes, // `routes: routes` 的缩写
})

// 全局前置守卫
router.beforeEach((to, from) => {
    console.log('to', to)
    console.log('from', from)
    // if (to.name === 'main' && from.name !== 'login') {
    //     return false
    // }
    // next();  // 放行，router v4中可以用除 return false外表示
    return true;  // 放行，也可以不写
})

export default router