<template>
    <div class="xuexipay">
        <div class="ispay1" v-if="!paysuc">
            <p>本课程包含图文视频，您需要支付{{money|filtersmoney}}才能学习，使用微信扫描二维码完成支付，即可学习本课程</p>
            <div class="qrcode" id="qrcode"></div>
        </div>
        <div class="ispay2" v-else>
            <i class="el-icon-success paysucess"></i>
            <p>支付成功</p>
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
            ispay: false
        },
        data() {
            return {
                paysuc: false,
                userid: sessionStorage.getItem('id') ? parseInt(sessionStorage.getItem('id')) : 0
            }
        },
        mounted() {
            this.getpay()
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
            qrcode() {
                var that = this;
                let qrcode = new QRCode('qrcode', {
                    width: 100,
                    height: 100, // 高度  [图片上传失败...(image-9ad77b-1525851843730)]
                    text: that.url // 二维码内容
                    // render: 'canvas' // 设置渲染方式（有两种方式 table和canvas，默认是canvas）
                    // background: '#f0f'
                    // foreground: '#ff0'
                })
                console.log(qrcode)
            },
            // 进入在线涨球页面
            getpay() {
                var that = this;
                getpay({courseId: this.id}).then(res => {
                    const {code, data} = res
                    if (code === 200) {
                        console.log(data)
                        this.url = data.url
                        console.log(this.url);
                        this.qrcode()
                        this.getispayo(2000)
                        // this.dataForm = data || {}
                    }
                })
            },
            // 关闭当前弹窗
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
                    "id": that.id,
                    "type": that.type,
                    "userId": that.userid
                }).then(res => {
                    console.log(res.data.count);
                    if (res.data.count) {
                        this.paysuc = true
                    }

                })
            },
        },
        watch: {
            // 监听是否需要执行查询
            ispay(newValue, oldValue) {
                this.getispayo(2000)
            },
        }
    };
</script>
