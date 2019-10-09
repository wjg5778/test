import http from '../util/http.js';
export default {
        namespaced: true,
        state: {
                activeId: 0,            //存放当前激活的Id
                list: [],                   //存放列表数据
                fids: [],                   //存放已经请求过数据的Id
                homeList: []
        },
        getters: {
                subList: function(state){
                        return state.activeId === 0 ? [] : state.list.filter(item => item.fid === state.activeId);
                },
        },
        mutations: {
                //向state中list中追加新的分类数据
                _appendData:function(state, payload){ state.list = state.list.concat(payload); },
                _recordFid: function(state, payload) { state.fids.push(payload); },
                _toggleId: function(state, payload) { state.activeId = payload; },
                _homeList(state, data) {
                        state.homeList = data;
                }
        },
        actions: {
                _getData({ commit }, fid){
                        return http({ method: 'get', url: '/category/list/' + fid })
                                .then(data => {
                                        commit('_recordFid', fid);
                                        commit('_appendData', data);
                                        return data;
                                });
                },
                toggleId({ state, commit, dispatch }, id){
                        commit('_toggleId',id);
                        if(state.fids.indexOf(id) !== -1 ) return Promise.resolve();
                        return dispatch('_getData', id);
                },
                //初始化一级分类，并默认让第一个一级分类激活，并请求第一个一级分类的二级分类列表数据
                init({ state, dispatch }){
                        if(state.activeId !== 0 ) return Promise.resolve(state.list[0].id);        //已经请求过一级分类数据了
                        return dispatch('_getData', 0);
                },
                initHomeList({commit}, fid) {
                        http({ method: 'get', url: '/category/list/' + fid })
                                .then(data => {
                                       commit('_homeList', data);
                                });
                }
        }
};