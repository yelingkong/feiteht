import request from '../request';

//添加财务
export function moneyLogadd(data) {
    return request({
        url: '/moneyLog/add',
        method: 'post',
        data
    });
};

//添加财务
export function moneyLoganalysis(data) {
    return request({
        url: '/moneyLog/analysis',
        method: 'post',
        data
    });
};

//添加财务
export function moneyLogedit(data) {
    return request({
        url: '/moneyLog/edit',
        method: 'post',
        data
    });
};

//添加财务
export function moneyLogget(data) {
    return request({
        url: '/moneyLog/get',
        method: 'post',
        data
    });
};

//添加财务
export function moneyLoggetList(data) {
    return request({
        url: '/moneyLog/getList',
        method: 'post',
        data
    });
};

//添加财务
export function moneyLogstatistics(data) {
    return request({
        url: '/moneyLog/statistics',
        method: 'post',
        data
    });
};
