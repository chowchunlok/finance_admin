import { register, login, logout, getInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { Message } from 'element-ui'

const user = {
	// namespaced: true,
	state: {
		token: getToken(),
		name: '',
		avatar: '',
		roles: []
	},

	mutations: {
		SET_TOKEN: (state, token) => {
			state.token = token
		},
		SET_NAME: (state, name) => {
			state.name = name
		},
		SET_AVATAR: (state, avatar) => {
			state.avatar = avatar
		},
		SET_ROLES: (state, roles) => {
			state.roles = roles
		}
	},

	actions: {
		// 注册
		Register({ commit }, adminInfo) {
			adminInfo.rules = [].push(adminInfo.rules)
			return new Promise((resolve, reject) => {
				// console.log(register(adminInfo)) // TODO:
				register(adminInfo)
					.then(response => {
						console.log(response) //TODO:
						resolve(response)
					})
					.catch(error => {
						console.log(error) //TODO:
						reject(error)
					})
			})
		},

		// 登录
		Login({ commit }, userInfo) {
			const username = userInfo.username.trim()
			return new Promise((resolve, reject) => {
				login(username, userInfo.password) // api ---> 后端返回token
					.then(response => {
						// const data = response.data
						// console.log(data)
						setToken(response.token) // set cookie token
						commit('SET_TOKEN', response.token) // set store token
						resolve()
					})
					.catch(error => {
						reject(error)
					})
			})
		},

		// 获取用户信息
		GetInfo({ commit, state }) {
			return new Promise((resolve, reject) => {
				getInfo()
					.then(response => {
						const data = response.data
						if (data.roles && data.roles.length > 0) {
							// 验证返回的roles是否是一个非空数组
							commit('SET_ROLES', data.roles)
						} else {
							reject('getInfo: roles must be a non-null array !')
						}
						commit('SET_NAME', data.name)
						commit('SET_AVATAR', data.avatar)
						resolve(response)
					})
					.catch(error => {
						reject(error)
					})
			})
		},

		// 登出
		LogOut({ commit, state }) {
			return new Promise((resolve, reject) => {
				logout(state.token)
					.then(res => {
						console.log(res)
						commit('SET_TOKEN', '')
						commit('SET_ROLES', [])
						removeToken()
						resolve(res)
					})
					.catch(error => {
						reject(error)
					})
			})
		},

		// 前端 登出
		FedLogOut({ commit }) {
			return new Promise(resolve => {
				commit('SET_TOKEN', '')
				removeToken()
				resolve()
			})
		}
	}
}

export default user
