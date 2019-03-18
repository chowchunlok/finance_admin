import request from '@/utils/request'

// 发布新闻
export function publish(data) {
  return request({
    url: '/api/news/publish',
    method: 'post',
    data: data
  })
}

// 删除新闻
export function remove(data) {
  return request({
    url: '/api/news/remove',
    method: 'post',
    data: data
  })
}
