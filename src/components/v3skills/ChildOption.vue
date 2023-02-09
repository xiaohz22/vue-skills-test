<template>
    <div>Child 组件</div>
    <ul>
        <li>{{ bookNameEdit }}</li>
    </ul>
</template>

<script lang="ts">
    export default {
        data() {
            return {
                userInfo: {
                    name: '张爱佳'
                }
            }
        },
        setup() {
            // skl-19. 1 混合使用选项和组合api时，不能在setup函数中访问选项API中声明的属性
            // console.log(this.userInfo.name) // error
            
            // 2 可以在选项API中访问从setup中返回的属性
            const bookInfo = { name: '三国演义' }
            return {
                bookInfo
            }
        },
        methods: {
            // skl-18.联系
            childMethod() {
                console.log('调用了 Chilld组件的方法，有一个属性：', this.userInfo.name)  // ....张爱佳
            }
        },
        computed: {
            // skl-19.联系
            bookNameEdit(): string {
                return '书籍：' + this.bookInfo.name
            }
        }
    }
</script>

<style>

</style>