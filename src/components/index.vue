<template>
    <div class="container">
        <router-view></router-view>
<!--        <div class="headTop">-->
<!--            <el-row>-->
<!--                <el-col :span="6">-->
<!--                    <div class="title">欢迎来到Freeter后台</div>-->
<!--                </el-col>-->
<!--                <el-col :span="18">-->
<!--                    <div class="header">-->
<!--                        <div class="userInfo">-->
<!--              <span class="img">-->
<!--                <img-->
<!--                        src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1079592840,2327344920&fm=27&gp=0.jpg"-->
<!--                        alt-->
<!--                >-->
<!--              </span>-->
<!--                            <span class="account">欢迎&nbsp;,&nbsp;{{this.account}}</span>-->
<!--                            <el-badge v-if="totalUnreadCount" :value="totalUnreadCount" class="item">-->
<!--                                <el-button @click="gomessage" size="small">消息</el-button>-->
<!--                            </el-badge>-->
<!--                            <el-button v-else @click="gomessage" size="small">消息</el-button>-->
<!--                            <span class="loginOut" @click="loginOut()">退出</span>-->
<!--                        </div>-->
<!--                    </div>-->
<!--                </el-col>-->
<!--            </el-row>-->
<!--        </div>-->

<!--        <el-row>-->
<!--            <el-col :span="4">-->
<!--                <div class="sidebar" :style="{'height':(windowHeight - 60)+'px'}">-->
<!--                    <sideBar></sideBar>-->
<!--                </div>-->
<!--            </el-col>-->
<!--            <el-col :span="20">-->
<!--                <div class="content">-->
<!--                    <breadCrumb></breadCrumb>-->
<!--                    <div class="cont-wrapper" :style="{'height':(windowHeight-124)+'px'}">-->
<!--                        <div class="contInfo">-->
<!--                           -->
<!--                        </div>-->
<!--                    </div>-->
<!--                </div>-->
<!--            </el-col>-->
<!--        </el-row>-->
<!--        <imlogin v-show="false" v-if="userinfo"></imlogin>-->
    </div>
</template>

<script>
    import sideBar from "./common/sidebar.vue";
    import breadCrumb from "./common/breadcrumb.vue";
    import {mapState, mapActions, mapMutations, mapGetters} from 'vuex'
    import imlogin from '../index'

    export default {
        data() {
            return {
                account: "",
                userinfo: sessionStorage.getItem('userinfo') ? sessionStorage.getItem('userinfo') : 0
            };
        },
        created() {
            this.account = sessionStorage.getItem("account");
        },
        computed: {
            windowHeight() {
                return document.documentElement.clientHeight;
            },
            ...mapGetters(['totalUnreadCount', 'ShowLogin']),
        },
        mounted() {
        },
        components: {sideBar, breadCrumb, imlogin},
        methods: {
            //退出
            loginOut() {
                let url = "/user/logout";
                this.httpPost(url, '', res => {
                    if (res.code == 200) {
                        this.$router.push("/login");
                    }
                });
            },
            gomessage() {
                this.$router.push({
                    path: '/message',
                })

            },
        }
    };
</script>

<style lang="scss" scoped>
    .container {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: nowrap;
        flex-direction: row;
        // 顶部
        .headTop {
            position: fixed;
            top: 0;
            left: 0;
            height: 60px;
            width: 100%;
            z-index: 99;

            .title {
                height: 60px;
                padding-left: 20px;
                box-sizing: border-box;
                line-height: 60px;
                width: 100%;
                color: #fff;
                font-size: 24px;
                background: #409eff;
            }

            .header {
                position: relative;
                height: 60px;
                width: 100%;
                background: #409eff;

                .userInfo {
                    height: 60px;
                    width: 300px;
                    position: absolute;
                    top: 0;
                    right: 10px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;

                    .img {
                        display: inline-block;
                        height: 40px;
                        width: 40px;

                        img {
                            height: 100%;
                            border-radius: 50%;
                        }
                    }

                    .account {
                        display: inline-block;
                        color: #fff;
                        max-width: 180px;
                        height: 60px;
                        line-height: 60px;
                        padding: 0 10px;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                    }

                    .loginOut {
                        display: inline-block;
                        color: #fff;
                        width: 40px;
                        height: 60px;
                        line-height: 60px;
                    }
                }
            }
        }

        .sidebar {
            margin-top: 60px;
            width: 100%;
            background-color: rgb(84, 92, 100);
            overflow-y: scroll;
            //取消滚动条
            -ms-overflow-style: none;
            overflow: -moz-scrollbars-none;

            &::-webkit-scrollbar {
                display: none;
            }
        }

        .content {
            margin-top: 60px;
            width: 100%;
            background: #f0f0f0;

            .cont-wrapper {
                background: #fff;
                overflow-y: scroll;
                -ms-overflow-style: none;
                overflow: -moz-scrollbars-none;
                display: flex;
                justify-content: flex-start;
                align-items: flex-start;
                flex-wrap: nowrap;
                flex-direction: row;

                &::-webkit-scrollbar {
                    display: none;
                }

                .contInfo {
                    margin: 10px;
                    background: #fff;
                    height: 96%;
                    display: flex;
                    justify-content: flex-start;
                    align-items: flex-start;
                    flex-wrap: nowrap;
                    flex-direction: row;
                    width: 100%;
                }
            }
        }
    }
</style>
