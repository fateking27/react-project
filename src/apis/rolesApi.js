import http from "@/utils/http";


const roles = {
    // 获取角色数据
    get: () => http.get('/roles/findRoles')
}

export default roles;