import Vue from 'vue'
import Vuex from 'vuex'
import Login from './store/module/Login'
import myCourse from './store/module/myCourse'
import coachTraining from './store/module/coachTraining'
import myDate from './store/module/myDate'
import eventInformation from './store/module/eventInformation'
import ScheduleCard from './store/module/ScheduleCard'
import organ from './store/module/organ'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {

  },
  mutations: {

  },
  actions: {

  },
  modules: {
    Login,
    myCourse,
    coachTraining,
    myDate,
    eventInformation,
    ScheduleCard,
    organ
  }
})
