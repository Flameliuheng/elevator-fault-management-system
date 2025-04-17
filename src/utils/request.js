// 1. 导入axios
import axios from 'axios'
// 如果你用了ElementUI的提示组件，可以导入Message
import { Message } from 'element-ui'
// 导入路由
import router from '../router'

// 2. 创建一个axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // 基础地址，如果没有可以写你的后端接口基础路径，比如'http://localhost:8080'
  timeout: 10000 // 请求超时时间10秒
})

// 3. 请求拦截器（每次发请求前做的事情）
service.interceptors.request.use(
  config => {
    // 从本地存储获取token和存储时间
    const token = localStorage.getItem('token')
    const tokenTime = localStorage.getItem('tokenTime')
    const currentTime = new Date().getTime()
    
    // 检查token是否存在且未过期（2小时=7200000毫秒）
    if (token) {
      if (currentTime - tokenTime > 7200000) {
        // Token过期处理
        localStorage.removeItem('token')
        localStorage.removeItem('tokenTime')
        Message.warning('登录已过期，请重新登录')
        router.push('/login')
        return Promise.reject(new Error('Token expired'))
      }
      
      // 如果token有效，添加到请求头
      config.headers['Authorization'] = `Bearer ${token}`
    }
    
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 4. 响应拦截器（每次收到响应后做的事情）
service.interceptors.response.use(
  response => {
    // 直接返回数据部分
    return response.data
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 未授权，token无效
          localStorage.removeItem('token')
          localStorage.removeItem('tokenTime')
          Message.warning('登录状态已失效，请重新登录')
          router.push('/login')
          break
        case 403:
          Message.error('拒绝访问')
          break
        case 404:
          Message.error('资源不存在')
          break
        case 500:
          Message.error('服务器错误')
          break
        default:
          Message.error(error.response.data.message || '请求错误')
      }
    }
    return Promise.reject(error)
  }
)

// 5. 导出这个配置好的axios实例
export default service