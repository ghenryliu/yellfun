import Vue from 'vue'
import payfee from '../../components/payfee.vue'
import weixinpay from '../../weixinpay'
import floatalertview from '../../components/floatalertview.vue'
import networkinstance from '../../networkmanager'

Vue.config.productionTip = false

function getQueryString(name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
  var r = window.location.search.substr(1).match(reg);
  if (r != null) {
    return decodeURI(r[2]);
  }
  return null;
}

/* eslint-disable no-new */

function formatDateTime(timeStamp) {
  var date = new Date();
  date.setTime(timeStamp);
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
  return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;
}

function getTimeInterval(second) {

  second = second/1000

  var str = ''

  var day = Math.floor(second/(24*3600))

  if (day >= 1) {

    str += day + '天'
  }

  second = second - day * 24 * 3600

  var hour = Math.floor(second/3600)

  if (hour >= 1) {

    str += hour + '小时'
  }

  second = second - hour * 3600

  var min = Math.floor(second/60)

  if (min >= 1) {

    str += min + '分钟'
  }

  return str
}

var testdata = {
  carNo:'沪A-KJ827',
  startTime:'2017-11-21 14:25:36',
  totalFee:100,
  orderNo:'lsjdkf2903r90sldkfkl'
}

window.onload = function () {

  var order = JSON.parse(getQueryString('order'))

  var carNo = order.carNo

  var startTime = order.startTime

  var totalFee = order.totalFee

  var leaveTime = order.endTime

  var totalTime = getTimeInterval(parseInt(order.serviceTime) * 1000)

  var orderNo = order.orderNo

  var wxpay = order.payType === 'weixin_mp'

  var retMsg = order.retMsg

  new Vue({
    el: '#main',
    components: { payfee },
    data:function () {
      return {
        carNo:carNo,
        startTime:startTime,
        leaveTime:leaveTime,
        totalTime:totalTime,
        totalFee:totalFee
      }
    },
    methods: {
      payOrder:function () {

        if (totalFee == 0) {

          showfloatalertview(retMsg)

          return
        }

        if (wxpay) {

          weixinpay(orderNo, res => {

            window.location.href = './paysuccess.html?fee=' + totalFee + '&paytype=wx'
          }, res => {

            showfloatalertview('支付失败，请重试')
          })
        }
        else {

          var url = networkinstance.alipayurl(orderNo)

          window.location.href = url
        }
      }
    }
  })
}

var _floatalertview = null
var _timeid = null
function showfloatalertview(msg) {

  if (_floatalertview && _floatalertview.show) {

    _floatalertview.msg = msg

    return
  }

  if (_floatalertview) {

    _floatalertview.msg = msg

    _floatalertview.show = true

    setTimeout(() => {

      _floatalertview.show = false

    }, 1000)

    return
  }

  _floatalertview = new Vue({
    el:'floatalertview',
    components: { floatalertview },
    data:function () {
      return {
        show:true,
        msg:msg
      }
    }
  })

  _timeid = setTimeout(() => {

    _floatalertview.show = false
  }, 1000)
}
