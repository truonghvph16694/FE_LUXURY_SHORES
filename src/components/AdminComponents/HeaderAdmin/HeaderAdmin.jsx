import React from 'react';
import { Layout, Menu, message } from 'antd';
import { Header } from 'antd/es/layout/layout';
import SubMenu from 'antd/es/menu/SubMenu';
import { UserOutlined, LaptopOutlined, NotificationOutlined, LogoutOutlined } from '@ant-design/icons';
import userApi from '../../../api/user';


const HeaderAdmin = () => {

    const handleLogout = async () => {
        try {
            await userApi.logout();
            // Do something to handle successful logout (e.g., redirect to login page)
        } catch (error) {
            console.error('API Error:', error);
            message.error('Error occurred. Please try again.');
        }
    };

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
                    <Menu.Item key="8" icon={<LogoutOutlined />} style={{ float: 'right' }}>
                        <button onClick={() => handleLogout}>Logout</button>
                    </Menu.Item>
                </Menu>
            </Header>
            {/* <ToastContainer /> */}
        </Layout>
    );
};

export default HeaderAdmin;