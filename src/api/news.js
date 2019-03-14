import request from '@/utils/request'

// 发布新闻
export function release(data) {
	return request({
		url: '/api/news/release',
		method: 'post',
		data: data
	})
}
