import http from "@/utils/http";

const category = {
    get: (data) => http.get('/categroy/findCategroy', data),
    getCascader: (data) => http.get('/categroy/findAllCategroy', data),
    add: (data) => http.post('/categroy/addCategroy', data),
    update: (data) => http.post('/categroy/updateCateGroy', data),
    delete: (data) => http.post('/categroy/deleteCateGroy', data),
}

export default category