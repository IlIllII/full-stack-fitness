import { /*createRenderer,*/ createRouter, createWebHistory, /*RouterView*/ } from "vue-router"

import Register from "./components/Register"
import HelloWorld from "./components/HelloWorld"
import Login from "./components/Login"
import Test from "./components/Test"
import Workout from "./components/Workout"

export const routerHistory = createWebHistory();
export const router = createRouter({
    history: routerHistory,
    routes: [
        { path: '/home', redirect: '/'},
        { path: '/', component: HelloWorld},
        { path: '/register', component: Register},
        { path: "/login", component: Login },
        { path: "/test", component: Test },
        { path: "/workout", component: Workout },
    ]
})