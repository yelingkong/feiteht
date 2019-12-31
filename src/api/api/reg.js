import request from '../request';

//发送验证码
export function usersend(data) {
    return request({
        url: '/user/send',
        method: 'post',
        data
    });
};

// 编辑用户
export function useredit(data) {
    return request({
        url: '/user/edit',
        method: 'post',
        data
    });
};

// 商户批准
export function examine(data) {
    return request({
        url: '/user/examine',
        method: 'post',
        data
    });
};

// 获取用户信息
export function getInfo(data) {
    return request({
        url: '/user/getInfo',
        method: 'get',
        data
    });
};

// 登录
export function logins(data) {
    return request({
        url: '/user/logins',
        method: 'post',
        data
    });
};

// 注册
export function register(data) {
    return request({
        url: '/user/register',
        method: 'post',
        data
    });
};

// 商户申请
export function merchant(data) {
    return request({
        url: '/user/merchant',
        method: 'post',
        data
    });
};

// 退出登录
export function logout(data) {
    return request({
        url: '/user/logout',
        method: 'post',
        data
    });
};

// 重置密码
export function newPwd(data) {
    return request({
        url: '/user/newPwd',
        method: 'post',
        data
    });
};

// 获取详情
export function getCoIn(data) {
    return request({
        url: '/user/getCoIn',
        method: 'post',
        data
    });
};

// 工作者
export function findCooList(data) {
    return request({
        url: '/user/findCooList',
        method: 'post',
        data
    });
};

// 工作者
export function usergenSig(data) {
    return request({
        url: '/user/genSig',
        method: 'post',
        data
    });
};

// 工作者
export function binding(data) {
    return request({
        url: '/user/binding',
        method: 'post',
        data
    });
};

// 提现
export function withdrawCash(data) {
    return request({
        url: '/cash/withdrawCash',
        method: 'put',
        data
    });
};

