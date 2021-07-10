import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home'

import {AsyncComponent, AsyncLoad} from "../util";
Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        component: Home
    },
    {
        path: '/home',
        name: 'Home',
        component: Home
    },
    {
        path: '/play',
        name: 'play',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => AsyncLoad(import(/* webpackChunkName: "about" */ '../views/play'))
    },
    {
        path: '/message',
        name: 'message',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        // component: () => import(/* webpackChunkName: "about" */ '../views/message')
        component: () =>AsyncLoad(import(/* webpackChunkName: "about" */ '../views/message') )

    },
    {
        path: '/user',
        name: 'user',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        // component: () => import(/* webpackChunkName: "about" */ '../views/user')
        component: () => AsyncLoad(import(/* webpackChunkName: "about" */ '../views/user') )

    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
