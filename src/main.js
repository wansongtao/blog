import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { ElMessage, ElButton, ElSelect, ElOption, ElTooltip } from 'element-plus';
import 'element-plus/packages/theme-chalk/src/base.scss';

const app = createApp(App);
app.component(ElMessage.name, ElMessage);
app.component(ElButton.name, ElButton);
app.component(ElSelect.name, ElSelect);
app.component(ElOption.name, ElOption);
app.component(ElTooltip.name, ElTooltip);

app.use(store).use(router).mount('#app');
