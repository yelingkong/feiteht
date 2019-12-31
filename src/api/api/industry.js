import request from '../request';
//新增行业
export function industryadd(data) {
  return request({
    url: '/industry/add',
    method: 'post',
    data
  });
};
// 删除
export function industrydel(data) {
  return request({
    url: '/industry/del',
    method: 'post',
    data
  });
};
// 编辑
export function industryedit(data) {
  return request({
    url: '/industry/edit',
    method: 'post',
    data
  });
};
// 列表
export function industrygetlist(data) {
  return request({
    url: '/industry/getList',
    method: 'post',
    data
  });
};

// 根据id查询
export function industryget(data) {
  return request({
    url: '/industry/get',
    method: 'post',
    data
  });
};
