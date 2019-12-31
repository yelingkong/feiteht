<template>
    <div>
        <div class="footers">
            <div class="footerzj">
                <div class="footerzjitem">
                    <img src="../../assets/icon_zj.png" alt="">
                    <p v-t="'footer.bz'">资金安全有保障</p>
                </div>
                <div class="footerzjitem">
                    <img src="../../assets/icon_zj.png" alt="">
                    <p v-t="'footer.ms'">降本生效新模式</p>
                </div>
                <div class="footerzjitem">
                    <img src="../../assets/icon_zj.png" alt="">
                    <p v-t="'footer.rz'">认证企业更可靠</p>
                </div>
                <div class="footerzjitem">
                    <img src="../../assets/icon_zj.png" alt="">
                    <p v-t="'footer.about'">关于我们</p>
                </div>
                <div class="footerzjitem">
                    <img src="../../assets/icon_zj.png" alt="">
                    <p v-t="'footer.mz'">免责声明</p>
                </div>
                <div class="footerzjitem">
                    <img src="../../assets/icon_zj.png" alt="">
                    <p v-t="'footer.ys'">隐私协议</p>
                </div>
            </div>
            <div class="connec">
                <p>STAY CONNECTED</p>
                <div class="connecimg">
                    <img src="../../assets/icon_c1.png" alt="">
                    <img src="../../assets/icon_c2.png" alt="">
                    <img src="../../assets/icon_c3.png" alt="">
                </div>
            </div>
            <div class="footersbq">
                <p>©2019Spiritea {{ $t("footer.foot") }} 京ICP证050520号-0 京网文【2019】1334-6666号</p>
            </div>
        </div>
    </div>
</template>

<script>
    import {baseImgPath, basefile, imgupload} from '@/config/env.js';

    export default {
        data() {
            return {
                infoAddress: "",
                publicImg: "",
                publicName: "",
                putOnFileOne: "",
                putOnFileTwo: ""

            };
        },
        created() {

        },
        filters: {
            filtersImg: function (img) {
                return basefile + img
            },
        },
    }
</script>

<style lang="less" scoped>
    .footers {
        width: 100%;
        background: #1f1a73;
        height: 500px;
    }

    .footersbq {
        text-align: center;
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: rgba(153, 153, 153, 1);
        line-height: 20px;
    }

    .footerzj {
        padding-top: 90px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        flex-direction: row;
        width: 1110px;
        margin: auto;
    }

    .footerzjitem {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-wrap: nowrap;
        flex-direction: row;
        margin-bottom: 90px;
        width: 370px;

        p {
            font-size: 16px;
            font-family: MicrosoftYaHei;
            font-weight: bold;
            color: rgba(255, 255, 255, 1);
            margin-left: 14px;
        }
    }

    .connec {
        font-size: 16px;
        font-family: Helvetica;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        line-height: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: nowrap;
        flex-direction: column;
    }

    .connecimg {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: nowrap;
        flex-direction: row;
        margin-top: 30px;
        margin-bottom: 60px;

        img {
            margin-left: 30px;
            margin-right: 30px;
        }
    }
</style>
