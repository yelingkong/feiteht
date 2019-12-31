import request from '../request';

//添加事件流
export function recordadd(data) {
    return request({
        url: '/record/add',
        method: 'post',
        data
    });
};

//查看事件流
export function recordget(data) {
    return request({
        url: '/record/get',
        method: 'post',
        data
    });
};

//事件流
export function recordgetList(data) {
    return request({
        url: '/record/getList',
        method: 'post',
        data
    });
};

