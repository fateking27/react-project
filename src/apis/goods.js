import http from "@/utils/http";

const goods = {
    addGoods: (data) => http.post('/goods/addGoods', data),
    findGoods: (data) => http.get('/goods/findGoods',data),
    searchGoods: (data) => http.post('/goods/findGoodsByName',data)
}

export default goods