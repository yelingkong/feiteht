<template>
    <div>
        <div class="headersearchr">
            <el-input :placeholder="$t('header.searchp')" v-model="keyword" class="input-with-select">
                <el-select v-model="type" slot="prepend" :placeholder="$t('header.select')">
                    <el-option :label="$t('header.Store')" value="1"></el-option>
                    <el-option :label="$t('header.Tag')" value="2"></el-option>
                    <el-option :label="$t('header.Case')" value="3"></el-option>
                </el-select>
                <el-button @click="search" slot="append" icon="el-icon-search"></el-button>
            </el-input>
        </div>
    </div>
</template>

<script>
    import {mapState, mapActions, mapMutations} from 'vuex'
    import {logout} from '../../api/api/reg'
    import {baseImgPath, basefile} from '@/config/env.js';
    import {informationgetList} from "../../api/api/information";
    import {termsadd} from "../../api/api/terms";
    import {trimStr} from "../../utils/utils";

    export default {
        components: {},
        data() {
            return {
                lang: '中文',
                keyword: '',
                type: '1',
                navBarFixed: false,
                isLogin: false,
                noticelist: [],
                userInfo: JSON.parse(localStorage.getItem('userInfo')) ? JSON.parse(localStorage.getItem('userInfo')) : 0,
            };
        },
        destroyed() {
            window.removeEventListener('scroll', this.watchScroll)
        },
        methods: {
            search() {
                var content = trimStr(this.keyword);
                // if (content == '') {
                //     return
                // }
                this.termsadd()
                this.gosearch(content)
            },
            gosearch(content) {
                this.$router.push({
                    path: '/search',
                    query: {
                        type: this.type,
                        keyword: content,
                    }
                })

            },
            termsadd() {
                var that = this;
                var content = trimStr(this.keyword);
                termsadd({
                    "content": content,
                }).then(res => {
                    const {code} = res
                    if (code === 200) {

                    }
                })
            },
        },
        filters: {
            filtersImg: function (img) {
                return basefile + img
            },
        },
        created() {

        },
        // watch: {
        //     $route(to, from) {
        //         this.nikename = sessionStorage.getItem('nikename') ? sessionStorage.getItem('nikename') : 0
        //         this.headPic = sessionStorage.getItem('headPic') ? sessionStorage.getItem('headPic') : 0
        //     }
        // }
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
