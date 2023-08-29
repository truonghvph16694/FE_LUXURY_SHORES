import React, { useEffect, useState } from 'react';
import moment from 'moment';
import ordersApi from '../../api/orders';

import { Space, Table, Popconfirm, Button } from 'antd';
import { DeleteTwoTone, EditTwoTone, FileAddTwoTone, EyeOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { toastSuccess } from '../../components/toast/Toast';

const { Column } = Table;

const Orders = () => {
    const [ordersList, setOrdersList] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchOrdersList = async () => {
        try {
            const userlocal = localStorage.getItem('user')
            const user = JSON.parse(userlocal)
            const response = await ordersApi.GetAll();
            const data = await response.filter(item => item.user_id === user._id)
            console.log('data', data);
            setOrdersList(data);
            setLoading(false)
        } catch (error) {
            console.log('Failed to fetch OrdersList', error);
        }
    };



    const convertStatus = (status) => {
        switch (status) {
            case 0:
                return 'Đơn hàng mới';
            case 1:
                return 'Đang xử lý';
            case 2:
                return 'Đang giao hàng';
            case 3:
                return 'Hoàn thành';
            default:
                return 'Đang xử lý';
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
        fetchOrdersList();

    }, []);


    const expandedRowRender = (record, index) => {
        console.log('record:', record)

        const columns = [{
            title: 'Tên sản phẩm',
            render: (record) => {
                return record.product.name;
            },
        },
        {
            title: 'Hình ảnh',
            render: (record) => {
                return <img src={record.images[0].path} width="15%" alt="" />
            },
        },
        {
            title: 'Hình ảnh',
            render: (record) => {
                return record.quantity
            },
        },
        {
            title: 'Giá',
            render: (record) => {
                return record.product.price
            }
        },
        ];
        // console.log('pr:',ordersList)
        return (
            <Table columns={columns} dataSource={record.product} pagination={false} />

        );
    };

    const columns = [
        {
            title: "Trạng thái đơn hàng",
            dataIndex: "status",
            key: "status",
            render: (status) => convertStatus(status)
        },
        {
            title: "Tên khách hàng",
            dataIndex: ['user', 'fullname'],
            key: "fullname"
        },
        {
            title: "Tỉnh/Thành phố",
            dataIndex: "province_id",
            key: "province_id"
        },
        {
            title: "Quận/Huyện",
            dataIndex: "district_id",
            key: "district_id"
        },
        {
            title: "Xã/Phường",
            dataIndex: "ward_id",
            key: "ward_id"
        },
        {
            title: "Địa chỉ cụ thể",
            dataIndex: "detail_address",
            key: "detail_address"
        },
        {
            title: "Thời gian đặt",
            dataIndex: "created_at",
            key: "created_at",
            render: (created_at) => moment(created_at).format('DD/MM/YYYY')
        },
        {
            title: "Ghi chú",
            dataIndex: "note",
            key: "note"
        },
        {
            title: "Tổng tiền",
            dataIndex: "total_price",
            key: "total_price"
        },
        {
            title: "Phương thức thanh toán",
            dataIndex: "payment",
            key: "payment",
            render: (payment) => convertPayment(payment)
        },
        {
            title: "Trạng thái thanh toán",
            dataIndex: "status_payment",
            key: "status_payment",
            render: (payment) => convert_status_Payment(payment)
        },
        {
            title: "Action",
            render: (record) => (
                <Space size="middle">
                    <button className='max-w-[150px] bg-[#ee4d2d] text-[#fff] rounded py-[5px]' type='submit' >Huỷ đơn hàng</button>
                </Space>
            )
        }
        // Other fields you want to display in the main table
    ];


    return (
        <div>

            <div>
                {!loading ? (
                    <Table
                        columns={columns}
                        expandable={{
                            expandedRowRender: expandedRowRender,
                        }}
                        dataSource={ordersList.map(order => ({ ...order, key: order._id }))}
                    // defaultExpandAllRows={true} 
                    />
                ) : (
                    <p>Loading...</p>
                )}
            </div>


            {/* <Table dataSource={ordersList}>
            <Column
                title="Trạng thái đơn hàng"
                dataIndex="status"
                key="status"
                render={(status) => convertStatus(status)}
            />
            <Column
                title="Tên khách hàng"
                dataIndex={['user', 'fullname']}
                key="fullname"
            />
            <Column title="Tỉnh/Thành phố" dataIndex="province_id" key="province_id" />
            <Column title="Quận/Huyện" dataIndex="district_id" key="district_id" />
            <Column title="Xã/Phường" dataIndex="ward_id" key="ward_id" />
            <Column title="Địa chỉ cụ thể" dataIndex="detail_address" key="detail_address" />
            <Column
                title="Thời gian đặt"
                dataIndex="created_at"
                key="created_at"
                render={(created_at) => moment(created_at).format('DD/MM/YYYY')}
            />
            <Column title="Ghi chú" dataIndex="note" key="note" />
            <Column title="Total Price" dataIndex="total_price" key="total_price" />
            <Column
                title="Phương thức thanh toán"
                dataIndex="payment"
                key="payment"
                render={(payment) => convertPayment(payment)}
            />
            <Column
                title="Trạng thái thanh toán"
                dataIndex="status_payment"
                key="status_payment"
                render={(payment) => convert_status_Payment(payment)}
            />
            <Column
                title="Action"
                render={(record) => (
                    <Space size="middle">
                        <button className='max-w-[150px] bg-[#ee4d2d] text-[#fff] rounded py-[5px]' type='submit' >Huỷ đơn hàng</button>
                    </Space>
                )}
            />
        </Table> */}
        </div>
    );
};

export default Orders;
