import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

const pinia = createPinia();

const app = createApp(App);

pinia.use(piniaPluginPersistedstate);

app.use(createPinia());

app.mount('#app');
