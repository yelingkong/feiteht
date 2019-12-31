import request from '../../api/actions'

const state = {
  userStatus: null
}

const getters = {}

const mutations = {

}

const actions = {
  // 获取所有教案
  fetchCourseList ({ commit }, data) {
    return request ({
      url: '/teachingPlan/getTeachingPlanList',
      methods: 'POST',
      params: data
    })
  },

  // 获取教案详情
  fetchCourseDetail ({ commit }, data) {
    return request ({
      url: '/teachingPlan/get',
      methods: 'POST',
      params: data
    })
  },

  // 添加教案
  addCourse ({ commit }, data) {
    return request ({
      url: '/teachingPlan/add',
      methods: 'POST',
      params: data
    })
  },

  // 修改
  editCourse ({ commit }, data) {
    return request ({
      url: '/teachingPlan/edit',
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