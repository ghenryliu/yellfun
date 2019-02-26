import Vue from 'vue'
import paysuccess from '../../components/paysuccess.vue'

Vue.config.productionTip = false

/* eslint-disable no-new */


function getQueryString(name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
  var r = window.location.search.substr(1).match(reg);
  if (r != null) {
    return decodeURI(r[2]);
  }
  return null;
}

window.onload = function () {

  var fee = getQueryString('fee')

  var type = getQueryString('payType')

  var paytype = ''

  if (type === 'wx') {

    paytype = '微信支付'
  }
  else {

    paytype = '支付宝支付'
  }

  new Vue({
    el: '#main',
    components: { paysuccess },
    data:function () {
      return {
        fee:fee,
        paytype:paytype
      }
    }
  })
}
