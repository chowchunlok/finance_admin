import request from '@/utils/request'

export function login(username, password) {
  return request({
    url: '/api/admin/login',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data: {
      username,
      password
    }
  })
}

export function getInfo() {
  return request({
    url: '/api/admin/info',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/api/admin/logout',
    method: 'post'
  })
}
