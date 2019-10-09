//     源代码入口文件（根实例）
//     导入vue
import Vue from 'vue';

// 导入根组件App
import App from './App.vue';

// 导入router
import router from './router';

//导入仓库
import store from './store';

//使用组件
import './components/UI';

new Vue({
        el: '#app',
        components: { App },
        template: '<App />',
        router,
        store
});