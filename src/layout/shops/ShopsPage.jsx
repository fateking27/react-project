import React, { useState } from 'react'

import { Space, Table, Tag } from 'antd';


const ShopsPage = () => {
  const columns = [
    {
      title: '商品编号',
      dataIndex: 'id',
    },
    {
      title: '商铺名称',
      dataIndex: 'name',
      render: (text) => {
        return <a>{text}</a>
      }
    },
    {
      title: '注册日期',
      dataIndex: 'registerDate',
    },
    {
      title: '操作',
      dataIndex: 'id',
      render: (id, record) => (
        <Space size="middle">
          <a onClick={() => deleteShop(id)}>删除</a>
          <a>修改</a>
        </Space>
      ),
    },
  ];

  const [shops, setShops] = useState([
    { id: 1, name: '零食铺子', registerDate: '2023-01-01' },
    { id: 2, name: '卖电脑的', registerDate: '2023-02-01' },
  ]);

  // 删除
  const deleteShop = (id) => {
    setShops(shops.filter(item => item.id != id));
  }

  return (
    <>
      <Table columns={columns} dataSource={shops} rowKey="id" />
    </>
  )
}

export default ShopsPage