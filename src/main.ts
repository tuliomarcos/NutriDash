import './assets/main.css'
import * as ko from 'knockout'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)
window.ko = ko

app.use(createPinia())
app.use(router)

app.mount('#app')
