import React from 'react'
import { Layout, Menu } from 'antd';
import { Header } from 'antd/es/layout/layout';
import SubMenu from 'antd/es/menu/SubMenu';
import UserOutlined from '@ant-design/icons/lib/icons/UserOutlined';
import LaptopOutlined from '@ant-design/icons/lib/icons/LaptopOutlined';
import NotificationOutlined from "@ant-design/icons/lib/icons/NotificationOutlined";


// const { Header } = Layout;
const HeaderAdmin = () => {
    return (
        <Layout>
            <Header className="header" style={{ width: '100%', padding: '0px' }}>
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} style={{ width: '100%' }}>
                    <Menu.Item key="1">Home</Menu.Item>
                    <Menu.Item key="2">About</Menu.Item>
                    <SubMenu key="sub1" icon={<UserOutlined />} title="Dropdown">
                        <Menu.Item key="3">Option 1</Menu.Item>
                        <Menu.Item key="4">Option 2</Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub2" icon={<LaptopOutlined />} title="Dropdown">
                        <Menu.Item key="5">Option 3</Menu.Item>
                        <Menu.Item key="6">Option 4</Menu.Item>
                    </SubMenu>
                    <Menu.Item key="7" icon={<NotificationOutlined />} />
                </Menu>
            </Header>
        </Layout>
    )
}

export default HeaderAdmin