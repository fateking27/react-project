import instance from "./request"
const http = {
    get: (url, data) => instance.get(url, { params: data }),
    post: (url, data) => instance.post(url, data),
    put: (url, data) => instance.put(url, data),
    delete: (url, data) => instance.delete(url, { data })
}
export default http;