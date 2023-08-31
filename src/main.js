import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from './router.js';
import store from './store/index.js';

const app = createApp(App);

app.use(router).use(store).mount('#app');

import 'animate.css';