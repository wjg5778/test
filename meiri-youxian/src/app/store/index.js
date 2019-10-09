// 导入vue
import Vue from  'vue';

//导入vuex
import Vuex from 'vuex';

Vue.use(Vuex);          // 向vue体系注册vuex体系中的组件


// 导入子仓库
import category from './category.js';
import product from './product.js';
import cart from './cart.js';
import loading from './loading.js';
import address from './address.js';



const store = new Vuex.Store({
        modules: {
                category,
                product,
                cart,
                loading,
                address
        },
        state: {},
        getters: {},
        mutations: {},
        actions: {}
});


export default store;