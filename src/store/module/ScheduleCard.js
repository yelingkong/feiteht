import request from '../../api/actions'

const state = {}

const getters = {}

const mutations = {}

const actions = {
    // 获取课程表
    fetchKechengList({commit}, data) {
        return request({
            url: '/player/classScheduleCard',
            methods: 'POST',
            params: data
        })
    },
    // 获取课程表
    abilitygetList({commit}, data) {
        return request({
            url: '/ability/getList',
            methods: 'POST',
            params: data
        })
    },

    // 我的资料
    fetchMyInfo({commit}, data) {
        return request({
            url: '/player/getInfo',
            methods: 'POST',
            params: data
        })
    },

    // 我的资料第二个
    fetchMyInfo2({commit}, data) {
        return request({
            url: '/player/getData',
            methods: 'POST',
            params: data
        })
    },

    // 我的资料第三个
    fetchMyInfo3({commit}, data) {
        return request({
            url: '/player/myClassSchedule',
            methods: 'POST',
            params: data
        })
    },

    // 我的建议
    suggestions({commit}, data) {
        return request({
            url: '/coachSuggestions/getList',
            methods: 'POST',
            params: data
        })
    },

    // 编辑资料
    editorData({commit}, data) {
        return request({
            url: '/player/editInfo',
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
