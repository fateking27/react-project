import http from "@/utils/http";

const users = {
    get: () => http.post('/users/getAccountList'),
    add: () => http.post('/users/getAccountList'),
    update: () => http.post('/users/getAccountList'),
    delete: (data) => http.delete('/users/delAccount?_id=' + data),
}

export default users