import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import userApi from '../../../api/user';
import logo from "../../../../public/logo.png"
import { toastError } from '../../../components/toast/Toast';

const Signin = () => {
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();
  const {
    // register,
    // handleSubmit,
    formState: { errors },
  } = useForm();

  const onFinish = async (values) => {
    // console.log('value', values)
    setLoading(true);

    try {
      const response = await userApi.signin(values);
      console.log('API Response:', response);
      setLoading(false);

      if (response.accessToken) {
        if (response.user.status == true) {
          if (response.user.type === "admin") {
            localStorage.setItem("user", JSON.stringify(response.user))
            localStorage.setItem('token', JSON.stringify(response.accessToken))
            setTimeout(() => {
              nav("/admin")
            }, 1000)

          } else {
            localStorage.setItem('token', JSON.stringify(response.accessToken))
            localStorage.setItem("user", JSON.stringify(response.user))
            setTimeout(() => {
              nav("/")
            }, 1000)
          }

        } else {
          message.error('Invalid credentials. Please try again.');
        }
      } else {
        message.error("Invalid credentials. Please try again.")
      }



    } catch (error) {
      console.error('API Error:', error);
      setLoading(false);
      toastError("Tài khoản hoặc mật khẩu không chính xác!")
    }
  };

  return (
    <div className="pt-8 ">
      <div className="xl:w-[1600px] xl:mx-auto mt-5 mb-10 shadow-inner rounded-lg mx-3">
        <div className="content grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 shadow-lg">
          <img
            className="hidden xl:block lg:block bg-[#e7f6fb] rounded-l-lg"
            alt="Logo"
            // src="https://res.cloudinary.com/assignment22/image/upload/v1668812529/Ass-reactjs/20221114_LvgOAj9N9Fklx76G5UyG9SHD_pncdqr.jpg"
            src={logo}
          />
          <section>
            <div className="min-h-full flex items-center justify-center p-12 px-4 sm:px-6 lg:px-8">
              <div className="max-w-md w-full space-y-8">
                <div>
                  <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 uppercase">
                    Đăng nhập
                  </h2>
                </div>
                <Form
                  className="mt-8 space-y-6"
                  id="form-signin"
                  onFinish={onFinish}
                >
                  <div className="rounded-md shadow-sm -space-y-px">
                    <div className="mb-4">
                      <label htmlFor="email" className="py-2">
                        Email
                      </label>
                      <Form.Item
                        name="email"
                        rules={[
                          { required: true, message: 'Vui lòng nhập email' },
                          {
                            pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                            message: 'Vui lòng nhập đúng định dạng email',
                          },
                        ]}
                      >
                        <Input
                          id="email"
                          type="email"
                          placeholder="Email"
                          prefix={<UserOutlined />}
                          className="appearance-none rounded-none relative  px-3 py-2 mt-1 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md ease-in-out duration-300 hover:border-blue-500 focus:outline-none focus:ring-blue-700 focus:border-blue-700 focus:z-10 sm:text-sm email"
                        />
                      </Form.Item>
                      <p className="text-red-400 text-xs">
                        {errors.email?.message}
                      </p>
                    </div>
                    <div className="mb-4">
                      <label htmlFor="input-password" className="py-2">
                        Mật khẩu
                      </label>
                      <Form.Item
                        name="password"
                        rules={[
                          { required: true, message: 'Vui lòng nhập mật khẩu' },
                          {
                            min: 8,
                            message: 'Vui lòng nhập mật khẩu trên 8 ký tự',
                          },
                        ]}
                      >
                        <Input.Password
                          id="password"
                          placeholder="Mật khẩu"
                          prefix={<LockOutlined />}
                          className="password appearance-none rounded-none relative px-3 py-2 mt-1 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md ease-in-out duration-300 hover:border-blue-700 focus:outline-none focus:ring-blue-700 focus:border-blue-700 focus:z-10 sm:text-sm"
                          autoComplete="on"
                        />
                      </Form.Item>
                      <p className="text-red-400 text-xs">
                        {errors.password?.message}
                      </p>
                    </div>
                  </div>
                  <div>
                    <Button
                      type="primary"
                      htmlType="submit"
                      loading={loading}
                      className="group w-full relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-700 ease-in-out duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Đăng nhập
                    </Button>
                  </div>
                  <p className="mt-3 text-center text-sm text-gray-600 mr-2">
                    Bạn chưa có tài khoản?
                    <Link to="/signup">
                      <span className="ml-2 cursor-pointer font-medium ease-in-out duration-300 text-blue-500 hover:text-blue-700">
                        Đăng ký
                      </span>
                    </Link>
                  </p>
                  <div className="flex items-center justify-center">
                    {/* ... Your existing code ... */}
                  </div>
                </Form>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Signin;
