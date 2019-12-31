import axios from 'axios';
import { constants } from 'os';
// (function(doc, win) {
//     regsitRemSize(doc, win);
// })(document, window);
// //document.documentElement.style.fontSize
// function regsitRemSize(doc, win) {
//     var docEl = doc.documentElement,
//         //屏幕是否旋转
//         resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
//     var recalc = function() {
//         var clientWidth = docEl.clientWidth;
//         if (!clientWidth) return;
//         //clientWidth为获取的当前屏幕宽度
//         //字体大小 = 当前屏幕宽度/你自己设置的基数
//         docEl.style.fontSize = 12 * (clientWidth / 375) + 'px';
//         //因为大部分移动端设计图都是按照iphone6的尺寸来设计的
//         //所以这里我选用375为基数，这样我们做页面时就按照iphone6为基准进行调试
//         //在iphone6上1rem等于20px；当设备宽度大于375时，1rem相对应的值会随着变大，反正缩小。
//     };
//     if (!doc.addEventListener) return;
//     win.addEventListener(resizeEvt, recalc, false);
//     doc.addEventListener('DOMContentLoaded', recalc, false);
// }
//验证是否手机号 mobile
export function isMobile(obj) {
    let reg = /^1(3|4|5|6|7|8|9)\d{9}$/;
    if (!reg.test(obj)) {
        return false;
    } else {
        return true;
    }
}
//判断登录密码格式
export function isPwd(str) {
    var patrn = /^[A-Za-z0-9\u4e00-\u9fa5-\~\!\@\#\$\%\^\&\*\(\)\+\-\=\{\}\[\]\|\<\>\?._,]{6,20}$/;
    if (!patrn.exec(str)) return false;
    return true;
}
// 获取日期 formatDate
var formatDate = function(date) {
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    return y + '-' + m + '-' + d;
};
export function getIp() {
    // axios.get('http://ip-api.com/json', '').then(e => {
    //         console.log(e.data.query)
    //     })
    $.getScript('https://pv.sohu.com/cityjson?ie=utf-8', function() {
        localStorage.setItem("IP", JSON.stringify(returnCitySN.cip))
        return returnCitySN.cip;
    })

};
export function countTime(inputTime) {
    //获取当前时间  
    var now = Date.now();
    //设置截止时间  
    var end = new Date(inputTime).getTime();
    //时间差  
    var leftTime = now - end;
    //定义变量 d,h,m,s保存倒计时的时间  
    var d, h, m, s;
    if (leftTime >= 0) {
        d = Math.floor(leftTime / 1000 / 60 / 60 / 24);
        h = Math.floor(leftTime / 1000 / 60 / 60);
        m = Math.floor(leftTime / 1000 / 60 % 60);
        s = Math.floor(leftTime / 1000 % 60);
    }
    d <= 9 ? d = '0' + d : d = d;
    h <= 9 ? h = '0' + h : h = h;
    m <= 9 ? m = '0' + m : m = m;
    s <= 9 ? s = '0' + s : s = s;
    //将倒计时赋值到div中  
    return { 'd': d, 'h': h, 'm': m, 's': s }
}
//ios Android
export function device() {
    var u = navigator.userAgent,
        app = navigator.appVersion;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
    var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    if (isAndroid) {
        return 'Android';
    }
    if (isIOS) {
        return "IOS";
    }
}
export function isvcode(str) {
    var reg = /^\d{4}$/;
    if (!reg.test(str)) {
        return false;
    } else {
        return true;
    }
}
export function forma(inputTime) {
    var date = inputTime;
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    var h = date.getHours();
    h = h < 10 ? ('0' + h) : h;
    var minute = date.getMinutes();
    var second = date.getSeconds();
    var ss = date.getMilliseconds();
    minute = minute < 10 ? ('0' + minute) : minute;
    second = second < 10 ? ('0' + second) : second;
    ss = ss < 100 ? (ss / Math.pow(10, 3)).toFixed(3).substr(2) : ss;
    return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second + ':' + ss;
}

//显示手机未4位
export function sliceMobile(mobile) {
    var result = '';
    if (mobile == null || mobile.length == 0 || mobile == undefined) {
        result = '--';
    } else {
        result = mobile.substr(-4, 4);
    }
    return result;
}
export function formatDateTime(inputTime) {
    var date = new Date(inputTime);
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    var h = date.getHours();
    h = h < 10 ? ('0' + h) : h;
    var minute = date.getMinutes();
    var second = date.getSeconds();
    minute = minute < 10 ? ('0' + minute) : minute;
    second = second < 10 ? ('0' + second) : second;
    return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
}
export function isNull(arr) {
    for (var i = 0; i < arr[0].length; i++) {
        if (!arr[0][i] && arr[0][i].trim() == '') {
            return arr[1][i] //false
        }
    }
    return true
}
//验证两个值是否相等 equals 
export function isEqual(str1, str2) {
    return str1 == str2 ? true : false;
}
export function is_weixn() {
    var ua = navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == "micromessenger") {
        return true;
    } else {
        return false;
    }
}

export function validateName(str) {
    var reg = /^[\u4E00-\u9FA5]{2,4}$/;
    if (!reg.test(str)) {
        return false;
    } else {
        return true;
    }
}
export function regIdNo(idNo) {
    var regIdNo = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    if (!regIdNo.test(idNo)) {
        return false;
    } else {
        return true;
    }
}