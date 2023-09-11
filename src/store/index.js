import { legacy_createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import rolesReducer from './roles/reducers';

// 合并所有模块的 reducer 函数
const allReducers = combineReducers({
    roles: rolesReducer,
})

const store = legacy_createStore(allReducers, applyMiddleware(thunk));

// console.log(store.getState());

export default store;