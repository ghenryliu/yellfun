/**
 * Created by yan on 01/03/2017.
 */


var networkInstance = new idrNetworkManager()

import $ from 'jquery'

function doAjax(url, data, success, failed) {

  console.log(url)

  $.get(url, data, function(res) {

    success && success(res)
  })
}

function idrNetworkManager() {

  this.host = 'http://parking.tieqing.com'
}

idrNetworkManager.prototype.serverCallQueryCar = function(carno, success, failed) {

  var url = this.host + '/parkpay/carnopay_inputcarno?carNo=' + carno

  this.doAjax(url, null, success, failed)
}

idrNetworkManager.prototype.serverCallParkingOrder = function(carno, success, failed) {

  var url = this.host + '/parkpay/createParkingOrder?carNo=' + carno

  this.doAjax(url, null, success, failed)
}

idrNetworkManager.prototype.payOrderWithWx = function(orderNo, success, failed) {

  var url = this.host + '/parkpay/weixinPay?orderNo=' + orderNo

  this.doAjax(url, null, success, failed)
}

idrNetworkManager.prototype.alipayurl = function(orderNo) {

  var url = this.host + '/alipay/aliWapPay?orderNo=' + orderNo

  return url
}

idrNetworkManager.prototype.doAjax = function(url, data, successFn, failedFn) {

  doAjax(url, data, successFn, failedFn)
}





export { networkInstance as default }
