import request from '../../api/actions'

const state = {
  userStatus: null
}

const getters = {}

const mutations = {

}

const actions = {
  // 获取赛事列表
  fetchList ( { commit }, data) {
    return request ({
      url: '/match/getList',
      methods: 'POST',
      params: data
    })
  },

  // 获取赛事详情
  getDetail ( { commit }, data) {
    return request ({
      url: '/match/get',
      methods: 'POST',
      params: data
    })
  },

  // 赛事报名
  matchSignUp ( { commit }, data) {
    return request ({
      url: '/match/signUp',
      methods: 'POST',
      params: data
    })
  },

    // 查看参赛队伍
    fetchMatchTeam ( { commit }, data) {
      return request ({
        url: '/match/getRanksList',
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