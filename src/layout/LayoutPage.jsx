import React, { useState } from 'react';
import SideMenu from '@/components/menus/SideMenu';
import { Layout, theme } from 'antd';
import { Outlet } from 'react-router-dom';
import HomePage from './home/HomePage';
const { Header, Sider, Content } = Layout;
const LayoutPage = () => {
  const [collapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();




  return (

    <Layout style={{ minHeight: '100vh' }}>
      <Sider>
        <div className='logo'></div>
        <SideMenu></SideMenu>
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
        </Header>
        <Content style={{ margin: 20 }}>
          <div style={{ padding: 20, background: colorBgContainer, }}>
            <Outlet>
              <HomePage></HomePage>
            </Outlet>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
export default LayoutPage;
