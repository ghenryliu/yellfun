// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import querycar from '../../components/querycar.vue'
import carlist from '../../components/carlist.vue'
import networkinstance from '../../networkmanager'
import floatalertview from '../../components/floatalertview.vue'

Vue.config.productionTip = false

var testcarlist = ['京A-37847', '京A-37847', '京A-37847']
/* eslint-disable no-new */
new Vue({
  el: '#main',
  components: { querycar, carlist },
  data:function () {
    return {
      showcarlist:false,
      carlist:null
    }
  },
  methods: {

    onQueryFee:function (carno) {

      console.log(carno)

      networkinstance.serverCallQueryCar(carno, res => {

        console.log(JSON.stringify(res))

        if (res.code !== 'success') {

          showfloatalertview(res.msg)

          return
        }

        if ('similarCarList' in res.data) {

          this.carlist = res.data.similarCarList

          this.showcarlist = true

          return
        }

        var order = {
          carNo:res.data.parkingOrder.carNo,
          startTime:res.data.parkingOrder.startTime,
          totalFee:res.data.parkingOrder.totalFee,
          orderNo:res.data.parkingOrder.orderNo,
          endTime:res.data.parkingOrder.endTime,
          serviceTime:res.data.parkingOrder.serviceTime,
          payType:res.data.parkingOrder.payType,
          retMsg:res.data.parkingOrder.retmsg,
        }

        var url = './pay.html?order=' + JSON.stringify(order)

        window.location.href = encodeURI(url)
      })
    },
    selectcar:function (carno) {

      console.log(carno)

      networkinstance.serverCallParkingOrder(carno, res => {

        if (res.code !== 'success') {

          showfloatalertview(res.msg)

          return
        }

        var order = {
          carNo:res.data.parkingOrder.carNo,
          startTime:res.data.parkingOrder.startTime,
          totalFee:res.data.parkingOrder.totalFee,
          orderNo:res.data.parkingOrder.orderNo,
          endTime:res.data.parkingOrder.endTime,
          serviceTime:res.data.parkingOrder.serviceTime,
          payType:res.data.parkingOrder.payType,
          retMsg:res.data.parkingOrder.retmsg,
        }

        var url = './pay.html?order=' + JSON.stringify(order)

        window.location.href = encodeURI(url)
      })
    }
  }
})

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
