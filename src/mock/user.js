import { param2Obj } from './utils'

const tokens = {
	admin: {
		token: 'admin-token'
	},
	editor: {
		token: 'editor-token'
	}
}

const users = {
	'admin-token': {
		roles: ['admin'],
		introduction: 'I am a super administrator',
		avatar: '../src/assets/admin.png',
		name: 'Super Admin'
	},
	'editor-token': {
		roles: ['editor'],
		introduction: 'I am an editor',
		avatar: '../src/assets/editor.jpg',
		name: 'Normal Editor'
	}
}

export default {
	login: res => {
		const { username } = JSON.parse(res.body)
		const data = tokens[username]

		if (data) {
			return {
				code: 20000,
				data
			}
		}
		return {
			code: 60204,
			message: '用户名或者密码错误.'
		}
	},
	getInfo: res => {
		const { token } = param2Obj(res.url)
		const info = users[token]

		if (info) {
			return {
				code: 20000,
				data: info
			}
		}
		return {
			code: 50008,
			message: 'Login failed, unable to get user details.'
		}
	},
	logout: () => {
		return {
			code: 20000,
			data: 'success'
		}
	}
}
