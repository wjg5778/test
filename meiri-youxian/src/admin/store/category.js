import API from '../util/api.js';
export default {
        namespaced: true,
        state: {
                list: [],               //保存所有一级分类和二级分类
                fids: []               //记录所有请求过的分类fid(不管是一级还是二级)
        },
        getters: {
                mainList(state) { return state.list.filter(item => item.fid === 0); }
        },
        mutations: {
                _recordFid(state, fid){ state.fids.push(fid) },
                _appendData(state, data) { state.list = state.list.concat(data) },
                _addCategory(state, item) {
                        if(state.fids.indexOf(item.id) === -1) state.list.push(item);
                },
                _updateCategory(state, data) {
                        let oldData = state.list.find(item => item.id === data.id);
                        // 如果修改分类是更换了父分类，且父分类没有被懒加载过
                        if(oldData.fid !== data.fid && state.fids.indexOf(data.fid) === -1) {
                                let i = state.list.findIndex(item => item.id === data.id);
                                state.list.splice(i, 1);
                        } else {
                                let i = state.list.findIndex(item => item.id === data.id);
                                state.list.splice(i, 1, data);
                        }

                }
        },
        actions: {
                getData({state, commit}, fid) {
                        if(state.fids.indexOf(fid) !== -1)
                                return Promise.resolve(state.list.filter(item => item.fid === fid));
                        else {
                               return API.category.getData(fid)
                                        .then(data => {
                                                commit('_recordFid', fid);
                                                commit('_appendData', data);
                                                return data;
                                        });
                        }
                },
                updateCategory({ commit }, ajaxData) {
                        return API.category.updateCategory(ajaxData)
                                .then(() => {
                                        let { oldAvatar, ...data } = ajaxData;
                                        data.avatar = data.avatar !== '' ? '/images/category/' + data.avatar : oldAvatar;
                                        commit('_updateCategory', data);
                                        console.log(data);
                                        return data;
                                });
                }
        }
}