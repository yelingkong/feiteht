export const province = [
    {label: '吉林省'}
]

export const city = [
    {label: '吉林市'}
]

export const area = [
    {label: '吉林区'}
]

// 申请机构
export const Agency = [
    {value: 1, label: '机构1'},
    {value: 2, label: '机构2'},
    {value: 3, label: '机构3'},
]

// 服装尺码
export const fz = [
    {value: 1, label: 'xs'},
    {value: 2, label: 's'},
    {value: 3, label: 'm'},
]

// 学历
export const education = [
    {value: 1, label: '小学'},
    {value: 2, label: '中学'},
    {value: 3, label: '大学'}
]

// 语言能力
export const languageCompetence = [
    {value: 1, label: '一般'},
    {value: 2, label: '可以'},
    {value: 3, label: '不错'}
]

// 教练等级
export const coachLeavelList = [
    {value: 1, label: '一般'},
    {value: 2, label: '可以'},
    {value: 3, label: '不错'}
]

// 在读年级
export const classList = [
    {value: 1, label: '一年级'},
    {value: 2, label: '二年级'},
    {value: 3, label: '三年级'}
]

// 校验数字
export function isNumber(rule, value, callback) {
    console.log(value)
    if (isNaN(value)) {
        callback(new Error('只能输入数值'));
    }
    callback()
}

export function trimStr(str) {
    return str.replace(/(^\s*)|(\s*$)/g, "");
}

// 对象深拷贝
export function deepCopy(src, dest) {
    dest = dest || {}

    for (let item in src) {
        if ((typeof src[item] === 'object') && src[item] !== null) {
            dest[item] = src[item].constructor === Array ? [] : {}
            deepCopy(src[item], dest[item])
        } else {
            dest[item] = src[item]
        }
    }

    return dest
}

export function countTime(time) {
    //获取当前时间
    var date = new Date();
    var now = date.getTime();
    //设置截止时间
    var endDate = new Date(time);
    var end = endDate.getTime();
    //时间差
    var leftTime = end - now;
    //定义变量 d,h,m,s保存倒计时的时间
    var d, h, m, s;
    if (leftTime >= 0) {
        d = Math.floor(leftTime / 1000 / 60 / 60 / 24);
        h = Math.floor(leftTime / 1000 / 60 / 60 % 24);
        m = Math.floor(leftTime / 1000 / 60 % 60);
        s = Math.floor(leftTime / 1000 % 60);
        //递归每秒调用countTime方法，显示动态时间效果
        setTimeout(countTime, 1000);
        return d + "天" + h + "时" + m + "分"
    } else {
        return '已超时'
    }

}

export function formatDate(timeStamp, type = 'Y-M-D H:I:S', auto = false) {
    let time = (timeStamp + '').length === 10 ? new Date(parseInt(timeStamp) * 1000) : new Date(parseInt(timeStamp));
    let _year = time.getFullYear();
    let _month = (time.getMonth() + 1) < 10 ? '0' + (time.getMonth() + 1) : (time.getMonth() + 1);
    let _date = time.getDate() < 10 ? '0' + time.getDate() : time.getDate();
    let _hours = time.getHours() < 10 ? '0' + time.getHours() : time.getHours();
    let _minutes = time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes();
    let _secconds = time.getSeconds() < 10 ? '0' + time.getSeconds() : time.getSeconds();
    let formatTime = '';
    let distinctTime = new Date().getTime() - time.getTime();

    if (auto) {
        if (distinctTime <= (1 * 60 * 1000)) {
            // console.log('一分钟以内，以秒数计算');
            let _s = Math.floor((distinctTime / 1000) % 60);
            formatTime = _s + '秒前';
        } else if (distinctTime <= (1 * 3600 * 1000)) {
            // console.log('一小时以内,以分钟计算');
            let _m = Math.floor((distinctTime / (60 * 1000)) % 60);
            formatTime = _m + '分钟前';
        } else if (distinctTime <= (24 * 3600 * 1000)) {
            // console.log('一天以内，以小时计算');
            let _h = Math.floor((distinctTime / (60 * 60 * 1000)) % 24);
            formatTime = _h + '小时前';
        } else if (distinctTime <= (30 * 24 * 3600 * 1000)) {
            let _d = Math.floor((distinctTime / (24 * 60 * 60 * 1000)) % 30);
            formatTime = _d + '天前';
            // console.log('30天以内,以天数计算');
        } else {
            // 30天以外只显示年月日
            formatTime = _year + '-' + _month + '-' + _date;
        }
    } else {

        switch (type) {
            case 'Y-M-D H:I:S':
                formatTime = _year + '-' + _month + '-' + _date + ' ' + _hours + ':' + _minutes + ':' + _secconds;
                break;
            case 'Y-M-D H:I:S zh':
                formatTime = _year + '年' + _month + '月' + _date + '日  ' + _hours + ':' + _minutes + ':' + _secconds;
                break;
            case 'Y-M-D H:I':
                formatTime = _year + '-' + _month + '-' + _date + ' ' + _hours + ':' + _minutes;
                break;
            case 'Y-M-D H':
                formatTime = _year + '-' + _month + '-' + _date + ' ' + _hours;
                break;
            case 'Y-M-D':
                formatTime = _year + '-' + _month + '-' + _date;
                break;
            case 'Y-M-D zh':
                formatTime = _year + '年' + _month + '月' + _date + '日';
                break;
            case 'Y-M':
                formatTime = _year + '-' + _month;
                break;
            case 'Y':
                formatTime = _year;
                break;
            case 'M':
                formatTime = _month;
                break;
            case 'D':
                formatTime = _date;
                break;
            case 'H':
                formatTime = _hours;
                break;
            case 'I':
                formatTime = _minutes;
                break;
            case 'S':
                formatTime = _secconds;
                break;
            default:
                formatTime = _year + '-' + _month + '-' + _date + ' ' + _hours + ':' + _minutes + ':' + _secconds;
                break;
        }
    }
    // 返回格式化的日期字符串
    return formatTime;
}
