import React, { useMemo, useState } from 'react';
import * as icons from '@ant-design/icons';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import treeData from '@/data/menus';

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

// 将 treeData 格式的数据转换为菜单格式的数据
const mapTreeData = (data) => {
    return data.map(item => {
        const iconName = item.icon;
        if (item.children) {
            return {
                key: item.key,
                icon: iconName && React.createElement(icons[iconName]),
                label: item.title,
                children: mapTreeData(item.children)
            }
        }
        // item 没有 children
        return {
            key: item.key,
            icon: iconName && React.createElement(icons[iconName]),
            label: <Link to={item.key}>{item.title}</Link>
        }
    })
}
const filterMenusData = (authPath, menusData) => {
    return menusData.reduce((data, item) => {
        if (authPath.includes(item.key)) {
            if (item.children) {
                // 有权限，有 children
                return [
                    ...data,
                    {
                        key: item.key,
                        label: item.label,
                        icon: item.icon,
                        children: filterMenusData(authPath, item.children)
                    }
                ]
            }
            // 有权限，没有 children
            return [...data, item]
        }
        return data;
    }, [])
}



const SideMenu = () => {
    const menusData = useMemo(() => {
        const userInfo = localStorage.userInfo;
        if (userInfo) {
            // 权限路径数组
            const authPath = JSON.parse(userInfo).role.menus;
            // 完整的菜单数组
            const menusData = mapTreeData(treeData);
            console.log(menusData);
            return filterMenusData(authPath, menusData);
        }
        return items;
    }, [])




    return (
        <div>
            <Menu
                defaultSelectedKeys={['']}
                defaultOpenKeys={['']}
                mode="inline"
                theme="dark"
                items={menusData}
                style={{ position: 'fixed', width: 200 }}
            />
        </div>
    );
};

export default SideMenu;