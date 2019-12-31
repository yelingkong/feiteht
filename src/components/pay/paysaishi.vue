<template>
    <div class="xuexipay">
        <div class="ispay1" v-if="!paysuc">
            <p>报名本赛事您需要支付{{money|filtersmoney}}，扫描二维码支付，即可报名</p>
            <div class="qrcode" id="qrcode"></div>
        </div>
        <div class="ispay2" v-else>
            <i class="el-icon-success paysucess"></i>
            <p>报名成功</p>
        </div>
    </div>
</template>

<style>
    .xuexipay, .ispay1, .ispay2 {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;

    }

    .paysucess {
        font-size: 50px;
        color: green;
        margin-bottom: 20px;
    }

    .qrcode {
        margin-top: 20px;
        margin-bottom: 20px;
    }
</style>
<script>
    // @ is an alias to /src
    import {getpay, getpaystatus} from '../../api/api/index.js';
    import {baseImgPath, basefile, imgupload} from '@/config/env.js';
    import QRCode from 'qrcodejs2'

    export default {
        props: {
            id: 0,
            type: 0,
            money: '',
            ispay: false,
            matchsOnly: '',
            url: ''
        },
        data() {
            return {
                paysuc: false,
                userid: sessionStorage.getItem('id') ? parseInt(sessionStorage.getItem('id')) : 0
            }
        },
        mounted() {
            this.qrcode()
            this.getispayo(2000)
        },
        filters: {
            filtersmoney: function (money) {
                if (money) {
                    return "￥" + money
                } else {
                    return ''
                }
            },
        },
        methods: {
            // 支付二维码生成
            qrcode() {
                var that = this;
                console.log(that.url);
                console.log("=========");
                let qrcode = new QRCode('qrcode', {
                    width: 100,
                    height: 100, // 高度  [图片上传失败...(image-9ad77b-1525851843730)]
                    text: that.url // 二维码内容
                    // render: 'canvas' // 设置渲染方式（有两种方式 table和canvas，默认是canvas）
                    // background: '#f0f'
                    // foreground: '#ff0'
                })
            },
            // 关闭支付弹窗
            closewin(time) {
                this.timer2 = setTimeout(() => {
                    this.$emit('paysuccess', true);
                    clearTimeout(this.timer2);
                }, time);
            },
            // 定时执行 判断是否支付成功
            // 根据参数进行判断是否终止定时执行
            getispayo(time) {
                this.timer = setTimeout(() => {
                    console.log(this.ispay);
                    if (this.paysuc) {
                        this.closewin(2000)
                        clearTimeout(this.timer);
                    } else {
                        if (!this.ispay) {
                            clearTimeout(this.timer);
                            console.log("停止");
                        } else {
                            clearTimeout(this.timer);
                            this.getispay()
                            this.getispayo(2000)
                        }
                    }
                }, time);
            },
            // 查询是否支付成功
            getispay() {
                var that = this;
                getpaystatus({
                    "type": that.type,
                    "matchsOnly": this.matchsOnly
                }).then(res => {
                    console.log(res.data.count);
                    if (res.data.count) {
                        that.paysuc = true
                    }

                })
            },
        },
        watch: {
            // 监听参数变化
            ispay(newValue, oldValue) {
                console.log(newValue);
                this.getispayo(2000)
            },
        }
    };
</script>
