import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '../store'
import { getToken } from '@/utils/auth'

// 创建axios实例
const service = axios.create({
	// baseURL: process.env.BASE_API, // api 的 base_url
	timeout: 5000 // 请求超时时间
})

// content-type
service.defaults.headers.post['Content-Type'] = 'application/json'
service.defaults.headers.put['Content-Type'] = 'application/json'

// request拦截器
service.interceptors.request.use(
	config => {
		if (store.getters.token) {
			config.headers.Authorization = `token ${getToken()}`
		}
		if (config.method === 'post' || config.method === 'put') {
			// Before post、put is sented，transform them(Object) to string, to handle java back-stage parsing issues
			config.data = JSON.stringify(config.data)
		}
		return config
	},
	error => {
		// Do something with request error
		console.log(error) // for debug
		Promise.reject(error)
	}
)

// response 拦截器
service.interceptors.response.use(
	response => {
		/**
		 * code为非2000是抛错 可结合自己业务进行修改
		 */
		const res = response.data
		if (res.code !== 2000) {
			// 5008:非法的token; 5012:其他客户端登录了;  5014:Token 过期了;
			if (res.code === 5008 || res.code === 5012 || res.code === 5014) {
				MessageBox.confirm(
					'你已被登出，可以取消继续留在该页面，或者重新登录',
					'确定登出',
					{
						confirmButtonText: '重新登录',
						cancelButtonText: '取消',
						type: 'warning'
					}
				).then(() => {
					store.dispatch('FedLogOut').then(() => {
						location.reload() // 为了重新实例化vue-router对象 避免bug
					})
				})
			}

			if (res.code === 4004 || res.code === 4010) {
				MessageBox.confirm('密码错误或者账号不存在', '重新登录', {
					confirmButtonText: '重新登录',
					cancelButtonText: '取消',
					type: 'error'
				})
			}
			return Promise.reject('error')
		} else {
			return response.data
		}
	},
	error => {
		console.log(error) // for debug
		Message({
			message: 'what??',
			type: 'error',
			duration: 5 * 1000
		})
		return Promise.reject(error)
	}
)

export default service
