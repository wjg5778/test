import http from '../util/http.js';
export default {
        namespaced: true,
        state: {
                list: [],
                homeList: []
        },
        getters: {

        },
        mutations: {
                _reset(state) { state.list = []; },
                _updataList(state,payload) { state.list = payload; },
                _initHomeList(state, data) { state.homeList = data; }
        },
        actions: {
                getData({ state, commit },payload) {
                        if(payload.start === 0 ) commit('_reset')
                        return new Promise(resolve => {
                                setTimeout(() => {
                                        http({ data: payload, url: '/product/list', loading: false })
                                                .then((data) => {
                                                        if(payload.start !==0 ) commit('_updataList', state.list.concat(data));
                                                        else commit('_updataList', data);
                                                        resolve (data.length);
                                                });
                                },1000);
                        })

                },
                getItem({},id) {
                      return new Promise(resolve => {
                              http({ method: 'get', url: '/product/details/' + id })
                                      .then(data => {
                                              resolve (data);
                                      });
                      })
                },
                homeData({commit}) {
                        http({method: 'get', url: '/product/homeList'})
                                .then(data => {
                                        commit('_initHomeList', data);
                                });
                }

        }
};