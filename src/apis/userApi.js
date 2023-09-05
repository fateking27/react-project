import axios from "@/utils/request";

const users = {
    get: () => axios.post('/users/getAccountList'),
    add: () => axios.post('/users/getAccountList'),
    update: () => axios.post('/users/getAccountList'),
    delete: () => axios.post('/users/getAccountList'),
}

export default users