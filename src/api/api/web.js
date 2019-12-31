import request from '../request';
// 获取系统参数
export function getService(data) {
  return request({
    url: '/config/getService',
    method: 'post',
    data
  });
};
