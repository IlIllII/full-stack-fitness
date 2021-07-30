import { createApp } from 'vue'
import App from './App.vue'
// import Register from "./components/Register"
import { router, /*routerHistory*/ } from "./router"


let app = createApp(App)

app.mixin({
    beforeRouteEnter() {
        console.log("mixin enter")
    }
})

app.use(router)
app.mount('#app')
