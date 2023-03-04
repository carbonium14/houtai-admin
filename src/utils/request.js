import axios from 'axios'
import { ElMessage } from 'element-plus'
import store from '@/store/index'
import { isCheckTimeout } from './auth'
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})
service.interceptors.request.use((config) => {
  config.headers.icode = '45BF3A32194B4DAE'
  if (store.getters.token) {
    if (isCheckTimeout()) {
      store.dispatch('user/logout')
      return Promise.reject(new Error('token失效'))
    }
    config.headers.Authorization = `Bearer ${store.getters.token}`
  }
  return config
}, (error) => {
  return Promise.reject(error)
})
service.interceptors.response.use((response) => {
  const { success, message, data } = response.data
  if (success === true) {
    return data
  } else {
    ElMessage.error(message)
    return Promise.reject(new Error(message))
  }
}, (error) => {
  if (error.response && error.response.data && error.response.data.code === 401) {
    store.dispatch('user/logout')
  }
  ElMessage.error(error.message)
  return Promise.reject(error)
})
export default service
