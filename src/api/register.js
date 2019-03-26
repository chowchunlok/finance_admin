import request from '@/utils/request'

export function registerInfo(data) {
  return request({
    url: '/api/register/registerInfo',
    method: 'post',
    data: data
  })
}

export function upload(data) {
  return request({
    url: '/api/register/upload',
    method: 'post',
    data: data
  })
}
