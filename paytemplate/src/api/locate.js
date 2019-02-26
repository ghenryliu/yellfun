import request from './request'


//车牌查询
export function inputcarno(data) {
  return request({
    url:'carnopay_inputcarno',
    method:'post',
    params:data
  })
}

//查询订单：
export function queParkingOrder(data) {
  return request({
    url:'queParkingOrder',
    method:'post',
    params:data
  })
}

//立即支付提交：
export function prepay(data) {
  return request({
    url:'prepay',
    method:'post',
    params:data
  })
}
