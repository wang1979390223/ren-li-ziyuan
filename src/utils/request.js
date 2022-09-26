import axios from 'axios'
import { Message } from 'element-ui'
// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})
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
  Message.error(error.message)
  return Promise.reject(error)
}
)
// request interceptor
export default service
