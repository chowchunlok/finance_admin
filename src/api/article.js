import request from '@/utils/request'

// 发布文章 NOTE: Useless ---> To Delete
// export function publish(data) {
//   return request({
//     url: '/api/article/publish',
//     method: 'post',
//     data: data
//   })
// }

// 获取文章列表
export function fetchList(query) {
  return request({
    url: '/api/article/list',
    method: 'get',
    params: { query }
  })
}

// 根据id获取文章
export function fetchArticle(id) {
  return request({
    url: '/api/article/details',
    method: 'get',
    params: { id }
  })
}

// pv TODO: pv?
export function fetchPv(pv) {
  return request({
    url: '/api/article/pv',
    method: 'get',
    params: { pv }
  })
}

// create
export function createArticle(data) {
  return request({
    url: '/api/article/create',
    method: 'post',
    data: { data }
  })
}

// update
export function updateArticle(data) {
  return request({
    url: '/api/article/update',
    method: 'post',
    data: { data }
  })
}

// search Author
export function searchAuthorList(key) {
  return request({
    url: '/api/article/author/list',
    method: 'get',
    params: { key }
  })
}

// delete from database
export function deleteArticle(id) {
  return request({
    url: '/api/article/delete',
    method: 'get',
    params: { id }
  })
}
