import React, { useEffect } from 'react';
import { Table } from 'antd';
import api from '@/apis/index';

const columns = [
    {
        title: '分类名称',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: '分类层级',
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: '操作',
        dataIndex: 'address',
        key: 'address',
    },
];
const data = [
    {
        key: 1,
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
    },
    {
        key: 2,
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
        description: 'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.',
    },
    {
        key: 3,
        name: 'Not Expandable',
        age: 29,
        address: 'Jiangsu No. 1 Lake Park',
        description: 'This not expandable',
    },
];
const categoryPage = () => {

    useEffect(() => {
        getGoods()
    }, [])

    const getGoods = async () => {
        const res = await api.goods.get()
        console.log(res)
    }


    return <Table
        columns={columns}
        expandable={{
            expandedRowRender: (record) => (
                <p
                    style={{
                        margin: 0,
                    }}
                >
                    {record.description}
                </p>
            ),
            // rowExpandable: (record) => record.name !== 'Not Expandable',
        }}
        dataSource={data}
    />
};
export default categoryPage;