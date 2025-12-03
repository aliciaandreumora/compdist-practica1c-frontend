import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import {router} from './router.js'
import { createPinia } from 'pinia'

// createApp(App).use(router).mount('#app')

createApp(App).use(createPinia()).use(router).mount("#app")
