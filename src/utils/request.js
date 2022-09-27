
import store from '@/store'
import axios from 'axios'
import { Message } from 'element-ui'
import router from '@/router'
const Timeout = 3600
// 判断时间是否超时
function IscheckTimeout() {
  const currentTime = Date.now()// 时间2接口调用的真正时间
  const timeStamp = (currentTime - store.getters.hrsaastime) / 1000
  return timeStamp > Timeout // true超时/ false
}

// create an axios instance

// 响应拦截器
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      if (IscheckTimeout()) {
        store.dispatch('user/logout')
        router.push('/login')
        return Promise.reject(new Error('token 超时'))
      }
    }
    if (store.getters.token) {
      config.headers['Authorization'] = `Bearer ${store.getters.token}`
    }
    return config
  }, error => {
    return Promise.reject(error)
  }
)
// 请求拦截器

service.interceptors.response.use(response => {
  // 1,考虑把哪些数据抛出去
  // 2，接口成功 并且 业务成功
  // 3，没有成功promise.rejected
  const { data, message, success } = response.data
  if (success) {
    return data
  }
  Message.error(message)
  return Promise.reject(new Error(message))
}, error => {
  console.log(error.response)
  if (error.response && error.response.status === 401) {
    // token超时
    store.dispatch('user/logout')
    router.push('/login')
    Message.error('token超时')
  } else {
    Message.error(error.message)
  }
  Message.error(error.message)
  return Promise.reject(error)
}
)
// request interceptor
export default service
