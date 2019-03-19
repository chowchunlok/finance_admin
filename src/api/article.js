import request from '@/utils/request'

// 发布文章
export function publish(data) {
  return request({
    url: '/api/article/publish',
    method: 'post',
    data: data
  })
}

// // 根据id删除文章
// export function deleteById(data) {
//   return request({
//     url: '/api/article/delete',
//     method: 'post',
//     data: data
//   })
// }

// // 根据id获取文章内容
// export function fetchArticle(id) {
//   return request({
//     url: '/api/article/fetch',
//     method: 'get',
//     params: { id }
//   })
// }

// 获取文章列表 NOTE: mock
export function fetchList(query) {
  return request({
    url: '/api/article/list',
    method: 'get',
    params: { query }
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
