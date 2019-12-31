<template>
    <div>
        <div class="headern">
            <div id="headern" class="header2">
                <div class="headernl">
                    <img width="16" height="16" src="../../assets/icon_laba.png" alt="">
                    <el-carousel class="homeheadnotice" style="width: 500px" height="18px" direction="vertical"
                                 :autoplay="true">
                        <el-carousel-item style="width: 500px" v-for="(item,index) in noticelist" :key="index">
                            <p style="cursor: pointer" @click="gonoticedetail(item.id)">{{item.title}}</p>
                        </el-carousel-item>
                    </el-carousel>
                </div>
                <div class="headernr">
<!--                    {{ShowLogin}}-->
                    <div v-if="userInfo" class="loginneed">
                        <!--                        {{userInfo}}-->
                        <span style="display: none">{{userInfo}}</span>
                        <el-dropdown @command="handleCommand">
                            <span @click.stop="gouserhome">{{userInfo.nickName}}</span>
                            <i class="el-icon-arrow-down down"></i>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item command="a" v-t="'header.bench'"></el-dropdown-item>
                                <el-dropdown-item v-if="userInfo.type==0" command="f"
                                                  v-t="'header.myhome'"></el-dropdown-item>
                                <el-dropdown-item v-if="userInfo.type==0" command="b"
                                                  v-t="'header.jhsj'"></el-dropdown-item>
                                <el-dropdown-item v-if="userInfo.type==1" command="e"
                                                  v-t="'header.myhome'"></el-dropdown-item>
                                <el-dropdown-item v-if="userInfo.type==1" command="d"
                                                  v-t="'header.wdim'"></el-dropdown-item>
                                <el-dropdown-item command="c" v-t="'header.logout'"></el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </div>
                    <div class="loginneed" v-else>
                        <span v-t="'header.login'" @click="login">登录</span>
                        <div class="line"></div>
                        <router-link to="/reg/reg" v-t="'header.Register'">注册</router-link>
                    </div>
                    <div class="phone">
                        <img width="14" src="../../assets/icon_shouji.png" alt="">
                        <a v-t="'header.mobile'">手机版</a>
                    </div>
                    <el-dropdown @command="getlang">
                        <div class="lang">
                            <span>{{lang}}</span>
                            <img src="../../assets/icon_xl.png" alt="">
                        </div>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="zh" v-t="'header.zh'"></el-dropdown-item>
                            <el-dropdown-item command="en" v-t="'header.en'"></el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </div>
        </div>
        <div class="headern2" :class="{ show:navBarFixed }"></div>
        <div class="headersearchbg" v-if="path!='/im'" :class="{ navBarWrap:navBarFixed  }">
            <div class="headersearch">
                <div class="headersearchl">
                    <div class="share1">
                        <span class="icon iconfont icon-Facebook"></span>
                    </div>
                    <div class="share1">
                        <span class="icon iconfont icon-twitter"></span>
                    </div>
                    <div class="share1">
                        <span class="icon iconfont icon-instagram"></span>
                    </div>
                </div>
                <router-link to="/"><img width="230" src="../../assets/icon_logo.png" alt=""></router-link>
                <topsearch></topsearch>
            </div>
        </div>
        <el-dialog
                :visible.sync="ShowLogin"
                width="90%"
                class="logindialog"
                :show-close="false"
                :close-on-click-modal="false"
                center>
            <i @click="closelogin" class="close icon iconfont icon-Closewithcircle"></i>
            <login @closelogin="getcloselogin"></login>
        </el-dialog>
        <div class="msg" @click="goim" v-if="totalUnreadCount !== 0">

            <!--            <span>{{totalUnreadCount}}</span>-->
            <!--            <sup class="unread">-->
            <!--                <template v-if="totalUnreadCount > 99">99+</template>-->
            <!--                <template v-else>{{totalUnreadCount}}</template>-->
            <!--            </sup>-->
            <el-badge :value="totalUnreadCount" class="item">
                <img src="../../assets/xiaoxi.png" class="xiaoxi" alt="">
            </el-badge>
        </div>
        <imlogin v-show="path=='/im'" v-if="userInfo"></imlogin>
    </div>
</template>

<script>
    import {mapState, mapActions, mapMutations, mapGetters} from 'vuex'
    import {logout} from '../../api/api/reg'
    import login from '../login.vue'
    import topsearch from './search.vue'
    import imlogin from '../../index'
    import {baseImgPath, basefile} from '@/config/env.js';
    import {informationgetList} from "../../api/api/information";

    export default {
        components: {login, topsearch, imlogin},
        data() {
            return {
                lang: '中文',
                keyword: '',
                select: '',
                path: '',
                navBarFixed: false,
                isLogin: false,
                noticelist: [],
                userInfo: JSON.parse(localStorage.getItem('userInfo')) ? JSON.parse(localStorage.getItem('userInfo')) : 0,
            };
        },
        destroyed() {
            window.removeEventListener('scroll', this.watchScroll)
        },
        computed: {
            ...mapGetters(['totalUnreadCount','ShowLogin']),
        },
        methods: {
            goim() {
                this.$router.push({
                    path: '/im'
                })
            },
            getcloselogin() {
                this.closelogin();
                this.userInfo = JSON.parse(localStorage.getItem('userInfo')) ? JSON.parse(localStorage.getItem('userInfo')) : 0;
            },
            watchScroll() {
                var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
                //  当滚动超过 50 时，实现吸顶效果
                if (scrollTop > 83) {
                    this.navBarFixed = true
                } else {
                    this.navBarFixed = false
                }
            },
            handleCommand(e) {
                if (e == 'a') {
                    this.gouserhome()
                }
                if (e == 'b') {
                    this.$router.push({
                        path: '/shop/active',
                    })
                }
                if (e == 'd') {
                    this.$router.push({
                        path: '/im',
                    })
                }
                if (e == 'e') {
                    this.$router.push({
                        path: '/shop/index',
                    })
                }
                if (e == 'c') {
                    this.logout()
                }
                if (e == 'f') {
                    this.$router.push({
                        path: '/shop/home',
                    })

                }
            },
            getlang2() {
                var lang = localStorage.getItem('locale') ? localStorage.getItem('locale') : 'zh';
                this.$i18n.locale = lang;
                if (this.$i18n.locale == 'zh') {
                    this.lang = '中文'
                } else {
                    this.lang = 'English'
                }
            },
            gonoticedetail(id) {
                this.$router.push({
                    path: '/notice/detail',
                    query: {
                        id: id
                    }
                })
            },
            getlang(e) {
                console.log(e);
                this.$i18n.locale = e;
                localStorage.setItem('locale', e);
                if (this.$i18n.locale == 'zh') {
                    this.lang = '中文'
                } else {
                    this.lang = 'English'
                }
            },
            toLink(link) {
                this.$router.push(link)
            },
            login() {
                this.$store.commit('toggleisShowLogin', true)
            },
            gouserhome() {
                this.$router.push('/bench/user')
            },

            gohome() {
                this.$router.push('/')
            },
            activeIndex(index) {
                this.activeindex = index
            },
            onResetPassWord() {
                console.log(123123)
                this.resetPassWordDialog = true
            },
            closelogin() {
                this.$store.commit('toggleisShowLogin', false)
            },
            informationgetList() {
                var that = this;
                informationgetList({
                    "pageNum": 1,
                    "pageSize": 9999
                }).then(res => {
                    const {code} = res
                    if (code === 200) {
                        that.noticelist = res.data.list;
                    }
                })
            },
            logout() {
                this.$confirm('是否退出登录?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    logout().then(res => {
                        if (res.code === 200) {
                            localStorage.removeItem('userInfo')
                            this.userInfo = 0
                            this.$router.push('/')
                            this.$store.commit('toggleLogin', false)
                            this.$store.commit('toggleIsLogin', false)
                        }
                    })

                })

            }
        },
        filters: {
            filtersImg: function (img) {
                return basefile + img
            },
        },
        mounted() {
            this.show = true;
            this.getlang2();
            this.informationgetList();
            console.log(JSON.parse(localStorage.getItem('userInfo')));
            window.addEventListener('scroll', this.watchScroll)
        },
        created() {

        },
        watch: {
            $route(to, from) {
                this.path = to.path;
            },
            // isShowLogin(to) {
            //     this.showLogin = to
            // },
        },
    };
</script>
<style lang="less">
    .homeheadnotice {
        .el-carousel__button {
            display: none !important;
        }
    }

    .headersearchr {
        width: 300px !important;

        .el-input-group__prepend {
            width: 30% !important;
        }

        .el-input-group__append, .el-input-group__prepend {
            background: none !important;

            border: none !important;
        }

        .el-input__inner {
            background: none !important;
            border: none !important;
        }
    }

    .navBarWrap {
        position: fixed;
        top: 0;
        z-index: 999;

        .headersearch {
            height: 100px !important;
        }
    }

    .logindialog {
        .el-dialog {
            width: 1000px !important;
        }

        .el-dialog__header {
            display: none !important;

        }

        .el-dialog__body {
            padding: 0 !important;
            position: relative;
        }

        i.close {
            position: absolute;
            top: -15px;
            right: -15px;
            font-size: 30px;
            background: #fff;
            width: 24px;
            height: 24px;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-wrap: nowrap;
            flex-direction: row;
            cursor: pointer;
        }
    }
</style>
<style lang="less" scoped>
    .msg {
        width: 60px;
        height: 60px;
        position: fixed;
        right: 30px;
        bottom: 50px;
        background: #fff;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: nowrap;
        flex-direction: row;
        cursor: pointer;

        img {
            width: 30px;
        }
    }

    .down {
        color: #fff;
        margin-left: 10px;
    }

    .headern {
        width: 100%;
        height: 60px;
        background: rgba(29, 26, 113, 1);
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: nowrap;
        flex-direction: row;

        .header2 {
            width: 1100px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: nowrap;
            flex-direction: row;
            min-width: 1100px;

            .headernr {
                display: flex;
                justify-content: flex-end;
                align-items: center;
                flex-wrap: nowrap;
                flex-direction: row;

                span, a {
                    font-size: 14px;
                    font-family: PingFang SC;
                    font-weight: 500;
                    color: rgba(255, 255, 255, 1);
                    cursor: pointer;
                }

                .lang {
                    padding-left: 20px;
                    padding-right: 20px;
                    height: 35px;
                    background: rgba(242, 202, 30, 1);
                    border-radius: 6px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    flex-wrap: nowrap;
                    flex-direction: row;
                    cursor: pointer;

                    span {
                        font-size: 14px;
                        font-family: PingFang SC;
                        font-weight: 500;
                        color: rgba(29, 26, 113, 1);
                        margin-right: 10px;
                    }
                }

                .line {
                    width: 1px;
                    height: 20px;
                    background: rgba(255, 255, 255, 1);
                    opacity: 0.6;
                    margin-left: 20px;
                    margin-right: 20px;
                }

                .phone {
                    margin-left: 50px;
                    margin-right: 60px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    flex-wrap: nowrap;
                    flex-direction: row;

                    img {
                        margin-right: 10px;
                    }

                }
            }

            .headernl {
                font-size: 14px;
                font-family: PingFang SC;
                font-weight: 500;
                color: rgba(255, 255, 255, 1);
                display: flex;
                justify-content: flex-start;
                align-items: center;
                flex-wrap: nowrap;
                flex-direction: row;

                img {
                    margin-right: 20px;
                }
            }
        }
    }

    .headersearch {
        width: 1100px;
        margin: auto;
        height: 150px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: nowrap;
        flex-direction: row;

        .headersearchl {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            flex-wrap: nowrap;
            flex-direction: row;

            .share1 {
                width: 40px;
                height: 40px;
                display: flex;
                justify-content: center;
                align-items: center;
                flex-wrap: nowrap;
                flex-direction: row;
                background: rgba(245, 246, 248, 1.00);
                margin-right: 10px;
                cursor: pointer;
                transition-property: width; /*all:表示所有属性*/ /* 过渡属性,必须设置过渡时间才会生效 */
                transition-duration: 0.3s; /* 过渡持续时间 */
                transition-timing-function: ease-out; /* 动画变幻速度 ease:减速(默认)  linear:匀速  ease-in:加速 ease-out:减速  ease-in-out:先加速后减速 */
                transition-delay: 0.3s; /* 动画延迟 */
                transition: all 0.3s ease-in-out 0s; /* 常用的简写方式 */
                border-radius: 3px;

                span {
                    color: #BBBBBB;
                    font-size: 24px;
                }
            }

            .share1:hover {
                background: rgba(29, 27, 113, 1.00);

                span {
                    color: #fff;
                }
            }
        }

    }

    .headersearchbg {
        width: 100%;
        background: rgba(255, 255, 255, 1.00);
    }

    .headersearchr {
        width: 254px;
        height: 50px;
        background: rgba(245, 246, 248, 1.00);
        border-radius: 6px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: nowrap;
        flex-direction: row;

        input {
            border: none;
            height: 50px;
            line-height: 50px;
            background: none;
            outline: none;
            font-size: 14px;
            text-indent: 1em;
            width: 200px;
        }

        img {
            width: 15px;
            height: 15px;
        }
    }

    .headern2 {
        height: 150px;
        display: none;
    }

    .headern2.show {
        display: block;
    }

    .loginneed {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        flex-wrap: nowrap;
        flex-direction: row;
    }

    .logout {
        cursor: pointer;
    }
</style>
