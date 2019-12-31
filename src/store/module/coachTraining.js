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
    // 获取线上列表
    fetchOnlineList({commit}, data) {
        return request({
            url: '/course/getTrainShowList',
            methods: 'POST',
            params: data
        })
    },

    // 获取线下列表
    fetchUnderList({commit}, data) {
        return request({
            url: '/course/getTrainInfoList',
            methods: 'POST',
            params: data
        })
    },

    // 获取教案详情
    fetchTrainingDetail({commit}, data) {
        return request({
            url: '/course/get',
            methods: 'POST',
            params: data
        })
    },

    // 获取球员列表
    fetchPlayerList({commit}, data) {
        return request({
            url: '/coach/findList',
            methods: 'POST',
            params: data
        })
    },

    // 获取球队列表
    fetchTeamList({commit}, data) {
        return request({
            url: '/team/getList',
            methods: 'POST',
            params: data
        })
    },

    // 获取课程列表
    fetchCourseList({commit}, data) {
        return request({
            url: '/course/getTeachingList',
            methods: 'POST',
            params: data
        })
    },

    // 删除球员
    deletePlayer({commit}, data) {
        return request({
            url: '/mechanism/delListQY',
            methods: 'POST',
            params: data
        })
    },

    // 删除球队
    deleteTeam({commit}, data) {
        return request({
            url: '/team/delete',
            methods: 'POST',
            params: data
        })
    },
    // 删除球队
    teameditPlayer({commit}, data) {
        return request({
            url: '/team/editPlayer',
            methods: 'POST',
            params: data
        })
    },

    // 上传装备文件
    upLoadApply({commit}, data) {
        return request({
            url: '/coach/addApply',
            methods: 'POST',
            params: data
        })
    },

    // 已购课程图片
    fetchCoursePic({commit}, data) {
        return request({
            url: '/player/getMyCourse',
            methods: 'POST',
            params: data
        })
    },

    // 添加球队
    addTeam({commit}, data) {
        return request({
            url: '/team/add',
            methods: 'POST',
            params: data
        })
    },

    // 获取球队分组下拉框
    fetchSelectList({commit}, data) {
        return request({
            url: '/sysDictType/getTypeList',
            methods: 'POST',
            params: data
        })
    },

    // 获取审核列表
    fetchExamineList({commit}, data) {
        return request({
            url: '/mechanism/typeListQY',
            methods: 'POST',
            params: data
        })
    },

    // 教练审核通过
    onExaminepass({commit}, data) {
        return request({
            url: '/mechanism/updateTypeJL',
            methods: 'POST',
            params: data
        })
    },

    // 教练删除审核记录
    onExamineDelete({commit}, data) {
        return request({
            url: '/mechanism/delListJL',
            methods: 'POST',
            params: data
        })
    },

    // 分组移除球员
    removePlayerfromGroup({commit}, data) {
        return request({
            url: '/sysDictType/removePlayer',
            methods: 'POST',
            params: data
        })
    },

    // 新建分组
    addGroup({commit}, data) {
        return request({
            url: '/sysDictType/addFZ',
            methods: 'POST',
            params: data
        })
    },

    // 获取球员detail
    getPlayerDetail({commit}, data) {
        return request({
            url: '/player/getInfo',
            methods: 'POST',
            params: data
        })
    },

    // 编辑球员资料
    editPlayerInfo({commit}, data) {
        return request({
            url: '/player/editInfo',
            methods: 'POST',
            params: data
        })
    },

    // 我的资料
    fetchMydate({commit}, data) {
        return request({
            url: '/coach/getMyInfo',
            methods: 'POST',
            params: data
        })
    },

    // 新增课程
    addKeCheng({commit}, data) {
        return request({
            url: '/course/addTeaching',
            methods: 'POST',
            params: data
        })
    },
    // 新增课程
    EditKeCheng({commit}, data) {
        return request({
            url: '/course/editTeaching',
            methods: 'POST',
            params: data
        })
    },

    // 获取课程
    getKeCheng({commit}, data) {
        return request({
            url: '/course/get',
            methods: 'POST',
            params: data
        })
    },

    // 移除课程
    removeKeCheng({commit}, data) {
        return request({
            url: '/course/delTeaching',
            methods: 'POST',
            params: data
        })
    },

    // 考勤列表
    getKaoQinList({commit}, data) {
        return request({
            url: '/checkWork/getList',
            methods: 'POST',
            params: data
        })
    },

    // 缺勤考勤操作
    doKaoQin({commit}, data) {
        return request({
            url: '/checkWork/add',
            methods: 'POST',
            params: data
        })
    },

    // 获取排课
    getPaike({commit}, data) {
        return request({
            url: '/coach/findCoachTimeList',
            methods: 'POST',
            params: data
        })
    },

    // 新增排课
    addPaike({commit}, data) {
        return request({
            url: '/coach/addCoachTime',
            methods: 'POST',
            params: data
        })
    },

    //获取建议列表
    coachSuggestions({commit}, data) {
        return request({
            url: '/coachSuggestions/getList',
            methods: 'POST',
            params: data
        })
    },
    //伤病增加
    woundLogsadd({commit}, data) {
        return request({
            url: '/woundLogs/add',
            methods: 'POST',
            params: data
        })
    },

    //伤病编辑
    woundLogsedit({commit}, data) {
        return request({
            url: '/woundLogs/edit',
            methods: 'POST',
            params: data
        })
    },

    //伤病获取
    woundLogsget({commit}, data) {
        return request({
            url: '/woundLogs/get',
            methods: 'POST',
            params: data
        })
    },

    //查询历史
    woundLogsgetList({commit}, data) {
        return request({
            url: '/woundLogs/getList',
            methods: 'POST',
            params: data
        })
    },
    //教练建议新增
    coachSuggestionsadd({commit}, data) {
        return request({
            url: '/coachSuggestions/add',
            methods: 'POST',
            params: data
        })
    },


    //教练建议编辑
    coachSuggestionsedit({commit}, data) {
        return request({
            url: '/coachSuggestions/edit',
            methods: 'POST',
            params: data
        })
    },

    //教练建议查询详情
    coachSuggestionsget({commit}, data) {
        return request({
            url: '/coachSuggestions/get',
            methods: 'POST',
            params: data
        })
    },

    //教练建议列表
    coachSuggestionsgetList({commit}, data) {
        return request({
            url: '/coachSuggestions/getList',
            methods: 'POST',
            params: data
        })
    },

    //评分列表
    abilitygetList({commit}, data) {
        return request({
            url: '/ability/getList',
            methods: 'POST',
            params: data
        })
    },

    //评分新增
    abilityaddScore({commit}, data) {
        return request({
            url: '/ability/addScore',
            methods: 'POST',
            params: data
        })
    },
    //编辑教练信息
    coacheditMyInfo({commit}, data) {
        return request({
            url: '/coach/editMyInfo',
            methods: 'POST',
            params: data
        })
    },
    //获取
    coachget({commit}, data) {
        return request({
            url: '/coach/get',
            methods: 'POST',
            params: data
        })
    },
    //新增履历
    resumeadd({commit}, data) {
        return request({
            url: '/resume/add',
            methods: 'POST',
            params: data
        })
    },
    //编辑履历
    resumeedit({commit}, data) {
        return request({
            url: '/resume/edit',
            methods: 'POST',
            params: data
        })
    },    //获取履历列表
    resumegetList({commit}, data) {
        return request({
            url: '/resume/getList',
            methods: 'POST',
            params: data
        })
    },
    // 获取教案
    getTeachingPlanList({commit}, data) {
        return request({
            url: '/coach/getTeachingPlanList',
            methods: 'POST',
            params: data
        })
    },
    // 获取球队详情
    teamgetTeamPlayerList({commit}, data) {
        return request({
            url: '/team/getTeamPlayerList',
            methods: 'POST',
            params: data
        })
    },
    // 球队添加球员
    teamaddPlayer({commit}, data) {
        return request({
            url: '/team/addPlayer',
            methods: 'POST',
            params: data
        })
    },
    // 判断课程是否已购买
    ordersfindPay({commit}, data) {
        return request({
            url: '/orders/findPay',
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
