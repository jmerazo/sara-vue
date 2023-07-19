import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'

const app = createApp(App)

import { faCopy } from '@fortawesome/free-solid-svg-icons'

import { } from '@fortawesome/free-brands-svg-icons';

library.add(
    faCopy
)

app.use(createPinia())
app.use(router)
app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')