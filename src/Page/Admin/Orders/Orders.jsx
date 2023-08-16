import React, { useEffect, useState } from 'react';
import moment from 'moment';
import ordersApi from '../../../api/orders';
import userApi from '../../../api/user';
import { Space, Table, Popconfirm, Button } from 'antd';
import { DeleteTwoTone, EditTwoTone, FileAddTwoTone, EyeOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { toastSuccess } from '../../../components/toast/Toast';

const { Column } = Table;

const Orders = () => {
    const [ordersList, setOrdersList] = useState([]);
    
    const fetchOrdersList = async () => {
        try {
            const response = await ordersApi.GetAll();
            console.log('response', response);
            setOrdersList(response);
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

    const total_price_after = () => {
        const orderDetailMap = new Map();
    
        ordersList.forEach((order) => {
            order.detail.forEach((item) => {
                const orderId = order._id;
                if (!orderDetailMap.has(orderId)) {
                    orderDetailMap.set(orderId, 0);
                }
                orderDetailMap.set(orderId, orderDetailMap.get(orderId) + item.quantity * item.price);
            });
        });
    
        let total_price_all = 0;
    
        for (const [orderId, totalPrice] of orderDetailMap) {
            total_price_all += totalPrice;
        }
    
        return total_price_all;
    };
    
    

    return (
        <div>
            <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'flex-end' }}>
                {/* <Link to={'/admin/orders/add'}>
                    <Button type="primary" icon={<FileAddTwoTone />}>
                        Add New
                    </Button>
                </Link> */}
            </div>
            <Table dataSource={ordersList}>
                <Column
                    title="Status"
                    dataIndex="status"
                    key="status"
                    render={(status) => convertStatus(status)}
                />
                <Column
                    title="User Name"
                    dataIndex={['user', 'fullname']}
                    key="fullname"
                />
                <Column title="Province ID" dataIndex="province_id" key="province_id" />
                <Column title="District ID" dataIndex="district_id" key="district_id" />
                <Column title="Ward ID" dataIndex="ward_id" key="ward_id" />
                <Column title="Detail Address" dataIndex="detail_address" key="detail_address"  />
                <Column
                    title="Created At"
                    dataIndex="created_at"
                    key="created_at"
                    render={(created_at) => moment(created_at).format('DD/MM/YYYY')}
                />
                <Column title="Note" dataIndex="note" key="note" />
                <Column title="Ships" dataIndex="ships" key="ships" />
                <Column title="Total Price"  key="total_price" render={() => <span>{total_price_after()}</span> } />
                <Column
                    title="Payment"
                    dataIndex="payment"
                    key="payment"
                    render={(payment) => convertPayment(payment)}
                />
                <Column
                    title="Action"
                    render={(record) => (
                        <Space size="middle">
                            <Link to={`/admin/orders/edit/${record._id}`}>
                                <EditTwoTone style={{ fontSize: '20px', color: '#08c' }} />
                            </Link>
                            <Link to={`/admin/order-detail/${record._id}`}>
                                <EyeOutlined style={{ fontSize: '20px', color: '#888' }} />
                            </Link>
                        </Space>
                    )}
                />
            </Table>
        </div>
    );
};

export default Orders;
