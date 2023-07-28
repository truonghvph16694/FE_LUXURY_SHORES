import React, { useEffect, useState } from 'react';
import ordersApi from '../../../api/orders';
import userApi from '../../../api/user';
import { Space, Table, Popconfirm, Button } from 'antd';
import { DeleteTwoTone, EditTwoTone, FileAddTwoTone } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { toastSuccess } from '../../../components/toast/Toast';

5
const { Column } = Table;

const Orders = () => {

    const [ordersList, setOrdersList] = useState([]);
    const [userList, setUserList] = useState([]);

    const fetchOrdersList = async () => {
        try {
            const response = await ordersApi.GetAll();
            console.log('response', response);
            setOrdersList(response);
        } catch (error) {
            console.log('Failed to fetch OrdersList', error);
        }
        
    };

    const fetchUserList = async () => {
        try {
            const response = await userApi.GetAll();
            console.log('response', response.docs);
            setUserList(response.docs);
        } catch (error) {
            console.log('Failed to fetch UsersList', error);
        }
        
    };

    const convertStatus = (status) => {
        switch (status) {
            case 0:
                return 'Đơn hàng mới';
                break;
            case 1:
                return 'Đang xử lý';
                break;
            case 2:
                return 'Đang giao hàng';
                break;
            case 3:
                return 'Hoàn thành';
                break;
            default:
                return 'Đang xử lý'
                break;
        }
    }

    const convertPayment = (Payment) => {
        switch (Payment) {
            case 0:
                return 'Thanh toán bằng tiền mặt';
                break;
            case 1:
                return 'Chuyển khoản';
                break;
            case 2:
                return 'Thanh toán khi nhận hàng';
                break;
            default:
                return 'Đang xử lý'
                break;
        }
    }
    

    useEffect(() => {
        fetchOrdersList();
        fetchUserList();
    }, []);



    return (
        <div>
            <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'flex-end' }}>
                <Link to={'/admin/orders/add'}>
                    <Button type="primary" icon={<FileAddTwoTone />}>
                        Add New
                    </Button>
                </Link>
            </div>
            <Table dataSource={ordersList}>
                {/* <Column title="id" dataIndex="dât" key="_id" /> */}
                {/* <Column title="ID" dataIndex="id" key="id" /> */}
                <Column title="Status" dataIndex="status" key="status" render={(status) => convertStatus(status)} />
                <Column
                    title="User_Name"
                    dataIndex={['user', 'fullname']}
                    key="fullname"

                />
                <Column title="province_id" dataIndex="province_id" key="province_id" />
                <Column title="district_id" dataIndex="district_id" key="district_id" />
                <Column title="ward_id" dataIndex="ward_id" key="ward_id" />
                <Column title="detail_address" dataIndex="detail_address" key="detail_address" />
                <Column title="created_at" dataIndex="created_at" key="created_at" />
                <Column title="note" dataIndex="note" key="note" />
                <Column title="ships" dataIndex="ships" key="ships" />
                <Column title="total_price" dataIndex="total_price" key="total_price" />
                <Column title="payment" dataIndex="payment" key="payment" render={(payment) => convertPayment(payment)}/>
                <Column
                    title="Action"
                    render={(record) => (
                        <Space size="middle">
                            <Link to={`/admin/orders/edit/${record._id}`}>
                                <EditTwoTone style={{ fontSize: '20px', color: '#08c' }} />
                            </Link>
                            <Link to={`/admin/order-detail/${record._id}`}>
                                <EditTwoTone style={{ fontSize: '20px', color: '#888' }} />
                            </Link>
                        </Space>
                        
                    )}
                />
            </Table>
        </div>
    );
};


export default Orders;
