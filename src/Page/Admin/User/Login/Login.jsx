import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import fuserApi from '../../../../api/fuser';
import { Container, Row, Col } from 'react-bootstrap';
import {
    useNavigate
} from 'react-router-dom';

const Login = () => {
    const [loading, setLoading] = useState(false);
    const nav = useNavigate()
    const onFinish = async (values) => {
        setLoading(true);

        try {
            const response = await fuserApi.signin(values);
            console.log('API Response:', response);
            setLoading(false);
            nav('/admin');
            // Do something with the API response (e.g., handle login success or error)
        } catch (error) {
            console.error('API Error:', error);
            setLoading(false);
            message.error('Error occurred. Please try again.');
        }
    };

    return (
        <Container className="login-container">
            <Row>
                <Col xs={6} md={7} lg={7}>
                    <div className="login-image">
                        <img
                            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                            alt="Sample"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </Col>
                <Col xs={6} md={5} lg={7} className="flex items-center">
                    <div className="login-form-container">
                        <Form
                            name="normal_login"
                            className="login-form"
                            initialValues={{
                                remember: true,
                            }}
                            onFinish={onFinish}
                        >
                            <Form.Item
                                name="email"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your Username!',
                                    },
                                ]}
                            >
                                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
                            </Form.Item>
                            <Form.Item
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your Password!',
                                    },
                                ]}
                            >
                                <Input
                                    prefix={<LockOutlined className="site-form-item-icon" />}
                                    type="password"
                                    placeholder="Password"
                                />
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" className="login-form-button" loading={loading}>
                                    Log in
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Login;