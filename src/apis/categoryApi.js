import http from "@/utils/http";

const category = {
    get: (data) => http.get('/categroy/findCategroy', data),
    add: (data) => http.post('/categroy/addCategroy', data),
    update: (data) => http.post('/users/updateAccount', data),
    delete: (data) => http.get('/users/delAccount', data),
    roles: () => http.get('/roles/findRoles'),
}

export default category