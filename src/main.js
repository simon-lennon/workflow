import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

// Import Bootstrap
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

// Import Vue Flow styles
import '@vue-flow/core/dist/style.css'
import '@vue-flow/core/dist/theme-default.css'

// Create app
const app = createApp(App)

// Initialize Pinia
const pinia = createPinia()
app.use(pinia)

// Mount app
app.mount('#app')