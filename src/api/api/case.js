import request from '../request';

//添加案例
export function caseadd(data) {
    return request({
        url: '/case/add',
        method: 'post',
        data
    });
};

//删除案例
export function casedel(data) {
    return request({
        url: '/case/del',
        method: 'post',
        data
    });
};

//编辑
export function caseedit(data) {
    return request({
        url: '/case/edit',
        method: 'post',
        data
    });
};

//案例列表
export function casefindList(data) {
    return request({
        url: '/case/findList',
        method: 'post',
        data
    });
};


//根据案例查看案例
export function caseget(data) {
    return request({
        url: '/case/get',
        method: 'post',
        data
    });
};


//后台查询
export function casegetList(data) {
    return request({
        url: '/case/getList',
        method: 'post',
        data
    });
};

//查询当前用户案例
export function casegetUserList(data) {
    return request({
        url: '/case/getUserList',
        method: 'post',
        data
    });
};

