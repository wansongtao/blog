import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { ElMessage, ElButton } from 'element-plus';
import 'element-plus/packages/theme-chalk/src/base.scss';

const app = createApp(App);
app.component(ElMessage.name, ElMessage);
app.component(ElButton.name, ElButton);

app.use(store).use(router).mount('#app');
