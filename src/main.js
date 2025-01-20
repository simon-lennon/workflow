import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

// Import Bootstrap
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

// Import Vue Flow styles
import '@vue-flow/core/dist/style.css'
import '@vue-flow/core/dist/theme-default.css'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.mount('#app')