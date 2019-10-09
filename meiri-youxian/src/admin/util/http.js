import axios from 'axios';
import { MessageBox, Loading } from 'element-ui';
import router from '../router';
//一个永远处于 peending 状态的 Promise
const alwaysPendingPromise = new Promise(() => {});
let loadingInstance = null;
function http(options){
        let defaultOptions = { method: 'post', withToken: false };
        options = Object.assign({}, defaultOptions, options);
        if(options.withToken) {
                options.headers = {
                        Authorization: sessionStorage.getItem('token')
                }
        }
        loadingInstance = Loading.service();
        return new Promise(resolve =>{
                setTimeout(() => {
                        axios(options)
                                .then(response =>{
                                        if(response.status === 200) return response.data || JSON.parse(response.requestText);
                                        else throw new Error(response.statusText);
                                })
                                .then(result =>{
                                        let {status, data, message} = result;
                                        switch(status){
                                                case 200 :
                                                        if(message !== '') MessageBox.alert(message, '提示', { showClose: false, type:'success' });
                                                        loadingInstance.close();
                                                        resolve(data);
                                                        break;
                                                case 401:
                                                        sessionStorage.removeItem('token');
                                                        sessionStorage.removeItem('name');
                                                        message='您未登录或登录超时..';
                                                        router.replace('/login');
                                                        loadingInstance.close();
                                                        break;
                                                case 199:
                                                case 500:
                                                        throw new Error(message);
                                                        loadingInstance.close();
                                        }
                                })
                                .catch(err =>{
                                        MessageBox.alert(err.message, '警告', { showClose: false, type: 'warning' });
                                        loadingInstance.close();
                                        return alwaysPendingPromise;           //返回一个永远 pending 的promise对象
                                });
                },1000)
        })

}

export default http;