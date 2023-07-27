import React, { useEffect, useState } from 'react';
import order_detail_api from '../../../api/order-detail-Api';

import { Space, Table, Popconfirm, Button } from 'antd';
import { DeleteTwoTone, EditTwoTone, FileAddTwoTone } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { toastSuccess } from '../../../components/toast/Toast';

5
const { Column } = Table;

const Order_detail = () => {
    const [order_detail, setOrder_detail] = useState([]);
    const [expandedRowKeys, setExpandedRowKeys] = useState([]);

    const fetchOrder_detail = async () => {
        try {
            const response = await order_detail_api.GetAll();
            console.log('response', response.docs);
            setOrder_detail(response.docs);
        } catch (error) {
            console.log('Failed to fetch Order_detail', error);
        }
    };
    useEffect(() => {
        fetchOrder_detail();
    }, []);



    return (
        <div>
            <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'flex-end' }}>
                {/* <Link to={'/admin/bills/add'}>
                    <Button type="primary" icon={<FileAddTwoTone />}>
                        Add New
                    </Button>
                </Link> */}
            </div>
            <Table dataSource={order_detail}>
                {/* <Column title="id" dataIndex="dât" key="_id" /> */}
                {/* <Column title="ID" dataIndex="id" key="id" /> */}
                
                <Column
                    title="Product_Entry_ID"
                    dataIndex="product_entry_id"
                    key="product_entry_id"
                />
                <Column title="Price" dataIndex="price" key="price" />
                <Column title="Quantity" dataIndex="quantity" key="quantity" />
                <Column title="Order_id" dataIndex="order_id" key="order_id" />
                <Column title="CreatedAt" dataIndex="createdAt" key="createdAt" />
                
                <Column
                    title="Action"
                    render={(record) => (
                        <Space size="middle">
                            {/* <Link to={`/admin/bills/edit/${record._id}`}>
                                <EditTwoTone style={{ fontSize: '20px', color: '#08c' }} />
                            </Link> */}
                            <Popconfirm
                                title="Xóa bill?"
                                description="Bạn chắc chắn về hành động này?"
                                onConfirm={() => handleDelete(record._id)}
                                okText="Yes"
                                cancelText="No"
                                okButtonProps={{ className: 'text-light bg-primary' }}
                            >
                                <DeleteTwoTone style={{ fontSize: '18px' }} />
                            </Popconfirm>
                        </Space>
                    )}
                />
            </Table>
        </div>
    );
};


export default Order_detail;
