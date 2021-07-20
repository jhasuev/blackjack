import { createApp } from 'vue'
import store from './store'
import App from './App.vue'
import Popup from '@/components/Popup'
import './scss/app.scss'

createApp(App)
    .use(store)
    .component("Popup", Popup)
    .mount('#app')