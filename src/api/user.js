import request from '@/utils/request'
export function login(data) {

}

export function getUserInfo() {
  return request({
    url: '/sys/profile',
    method: 'post'
  })
}
export const getUserDetailById = (id) => {
  return request({
    url: `/sys/user/${id}`
  })
}

export const updateUserDetailById = (data) => {
  return request({
    url: `/sys/user/${data.id}`,
    method: 'put',
    data
  })
}
export function logout() {

}

