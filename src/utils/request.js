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
    return Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  response => {
    /**
     * code为非2000是抛错
     */
    const res = response.data

    if (res.code !== 2000) {
      // Token认证管理
      // 5003:illegal token; 5002:Other Client are log in; 5001:Token expired; 5000:invalid Token (Match All Situation);
      if (res.code === 5000 || res.code === 5003 || res.code === 5002 || res.code === 5001 || res.code === 5040) {
        MessageBox.confirm(`${res.message}`, 'To Logout', {
          confirmButtonText: 'Re-login',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          store.dispatch('FedLogOut').then(() => {
            location.reload() // 为了重新实例化vue-router对象 避免bug
          })
        })
      }

      // 登录错误
      if (res.code === 4001 || res.code === 4002 || res.code === 4040) {
        MessageBox.confirm(`${res.message}`, 'Login Failed', {
          confirmButtonText: 'Re-login',
          cancelButtonText: 'Cancel',
          type: 'error'
        })
      }

      // 注册错误
      if (res.code === 3002 || res.code === 3040 || res.code === 3001) {
        MessageBox.confirm(`${res.message}`, 'Register Failed', {
          confirmButtonText: 'Re-register',
          cancelButtonText: 'Cancel',
          type: 'error'
        })
      }

      // 获取管理员信息错误
      if (res.code === 6001 || res.code === 6040) {
        MessageBox.confirm(`${res.message}`, 'Login Off', {
          confirmButtonText: 'Re-login',
          cancelButtonText: 'Cancel',
          type: 'error'
        }).then(() => {
          store.dispatch('FedLogOut').then(() => {
            location.reload()
          })
        })
      }

      // 用户
      // 获取用户资料错误
      if (res.code === 7041 || res.code === 7002) {
        MessageBox.confirm(`${res.message}`, 'Delete Failed', {
          confirmButtonText: 'Confirm',
          cancelButtonText: 'Cancel',
          type: 'error'
        })
      }
      // 用户反馈
      //TODO:

      // 新闻
      // 新闻发布
      if (res.code === 8001 || res.code === 8040) {
        MessageBox.confirm(`${res.message}`, 'Delete Failed', {
          confirmButtonText: 'Confirm',
          cancelButtonText: 'Cancel',
          type: 'error'
        })
      }
      // 新闻删除
      //TODO:

      // Unified processing error
      return Promise.reject('error')
    } else {
      // Register Success
      // console.log(response.data) //TODO:
      return res
    }
  },
  error => {
    console.log(error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
