import axios from 'axios';
import {Message} from 'element-ui';
import router from '@/router/index';
import {devIp} from '@/api/ipConfig';
import store from '../store/index'
import {mapState, mapActions, mapMutations, mapGetters} from 'vuex'


const service = axios.create({
    baseURL: devIp + '/api', // 测试IP
    timeout: 10000 // request timeout
});

// request interceptor
service.interceptors.request.use(config => {
    // Do something before request is sent
    let uid = sessionStorage.getItem('token');
    if (uid) {
        config.headers['UID'] = uid; // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
    }
    return config;
}, error => {
    // Do something with request error
    // console.log(error); // for debug
    Promise.reject(error);
});

// respone interceptor
service.interceptors.response.use(
    // response => response,
    response => {
        const res = response.data;
        // return res;
        if (res.code == '200') {
            return res;
        } else if (res.code == '602') {
            Message({
                message: res.message,
                type: 'error',
                duration: 2 * 1000
            });
            // router.push({path: '/'});
            localStorage.removeItem('userInfo')
            store.commit('toggleLogin', false)
            store.commit('toggleisShowLogin', true)
            // location.reload();
        } else {
            Message({
                message: res.message,
                type: 'error',
                duration: 5 * 1000
            });
            return res;
        }
    },
    /**
     * 下面的注释为通过response自定义code来标示请求状态，当code返回如下情况为权限有问题，登出并返回到登录页
     * 如通过xmlhttprequest 状态码标识 逻辑可写在下面error中
     */
        //  const res = response.data;
        //     if (res.code !== 20000) {
        //       Message({
        //         message: res.message,
        //         type: 'error',
        //         duration: 5 * 1000
        //       });
        //       // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
        //       if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        //         MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
        //           confirmButtonText: '重新登录',
        //           cancelButtonText: '取消',
        //           type: 'warning'
        //         }).then(() => {
        //           store.dispatch('FedLogOut').then(() => {
        //             location.reload();// 为了重新实例化vue-router对象 避免bug
        //           });
        //         })
        //       }
        //       return Promise.reject('error');
        //     } else {
        //       return response.data;
        //     }
    error => {
        console.log('err' + error);// for debug
        Message({
            message: error.message,
            type: 'error',
            duration: 3000
        });
        return Promise.reject(error);
    });

export default service;
