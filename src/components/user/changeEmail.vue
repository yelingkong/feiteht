<template>
    <div>
        <div class="changephone">
            <el-form ref="form" :model="form" label-width="120px">
                <el-form-item :label="$t('safety.email')">
                    <el-input class="w300" :placeholder="$t('safety.sryxzh')" v-model="data.email"></el-input>
                </el-form-item>
                <el-form-item :label="$t('safety.yzm')">
                    <div class="w300">
                        <el-input :placeholder="$t('safety.sryzm')" v-model="data.valiCode">
                            <span @click="sendcode" v-if="showText && count<=0" class="sendcode cur" slot="append"
                                  v-t="'reg.fsyzm'"></span>
                            <span @click="sendcode" v-else-if="showText" class="sendcode cur" slot="append"
                                  v-t="'reg.fsyzm'"></span>
                            <span v-else-if="!showText" class="sendcode" slot="append"
                            >{{second}} s</span>
                        </el-input>
                    </div>
                </el-form-item>
                <el-form-item :label="$t('safety.newemail')">
                    <el-input class="w300" :placeholder="$t('safety.newemail2')" v-model="data.newemail"></el-input>
                </el-form-item>
                <el-form-item>
                    <div class="queren" @click="binding">
                         {{$t('reset.qr')}}
                    </div>
                </el-form-item>
            </el-form>

        </div>
    </div>
</template>

<script>
    // @ is an alias to /src
    import {baseImgPath, basefile, imgupload} from '@/config/env.js';
    import PlatformCrumb from '../../components/PlatformCrumb2.vue'
    import topnav from '../../components/nav/nav.vue'
    import sidebar from '../../components/bench/sidebar.vue'
    import titleh3 from '../../components/task/titleh3.vue'
    import {assessgetList} from "../../api/api/assess";
    import {binding, usersend} from "../../api/api/reg";

    export default {
        name: 'home',
        data() {
            return {
                successdialog: false,
                form: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: '',
                },
                data: {
                    "newemail": "",
                    "email": "",
                    "type": 2,
                    "valiCode": ""
                },
                show: false,
                interval: '',
                showText: true,
                second: 60,
                count: 0,
                code: '',
            };
        },
        components: {
            PlatformCrumb,
            topnav,
            sidebar,
            titleh3
        },
        mounted() {

        },
        methods: {
            binding() {
                var that = this;
                binding(this.data).then(res => {
                    const {code} = res
                    if (code === 200) {
                        that.$emit('success', true)
                        that.data = {
                            "newemail": "",
                            "email": "",
                            "type": 1,
                            "valiCode": ""
                        }
                    }
                })
            },
            // 发送验证码
            sendcode() {
                var youxiang = /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/;
                if (!youxiang.test(this.data.email)) {
                    this.$message({
                        message: '请输入正确的邮箱',
                        type: 'warning'
                    });
                    return;
                }

                usersend({type: this.data.type, name: this.data.email}).then(res => {
                    if (res.code == 200) {
                        this.getcodedjs();
                        this.$message({
                            message: res.message,
                            type: 'success'
                        });
                    }
                });
            },
            gohome() {
                this.$router.push({
                    path: '/',
                })

            },
            getcodedjs() {
                this.second = 60;
                this.showText = false;
                this.count++;
                this.interval = setInterval(() => {
                    --this.second
                    this.getcodedjs2()
                }, 1000)
            },
            getcodedjs2() {
                if (this.second <= 0) {
                    clearInterval(this.interval)
                    this.showText = true
                }
            },
        },
        filters: {
            filtersImg: function (img) {
                return basefile + img
            },
            filterbq: function (str) {
                str = str.replace(/<[^>]+>|&[^>]+;/g, "").trim();//去掉所有的html标签和&nbsp;之类的特殊符合
                return str;
            }
        },
    };
</script>
<style lang="less">
    .successdialog {
        .el-dialog__header {
            display: none;
        }

        .el-dialog {
            width: 340px !important;
            border-radius: 5px;
            position: relative;

            .icon-Closewithcircle {
                position: absolute;
                right: 10px;
                top: 10px;
                color: #FF3333;
                font-size: 20px;
                cursor: pointer;
            }
        }
    }
</style>
<style lang="less" scoped>
    .delete {
        width: 300px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: nowrap;
        flex-direction: column;
        padding-top: 20px;

        p {
            font-size: 19px;
            font-family: PingFang SC;
            font-weight: bold;
            color: rgba(102, 102, 102, 1);
            line-height: 37px;
            text-align: center;
        }

        img {
            width: 100px;
            height: 100px;
        }

        .deletetitle {
            font-size: 19px;
            font-family: PingFang SC;
            font-weight: bold;
            color: rgba(102, 102, 102, 1);
            line-height: 37px;
        }

        .deletes {
            margin-top: 40px;
            display: flex;
            justify-content: space-around;
            align-items: center;
            flex-wrap: nowrap;
            flex-direction: row;
            padding-left: 20px;
            padding-right: 20px;
            width: 300px;

            .queren {
                width: 102px;
                height: 38px;
                background: rgba(29, 26, 113, 1);
                font-size: 12px;
                font-family: PingFang SC;
                font-weight: 500;
                color: rgba(255, 255, 255, 1);
                line-height: 37px;
                display: flex;
                justify-content: center;
                align-items: center;
                flex-wrap: nowrap;
                flex-direction: row;
                cursor: pointer;
            }

            .quxiao {
                width: 102px;
                height: 38px;
                background: rgba(240, 240, 240, 1);
                font-size: 12px;
                font-family: PingFang SC;
                font-weight: 500;
                color: rgba(102, 102, 102, 1);
                line-height: 37px;
                display: flex;
                justify-content: center;
                align-items: center;
                flex-wrap: nowrap;
                flex-direction: row;
                cursor: pointer;
            }
        }
    }

    .bills {
        height: 130px;
        width: 880px;
        background: #f8f8f8;
        border: 1px solid rgba(233, 233, 233, 1);
        border-top: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: nowrap;
        flex-direction: row;

        .billsitem {
            width: 25%;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-wrap: nowrap;
            flex-direction: column;
            border-right: 1px solid #E9E9E9;

            h4 {
                display: flex;
                justify-content: center;
                align-items: center;
                flex-wrap: nowrap;
                flex-direction: row;
                font-size: 14px;
                font-family: PingFang;
                font-weight: 400;
                color: rgba(153, 153, 153, 1);
                line-height: 37px;
            }

            p {
                font-size: 20px;
                font-family: FZDHTJW;
                font-weight: normal;
                color: rgba(229, 162, 3, 1);
                margin-top: 20px;
                line-height: 30px;

                span {
                    font-size: 12px;
                    font-family: FZDHTJW;
                    font-weight: bold;
                    color: rgba(229, 162, 3, 1);
                }
            }
        }

        .billsitem2 {
            h4 {
                img {
                    margin-right: 5px;
                }
            }

            p {
                font-size: 28px;
                font-family: FZDHTJW;
                font-weight: normal;
                color: rgba(229, 162, 3, 1);
            }
        }

        .billsitem:last-child {
            border: none;
        }

    }

    .searchbill {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-wrap: nowrap;
        flex-direction: row;
        width: 870px;
        margin-top: 20px;
        margin-bottom: 20px;

        p {
            padding-left: 25px;
            font-size: 12px;
            font-family: PingFang;
            font-weight: 400;
            color: rgba(102, 102, 102, 1);
            line-height: 28px;
            margin-right: 10px;

        }

        .line5 {
            width: 20px;
            height: 1px;
            background: #c6c6c6;
            margin-left: 20px;
            margin-right: 20px;
        }
    }

    .searchbut {
        width: 120px;
        height: 40px;
        background: rgba(29, 26, 113, 1);
        border-radius: 2px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: nowrap;
        flex-direction: row;
        font-size: 14px;
        font-family: PingFang;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        line-height: 40px;
        margin-left: 40px;
    }

    .w880 {
        width: 880px;
    }

    .weixin {
        background: #fff;
        width: 257px;
        padding-top: 20px;
        padding-bottom: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: nowrap;
        flex-direction: column;
        margin-left: 60px;

        .bangding {
            width: 257px;
            height: 34px;
            background: rgba(29, 26, 113, 1);
            border: 1px solid rgba(226, 226, 226, 1);
            border-radius: 4px;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-wrap: nowrap;
            flex-direction: row;
            font-size: 11px;
            font-family: PingFang SC;
            font-weight: 500;
            color: rgba(255, 255, 255, 1);
            margin-bottom: 20px;
        }

        .bangding2 {
            background: #F4D01F;
        }

        p {
            font-size: 12px;
            font-family: PingFang SC;
            font-weight: 500;
            color: rgba(102, 102, 102, 1);
            line-height: 37px;
        }
    }

    .weixin2 {
        width: 880px;
        background: #fff;
        padding-top: 20px;
        padding-bottom: 20px;
    }

    .changephone {
        background: #fff;
        width: 880px;
        padding-top: 20px;
        padding-bottom: 20px;

        .queren {
            width: 144px;
            height: 40px;
            background: rgba(29, 26, 113, 1);
            border: 1px solid rgba(226, 226, 226, 1);
            border-radius: 4px;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-wrap: nowrap;
            flex-direction: row;
            font-size: 12px;
            font-family: PingFang SC;
            font-weight: 500;
            color: rgba(255, 255, 255, 1);
        }

    }

    .benchbody2 {
        width: 100%;
        background: #f5f5f5;
        padding-top: 20px;
        padding-bottom: 20px;
    }

    .benchbody {
        width: 1100px;
        margin: auto;
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        flex-wrap: nowrap;
        flex-direction: row;
    }


</style>
