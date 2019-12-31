import request from '../../api/actions'

const state = {

}

const getters = {}

const mutations = {

}

const actions = {
  // 获取教练
  fetchCoachList({ commit }, data) {
    return request({
      url: '/mechanism/getCoachList',
      methods: 'POST',
      params: data
    })
  },

  // 移除教练
  deleteCoach({ commit }, data) {
    return request({
      url: '/mechanism/deleteCoach',
      methods: 'POST',
      params: data
    })
  },

  // 教练员审核
  typeListJL({ commit }, data) {
    return request({
      url: '/mechanism/typeListJL',
      methods: 'POST',
      params: data
    })
  },

  // 教练员审核
  typeListQY({ commit }, data) {
    return request({
      url: '/mechanism/typeListQY',
      methods: 'POST',
      params: data
    })
  },

  // 教练员通过
  successJL({ commit }, data) {
    return request({
      url: '/mechanism/updateTypeJL',
      methods: 'POST',
      params: data
    })
  },


  // 球员通过
  successQY({ commit }, data) {
    return request({
      url: '/mechanism/updateTypeQY',
      methods: 'POST',
      params: data
    })
  },

  // 教练删除
  deleteJL({ commit }, data) {
    return request({
      url: '/mechanism/delListJL',
      methods: 'POST',
      params: data
    })
  },

  // 球员删除
  deleteQY({ commit }, data) {
    return request({
      url: '/mechanism/delListQY',
      methods: 'POST',
      params: data
    })
  },

  // 账号设置
  set({ commit }, data) {
    return request({
      url: '/user/password',
      methods: 'POST',
      params: data
    })
  },

  // 装备申请
  getZhuangbei({ commit }, data) {
    return request({
      url: '/mechanism/findApplysList',
      methods: 'POST',
      params: data
    })
  },

  // 我的简介
  wodejianjie({ commit }, data) {
    return request({
      url: '/mechanism/get',
      methods: 'POST',
      params: data
    })
  },

  // 我的简介编辑
  wodejianjieEdit({ commit }, data) {
    return request({
      url: '/mechanism/edit',
      methods: 'POST',
      params: data
    })
  },
  // 教练员详情
  coachDetail({ commit }, data) {
    return request({
      url: '/coach/getMyInfo',
      methods: 'POST',
      params: data
    })
  },
  //05-01-我的教案 不传教练id
  getTeachingPlanList({ commit }, data) {
    return request({
      url: '/coach/getTeachingPlanList',
      methods: 'POST',
      params: data
    })
  },
  //POST /coach/findList 05-01-我的球员列表
  getfindList({ commit }, data) {
    return request({
      url: '/coach/findList',
      methods: 'POST',
      params: data
    })
  },
  // /course/getTeachingList 05-1-教练端-我的课程
  getTeachingList({ commit }, data) {
    return request({
      url: '/course/getTeachingList',
      methods: 'POST',
      params: data
    })
  },
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
