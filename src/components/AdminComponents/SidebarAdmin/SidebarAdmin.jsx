import React from 'react'
// import { Breadcrumb, Layout, theme } from 'antd'
import { Layout, Menu } from "antd";
// import { Link } from 'react-router-dom';
import { LaptopOutlined, UserOutlined } from "@ant-design/icons";
import SubMenu from 'antd/es/menu/SubMenu';
const { Sider } = Layout;
const SidebarAdmin = () => {

    return (
        <div>
            <Layout>
                <Sider className="site-layout-background">
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={['1']}

                        style={{ height: '100%', borderRight: 0 }}
                    >
                        <Menu.Item key="1">Categorys</Menu.Item>
                        <Menu.Item key="1">Products</Menu.Item>
                        <SubMenu key="sub1" icon={<UserOutlined />} title="Submenu 1">
                            <Menu.Item key="1">Option 1</Menu.Item>
                            <Menu.Item key="2">Option 2</Menu.Item>
                            <Menu.Item key="3">Option 3</Menu.Item>
                            <Menu.Item key="4">Option 4</Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub2" icon={<LaptopOutlined />} title="Submenu 2">
                            <Menu.Item key="5">Option 5</Menu.Item>
                            <Menu.Item key="6">Option 6</Menu.Item>
                            <Menu.Item key="7">Option 7</Menu.Item>
                            <Menu.Item key="8">Option 8</Menu.Item>
                        </SubMenu>

                    </Menu>
                </Sider>
            </Layout>
        </div>
    )
}

export default SidebarAdmin