<template>
    <div class="userList">
        {{ title }}
        <User
            :uname="userUname"
            :age="userAge"
            :sex="userSex"
            :ulStyle="userUlStyle"
        />
    </div>
</template>

<script lang="ts">
    import User from './User.vue'

    // skl-25.联系
    // 此时UserList组件中使用的props的值前都加了user
    // 所以需要对引入的User.props加一个前缀user
    const userProps: any = {}
    Object.entries(User.props).forEach((item: any, index: any) => {
        userProps[`user${item[0].charAt(0).toUpperCase()}${item[0].substring(1)}`] = item[1]
    })

    export default {
        components: { User },
        props: {
            // skl-25.偷窃prop类型
            // 一个组件被封装时使用了另一个组件需要传入props，而这个被封装的组件被外部页面使用时也需传入相应的props
            // 当prop数量很多，则两个组件内部都需定义大量相同格式的prop
            // ...User.props, // 可以按此解决:
            ...userProps, // 处理后的（前面加前缀user）
            title: {
                type: String
            }
        },
        setup(props, { emit }) {

        }
    }
</script>

<style>

</style>