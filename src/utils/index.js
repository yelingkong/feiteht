//var Utils = {};
import axios from 'axios';
// const apiUrl = "http://jiaju.dev.whbpkj.com/api/";
//const apiUrl = "http://xcx.test/api/water/";
import {devIp} from '@/api/ipConfig';

let baseurl = devIp + 'api'
export default {
    install(Vue) {
        Vue.prototype.httpGet = function (url, success) {
            axios({
                method: "get",
                url: baseurl + url
            })
                .then(res => {
                    success(res.data);
                })
                .catch(function (error) {
                    console.log(error);
                });
        };
        //POST
        Vue.prototype.httpPost = function (url, data, success) {
            // let _data=JSON.stringify(data);
            axios({
                method: "post",
                data: data,
                url: baseurl + url
            })
                .then(res => {
                    if (res.data.code == 200) {
                        success(res.data);

                    } else if (res.data.code == 602) {
                        this.$router.push('/login')
                    } else {
                        this.$message(res.data.message);
                    }

                })
                .catch(function (error) {
                    console.log(error);
                });
        };
        //post1
        Vue.prototype.httpPost1 = function (url, data, responseType, success) {
            // let _data=JSON.stringify(data);
            axios({
                method: "post",
                data: data,
                url: baseurl + url,
                responseType: responseType,
            })
                .then(res => {
                    success(res.data);
                })
                .catch(function (error) {
                    console.log(error);
                });
        };
        //PUT
        Vue.prototype.httpPut = function (url, data, success) {
            // let _data=JSON.stringify(data);
            axios({
                method: "put",
                data: data,
                url: baseurl + url
            })
                .then(res => {
                    success(res.data);
                })
                .catch(function (error) {
                    console.log(error);
                });
        };

        //微信支付
        Vue.prototype.wxPay = function (config, success) {
            let jsApiCall = function () {
                WeixinJSBridge.invoke(
                    "getBrandWCPayRequest",
                    JSON.parse(config),
                    function (res) {
                        alert(res);

                    }
                );
            };

            if (typeof WeixinJSBridge == "undefined") {
                if (document.addEventListener) {
                    document.addEventListener("WeixinJSBridgeReady", jsApiCall, false);
                } else if (document.attachEvent) {
                    document.attachEvent("WeixinJSBridgeReady", jsApiCall);
                    document.attachEvent("onWeixinJSBridgeReady", jsApiCall);
                }
            } else {

                jsApiCall();
            }
        };
    }

};

export function throttle(func, wait) {
    let timeout
    return function () {
        let that = this
        let args = arguments

        if (!timeout) {
            timeout = setTimeout(() => {
                timeout = null
                func.apply(that, args)
            }, wait)
        }
    }
}
