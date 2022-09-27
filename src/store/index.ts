import { createPinia } from 'pinia'
import piniaPluginPersist from 'pinia-plugin-persist'

// main
const store = createPinia()
// 数据持久化
store.use(piniaPluginPersist)

export default store