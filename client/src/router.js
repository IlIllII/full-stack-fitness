/**
 * @file Vue router for easy navigation.
 * 
 * Accessed within view components with "this.$router".
 */
import { createRouter, createWebHistory, } from "vue-router"
import Register from "./components/Register"
import Login from "./components/Login"
import Test from "./components/Test"
import Workout from "./components/Workout"
import Home from "./components/Home"
import About from "./components/About"
import License from "./components/License"
import Privacy from "./components/Privacy"

export const routerHistory = createWebHistory();
export const router = createRouter({
    history: routerHistory,
    routes: [
        { path: '/home', redirect: '/' },
        { path: '/', component: Home },
        { path: '/register', component: Register },
        { path: "/login", component: Login },
        { path: "/test", component: Test },
        { path: "/workout", component: Workout },
        { path: "/about", component: About },
        { path: "/license", component: License },
        { path: "/privacy", component: Privacy },
    ]
})