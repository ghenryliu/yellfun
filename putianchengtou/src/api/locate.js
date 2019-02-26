import request from './request'


export function image(data) {
  return request({
    url:'/jparking-service/verify/generate/key/image',
    method:'post',
    data:data
  })
}

// 发送短信验证码接口
export function msg(data) {
  return request({
    url:'/jparking-service/pushmsg/push/msg',
    method:'post',
    // params:data
    data:data
  })
}

// 短信登录接口
export function h5login(data) {
  return request({
    url:'/jparking-service/user/sms/h5login',
    method:'post',
    // params:data
    data:data
  })
}

//添加车牌接口
export function addCarNo(data) {
  return request({
    url: '/jparking-service/car/add_car',
    method: 'post',
    data: data
  })
}

//查询车辆状态接口
export function checkStatus(data) {            //userId
  return request({
    url:'/jparking-service/carService/car/user/dkstatus',
    method:'post',
    data:data,
  })
}

//删除车辆接口
export function deleteCarNo(data){             //删除车牌  ：carId
  return request({
    url:'/jparking-service/car/delete_user_car',
    method:'post',
    data:data,
  })
}

//开通车辆无感支付接口
export function openPay(data){                //删除车牌  ：carId
  return request({
    url:'/jparking-service/isv/user/car/opendk',
    method:'post',
    data:data,
  })
}

// 根据用户查询开通无感渠道接口
export function SelectSign(data) {
  return request({
    url:'/jparking-service/isv/user/query/sign',
    method:'post',
    data:data
  })
}

// 根据用户开通某渠道无感接口
export function openSign(data) {
  return request({
    url:'/jparking-service/isv/user/sign',
    method:'post',
    data:data
  })
}

// 根据用户关闭某渠道无感接口
export function closeSign(data) {
  return request({
    url:'/jparking-service/isv/user/sign/cancel',
    method:'post',
    data:data
  })
}
//车场列表
export function parkInfo(data) {
  return request({
    url:'/jparking-service/order/dk/payType/parkInfo',
    method:'post',
    data:data
  })
}


//输入车牌号
export function inputcarno(data) {
  return request({
    url:'carnopay_inputcarno',
    method:'post',
    params:data
  })
}


//查询停车场列表  2019/2/14
export function getParkingList(data) {
  return request({
    url:'/parking/getParkList',                     //待补充
    method:'post',
    params:data                    //注意data类型
  })
}


//得到停车场总车位及剩余车位数量
export function getRemainAmount(data) {
  return request({
    url:'   ',                     //待补充
    method:'post',
    params:data                    //提交的请求数据是停车场的名称
  })
}



