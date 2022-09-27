import { defineStore } from 'pinia'
import { useBookStore } from './book'

export const useUserStore = defineStore({
    id: 'user', // id必填，且需要唯一
    state: () => {
        return {
            name: '张三'
        }
    },
    actions: {
        updateName(name: string) {
            this.name = name
        },
        borrowBook(num: number = 1, borrowUser: string) {
            const bookStore = useBookStore();
            bookStore.updateBook(num, borrowUser)
        }   
    },
    getters: {
        fullName(state) {
            return state.name + '丰'
        }
    },
    // 开启数据缓存
    persist: {
        enabled: true,  // 默认存放在sessionStorage, 以store的id为key
        // 自定义key值,自定义存放位置 
        strategies: [
            {
                key: 'my_user',
                storage: localStorage,
                // paths: ['user']   // 指定要持久化的字段
            }
        ]
    },
})