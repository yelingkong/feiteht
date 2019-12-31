import request from '../../api/actions'

const state = {
  userStatus: null
}

const getters = {}

const mutations = {
  setLoginStatus(state, data) {
    state.userStatus = data || null
  },

  clearLoginStatus(state, data) {
    state.userStatus = null
    sessionStorage.removeItem('statusId')
    sessionStorage.removeItem('headPic')
    sessionStorage.removeItem('nikename')
    sessionStorage.removeItem('id')
    localStorage.removeItem('userInfo')
  }
}

const actions = {
  logOut({ commit }, data) {
    return request({
      url: '/user/logout',
      methods: 'GET'
    })
  },

  passwordReset({ commit }, data) {
    return request({
      url: '/user/password',
      methods: 'POST',
      params: data
    })
  },

  // 机构入驻
  addJG({ commit }, data) {
    return request({
      url: '/user/addJG',
      methods: 'POST',
      params: data
    })
  },

  // 球员注册
  addQY({ commit }, data) {
    return request({
      url: '/user/addQY',
      methods: 'POST',
      params: data
    })
  },

  // 教练注册
  addJL({ commit }, data) {
    return request({
      url: '/user/addJL',
      methods: 'POST',
      params: data
    })
  },
  // 获取机构列表
  getList({ commit }, data) {
    return request({
      url: '/mechanism/getList',
      methods: 'POST',
      params: data
    })
  },
  // 获取机构下的教练列表
  CoachList({ commit }, data) {
    return request({
      url: '/mechanism/getCoachList',
      methods: 'POST',
      params: data
    })
  },
  // 获取验证码
  getSmS({ commit }, data) {
    return request({
      url: '/user/sendSmS',
      methods: 'POST',
      params: data
    })
  },
  // 获取分组
  getTypeList({ commit }, data) {
    return request({
      url: '/sysDictType/getTypeList',
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
