import router from './router'
import store from './store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { Message } from 'element-ui'
import { getToken } from '@/utils/auth' // getToken from cookie

NProgress.configure({ showSpinner: false }) // NProgress configuration

const whiteList = ['/login'] // 不重定向白名单
router.beforeEach((to, from, next) => {
	NProgress.start()
	if (getToken()) {
		// client token存在
		if (to.path === '/login') {
			next({ path: '/' })
			NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
		} else {
			if (store.getters.roles.length === 0 || from.fullPath !== to.fullPath) {
				// store状态丢失或者路由改变，重新拉取管理员信息
				store
					.dispatch('GetInfo') // 服务器端checktoken
					// 验证token成功
					.then(() => {
						next()
					})
					// 验证token失败
					.catch(err => {
						store.dispatch('FedLogOut').then(() => {
							Message.error(err || 'Verification failed, please login again')
							next({ path: '/' })
						})
					})
			} else {
				next() // store状态存在
			}
		}
	} else {
		// client token丢失
		if (whiteList.indexOf(to.path) !== -1) {
			next()
		} else {
			next(`/login?redirect=${to.path}`) // 否则全部重定向到登录页
			NProgress.done()
		}
	}
})

router.afterEach(() => {
	NProgress.done() // 结束Progress
})
