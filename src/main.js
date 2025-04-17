import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

// 初始化认证状态
const authStore = pinia._s.get('auth')
if (authStore) {
  authStore.initialize()
}

app.mount('#app')