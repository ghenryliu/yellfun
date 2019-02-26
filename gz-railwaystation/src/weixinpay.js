/**
 * Created by yan on 20/02/2017.
 */
/**
 * Created by Sorrow.X on 2016/9/20.
 * beacons.js  蓝牙功能模块
 */

import networkInstance from './networkmanager.js'

export default function weixinpay(orderNo, resolve, reject) {

  networkInstance.payOrderWithWx(orderNo, res => {

    console.log(res)

    if (!res) {

      return
    }

    if (res.code == "failed") {

      reject(res)

      return
    }

    if (res.code == "success")  {

      var appId = res.appId;
      var timeStamp = res.timeStamp;
      var nonceStr = res.nonceStr;
      var _package = res.package;
      var signType = res.signType;
      var paySign = res.paySign;
      var payOrderId = res.payOrderId;

      WeixinJSBridge.invoke('getBrandWCPayRequest', {
          "appId":appId,     //公众号名称，由商户传入
          "timeStamp":timeStamp,         //时间戳，自1970年以来的秒数
          "nonceStr":nonceStr, //随机串
          "package":_package,
          "signType":signType,         //微信签名方式：
          "paySign":paySign //微信签名
        }, res => {

          if (res.err_msg === 'get_brand_wcpay_request:ok') {

            resolve(res)
          }
          else {

            reject(res)
          }
        }
      )
    }
  })
}
