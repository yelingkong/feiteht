import request from '../request';
// 我的资料
export function coachGet(data) {
  return request({
    url: '/coach/get',
    method: 'post',
    data
  });
};

// 增加教案
export function teachingPlanadd(data) {
  return request({
    url: 'teachingPlan/add',
    method: 'post',
    data
  });
};

// 编辑教案
export function teachingPlanedit(data) {
  return request({
    url: 'teachingPlan/edit',
    method: 'post',
    data
  });
};
// 查看教案
export function teachingPlanget(data) {
  return request({
    url: 'teachingPlan/get',
    method: 'post',
    data
  });
};

// 获取教案列表
export function getTeachingPlanList(data) {
  return request({
    url: 'teachingPlan/getTeachingPlanList',
    method: 'post',
    data
  });
};
