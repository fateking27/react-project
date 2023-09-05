import React, { useState, useEffect } from 'react'
import api from '@/apis/index'
import { Space, Table, Tag } from 'antd';

const UserPage = () => {
  const columns = [
    {
      title: '用户账号',
      dataIndex: 'account',
    },
    {
      title: '账号密码',
      dataIndex: 'password',
    },
    {
      title: '用户邮箱',
      dataIndex: 'email',
    },
    {
      title: '角色',
      dataIndex: 'role',
    },
    {
      title: '状态',
      dataIndex: 'state',
    },
    {
      title: '操作',
      dataIndex: '_id',
      render: (_id, record) => (
        <Space size="middle">
          <a onClick={() => {
            deleteUser(_id)
            // console.log('data', record)
          }}>删除</a>
          <a>修改</a>
        </Space>
      ),
    },
  ];

  const [user, setUser] = useState([]);

  // 删除
  const deleteUser = async (_id) => {
    const res = await api.users.delete(_id)
    console.log(res)
    getUsers()
  }

  useEffect(() => {
    getUsers()
  }, [])


  const getUsers = async () => {
    const res = await api.users.get()
    console.log(res)
    setUser(res.data)
  }
  return (
    <>
      <Table columns={columns} dataSource={user} rowKey={record => record._id} />
    </>
  )
}

export default UserPage