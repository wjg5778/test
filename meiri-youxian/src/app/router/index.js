// 导入Vue
import Vue from 'vue';

// 导入page文件

import page from '../page';

// 导入vue-router

import Router from 'vue-router';

Vue.use(Router);        // 向vue体系注册vue-router体系中的组件

// 创建核心路由对象
const router = new Router({
        routes: [
                { path: '/', redirect: '/home' },
                { path: '/home', component: page.Home },
                { path: '/category', component: page.Category },
                {
                        path: '/list/:mId/:sId',
                        component: page.List,
                        meta: { keepAlive: true }

                },
                { path: '/detail/:id', component: page.Detail },
                { path: '/cart', component: page.Cart, meta: { authenticate: true } },
                { path: '/taste', component: page.Taste },
                { path: '/profile', component: page.Profile },
                {
                        path: '/address',
                        component: page.Address,
                        meta: { authenticate: true }
                },
                { path: '/login', component: page.Login, name: 'login' },
                { path: '/orderconfirm', component: page.OrderConfirm },
                { path: '/payment', component: page.Payment },
                { path: '/register', component: page.Register }
        ]
});
router.beforeEach((to, from, next) => {
        if(to.meta.authenticate && !sessionStorage.getItem('token')){
                Vue.prototype.$alert('您还没有登录喲,先登录吧..');
                router.push({ name: 'login', params: { reference: to.fullPath } });
        } else if(to.fullPath === '/login' && !to.params.reference) {
                to.params.reference = from.fullPath;
                next()
        } else next();
});
export default router;