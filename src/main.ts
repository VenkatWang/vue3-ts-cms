import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import { registerGlobal } from './global'

import './service/axios-demo'

const app = createApp(App)

app.use(registerGlobal)
// registerApp(app)

app.use(store)
app.use(router)

app.mount('#app')
