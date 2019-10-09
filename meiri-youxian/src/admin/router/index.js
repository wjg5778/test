import Vue from 'vue';
import Router from 'vue-router';
import Pages from '../pages';

Vue.use(Router);

const router = new Router({
           routes: [
                   { path: '/', redirect: '/login' },
                   { path: '/login', component: Pages.Login },
                   { path: '/home', component: Pages.Home },
           ]
});

//定制全局守卫，防止用户没有登录直接访问home页
router.beforeEach((to, from, next) => {
        if(to.fullPath === '/home' && !sessionStorage.getItem('name')) next('/login');
        else next();
});

export default router;