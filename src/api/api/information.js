import request from '../request';

//新增公告
export function informationadd(data) {
    return request({
        url: '/information/add',
        method: 'post',
        data
    });
};

// 删除
export function informationdel(data) {
    return request({
        url: '/information/del',
        method: 'post',
        data
    });
};

// 编辑
export function informationedit(data) {
    return request({
        url: '/information/edit',
        method: 'post',
        data
    });
};

// 列表
export function informationfindList(data) {
    return request({
        url: '/information/findList',
        method: 'post',
        data
    });
};

// 根据id查询
export function informationget(data) {
    return request({
        url: '/information/get',
        method: 'post',
        data
    });
};


export function informationgetList(data) {
    return request({
        url: '/information/getList',
        method: 'post',
        data
    });
};
