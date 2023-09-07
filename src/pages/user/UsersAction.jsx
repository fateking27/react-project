import React, { useEffect, useImperativeHandle, useRef, useState } from 'react'
import { Modal, Form, Input, message, Select } from 'antd'
import api from '@/apis/index';

const UsersAction = (props, ref) => {
    // const [messageApi, contextHolder] = message.useMessage();
    const [open, setOpen] = useState(false);
    const [roles, setRoles] = useState([]);
    const [form] = Form.useForm();
    const updateItem = useRef(null);

    useEffect(() => {
        if (open) {
            getRoles();
        }
    }, [open])

    // 返回数据或方法给父组件
    useImperativeHandle(ref, () => {
        return {
            openModal
        }
    })

    const openModal = (update) => {
        if (update) {
            updateItem.current = {
                ...update,
                role: update.role?._id
            };
            // 表单默认值的渲染
            form.setFieldsValue(updateItem.current)
        }

        setOpen(true);
    }

    const closeModal = () => {
        updateItem.current = null;

        setOpen(false)
    }

    const onOk = () => {
        if (updateItem.current) {
            updateUser();
        } else {
            addUser();
        }
    }
    // 确认新增用户
    const addUser = async () => {
        const formData = form.getFieldsValue();
        const res = await api.users.add(formData);
        if (res.code == 1) {
            closeModal();
            props.getUsers();
            message.success('用户新增成功');
        } else {
            message.error(res.msg);
        }
    }
    // 确认修改用户
    const updateUser = async () => {
        const formData = form.getFieldsValue();
        const res = await api.users.update({
            ...updateItem.current,
            ...formData
        });
        if (res.code == 1) {
            message.success('用户修改成功');
            closeModal();
            props.getUsers();
        } else {
            message.error(res.msg);
        }
    }

    // 获取角色数据
    const getRoles = async () => {
        const res = await api.users.roles();
        if (res.code == 1) {
            setRoles(res.data);
            console.log(res)
        }
    }

    return (
        <Modal title={updateItem.current ? '修改用户' : '新增用户'} open={open} onOk={onOk} onCancel={closeModal} destroyOnClose>
            <Form form={form} style={{ marginTop: 20 }} preserve={false}>
                <Form.Item label="用户账号" name="account">
                    <Input placeholder='请输入用户账号' />
                </Form.Item>
                <Form.Item label="用户密码" name="password">
                    <Input placeholder='请输入用户密码' />
                </Form.Item>
                <Form.Item label="用户邮箱" name="email">
                    <Input placeholder='请输入用户邮箱' />
                </Form.Item>
                <Form.Item label="用户角色" name="role">
                    <Select style={{ width: '100%' }} options={roles} placeholder="请选择角色"
                        fieldNames={{ label: 'name', value: '_id' }} />
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default React.forwardRef(UsersAction)
