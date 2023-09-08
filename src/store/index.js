import { legacy_createStore, combineReducers } from 'redux'
import rolesReducer from './role/reducers'

// 合并所有模块的 reducer 函数
const allReducers = combineReducers({
    roles: rolesReducer,
})

const store = legacy_createStore(allReducers);

export default store