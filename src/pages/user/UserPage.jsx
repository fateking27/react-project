import React, { useEffect, useRef, useState } from 'react'
import api from '@/apis/index'
import { Switch, Space, Table, Button, message, Popconfirm, Modal, Form, Input, Tag } from 'antd';
import UsersAction from './UsersAction';
import useRequest from '@/hooks/useRequest';//引入自定义hook

const UserPage = () => {

  const confirm = (_id) => {
    deleteUser(_id)
  };
  const cancel = (e) => {
    message.error('取消删除');
  };

  const { getUsersAsync, user } = useRequest()

  const columns = [
    { title: '用户账号', dataIndex: 'account', align: 'center' },
    { title: '账号密码', dataIndex: 'password', align: 'center' },
    { title: '用户邮箱', dataIndex: 'email', align: 'center' },
    {
      title: '角色', dataIndex: ['role', 'name'], align: 'center',
      render: (name) => {
        if (name == '超级管理员') {
          return <Tag color='red'>{name}</Tag>
        }
        if (name == '普通管理员') {
          return <Tag color='blue'>{name}</Tag>
        }
        if (name) {
          return <Tag color='green'>{name}</Tag>
        }
        return <Tag>暂无</Tag>
      }

    },
    {
      title: '状态', dataIndex: 'state', align: 'center',
      render: (state, record) => (
        <Space>
          <Switch
            checkedChildren="开启"
            unCheckedChildren="关闭"
            // defaultChecked={state}
            checked={state}
            onClick={async () => {
              const res = await api.users.update({
                ...record,
                state: state == 1 ? 0 : 1
              })
              if (res.code == 1) {
                message.success(res.msg);
                getUsers();
              } else {
                message.error('状态修改失败');
                getUsers();
              }
            }} />
        </Space>
      )
    },
    {
      title: '操作', dataIndex: '_id', align: 'center',
      render: (_id, record) => (
        <Space size="middle">
          <Popconfirm
            title=""
            description="确定删除此项?"
            onConfirm={() => confirm(_id)}
            onCancel={cancel}
            okText="是"
            cancelText="否"
          >
            <a>删除</a>
          </Popconfirm>
          <a onClick={() => {
            // 父组件调用子组件的方法
            childRef.current.openModal(record);
          }}>修改</a>
        </Space>
      ),
    },
  ];

  // const [user, setUser] = useState([]);
  const childRef = useRef();

  // 删除
  const deleteUser = async (_id) => {
    const res = await api.users.delete({ _id })
    if (res.code == 1) {
      // console.log(res)
      message.success(res.msg);
      getUsers()
    } else {
      message.warning('删除失败')
    }
  }

  useEffect(() => {
    getUsers()
  }, [])

  const getUsers = async () => {
    // const res = await api.users.get()
    // console.log(res)
    // setUser(res.data)
    getUsersAsync();//调用自定义hook
  }

  return (
    <>
      {/* <Button style={{ margin: 5 }} type="primary" onClick={showModal}>
        添加用户
      </Button>
      <Modal okText="确认"
        cancelText="取消"
        title="添加用户"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}>
        <Form labelAlign='left'>
          <Form.Item label="用户名称">
            <Input></Input>
          </Form.Item>
          <Form.Item label="用户密码">
            <Input></Input>
          </Form.Item>
          <Form.Item label="用户邮箱">
            <Input></Input>
          </Form.Item>
          <Form.Item label="用户角色">
            <Input></Input>
          </Form.Item>
        </Form>
      </Modal> */}
      <div style={{ marginBottom: 20 }}>
        <Button type='primary' onClick={() => {
          // 父组件调用子组件的方法
          childRef.current.openModal();
        }}>新增用户</Button>
      </div>
      <Table columns={columns} dataSource={user} rowKey='_id' />
      <UsersAction ref={childRef} getUsers={getUsers} />
    </>
  )
}

export default UserPage