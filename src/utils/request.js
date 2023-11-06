import { message } from "antd";
import axios from "axios";

const instance = axios.create({
    baseURL: 'http://127.0.0.1:8002',
    // baseURL: 'http://nocat.life:8002',
    // timeout: 3000,
})

//请求拦截器
instance.interceptors.request.use((config) => {
    config.headers.token = localStorage.getItem("token")
    return config
})

//响应拦截器
instance.interceptors.response.use(res => res.data, (error) => {
    if (error?.response?.status == 401) {
        message.warning('登录已过期，请重新登录')
        // setTimeout(() => {
        //     location.href = '/login'
        // }, 500)
    } else if (error?.response?.status == 404) {
        message.error('资源找不到，请重试')
    } else {
        message.error('网络错误，请重试')
    }
    return Promise.reject(error.message)
})

export default instance;