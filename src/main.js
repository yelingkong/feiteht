import Vue from 'vue'
import App from './App.vue'
import { MessageBox, Row, Col, Button, Input, Loading, Dialog } from 'element-ui'
import Avatar from './components/avatar.vue'
import router from './router/index'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Moment from 'moment'
import './global.less'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import echarts from 'echarts'
import VueI18n from 'vue-i18n'
import tim from 'tim'
import TIM from 'tim-js-sdk'
import './assets/icon/iconfont.css'
import './assets/icon/tim.css'
import Index from './index.vue'
import store from './store/index'
import Utils from "./utils";

Vue.use(VueI18n)
Vue.use(Utils)

import LightTimeline from 'vue-light-timeline';
Vue.use(LightTimeline);



import {en} from './assets/lang/en.js'
import {zh} from './assets/lang/zh.js'

const messages = {
    zh,
    en
}
window.tim = tim
window.TIM = TIM
import apiConfig from '../config/api.config'
window.store = store
Vue.prototype.$bus = new Vue() // event Bus 用于无关系组件间的通信。
Vue.prototype.tim = tim
Vue.prototype.TIM = TIM
Vue.prototype.$store = store
Vue.prototype.$confirm = MessageBox.confirm
Vue.use(Button)
Vue.use(Row)
Vue.use(Col)
Vue.use(Input)
Vue.use(Loading)
Vue.use(Dialog)
Vue.component('avatar', Avatar)
const i18n = new VueI18n({
    locale: 'zh',
    messages
})


Vue.use(VueAwesomeSwiper)

Vue.use(ElementUI);
Vue.config.productionTip = false

Vue.prototype.Moment = Moment
Vue.prototype.$echarts = echarts

new Vue({
    router,
    store,
    i18n,
    render: h => h(App)
}).$mount('#app')
