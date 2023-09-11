import React, { Children, useState } from 'react';
import { Link } from 'react-router-dom'
import {
    PieChartOutlined,
} from '@ant-design/icons';
import { Button, Menu } from 'antd';

const items = [
    { key: '1', label: <Link to='/home'>首页</Link>, icon: <PieChartOutlined /> },
    { key: '2', label: <Link to='/users'>用户管理</Link>, icon: <PieChartOutlined /> },
    { key: '3', label: <Link to='/roles'>角色管理</Link>, icon: <PieChartOutlined /> },
    { key: '4', label: <Link to='/shops'>商铺管理</Link>, icon: <PieChartOutlined /> },
    {
        key: '5', label: '商品管理', icon: <PieChartOutlined />,
        children: [
            { key: '5-1', label: <Link to='/category'>商品分类</Link> },
            { key: '5-2', label: <Link to='/goods/goodlist'>商品列表</Link> },
        ]
    },
];

const SideMenu = () => {
    return (
        <div>
            <Menu
                defaultSelectedKeys={['']}
                defaultOpenKeys={['']}
                mode="inline"
                theme="dark"
                items={items}
                style={{position: 'fixed',width:200}}
            />
        </div>
    );
};

export default SideMenu;