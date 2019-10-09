import http from '../util/http.js';
import Vue from 'vue';
export default {
        namespaced: true,
        state:{ list: [] },
        getters: {},
        mutations: {
                _initList(state, data) { state.list = data; },
                _addList(state, data) { state.list.push(data); },
                _upList(state, data) {
                        let i = state.list.findIndex(item => item.id === data.id);
                        if(i !==-1) state.list.splice(i, 1, data);
                },
                _removeList(state, id) {
                        let i = state.list.findIndex(item => item.id ===id);
                        if(i !== -1) state.list.splice(i, 1);
                }
        },
        actions: {
                getList({ commit }) {
                        return http({ url: '/address/list', method: 'get', withToken: true })
                                .then(data => {
                                   commit('_initList', data);
                                });
                },
                addList({ commit, state }, ajaxData) {
                        if(state.list.length ===0) ajaxData.isDefault = 1;
                        return http({ url: '/address/addlist', data: ajaxData , withToken: true })
                                .then(id => {
                                        if(ajaxData.isDefault === 1) {
                                                http({ url: '/address/default', data: { ids: id }, withToken: true });
                                        }
                                        commit('_addList', Object.assign({}, ajaxData, { id }));
                                });
                },
                upList({commit, state}, ajaxData) {
                        let i = state.list.find(item => item.id === ajaxData.id);
                        if(i.isDefault === 1) {
                                Vue.prototype.$alert('不能没有默认地址喲..');
                                return;
                        }
                        return http({ url: '/address/uplist', data: ajaxData, withToken: true })
                                .then(() => {
                                        if(ajaxData.isDefault === 1) {
                                                http({ url: '/address/default', data: { ids: ajaxData.id }, withToken: true });
                                        }
                                        commit('_upList', Object.assign({}, ajaxData));
                                })
                },
                removeList({ commit, state }, payload) {
                        if(payload.isDefault === 1 && state.list.length > 1) {
                                Vue.prototype.$alert('请先取消默认地址，在进行删除..');
                                return;
                        }
                        Vue.prototype.$confirm('你确认删除吗？').then(() => {
                                return http({ url: '/address/delete', data: { id: payload.id }, withToken: true })
                                        .then(() => {
                                                commit('_removeList', payload.id);
                                        })
                        })

                }

        }

}