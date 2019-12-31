import request from '../request';

//发布任务
export function ordersadd(data) {
    return request({
        url: '/orders/add',
        method: 'post',
        data
    });
};

// 取消订单
export function orderscOrders(data) {
    return request({
        url: '/orders/cOrders',
        method: 'post',
        data
    });
};

// 定标
export function ordersdetermine(data) {
    return request({
        url: '/orders/determine',
        method: 'post',
        data
    });
};

// 编辑
export function ordersedit(data) {
    return request({
        url: '/orders/edit',
        method: 'post',
        data
    });
};

// 获取详情
export function ordersget(data) {
    return request({
        url: '/orders/get',
        method: 'post',
        data
    });
};


// 获取详情2
export function ordersgetIn(data) {
    return request({
        url: '/orders/getIn',
        method: 'post',
        data
    });
};

// 获取列表
export function ordersgetList(data) {
    return request({
        url: '/orders/getList',
        method: 'post',
        data
    });
};


// 获取列表
export function ordersgetOrdersList(data) {
    return request({
        url: '/orders/getOrdersList',
        method: 'post',
        data
    });
};

// 用户雇佣
export function ordershire(data) {
    return request({
        url: '/orders/hire',
        method: 'post',
        data
    });
};

// 积分投标
export function orderintegralVote(data) {
    return request({
        url: '/orders/integralVote',
        method: 'post',
        data
    });
};

// 定标
export function ordersscaling(data) {
    return request({
        url: '/orders/scaling',
        method: 'post',
        data
    });
};

// 我的任务
export function ordersuserOrdersList(data) {
    return request({
        url: '/orders/userOrdersList',
        method: 'post',
        data
    });
};

// 任务投标
export function ordersvote(data) {
    return request({
        url: '/orders/vote',
        method: 'post',
        data
    });
};

// 任务订单投标
export function ordersvoteUserList(data) {
    return request({
        url: '/orders/voteUserList',
        method: 'post',
        data
    });
};

// 工作者中心-我的任务-这是工作者的订单那
export function cooOrdersList(data) {
    return request({
        url: '/orders/cooOrdersList',
        method: 'post',
        data
    });
};

//取消投标
export function orderscVote(data) {
    return request({
        url: '/orders/cVote',
        method: 'post',
        data
    });
};

//支付
export function orderspay(data) {
    return request({
        url: '/orders/pay',
        method: 'post',
        data
    });
};
