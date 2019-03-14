import request from '@/utils/request'

export function getUserData(params = {}) {
	return request({
		url: '/api/user/getData',
		method: 'get',
		params
	})
}

export function deleteUser(data = {}) {
	return request({
		url: '/api/user/delete',
		method: 'post',
		data: data
	})
}
