import React, { useEffect, useState } from 'react';
import order_detail_api from '../../../api/order-detail-Api';
import sizeApi from '../../../api/size';
import colorApi from '../../../api/color';
// import ordersApi from '../../../api/orders';
import { Space, Table, Popconfirm, Button } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { DeleteTwoTone, EditTwoTone, FileAddTwoTone } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { toastSuccess } from '../../../components/toast/Toast';
import productApi from '../../../api/products';

5
const { Column } = Table;

const Order_detail = () => {

    const { id } = useParams();
    // console.log('id', id);

    const [loading, setLoading] = useState(true);
    const [order_detail, setOrder_detail] = useState([]);
    const [expandedRowKeys, setExpandedRowKeys] = useState([]);
    const [productColor, setProductColorList] = useState([]);
    const [productSize, setProductSizeList] = useState([]);
    const [products, setProducts] = useState([])



    const fetchOrder_detail = async (id) => {
        try {
            const response = await order_detail_api.GetAll();
            console.log('response', response);

            // Filter the response array based on the order_id matching the provided id
            const details = response.filter(item => item.order_id === id);

            console.log('details', details);

            // Assuming you have a function setOrder_detail to set the state
            setOrder_detail(details);

            setLoading(false);
        } catch (error) {
            console.log('Failed to fetch Order_detail', error);
            setLoading(false);
        }
    };



    const fetchProductsList = async () => {
        try {
            const response = await productApi.GetAll()
            setProducts(response)
            console.log("products", response);
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
        // Call the fetchOrder_detail function with the provided 'id' from useParams()
        fetchOrder_detail(id);
        fetchProductSizeList();
        fetchProductColorList();
        fetchProductsList();
    }, [id]); // Add 'id' as a dependency to the useEffect so that it runs whenever the 'id' changes



    const expandedRowRender = (record) => {
        const columns = [
            {
                title: 'Sản phẩm',
                dataIndex: 'productId',
                key: 'product',
                render: (productId) => {
                    console.log('productId', productId);
                    const product = products.find((item) => item._id === productId);

                    console.log('product', product);
                    return product ? product.name : '';
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

        // {
        //     title: 'Action',
        //     key: 'operation',
        //     render: (text, record) => (
        //         <Space size="middle">
        //             {/* <Link to={`/admin/products/edit/${record._id}`}>
        //         <EditTwoTone style={{ fontSize: '20px', color: '#08c' }} />
        //       </Link> */}
        //             <Popconfirm
        //                 title="Delete the task"
        //                 description="Are you sure to delete this task?"
        //                 onConfirm={() => handleDelete(record._id)}
        //                 okText="Yes"
        //                 cancelText="No"
        //                 okButtonProps={{ className: 'text-light bg-primary' }}
        //             >
        //                 <DeleteTwoTone style={{ fontSize: '18px' }} />
        //             </Popconfirm>
        //         </Space>
        //     ),
        // },
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
