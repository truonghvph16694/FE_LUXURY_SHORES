import React, { useEffect, useState } from 'react';
import billApi from '../../../api/billsApi';

import { Space, Table, Popconfirm, Button } from 'antd';
import { DeleteTwoTone, EditTwoTone, FileAddTwoTone } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { toastSuccess } from '../../../components/toast/Toast';

5
const { Column } = Table;

const Bills = () => {
    const [billsList, setBillsList] = useState([]);

    const fetchBillsList = async () => {
        try {
            const response = await billApi.GetAll();
            console.log('response', response.docs);
            setBillsList(response.docs);
        } catch (error) {
            console.log('Failed to fetch BillsList', error);
        }
    };
    useEffect(() => {
        fetchBillsList();
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
            <Table dataSource={billsList}>
                {/* <Column title="id" dataIndex="dât" key="_id" /> */}
                {/* <Column title="ID" dataIndex="id" key="id" /> */}
                
                <Column
                    title="user_id"
                    dataIndex="user_id"
                    key="user_id"
                />
                <Column title="Code" dataIndex="code" key="code" />
                <Column title="VAT" dataIndex="VAT" key="VAT" />
                <Column title="Total_price" dataIndex="total_price" key="total_price" />
                <Column title="Order_id" dataIndex="order_id" key="order_id" />
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


export default Bills;
