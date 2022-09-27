<template>
    <div>
        测试Pinia
        {{ 'state:' + name }}
        {{ 'getter:' + userStore.fullName }}
    </div>
    <input type="text" v-model="uname">
    <button @click="handleClick">修改名字</button>
    <input type="text" v-model="bookNum">
    <button @click="borrowBook">借书</button>
    <ul>
        <li v-for="item in bookList">
            <div class="bookList">
                <span>{{ item.name }}</span>
                <span>{{ item.price }}</span>
                <span>{{ item.date }}</span>
                <span>{{ item.borrow || '暂无借阅人' }}</span>
            </div>
        </li>
    </ul>
</template>

<script lang="ts" setup>
    import { ref } from 'vue';
    import { storeToRefs } from 'pinia';
    import { useUserStore } from '@/store/user'
    import { useBookStore } from '@/store/book'

    const uname = ref<string>('')
    const bookNum = ref<number>(0)

    const userStore = useUserStore();
    const bookStore = useBookStore();

    // 解构失去响应式,要保持需要storeToRefs处理
    const { name } = storeToRefs(userStore);
    const { bookList } = storeToRefs(bookStore);

    const handleClick = () => {
        // 修改state
        userStore.updateName(uname.value)
        uname.value = ''
    }

    const borrowBook = () => {
        userStore.borrowBook(bookNum.value ? bookNum.value : undefined, name.value);
    }

</script>

<style lang="scss">
    .bookList {
        display: flex;
        justify-content: space-evenly;
    }

</style>