/**
 * @file Mounts Vue App into index.html in public folder.
 */
import { createApp } from 'vue'
import App from './App.vue'
import { router, } from "./router"

let app = createApp(App)
app.use(router)
app.mount('#app')