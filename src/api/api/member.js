import request from '../request';

//购买
export function memberbuy(data) {
    return request({
        url: '/member/buy',
        method: 'post',
        data
    });
};

//激活
export function membercode(data) {
    return request({
        url: '/member/code',
        method: 'post',
        data
    });
};

//激活
export function memberedit(data) {
    return request({
        url: '/member/edit',
        method: 'post',
        data
    });
};


//激活
export function memberget(data) {
    return request({
        url: '/member/get',
        method: 'post',
        data
    });
};

//激活
export function membergetList(data) {
    return request({
        url: '/member/getList',
        method: 'post',
        data
    });
};

//激活
export function membergetLog(data) {
    return request({
        url: '/member/getLog',
        method: 'post',
        data
    });
};
