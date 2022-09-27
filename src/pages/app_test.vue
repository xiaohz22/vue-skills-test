<script lang="ts" setup>
    import { ref, onMounted, watch, reactive, shallowReactive, watchEffect } from 'vue'
    import Home from '../components/Home.vue'
    import Posts from '../components/Posts.vue'
    import Archive from '../components/Archive.vue'
    import Calendar from '../components/Calendar.vue'
    
    const question1 = ref<string>('')
    const question2 = ref<string>('')
    const answer = ref<string>('I thinking an answer..')
    const obj = reactive<any>({
      name: 'zhangsan',
      sign: 'first',
      child: {
        age: 18,
        sign: 'second'
      }
    })
     
    const currentTab = ref<string>('Home')
    
    const tabs: any = {
      Home,
      Posts,
      Archive,
      Calendar
    }
    
    const addAge = () => {
      obj.child.age++;
    }
    
    // 第一个参数可以是getter返回值函数（还可以是ref、computed、响应式对象或以上组成的值）
    // watch(() => question1.value + question2.value, (newQuestion, oldQuestion) => {
    //   console.log('new:', newQuestion, 'old:', oldQuestion)
    //   answer.value = `I thinking an answer of ${newQuestion}`
    // })
    
    // const stopWatch = watch(obj, (newObj, oldObj, onCleanup) => {  // 第三个参数 清理副作用的回调函数
    //   let timer = setTimeout(() => {
    //     console.log('newObj:', newObj, 'oldObj:', oldObj)
    //   }, 500)
    //   const removeTimeOut = () => window.clearTimeout(timer);
    //   onCleanup(removeTimeOut)
    // })
    
    // watch([question1, () => question1.value + question2.value], ([newX, newY]) => {
    //   console.log('newX:', newX, 'newY:', newY)  // newX为question1的最新值 newY为question1+question2的最新值
    // })
    
    // watch(() => obj.child, (newObj, oldObj) => {
    //   console.log('newObj:', newObj, 'oldObj:', oldObj)
    // }, { deep: true });  // 深层侦听 改变obj.child.age的值也会被侦听到
    
    watch(question1, (newQ, oldQ) => {
      console.log('newQ:', newQ, 'oldQ:', oldQ)
    }, { immediate: true });  // question1未发生改变时先立即执行一次回调
    // ===
    watchEffect(() => {
      console.log('watchEffect question1:', question1.value);
    })  // 等同于watch加了immediate，且会自动跟踪question1的变化
    
    onMounted(() => {
      console.log(tabs, 'tab');
    })
    
    
    const clickTab = (_: any, tab: any) => {
      // _ => value  tab => key
      currentTab.value = tab;
    }
    </script>
    
<template>
      <!-- <Calendar /> -->
      <div class="demo">
        <button
           v-for="(_, tab) in tabs"
           :key="tab"
           :class="['tab-button', { active: currentTab === tab as unknown as string }]"
           @click="clickTab(_, tab)"
         >
          {{ tab }}
        </button>
        <KeepAlive include="Home,Posts">
          <component :is="tabs[currentTab]" test="测试" class="tab"></component>
        </KeepAlive>
      </div>
    
      <!-- 练习 Vue 的watch侦听器 -->
      <div class="testWatch">
        <input type="text" v-model="question1" id="question1">
        <input type="text" v-model="question2" id="question2">
        <div>{{ answer }}</div>
        <button @click="addAge">age add</button>
        <!-- 点击清除侦听器 -->
        <!-- <button @click="stopWatch()">stop watch</button> -->
        <div>{{ 'link button' + obj.child.age }}</div>
      </div>

      <div style="display: flex; flex-direction: column;">
        <router-link to="/hooktest?test=hooks">去hooks函数测试页</router-link>
        <router-link to="/apptest2">去看看不常用的组合式API</router-link>
        <router-link to="/piniatest">去学习Pinia</router-link>
        <router-link to="/v3">去学习Vue3</router-link>
      </div>

      <router-view></router-view>
</template>
    
<style lang="scss">
  .demo {
    font-family: sans-serif;
    border: 1px solid #eee;
    border-radius: 2px;
    padding: 20px 30px;
    margin-top: 1em;
    margin-bottom: 40px;
    user-select: none;
    overflow-x: auto;
  }
  
  .tab-button {
    padding: 6px 10px;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
    border: 1px solid #ccc;
    cursor: pointer;
    background: #f0f0f0;
    margin-bottom: -1px;
    margin-right: -1px;
  }
  .tab-button:hover {
    background: #e0e0e0;
  }
  .tab-button.active {
    background: #e0e0e0;
  }
  .tab {
    border: 1px solid #ccc;
    padding: 10px;
  }
</style>
    