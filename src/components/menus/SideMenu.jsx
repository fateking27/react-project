import React, { Children, useState } from 'react';
import { Link } from 'react-router-dom'
import {
    PieChartOutlined,
} from '@ant-design/icons';
import { Button, Menu } from 'antd';

const items = [
    { key: '1', label: <Link to='/home'>首页</Link>, icon: <PieChartOutlined /> },
    { key: '2', label: <Link to='/users'>用户管理</Link>, icon: <PieChartOutlined /> },
    { key: '3', label: '角色管理', icon: <PieChartOutlined /> },
    { key: '4', label: <Link to='/shops'>商铺管理</Link>, icon: <PieChartOutlined /> },
    {
        key: '5', label: '商品管理', icon: <PieChartOutlined />,
        children: [
            { key: '5-1', label: '商品分类' },
            { key: '5-2', label: '商品列表' },
        ]
    },
    // getItem('Home', '1', <PieChartOutlined />),
    // getItem('Shops', '2', <DesktopOutlined />),
    // getItem('User', '3', <ContainerOutlined />),
    // getItem('Admin', 'sub1', <MailOutlined />, [
    //     getItem('Option 5', '5'),
    //     getItem('Option 6', '6'),
    //     getItem('Option 7', '7'),
    //     getItem('Option 8', '8'),
    // ])
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
            />
        </div>
    );
};
export default SideMenu;