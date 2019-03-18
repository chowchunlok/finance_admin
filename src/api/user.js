import request from '@/utils/request'

export function datalist(params = {}) {
  return request({
    url: '/api/user/datalist',
    method: 'get',
    params
  })
}

export function remove(data = {}) {
  return request({
    url: '/api/user/remove',
    method: 'post',
    data: data
  })
}

export function details(data = {}) {
  //TODO: api > user details
  return request({
    url: '/api/user/details',
    method: 'post',
    data: data
  })
}
