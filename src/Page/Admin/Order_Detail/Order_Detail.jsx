import React, { useEffect, useState } from 'react';
import order_detail_api from '../../../api/order-detail-Api';
import ordersApi from '../../../api/orders';
import { Space, Table, Popconfirm, Button } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { DeleteTwoTone, EditTwoTone, FileAddTwoTone } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { toastSuccess } from '../../../components/toast/Toast';

5
const { Column } = Table;

const Order_detail = () => {

    const { id } = useParams();
    console.log('id', id);

    const [loading, setLoading] = useState(true);
    const [order_detail, setOrder_detail] = useState([]);
    const [expandedRowKeys, setExpandedRowKeys] = useState([]);
    const [productColor, setProductColorList] = useState([]);
    const [productSize, setProductSizeList] = useState([]);
    const [products, setProducts] = useState([])

    

    const fetchOrder_detail = async () => {
        try {
            const response = await order_detail_api.Get(id);
            console.log('response', response);
            setOrder_detail(response);
            setLoading(false)
        } catch (error) {
            console.log('Failed to fetch Order_detail', error);
            setLoading(false)
        }
    };

    const fetchProductsList = async () => {
        try {
            const response = await productApi.GetAll()
            setProducts(response.docs)
        } catch (error) {
            console.log("Failed to fetch Product List");
        }
    }

    const fetchProductSizeList = async () => {
        try {
            const response = await sizeApi.GetAll();
            setProductSizeList(response.docs);
        } catch (error) {
            console.log('Failed to fetch ProductSizeList', error);
        }
    };

    const fetchProductColorList = async () => {
        try {
            const response = await colorApi.GetAll();
            setProductColorList(response.docs);
        } catch (error) {
            console.log('Failed to fetch ProductColorList', error);
        }
    };


    useEffect(() => {
        fetchOrder_detail();
        fetchProductSizeList();
        fetchProductColorList();
        fetchProductsList();
    }, []);


    const expandedRowRender = (record) => {
        const columns = [
            {
                title: 'Sản phẩm',
                dataIndex: 'productId',
                key: 'name',
                render: (productId) => {
                    const product = products.find((item) => item._id === productId);
                    return product ? product.name : '';
                },
            },
            {
                title: 'Màu',
                dataIndex: 'colorId',
                key: 'color',
                render: (colorId) => {
                    const color = productColor.find((item) => item._id === colorId);
                    return color ? color.value : '';
                },
            },
            {
                title: 'Size',
                dataIndex: 'sizeId',
                key: 'size',
                render: (sizeId) => {
                    const size = productSize.find((item) => item._id === sizeId);
                    return size ? size.value : '';
                },
            },
            {
                title: 'Giá',
                dataIndex: 'price',
                key: 'price',
            },
            {
                title: 'Số lượng',
                dataIndex: 'quantity',
                key: 'quantity',
            },

        ];
        return <Table columns={columns} dataSource={record.product_entries} pagination={false} />;
    };


    const handleExpand = (expanded, record) => {
        if (expanded) {
            setExpandedRowKeys([record._id]);
        } else {
            setExpandedRowKeys((prevKeys) => prevKeys.filter((key) => key !== record._id));
        }
    };

    const columns = [
        // {
        //     title: 'Product_Entry_ID',
        //     dataIndex: 'product_entry_id',
        //     key: 'product_entry_id',
        // },
        {
            title: 'Order_ID',
            dataIndex: 'order_id',
            key: 'order_id',
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'VAT',
            dataIndex: 'VAT',
            key: 'VAT',
        },
        {
            title: 'CODE',
            dataIndex: 'code',
            key: 'code',
        },
        
        {
            title: 'Action',
            key: 'operation',
            render: (text, record) => (
                <Space size="middle">
                    {/* <Link to={`/admin/products/edit/${record._id}`}>
                <EditTwoTone style={{ fontSize: '20px', color: '#08c' }} />
              </Link> */}
                    <Popconfirm
                        title="Delete the task"
                        description="Are you sure to delete this task?"
                        onConfirm={() => handleDelete(record._id)}
                        okText="Yes"
                        cancelText="No"
                        okButtonProps={{ className: 'text-light bg-primary' }}
                    >
                        <DeleteTwoTone style={{ fontSize: '18px' }} />
                    </Popconfirm>
                </Space>
            ),
        },
    ];


    return (
        <div>
            <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'flex-end' }}>
                {/* <Link to={'/admin/bills/add'}>
                    <Button type="primary" icon={<FileAddTwoTone />}>
                        Add New
                    </Button>
                </Link> */}
            </div>

            {/* Render the table after the API call is completed */}
            {!loading ? (
                <Table
                    columns={columns}
                    expandable={{
                        expandedRowRender: expandedRowRender,
                        expandedRowKeys: expandedRowKeys,
                        onExpand: handleExpand,
                    }}
                    dataSource={order_detail.map((order) => ({ ...order, key: order._id }))}
                />
            ) : (
                <p>Loading...</p>
            )}

            {/* <Table dataSource={order_detail}>
                <Column title="id" dataIndex="dât" key="_id" />
                <Column title="ID" dataIndex="id" key="id" />

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
                            <Link to={`/admin/bills/edit/${record._id}`}>
                                <EditTwoTone style={{ fontSize: '20px', color: '#08c' }} />
                            </Link>
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
            </Table> */}
        </div>
    );
};


export default Order_detail;
