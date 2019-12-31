<template>
    <div>
        <!--        <div class="nav">-->
        <!--            <router-link to="/" v-t="'nav.home'">首页</router-link>-->
        <!--            <router-link :to="{path:'/search',query: {type: 1}}" v-for="(item,index) in list" :key="index">-->
        <!--                {{$i18n.locale=='zh'?item.name:item.remark}}-->
        <!--            </router-link>-->
        <!--            <router-link :to="{path:'/search',query: {type: 1}}" v-t="'nav.more'">更多</router-link>-->
        <!--        </div>-->
        <div class="nav" @mouseleave="tabTogglenav(false)">
            <div class="navs" @mouseover="tabTogglenav(true)">
                <router-link to="/" v-t="'nav.home'">首页</router-link>
                <div class="nav-item" v-for='(items,index) in list'
                     @mouseover="tabToggle(index)">
                    <router-link
                            :to="{path:'/search',query: {type: 1,industryid:items.id,active:items.id,index:index}}">
                        {{$i18n.locale=='zh'?items.name:items.remark}}
                    </router-link>
                    <ul class="dropdownWrapper" v-if="index == nowIndex && isnav && items.list.length>0">
                        <li v-for='(item, index2) in items.list'>
                            <router-link
                                    :to="{path:'/search',query: {type: 1,industryid:item.id,active:items.id,index:index}}">
                                {{$i18n.locale=='zh'?item.name:item.remark}}
                            </router-link>
                        </li>
                    </ul>
                </div>
                <router-link :to="{path:'/search',query: {type: 1}}" v-t="'nav.more'">更多</router-link>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState, mapActions, mapMutations} from 'vuex'
    import {industrygetlist} from '../../api/api/industry'
    import ResetPassWord from './ResetPassWord.vue'
    import {baseImgPath, basefile} from '@/config/env.js';

    let that
    export default {
        components: {ResetPassWord},
        beforeCreate() {
            that = this
        },
        data() {
            return {
                userData: [],
                activeindex: 0,
                logo: '',
                list: [],
                menulist: [],
                isnav: false,
                isLogin: false,
                nowIndex: -1,
                dropdownActive: false,
                data: {
                    "pageNum": 1,
                    "pageSize": 9999999
                }
            };
        },

        computed: {},
        mounted() {
            this.industrygetlist();
        },

        methods: {
            toLink(link) {
                this.$router.push(link)
            },

            gohome() {
                this.$router.push('/')
            },
            activeIndex(index) {
                this.activeindex = index
            },
            industrygetlist() {
                industrygetlist(this.data).then(res => {
                    const {code} = res
                    if (code === 200) {
                        that.list = res.data.list
                    }
                })
            },
            dropdown: function () {
                console.log(event.target.getAttribute('class'))
                if (event.target.getAttribute('class') === 'dropdownBtn') {
                    this.dropdownActive = !this.dropdownActive;
                }
            },
            tabTogglenav(e) {
                this.isnav = e
            },
            tabToggle: function (index) {
                console.log(index)
                this.nowIndex = index;
                if (index === 0) {
                    return
                } else {
                    this.dropdownActive = false;
                }
            },
            gettoken() {
                var that = this;
                if (JSON.parse(localStorage.getItem("userInfo")).token) {
                    that.isLogin = true
                } else {
                    that.isLogin = false
                }
            },
        },
        filters: {
            filtersImg: function (img) {
                return basefile + img
            },
        },
        created() {
// 底部配置
            // this.getMenu()
        },
        watch: {
            $route(to, from) {
                this.nikename = sessionStorage.getItem('nikename') ? sessionStorage.getItem('nikename') : 0
                this.headPic = sessionStorage.getItem('headPic') ? sessionStorage.getItem('headPic') : 0
            }
        }
    };
</script>

<style lang="less" scoped>
    .dropdownWrapper {
        width: 1100px;
        position: absolute;
        left: 0;
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        flex-wrap: wrap;
        flex-direction: row;
        background: #f7f8ff;
        min-height: 65px;
        padding-top: 20px;
        padding-bottom: 20px;
        top: 50px;

        li {
        }
    }

    .navs {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: nowrap;
        flex-direction: row;
        width: 1100px;
        position: relative;
    }

    .nav {
        width: 100%;
        height: 65px;
        background: rgba(247, 248, 255, 1.00);
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: nowrap;
        flex-direction: row;
        min-width: 1100px;

        a {

            display: flex;
            justify-content: center;
            align-items: center;
            flex-wrap: nowrap;
            flex-direction: row;
            padding: 10px 20px;
            font-size: 16px;
            font-family: PingFang SC;
            font-weight: 500;
            color: rgba(48, 48, 48, 1);
            transition-property: width; /*all:表示所有属性*/ /* 过渡属性,必须设置过渡时间才会生效 */
            transition-duration: 0.3s; /* 过渡持续时间 */
            transition-timing-function: ease-out; /* 动画变幻速度 ease:减速(默认)  linear:匀速  ease-in:加速 ease-out:减速  ease-in-out:先加速后减速 */
            transition-delay: 0.3s; /* 动画延迟 */
            transition: all 0.3s ease-in-out 0s; /* 常用的简写方式 */
            margin: 0 10px;
        }

        a:hover {
            background: rgba(29, 26, 113, 1);
            border-radius: 6px;
            color: #fff;

        }

        a.router-link-active {
            background: rgba(29, 26, 113, 1);
            border-radius: 6px;
            color: #fff;
        }
    }
</style>
