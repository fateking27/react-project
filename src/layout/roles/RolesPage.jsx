import api from '@/apis';
import { Tag, Table } from 'antd';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getRolesAsync } from '@/store/roles/actions';
import { SettingOutlined } from '@ant-design/icons';

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

    const columns = [
        {
            title: '角色名称',
            dataIndex: 'name',
            render: (name) => {
                if (name == '超级管理员') {
                  return <Tag color='darkred'>{name}</Tag>
                }
                if (name == '普通管理员') {
                  return <Tag color='darkblue'>{name}</Tag>
                }
                if (name == '商品管理员') {
                  return <Tag color='darkgreen'>{name}</Tag>
                }
                if (name) {
                  return <Tag color='green'>{name}</Tag>
                }
                return <Tag>暂无</Tag>
              }
        },
        {
            title: '权限管理',
            dataIndex: 'menus',
            align: 'center',
            render:() => (
                <>
                    <span>
                        <SettingOutlined style={{ fontSize: '16px', color: '#08c' }}/>
                    </span>
                </>
            )
        },
    ];

    return (
        <Table dataSource={roles} columns={columns} rowKey="_id"></Table>
    )
}

export default RolesPage