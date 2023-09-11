import api from '@/apis';
import { Table } from 'antd';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getRolesAsync } from '@/store/roles/actions';

const RolesPage = () => {
    // 触发仓库的 reducer 
    const dispatch = useDispatch();
    // 获取仓库的公共数据
    const roles = useSelector((state) => state.roles);
    console.log('roles', roles);


    useEffect(() => {
        getRoles();
    }, [])


    const getRoles = async () => {
        // 调用公共的异步方法
        dispatch(getRolesAsync())
    }

    return (
        <Table dataSource={roles} rowKey="_id"></Table>
    )
}

export default RolesPage