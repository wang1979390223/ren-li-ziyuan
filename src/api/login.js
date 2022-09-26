import request from '@/utils/request'
export function login(data) {
  return request({
    url: ' /api/user-service/user/login',
    method: 'post',
    data
  })
}
export function getimgAPI(clientToken) {
  return request({
    url: `/user-service/user/imageCode/${clientToken}`,
    responseType: 'blob'
  })
}
