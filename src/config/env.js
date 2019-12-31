/**
 * 配置编译环境和线上环境之间的切换
 *
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * baseImgPath: 图片存放地址
 *
 */
import {testIp} from '@/api/ipConfig';
let baseUrl = testIp
let baseImgPath = baseUrl+'file/'
let basefile = baseUrl+'file'
let upload = baseUrl + 'api/files/upload/'
let imgupload = upload + '1'
let videoupload = upload + '2'
let fileupload = upload + '3'

export {
    baseUrl,
    baseImgPath,
    basefile,
    imgupload,
    videoupload,
    fileupload
}
