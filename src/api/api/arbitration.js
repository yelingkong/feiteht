import request from '../request';

//申请仲裁
export function arbitrationadd(data) {
    return request({
        url: '/arbitration/add',
        method: 'post',
        data
    });
};
//仲裁中心
export function arbitrationarList(data) {
    return request({
        url: '/arbitration/arList',
        method: 'post',
        data
    });
};

//编辑
export function arbitrationedit(data) {
    return request({
        url: '/arbitration/edit',
        method: 'post',
        data
    });
};


//查看详情
export function arbitrationgetIn(data) {
    return request({
        url: '/arbitration/getIn',
        method: 'post',
        data
    });
};


//仲裁
export function arbitrationgetList(data) {
    return request({
        url: '/arbitration/getList',
        method: 'post',
        data
    });
};



//参加仲裁中心
export function arbitrationuserList(data) {
    return request({
        url: '/arbitration/userList',
        method: 'post',
        data
    });
};




//参加仲裁中心
export function arbitrationvote(data) {
    return request({
        url: '/arbitration/vote',
        method: 'post',
        data
    });
};

