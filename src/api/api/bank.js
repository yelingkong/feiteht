import request from '../request';

//添加银行卡
export function bankadd(data) {
    return request({
        url: '/bank/add',
        method: 'post',
        data
    });
};

//编辑银行卡
export function bankedit(data) {
    return request({
        url: '/bank/edit',
        method: 'post',
        data
    });
};

//查询详情
export function bankget(data) {
    return request({
        url: '/bank/get',
        method: 'post',
        data
    });
};


//列表
export function bankgetUserList(data) {
    return request({
        url: '/bank/getUserList',
        method: 'post',
        data
    });
};

