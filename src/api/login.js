import request from '@/utils/request'

export function login(username, password) {
  return request({
    url: '/api/login',
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

export function loginInfo() {
  return request({
    url: '/api/login/loginInfo',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/api/login/logout',
    method: 'post'
  })
}
