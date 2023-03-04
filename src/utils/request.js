import axios from 'axios'
import { ElMessage } from 'element-plus'
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})
service.interceptors.request.use(
  config => {
    config.headers.icode = '45BF3A32194B4DAE'
    return config
  }
)
service.interceptors.response.use((response) => {
  const { success, message, data } = response.data
  if (success === true) {
    return data
  } else {
    ElMessage.error(message)
    return Promise.reject(new Error(message))
  }
}, (error) => {
  ElMessage.error(error.message)
  return Promise.reject(error)
})
export default service
