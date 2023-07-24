import React, { useEffect, useState } from 'react';
import ordersApi from '../../../api/orders';

import { Space, Table, Popconfirm, Button } from 'antd';
import { DeleteTwoTone, EditTwoTone, FileAddTwoTone } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { toastSuccess } from '../../../components/toast/Toast';

5
const { Column } = Table;

const Orders = () => {
    const [ordersList, setOrdersList] = useState([]);

    const fetchOrdersList = async () => {
        try {
            const response = await ordersApi.GetAll();
            console.log('response', response.docs);
            setOrdersList(response.docs);
        } catch (error) {
            console.log('Failed to fetch OrdersList', error);
        }
    };
    useEffect(() => {
        fetchOrdersList();
    }, []);



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
                {/* <Column title="id" dataIndex="dât" key="_id" /> */}
                {/* <Column title="ID" dataIndex="id" key="id" /> */}
                <Column title="Status" dataIndex="status" key="status" />
                <Column
                    title="user_id"
                    dataIndex="user_id"
                    key="user_id"

                />
                <Column title="province_id" dataIndex="province_id" key="province_id" />
                <Column title="district_id" dataIndex="district_id" key="district_id" />
                <Column title="ward_id" dataIndex="ward_id" key="ward_id" />
                <Column title="detail_address" dataIndex="detail_address" key="detail_address" />
                <Column title="created_at" dataIndex="created_at" key="created_at" />
                <Column title="note" dataIndex="note" key="note" />
                <Column title="finish_date" dataIndex="finish_date" key="finish_date" />
                <Column title="ships" dataIndex="ships" key="ships" />
                <Column title="total_price" dataIndex="total_price" key="total_price" />
                <Column title="payment" dataIndex="payment" key="payment" />
                <Column
                    title="Action"
                    render={(record) => (
                        <Space size="middle">
                            <Link to={`/admin/orders/edit/${record._id}`}>
                                <EditTwoTone style={{ fontSize: '20px', color: '#08c' }} />
                            </Link>
                            
                        </Space>
                    )}
                />
            </Table>
        </div>
    );
};


export default Orders;
