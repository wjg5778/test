import Vue from 'vue';
import  ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import store from './store';
import router from './router';

Vue.use(ElementUI);

new Vue({
        el: '#app',
        components: { App },
        template: '<App />',
        store,
        router
});