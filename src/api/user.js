import request from '@/utils/request'

export function fetchUsers(params = {}) {
  return request({
    url: '/api/user/fetchUsers',
    method: 'get',
    params
  })
}

export function deleteUser(data = {}) {
  return request({
    url: '/api/user/delete',
    method: 'post',
    data
  })
}

export function details(params = {}) {
  //TODO: api > user details
  return request({
    url: '/api/user/details',
    method: 'get',
    params
  })
}
