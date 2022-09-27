<template>
    <!-- toRaw() markRaw() -->
    <!-- <div class="home">
        <h1>当前姓名:{{names.name}}</h1>
        <h1>当前年龄:{{names.age}}</h1>
        <h1>当前薪水:{{names.job.salary}}K</h1>
        <h1 v-if="names.girlFriend">女朋友：{{names.girlFriend}}</h1>
        <button @click="names.name+='!'">点击加!</button>
        <button @click="addAges">点击加一</button>
        <button @click="addSalary">点击薪水加一</button>
        <button @click="add">添加女朋友</button>
        <button @click="addAge">添加女朋友年龄</button>
    </div> -->

    <!-- teleport 定位——将包裹着的这块HTML定位到template的某个区域 -->
    <teleport to="#app">
        <div class="four">
            <div class="five"></div>
        </div>
    </teleport>
    <teleport to="#one">
        <div class="four-test">
            <div class="five-test">123</div>
        </div>
    </teleport>
    <!-- id定位：<teleport to="#app">   class定位：<teleport to="#one"> -->
    <div id="one">
        <h1>第一层</h1>
        <div class="two">
            <h1>第二层</h1>
            <div class="three">
                <h1>第三层</h1>
                <teleport to="body">
                    <div class="four">
                        <div class="five"></div>
                    </div>
                </teleport>
            </div>
        </div>
    </div>
</template>

<script>
    import { reactive, toRaw, markRaw } from 'vue'
    export default {
        name: 'AppTest2',
        setup(){
            let names=reactive({
                name:'老伍',
                age:23,
                job:{
                    salary:10
                }
            })
            function addAges(){
                names.age++           // 响应式 正常+
                console.log(names)
            }
            function addSalary(){
                let fullName=toRaw(names)   // toRaw 将reactive的响应式对象转为普通对象
                fullName.job.salary++   // 普通对象 值会改变，但不会响应式同步更新模板（但模板被响应式更新时【例如改变name.age】，这里会把最新值同步更新至模板）
                console.log(fullName)   // 点击 addSalary => salary++
            }
            function add(){
                let girlFriend={sex:'女',age:40}   
                names.girlFriend=markRaw(girlFriend)  // markRaw包裹 则也是普通对象，不会响应式改变
            }
            function addAge(){
                names.girlFriend.age++      // 普通对象 值会改变，但不会响应式同步更新模板
                console.log(names.girlFriend.age)   // 点击addAge => girlFriend.age++
            }
            return {
                names,
                add,
                addAge,
                addAges,
                addSalary
            }
        }
    }
</script>

<style lang="scss">
    #one {
        width: 100%;
        background-color: blue;
        .two {
            margin: 20px;
            background-color: aqua;
            .three {
                margin: 20px;
                background-color: aliceblue;
            }
        }
    }
    .four {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: rgba(0, 0, 0, 0.5);
        .five {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
            width: 300px;
            height: 300px;
            left: 50%;
            background-color:#f60;
        }
    }
</style>
