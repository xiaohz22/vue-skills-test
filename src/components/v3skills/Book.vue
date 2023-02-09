<!-- skl-33.多文件的单文件组件 -->
<!-- 在Vue的单文件组件中，我们可以像对待普通的HTML文件那样导入文件 -->
<!-- <template src="./template.html"></template>
<script src="./script.js"></script>
<style scoped src="./styles.css"></style> -->

<template>
    <div class="book_item">
        <!-- <div class="left">
            <div class="left_label">姓名：</div>
            <div class="left_content">张三丰</div>
            <div class="action">增加</div>
        </div> -->
        <!-- <div class="left">   
            <div class="left_label">年龄</div>
            <div class="left_content">张三丰</div>
            <div class="action">删除</div>
        </div>   -->
        <BookInfo
            label="姓名"
            content="张三"
            action="增加"
        />
    </div>
</template>

<script lang="ts" setup>

</script>

<script>
    // skl-32.在一个文件中定义多个组件
    // 上面模板中代码结构相似，但不想新开一个文件来写组件
    // 所以定义一个描述结构的小组件
    const BookInfo = {
        props: ['label', 'content', 'action'],
        template: `
            <div class="left">
                <div class="left_label">{{ label }}</div>
                <div class="left_content">{{ content }}</div>
                <div class="action">{{ action }}</div>
            </div>
        `
    }
    export default {
        components: {
            BookInfo
        }
    }
</script>

<style lang="scss" scoped>

</style>