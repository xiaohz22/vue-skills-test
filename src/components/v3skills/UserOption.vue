<template>
    <div class="user-option">
        <ul>
            <li>姓名：{{ userInfo.detail.name }}</li>
            <li>职业：{{ userInfo.job }}</li>
            <li>年龄：{{ userInfo.age }}</li>
        </ul>

        <div>
            <p>script setup 私有属性</p>
            <ul>
                <li>{{ privateData }}</li>
                <li>{{ upperCasePrivateData }}</li>
            </ul>
        </div>

        <!-- skl-9.有条件的渲染插槽 -->
        <div class="user-slot">
            <!-- 默认插槽 -->
            <slot></slot>
            <!-- 具名插槽 -->
            <slot name="header"></slot>
            <!-- 如果插槽外包了一层盒子，如果父组件不使用该插槽，该插槽外层盒子仍会显示，可能会影响页面布局 -->
            <!-- 此时可以根据$slot来判断，若父组件使用了section插槽，则$slot.section属性存在，否则不存在，存在才显示 -->
            <div v-if="$slots.section" class="section">
                <slot name="section"></slot>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { watch } from 'vue';

    // Vue选项式 User组件
    export default {
        // skl-5.只允许upperCasePrivateData被访问到
        expose: ['upperCasePrivateData'],
        props: {
            userInfo: Object
        },
        data() {
            return {
                privateData: 'secrecy',
            }
        },
        // skl-3.当父组件改变传入的props改变时我们需要做某些操作，可以使用watch监听props。
        //       但监听只是浅层的，如果修改了userInfo.detail.name，这里不会被监听到，此时可以使用deep深层次监听
        //       但如果我不想监听整个对象，只想监听对象里的某个属性，则可以使用引号""来监听嵌套值
        watch: {
            // 深层次监听整个对象
            // userInfo: {
            //     handler () {
            //         console.log('props-userInfo改变了, 进行某些操作...')
            //     },
            //     deep: true
            // },
            // 用引号深层次监听对象里某个属性
            'userInfo.detail.name': {
                handler () {
                    console.log('props-userInfo改变了, 进行某些操作...')
                }
            }
        },
        computed: {
            upperCasePrivateData(): string {
                return this.privateData.toUpperCase();
            }
        },
        mounted() {
            // skl-9.联系：父组件如果使用了子组件的插槽，那么可以在$slot中看到这些插槽的对象属性
            console.log('$slots', this.$slots)
        }
    }

</script>

<style scoped>
    :slotted(.slot-header) {
        color: green
    }
    :slotted(.slot-default) {
        color: purple
    }
    .section {
        width: 100%;
        height: 20px;
        border: 2px solid #ccc;
    }
</style>