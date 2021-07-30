import { /*createRenderer,*/ createRouter, createWebHistory, /*RouterView*/ } from "vue-router"

import Register from "./components/Register"
import HelloWorld from "./components/HelloWorld"
import Login from "./components/Login"

export const routerHistory = createWebHistory();
export const router = createRouter({
    history: routerHistory,
    routes: [
        { path: '/home', redirect: '/'},
        { path: '/', component: HelloWorld},
        { path: '/register', component: Register},
        { path: "/login", component: Login },
    ]
})