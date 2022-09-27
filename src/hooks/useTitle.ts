import { ref } from "vue";

export default function useTitle(title?: string | Object) {
    // skl-13.可组合中的灵活参数
    // 接收title可以是普通字符串或者ref对象，统一返回ref对象; unRef同理
    const ref_title = ref(title);
    return ref_title.value ?? '默认title'
}