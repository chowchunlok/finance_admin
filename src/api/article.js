import request from '@/utils/request'

// 发布文章 NOTE: Useless ---> To Delete
export function publish(data) {
  return request({
    url: '/api/article/publish',
    method: 'post',
    data: data
  })
}

// 获取文章列表 NOTE: mock
export function fetchList(query) {
  return request({
    url: '/api/article/list',
    method: 'get',
    params: { query }
  })
}

// 根据id获取文章 NOTE: mock
export function fetchArticle(id) {
  return request({
    url: '/api/article/details',
    method: 'get',
    params: { id }
  })
}

// pv NOTE: mock
export function fetchPv(pv) {
  return request({
    url: '/api/article/pv',
    method: 'get',
    params: { pv }
  })
}

// create NOTE: mock
export function createArticle(data) {
  return request({
    url: '/api/article/create',
    method: 'post',
    data: data
  })
}

// update NOTE: mock
export function updateArticle(data) {
  return request({
    url: '/api/article/update',
    method: 'post',
    data
  })
}

// search Author NOTE: mock
export function searchAuthorList() {
  return request({
    url: '/api/article/author/list',
    method: 'get'
  })
}
