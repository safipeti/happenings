import { createApp } from 'vue'
import App from './App.vue'

import Main from './components/Main.vue'
const app = createApp(App)

app.component('Main', Main)

app.mount('#app')
