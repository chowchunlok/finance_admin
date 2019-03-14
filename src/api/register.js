import request from '@/utils/request'

export function register(data) {
	return request({
		url: '/api/admin/register',
		method: 'post',
		data: data
	})
}
