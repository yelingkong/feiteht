import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/components/login'
import index from '@/components/index'

import HelloIndex from '@/components/HelloIndex'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/login',
    name: 'login',
    component: Login
  },
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/index',
      name: 'index',
      component: index,
      children: [
        {
          path: "",
          name: 'HelloIndex',
          component: HelloIndex
        },
        //账号管理
        {
          path: "/accountManage",
          name: 'accountManage',
          component: () =>
            import ("../views/admin/accountManage"),
          meta: ['账号管理', '管理员列表'],
        },
        //角色管理
        {
          path: "/RoleList",
          name: 'RoleList',
          component: () =>
            import ("../views/role/RoleList"),
          meta: ['角色管理', '角色列表'],
        },
        {
          path: "/termsList",
          name: 'termsList',
          component: () =>
            import ("../views/terms/termsList"),
          meta: ['热词管理'],
        },
        {
          path: "/storeAudit",
          name: 'storeAudit',
          component: () =>
            import ("../views/storeAudit/storeAudit"),
          meta: ['商家审核'],
        },
        {
          path: "/activationCode",
          name: 'activationCode',
          component: () =>
            import ("../views/activationCode/activationCode"),
          meta: ['激活码'],
        },

        {
          path: "/taskOrder",
          name: 'taskOrder',
          component: () =>
            import ('../views/order/taskOrder'),
          meta: ['订单管理', '任务订单'],
        },
        {
          path: "/message",
          name: 'message',
          component: () =>
            import ('../index'),
          meta: ['消息中心', '消息中心'],
        },
        {
          path: "/arbitrationOrder",
          name: 'taskOrder',
          component: () =>
            import ('../views/order/arbitrationOrder'),
          meta: ['订单管理', '仲裁订单'],
        },
        {
          path: "/withdrawOrder",
          name: 'withdrawOrder',
          component: () =>
            import ('../views/order/withdrawOrder'),
          meta: ['订单管理', '提现订单'],
        },
        {
          path: "/memberOrder",
          name: 'taskOrder',
          component: () =>
            import ('../views/order/memberOrder'),
          meta: ['订单管理', '会员订单'],
        },
        {
          path: "/setData",
          name: 'setData',
          component: () =>
            import ('../views/baseData/setData'),
          meta: ['参数设置', '百分比设置'],
        },
        //公告信息列表
        {
          path: "/infoList",
          name: 'infoList',
          component: () =>
            import ("../views/information/infoList"),
          meta: ['公告信息', '公告信息列表'],
        },
        //行业
        {
          path: "/industryList",
          name: 'industryList',
          component: () =>
            import ("../views/industry/industryList"),
          meta: ['行业管理', '行业管理'],
        },
        //教程
        {
          path: "/courseList",
          name: 'infoList',
          component: () =>
            import ("../views/course/courseList"),
          meta: ['教程管理', '教程列表'],
        },
        {
          path: "/member",
          name: 'member',
          component: () =>
            import ("../views/member/member"),
          meta: ['会员管理', '会员管理'],
        },
        //广告图
        {
          path: "/bannerList",
          name: 'bannerList',
          component: () =>
            import ("../views/banner/bannerList"),
          meta: ['广告图', 'banner列表'],
        },
        // 用户管理
        {
          path: "/userList",
          name: 'userList',
          component: () =>
            import ("../views/user/userList"),
          meta: ['用户管理', '用户列表'],
        },
        {
          path: "/storeList",
          name: 'storeList',
          component: () =>
            import ("../views/user/storeList"),
          meta: ['用户管理', '商家列表'],
        },
        {
          path: "/userCount",
          name: 'userCount',
          // component: userCount,
          component: () =>
            import ("../views/user/userCount"),
          meta: ['统计查询'],
        },
      ]
    },
  ]
})
