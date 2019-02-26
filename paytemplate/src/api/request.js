import axios from 'axios'

// create an axios instance

console.log(window.configUrls)

const service = axios.create({
  // baseURL: process.env.BASE_API, // api的base_url
  baseURL: window.configUrls.requestUrls, // api的base_url
  timeout: 60000 // request timeout
})

service.interceptors.request.use(config => {
  
  // console.log('请求', config)
  
  return config
  
}, error => {
  
  // console.log(error)
  
  Promise.reject(error)
})

// respone interceptor
service.interceptors.response.use(
  
  response => {
    
    // console.log('返回', response)
    
    const { code, msg, data } = response.data
    
    if (code == '0') {
      
      return data
    }
    
    return Promise.reject(msg)
  },
  error => {
    console.log('err' + error)// for debug
    return Promise.reject(error)
  })

export default service
