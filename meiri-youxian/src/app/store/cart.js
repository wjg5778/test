import http from '../util/http.js';
import Vue from 'vue';
export default {
        namespaced: true,
        state: { list: [], results: {} },
        getters: {},
        mutations: {
                _updateList(state, payload) {
                        payload.forEach(item => {
                           item.checked1 = true;
                        });
                        state.list = payload;
                },
                _AllSelectionMode(state, payload) {
                        state.list.forEach(item => item.checked1 = payload);
                },
                _selectionMode(state,payload) {
                        let checked = state.list.find(item => item.id === payload);
                        checked.checked1 = !checked.checked1;
                },
                _increase(state, payload) {
                      let target =  state.list.find(item => item.id === payload);
                      if(target) target.count = target.count + 1;
                },
                _decrease(state, payload) {
                        let target = state.list.find(item => item.id === payload);
                        if(target) target.count = target.count - 1;
                },
                _remove(state, payload) {
                       let i = state.list.findIndex(item => item.id === payload);
                       if(i !== -1) state.list.splice(i, 1);
                },
                _settlement(state, payload) {
                        payload.forEach(id => {
                                let i = state.list.findIndex(item => item.id === id );
                                if(i !== -1) state.list.splice(i, 1);
                        });
                },
                _initResult(state, result){
                        state.result = result;
                }

        },
        actions: {
                getData({ commit }) {
                        http({ url: '/cart/list', withToken: true })
                                .then((data) => {
                                       commit('_updateList', data);
                                });
                },
                increase({ commit }, { id, loadingEl,count }) {
                        if(count ===5) {
                                Vue.prototype.$notice('最多可以购买5份喲..');
                                return;
                        }
                        http({ method: 'get', url: '/cart/increase/' + id, withToken: true, loading: false, loadingEl })
                                .then(() => {
                                        commit('_increase', id);
                                });
                },
                decrease({ commit }, { id, loadingEl, count }) {
                        if(count === 2) {
                                Vue.prototype.$notice('不要再点了，再点就要删除啦...');
                        }
                        if(count === 1 ) {
                                Vue.prototype.$confirm('确认删除吗？')
                                        .then(() => {
                                                http({ url: '/cart/delete/' + id, withToken: true })
                                                        .then(() => {
                                                                commit('_remove', id);
                                                        });
                                        });
                                return;
                        }
                        http({ method: 'get', url: '/cart/decrease/' + id, withToken: true, loading: false, loadingEl })
                                .then(() => {
                                        commit('_decrease', id);
                                });
                },
                settlement({ commit, state }, addressId) {
                        let ids = [];
                        let account = 0;
                        state.list.forEach(item => {
                           if(item.checked1) {
                                   ids.push(item.id);
                                   account += item.price * item.count;
                           }
                        });
                        http({ url: '/cart/settlement', data: { ids: JSON.stringify(ids), account: account.toFixed(2), addressId }, withToken: true})
                                .then(result => {
                                        commit('_initResult', result[0]);
                                        commit('_settlement', ids);
                                });
                },
                getCount() {
                        return new Promise(resolve => {
                                http({ url: '/cart/getcount', withToken: true, })
                                        .then(count => {
                                                resolve (count);
                                        })
                        });
                },
                addCart({},{ id, count }) {
                        return http({ url: '/cart/addcart', data:{ id, count }, loading: false, withToken: true })
                                .then(result => {
                                        if(result !== '') {
                                                Vue.prototype.$notice(result+'，你购物车已经有五个了呦..');
                                        } else {
                                                Vue.prototype.$notice('添加成功..');
                                        }
                                        return result;
                                });
                }
        }
};