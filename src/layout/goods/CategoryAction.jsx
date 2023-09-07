import React, { useEffect, useImperativeHandle, useMemo, useState } from 'react'
import { Modal, Form, Select, Input, message } from 'antd'
import api from '@/api';

const CategoryAction = (props, ref) => {
    const [form] = Form.useForm();

    const [category, setCategory] = useState([]);
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({});

    const parentSelect = useMemo(() => {
        if (formData.type?.includes('一级')) {
            // 进入 if，说明新增一级分类，没有父级分类
            return [
                { name: '无', _id: 0 }
            ]
        }
        // 新增二级分类，需要渲染父级分类
        return category;
    }, [formData, category])


    useEffect(() => {
        if (open) {
            getCategory();
        }
    }, [open])

    useEffect(() => {
        // 设置“父级分类”下拉列表默认值
        form.setFieldsValue({
            parentId: parentSelect[0]?._id
        })
    }, [parentSelect])

    useImperativeHandle(ref, () => {
        return {
            openModal
        }
    })


    // 打开弹窗
    const openModal = (formData) => {
        setFormData(formData);
        // 设置表单的默认值
        form.setFieldsValue(formData);

        setOpen(true);
    }

    // 关闭弹窗
    const closeModal = () => {
        setOpen(false);
    }

    // 获取一级分类
    const getCategory = async () => {
        const res = await api.category.get({ parentId: 0 });
        if (res.code == 1) {
            setCategory(res.data.data);
        }
    }

    const onOk = () => {
        addCategory();
    }

    const addCategory = async () => {
        const formData = form.getFieldsValue();
        const res = await api.category.add(formData);
        if (res.code == 1) {
            message.success('商品分类新增成功');
            closeModal();
            props.getCategory();
        } else {
            message.error(res.msg);
        }
    }

    return (
        <Modal title="新增分类" open={open} onOk={onOk} onCancel={closeModal}>
            <Form form={form}>
                <Form.Item label="分类层级" name="type">
                    <Select onChange={(value) => {
                        // 修改“父级分类”下拉列表的可选内容
                        setFormData({
                            ...formData,
                            type: value
                        })
                        // // 设置“父级分类”下拉列表默认值
                        // form.setFieldsValue({
                        //     parentId: parentSelect[0]._id
                        // })
                    }} options={[
                        { label: '一级分类', value: '一级分类' },
                        { label: '二级分类', value: '二级分类' },
                    ]}></Select>
                </Form.Item>
                <Form.Item label="父级分类" name="parentId">
                    <Select options={parentSelect} fieldNames={{ label: 'name', value: '_id' }}></Select>
                </Form.Item>
                <Form.Item label="分类名称" name="name">
                    <Input placeholder='请输入分类名称' />
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default React.forwardRef(CategoryAction)