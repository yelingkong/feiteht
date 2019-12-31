import request from '../request';

// 搜索框 每次查调用该接口
export function termsadd(data) {
    return request({
        url: '/terms/add',
        method: 'post',
        data
    });
};

// 根据主键id修删除
export function termsdel(data) {
    return request({
        url: '/terms/del',
        method: 'post',
        data
    });
};

// 根据主键id修改不为null的值
export function termsedit(data) {
    return request({
        url: '/terms/edit',
        method: 'post',
        data
    });
};
// 根据id查看详情
export function termsget(data) {
    return request({
        url: '/terms/get',
        method: 'post',
        data
    });
};
// 查询列表 按照 数量与创建时间排序
export function termsgetList(data) {
    return request({
        url: '/terms/getList',
        method: 'post',
        data
    });
};
