import http from '../util/http.js';
export default {
        admin: {
                changePwd(ajaxData) {
                        return http({ url: '/user/changepwd', data: ajaxData, withToken: true })
                }
        },
        category: {
                getData(fid) {
                        return  http({ method: 'get', url: '/category/list/' + fid });
                },
                updateCategory(ajaxData) {
                        return http({ url: '/category/update', data: ajaxData })
                }
        }
}