import request from '../request';

//添加评论
export function assessadd(data) {
    return request({
        url: '/assess/add',
        method: 'post',
        data
    });
};

//删除评价
export function assessdel(data) {
    return request({
        url: '/assess/del',
        method: 'post',
        data
    });
};

//查询
export function assessget(data) {
    return request({
        url: '/assess/get',
        method: 'post',
        data
    });
};

//查询列表
export function assessgetList(data) {
    return request({
        url: '/assess/getList',
        method: 'post',
        data
    });
};

