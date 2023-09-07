import React, { useEffect, useMemo, useState, useRef } from 'react'
import { Space, Table, Tag, Button } from 'antd';
import api from '@/apis/index';
import CategoryAction from './CategoryAction';
const categoryPage = () => {

    const columns = [
        { title: '分类名称', dataIndex: 'name' },
        {
            title: '分类层级', dataIndex: 'type', render: (type) => {
                if (type.includes('一级')) {
                    return <Tag bordered={false} color='red'>{type}</Tag>
                }
                if (type.includes('二级')) {
                    return <Tag bordered={false} color='blue'>{type}</Tag>
                }
                return <Tag bordered={false} color='green'>{type}</Tag>
            }
        },
        {
            title: '操作', dataIndex: '_id', render: (_id, record) => {
                return (
                    <Space>
                        <a>删除</a>
                        <a>修改</a>
                        {record.parentId == 0 && <a>添加子分类</a>}
                    </Space>
                )
            }
        },
    ]

    const [category, setCategory] = useState([]);
    const childRef = useRef();

    const allCategory = useMemo(() => {
        return category.map(item => {
            if (item.children) {
                return item;
            }
            return {
                ...item,
                children: [],   // 让表格数据前显示展开符号（+）
            }
        })
    }, [category])

    useEffect(() => {
        getCategory();
    }, [])

    const getCategory = async (data = { parentId: 0 }) => {
        const res = await api.category.get(data);
        console.log(res)
        if (res.code == 1) {
            if (data.parentId == 0) {
                setCategory(res.data.data);
            } else {
                // 保存二级分类的数据
                setCategory(category.map(item => {
                    if (item._id == data.parentId) {
                        return {
                            ...item,
                            children: res.data.data
                        }
                    }
                    return item;
                }))
            }
        }
    }


    return (
        <>
            <div style={{ marginBottom: 20 }}>
                <Button type='primary' onClick={() => {
                    // 父组件调用子组件的方法
                    childRef.current.openModal();
                }}>添加一级分类</Button>
            </div>
            <Table columns={columns} dataSource={allCategory} rowKey="_id"
                expandable={{
                    indentSize: 50,
                    onExpand: (expand, record) => {
                        if (expand) {
                            getCategory({ parentId: record._id });
                        }
                    }
                }} />
            <CategoryAction ref={childRef} getCategory={getCategory} />
        </>
    )
};
export default categoryPage;