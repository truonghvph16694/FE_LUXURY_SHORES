import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Table } from 'antd';
import moment from 'moment';
import queryString from "query-string";

import ordersApi from '../../api/orders';
import paymentApi from '../../api/payment';

const Thanks = () => {
    const { id } = useParams();
    const [ordersList, setOrdersList] = useState([]);
    // const [loading, setLoading] = useState(true);

    const userlocal = localStorage.getItem('user');
    const user = JSON.parse(userlocal);
    const currentUrl = window.location.href;

    const queryParams = queryString.parse(currentUrl.split("?")[1]);
    const fetchOrders = async () => {
        // try {

        if (queryParams.vnp_SecureHash) {
            await paymentApi.changStatusPayment({ id: id, vnp_ResponseCode: queryParams.vnp_ResponseCode });
        }
        const response = await ordersApi.GetAll();
        const data = response.filter(item => item.user_id === user._id && item._id === id);

        const ordersWithData = await Promise.all(data.map(async (order) => {
            const provinceName = await onProvince(order.province_id);
            const districtName = await onDistrict(order.district_id);
            const wardName = await onWard(order.ward_id);
            return {
                ...order,
                provinceName,
                districtName,
                wardName
            };
        }));

        setOrdersList(ordersWithData);
        console.log("item:", data)
        // setLoading(false);
        // } catch (error) {
        //     console.log('Failed to fetch OrdersList', error);
        // }
    };

    const onProvince = async (id) => {
        try {
            const response = await fetch(`https://provinces.open-api.vn/api/p/${id}`);
            const data = await response.json(); // Parse JSON response
            console.log('Data:', data); // Log the data for debugging
            return data.name; // Return the 'name' property from the data
        } catch (error) {
            console.error('Error:', error);
            return null; // Return null in case of an error
        }
    };
    const onDistrict = async (id) => {
        try {
            const response = await fetch(`https://provinces.open-api.vn/api/d/${id}`);
            const data = await response.json();
            return data.name;
        } catch (error) {
            console.error('Error:', error);
            return null;
        }
    };

    const onWard = async (id) => {
        try {
            const response = await fetch(`https://provinces.open-api.vn/api/w/${id}`);
            const data = await response.json();
            return data.name;
        } catch (error) {
            console.error('Error:', error);
            return null;
        }
    };

    const convertPayment = (payment) => {
        switch (payment) {
            case 0:
                return 'Thanh toán bằng tiền mặt';
            case 1:
                return 'Chuyển khoản';
            case 2:
                return 'Thanh toán khi nhận hàng';
            default:
                return 'Đang xử lý';
        }
    };

    const convert_status_Payment = (payment) => {
        switch (payment) {
            case 0:
                return 'Chưa thanh toán';
            case 1:
                return 'Đã thanh toán'
            default:
                return 'Đang xử lý';
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const leftContent = (
        <div className='w-[95%] ml-4'>
            <div className="flex items-center justify-center mb-4 ">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-24 w-24 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                    />
                </svg>
            </div>
            <h2 className="text-4xl font-semibold mb-4 flex items-center justify-center">Thank You!</h2>
            <p className="text-gray-600">
                Chúng tôi xin chân thành cảm ơn bạn đã lựa chọn mua sắm tại cửa hàng của chúng tôi! Sự ủng hộ của bạn không chỉ là nguồn động viên quý báu mà còn là động lực giúp chúng tôi không ngừng hoàn thiện và phục vụ tốt hơn.!<br /><br />
                Việc bạn tin tưởng và chọn lựa sản phẩm của chúng tôi không chỉ giúp bạn trải nghiệm những sản phẩm tốt nhất mà còn giúp chúng tôi phát triển và phục vụ cộng đồng ngày càng tốt hơn.<br /><br />
                Một lần nữa, chúng tôi chân thành cảm ơn bạn vì đã đồng hành cùng chúng tôi. Chúc bạn có những trải nghiệm mua sắm thú vị và hài lòng tại cửa hàng của chúng tôi!<br />
            </p>
            <button className="mt-6 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">
                <Link to={'/'}> Back to Home</Link>
            </button>
        </div>
    );

    const columns_4 = [
        {
            title: "Mã đơn hàng",
            dataIndex: "_id",
            key: "_id",
            // render: () => {
            //     // return ""
            // }
        }
    ]

    const columns_5 = [
        {
            title: "Khách hàng",
            dataIndex: "fullName",
            key: "fullName"
        },
        {
            title: "Tỉnh/Thành phố",
            dataIndex: "provinceName", // Use the provinceName field instead of province_id
            key: "provinceName"
        },
        {
            title: "Huyện/Quận",
            dataIndex: "districtName",
            key: "districtName"
        },
        {
            title: "Xã/Phường",
            dataIndex: "wardName",
            key: "wardName"
        }
    ]

    const columns_3 = [
        {
            title: "Phương thức thanh toán",
            dataIndex: "payment",
            key: "payment",
            render: (payment) => {
                return convertPayment(payment)
            }
        },
        {
            title: "Trạng thái thanh toán",
            dataIndex: "status_payment",
            key: "status_payment",
            render: (payment) => {
                return convert_status_Payment(payment)
            }
        }
    ]

    const columns_2 = [
        {
            title: "Sản phẩm",
            dataIndex: "product",
            key: "product",
            render: (product) => {
                return product.map((item, i) => <div key={i}>{item.product.name}</div>);
            }
        },
        {
            title: "Kích cỡ",
            dataIndex: "product",
            key: "product",
            render: (product) => {
                return product.map((item, i) => <div key={i}>{item.size.value}</div>);
            }
        },
        {
            title: "Số lượng",
            dataIndex: "product",
            key: "product",
            render: (product) => {
                return product.map((item, i) => <div key={i}>{item.quantity}</div>);
            }
        },
        {
            title: "Giá thành",
            dataIndex: "product",
            key: "product",
            render: (product) => {
                return product.map((item, i) => <div key={i}>{item.product.price} VNĐ</div>);
            }
        }
    ];

    const columns_1 = [
        {
            title: "Thời gian đặt",
            dataIndex: "created_at",
            key: "created_at",
            render: (created_at) => moment(created_at).format('DD/MM/YYYY')
        },
        {
            title: "Phí giao hàng",
            dataIndex: "ships",
            key: "ships",
            render: (ships) => `${ships} VNĐ`
        },
        {
            title: "TỔNG TIỀN (đã bao gồm phí giao hàng)",
            dataIndex: "total_price",
            key: "total_price",
            render: (total_price) => `${total_price} VNĐ`
        }
    ];

    return (
        <div className="flex items-center justify-center pt-24 pb-24 bg-gray-100">
            <div className="bg-white p-8 rounded shadow-lg w-full flex">
                <div className="w-1/2 pr-1">
                    {leftContent}
                </div>
                <div className="w-1/2 pl-1">

                    <Table
                        columns={columns_4}
                        dataSource={ordersList}
                        // loading={loading}
                        pagination={false}
                    />

                    <Table
                        columns={columns_5}
                        dataSource={ordersList}
                        // loading={loading}
                        pagination={false}
                    />

                    <Table
                        columns={columns_2}
                        dataSource={ordersList}
                        // loading={loading}
                        pagination={false}
                    />

                    <Table
                        columns={columns_3}
                        dataSource={ordersList}
                        // loading={loading}
                        pagination={false}
                    />

                    <Table
                        columns={columns_1}
                        dataSource={ordersList}
                        // loading={loading}
                        pagination={false}
                    />
                </div>
            </div>
        </div>
    );
};

export default Thanks;
