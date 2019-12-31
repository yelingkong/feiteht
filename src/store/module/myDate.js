import request from '../../api/actions'

const state = {

}

const getters = {}

const mutations = {

}

const actions = {
  // 获取我的资料
  fetchMyDate ({ commit }, data) {
    return request ({
      url: '/coach/getMyInfo',
      methods: 'POST',
      params: data
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}