import './assets/main.css';

import { createApp } from 'vue';
import { createPinia, setActivePinia } from 'pinia';
import App from './App.vue';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
setActivePinia(pinia);

const app = createApp(App);
app.use(createPinia());

app.mount('#app');
