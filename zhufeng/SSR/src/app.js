import Vue from 'vue';
import App from './App.vue'
import createRouter from './router';

export default function () {
    let router = createRouter();
    let app = new Vue({
        router,//注入路由
        render: h => h(App)
    })
    return {app, router}
};
