
// 管理仓库中每个模块的公共数据

const rolesReducer = (state = [], action) => {

    switch (action.type) {
        case 'getRoles':
            return action.payload;
        default:
            return state;
    }

}

export default rolesReducer;