<template>
    <div @click="handleClick">WebSocket初体验</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
let socket: WebSocket;
let socketUrl = 'ws://121.40.165.18:8800';
let lockReconnect = ref<boolean>(false);

const emits = defineEmits(['successWeb', 'successNewReceive'])

const handleClick = () => {
    // 点击并开启webSocket连接，若后续服务端发送数据给客户端，客户端可以直接接收并实时处理
    createWebSocket();
}

const createWebSocket = () => {
    if (typeof WebSocket === "undefined") {
        alert('你的浏览器不支持WebSocket!!');
        return;
    }
    console.log('create webSocket')
    socket = new WebSocket(socketUrl);
    socket.onclose = () => {
        console.log('连接关闭');
    }
    socket.onerror = () => {
        console.log('连接失败');
        reconnect();
    }
    socket.onopen = () => {
        console.log('连接成功');
        emits('successWeb')
    }
    // 客户端接收服务端数据时触发
    socket.onmessage = (msg: any) => {
        // 服务端后续数据的发送，这里都能直接拿到发送的数据
        emits('successNewReceive', msg.data)
        console.log(msg.data, 'ws:msg');
    }
}
const reconnect = () => { 
    if (lockReconnect.value) return;
    lockReconnect.value = true;
    // 没连接上会一直重连，设置延迟避免请求过多
    setTimeout(() => {
      lockReconnect.value = false;
      createWebSocket();
    }, 2000)
}
const sendTest = (data: any) => {
    // 给服务器发送一个字符串: ws.send("Hello!");
    socket.send(data);
}
defineExpose({
    sendTest
})

</script>

<script lang="ts">
</script>

<style lang="scss" scoped>

</style>