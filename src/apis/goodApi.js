import http from "@/utils/http";

const goods = {
    get: () => http.get('/goods/findGoods'),
    add: (data) => http.post('/users/accountadd',data),
    update: (data) => http.post('/users/updateAccount',data),
    delete: (data) => http.get('/users/delAccount', data),
    roles: () => http.get('/roles/findRoles'),
}

export default goods