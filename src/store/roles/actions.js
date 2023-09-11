import api from "@/apis";
// 公共异步方法
export const getRolesAsync = () => {
    return async (dispatch) => {
        // 发送请求获取数据
        const res = await api.roles.get();
        if (res.code == 1) {
            // 将数据保存到状态机
            dispatch({ type: 'getRoles', payload: res.data });
        }
    }
}



