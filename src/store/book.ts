import { defineStore } from 'pinia'

export const useBookStore = defineStore({
    id: 'book', // id必填，且需要唯一
    state: () => {
        return {
            bookList: [
                { name: 'NBA', price: '$10', date: '2022-10-10', borrow: '' },
                { name: 'CBA', price: '$8', date: '2022-11-11', borrow: '' }
            ]
        }
    },
    actions: {
        updateBook(num: number, borrowUser: string) {
            // if (num <= 0) return console.log('不能为0');
            this.bookList[num - 1].borrow = borrowUser;
        }   
    },
    getters: {
        
    }
})