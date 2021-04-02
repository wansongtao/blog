import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { ElMessage } from 'element-plus'
import 'element-plus/packages/theme-chalk/src/base.scss'

const app = createApp(App)
app.component(ElMessage.name, ElMessage)

app.use(store).use(router).mount('#app')
