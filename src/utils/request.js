import axios from "axios";

const instance = axios.create({
    baseURL: 'http://nocat.life:8002',
    timeout: 3000,
})

instance.interceptors.response.use(res => res.data)

export default instance;