import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
//import store from './store'
import {modal} from './module/store';

createApp(App).use(modal).use(router).mount('#app')