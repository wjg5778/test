import axios from 'axios';
import store from '../store';
import router from '../router';
import Vue from 'vue';

// import router from '../router';
//一个永远处于 peending 状态的 Promise
const alwaysPendingPromise = new Promise(() => {});

function http(options){
        let defaultOptions = { method: 'post', loading: true, withToken: false };
        options = Object.assign({}, defaultOptions, options);
        if(options.loading) store.commit('loading/show');           //显示loading组件
        if(options.loadingEl) {
                options.loadingEl.className +=' http-loading';                     //为指定的元素添加 loading 效果
                options.loadingEl.disabled = true;                                         //禁用指定的 dom 元素
        }
        if(options.withToken) {
                options.headers = {
                        Authorization: sessionStorage.getItem('token')
                }

        }
        return axios(options)
                .then(response =>{
                        if(options.loading) setTimeout(() => store.commit('loading/hide'),1500);       //关闭loading组件
                        if(response.status === 200) return response.data || JSON.parse(response.requestText);
                        else throw new Error(response.statusText);
                })
                .then(result =>{
                        let {status, data, message} = result;
                        switch(status){
                                case 200 :
                                        if(options.loading) setTimeout(() => store.commit('loading/hide'),500);       //关闭loading组件
                                        if(options.loadingEl) {
                                                setTimeout(() => {
                                                        options.loadingEl.className = options.loadingEl.className.replace(' http-loading', '');
                                                        options.loadingEl.disabled = false;                                                //恢复指定 dom元素的正常状态
                                                },500);
                                        }
                                        if(message !== '') Vue.prototype.$alert(message);
                                        return data;
                                case 401:
                                        sessionStorage.removeItem('token');
                                        message='您还没有登录喲..';
                                        router.push('/login');
                                case 199:
                                case 500:
                                        throw new Error(message);

                        }
                })
                .catch(err =>{
                        if(options.loadingEl) {
                                setTimeout(() => {
                                        options.loadingEl.className = options.loadingEl.className.replace(' http-loading', '');
                                        options.loadingEl.disabled = false;                                                //恢复指定 dom元素的正常状态
                                },500);
                        }
                        Vue.prototype.$alert(err.message);
                        return alwaysPendingPromise;           //返回一个永远 pending 的promise对象
                });
}

export default http;