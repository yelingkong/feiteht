import request from '../request';

// 登录
export const userLogin = params => { return request.post(`/user/login`, params).then(res => res); };

// 退出登录
export const accountLogout = (params) => { return request.post(`/user/logout`, params).then(res => res); };

/// 公共调用接口 ///
// 上传图片/视频
export const getChunk = (params) => { return request.post(`/common/changePhotoOrVideo`, params).then(res => res.data); };

// 分类接口
// 新增保存
export function addClassInfo(data) {
  return request({
    url: '/config/common/addCategory',
    method: 'post',
    data
  });
};

// 删除分类
export function deleteClassInfo(id) {
  return request({
    url: '/config/common/deleteCategory',
    method: 'get',
		params: {
      id: 12345
    }
  });
};

//首页-广告图
export function bannerGetAll(data) {
  return request({
    url: '/banner/getAll',
    method: 'post',
    data
  });
};
//首页-新闻
export function informationGetList(data) {
  return request({
    url: '/information/getList',
    method: 'post',
    data
  });
};

//首页-新闻
export function informationGetOne(data) {
  return request({
    url: '/information/getOne',
    method: 'post',
    data
  });
};

//首页-配置
export function getAdminInfo(data) {
  return request({
    url: 'config/getAdminInfo',
    method: 'post',
    data
  });
};

//支付
export function getpay(data) {
  return request({
    url: '/orders/addOrder',
    method: 'post',
    data
  });
};

//判断是否支付
export function getpaystatus(data) {
  return request({
    url: '/orders/findOrder',
    method: 'post',
    data
  });
};
