import request from '../request';
// 发帖
export function forumadd(data) {
  return request({
    url: '/forum/add',
    method: 'post',
    data
  });
};

// 评论
export function addAssess(data) {
  return request({
    url: '/forum/addAssess',
    method: 'post',
    data
  });
};

// 清除消息
export function clearMessage(data) {
  return request({
    url: '/forum/clearMessage',
    method: 'post',
    data
  });
};
// 编辑
export function edit(data) {
  return request({
    url: '/forum/edit',
    method: 'post',
    data
  });
};

// 获取
export function get(data) {
  return request({
    url: 'forum/get',
    method: 'post',
    data
  });
};

// 获取
export function getAssessList(data) {
  return request({
    url: 'forum/getAssessList',
    method: 'post',
    data
  });
};

// 获取
export function getList(data) {
  return request({
    url: 'forum/getList',
    method: 'post',
    data
  });
};

// 获取
export function myAssessList(data) {
  return request({
    url: 'forum/myAssessList',
    method: 'post',
    data
  });
};


// 获取
export function read(data) {
  return request({
    url: 'forum/read',
    method: 'post',
    data
  });
};

// 获取
export function unread(data) {
  return request({
    url: 'forum/unread',
    method: 'post',
    data
  });
};

