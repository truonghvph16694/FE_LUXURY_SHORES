// import React, { useEffect, useState } from 'react';
// import order_detail_api from '../../../api/order-detail-Api';
// import sizeApi from '../../../api/size';
// import colorApi from '../../../api/color';
// import { Table } from 'antd';
// import { useParams } from 'react-router-dom';
// import productApi from '../../../api/products';

// const { Column } = Table;

// const Order_detail = () => {
//     const { id } = useParams();

//     const [loading, setLoading] = useState(true);
//     const [order_detail, setOrder_detail] = useState([]);
//     const [productColor, setProductColorList] = useState([]);
//     const [productSize, setProductSizeList] = useState([]);
//     const [products, setProducts] = useState([]);

//     const fetchOrder_detail = async (id) => {
//         try {
//             const response = await order_detail_api.GetAll();
//             const details = response.filter(item => item.order_id === id);
//             setOrder_detail(details);
//             setLoading(false);
//         } catch (error) {
//             console.log('Failed to fetch Order_detail', error);
//             setLoading(false);
//         }
//     };

//     const fetchProductsList = async () => {
//         try {
//             const response = await productApi.GetAll()
//             setProducts(response);
//         } catch (error) {
//             console.log("Failed to fetch Product List");
//         }
//     }

//     const fetchProductSizeList = async () => {
//         try {
//             const response = await sizeApi.GetAll();
//             setProductSizeList(response.docs);
//         } catch (error) {
//             console.log('Failed to fetch ProductSizeList', error);
//         }
//     };

//     const fetchProductColorList = async () => {
//         try {
//             const response = await colorApi.GetAll();
//             setProductColorList(response.docs);
//         } catch (error) {
//             console.log('Failed to fetch ProductColorList', error);
//         }
//     };

//     useEffect(() => {
//         fetchOrder_detail(id);
//         fetchProductSizeList();
//         fetchProductColorList();
//         fetchProductsList();
//     }, [id]);

//     const expandedRowRender = (record) => {
//         const columns = [
//             {
//                 title: 'Sản phẩm',
//                 dataIndex: 'productId',
//                 key: 'product',
//                 render: (productId) => {
//                     const product = products.find((item) => item._id === productId);
//                     return product ? product.name : '';
//                 },
//             },
//             {
//                 title: 'Màu',
//                 dataIndex: 'colorId',
//                 key: 'color',
//                 render: (colorId) => {
//                     const color = productColor.find((item) => item._id === colorId);
//                     return color ? color.value : '';
//                 },
//             },
//             {
//                 title: 'Size',
//                 dataIndex: 'sizeId',
//                 key: 'size',
//                 render: (sizeId) => {
//                     const size = productSize.find((item) => item._id === sizeId);
//                     return size ? size.value : '';
//                 },
//             },
//             {
//                 title: 'Giá',
//                 dataIndex: 'price',
//                 key: 'price',
//             },
//         ];

//         return (
//             <Table columns={columns} dataSource={record.product_entries} pagination={false} />
//         );
//     };

//     const columns = [
//         {
//             title: 'Order_ID',
//             dataIndex: 'order_id',
//             key: 'order_id',
//         },
//         {
//             title: 'Quantity',
//             dataIndex: 'quantity',
//             key: 'quantity',
//         },
//         // Other fields you want to display in the main table
//     ];

//     return (
//         <div>
//             {!loading ? (
//                 <Table
//                     columns={columns}
//                     expandable={{
//                         expandedRowRender: expandedRowRender,
//                     }}
//                     dataSource={order_detail.map(order => ({ ...order, key: order._id }))}
//                 />
//             ) : (
//                 <p>Loading...</p>
//             )}
//         </div>
//     );
// };

// export default Order_detail;



import React, { useEffect, useState } from 'react';
// import order_detail_api from '../../../api/order-detail-Api';
import sizeApi from '../../../api/size';
import colorApi from '../../../api/color';
import { Table } from 'antd';
import { useParams } from 'react-router-dom';
import productApi from '../../../api/products';
import ordersApi from '../../../api/orders';
import Loading from '../../../components/Loading/Loading';

const { Column } = Table;

const Order_detail = () => {
    const { id } = useParams();

    const [loading, setLoading] = useState(true);
    const [order_detail, setOrder_detail] = useState([]);
    const [productColor, setProductColorList] = useState([]);
    const [productSize, setProductSizeList] = useState([]);
    const [products, setProducts] = useState([]);

    const fetchOrder_detail = async (id) => {
        try {

            const response = await ordersApi.GetAll();
            setOrder_detail(response);
            console.log('details:', order_detail);
            setLoading(false);
        } catch (error) {
            console.log('Failed to fetch Order_detail', error);
            setLoading(false);
        }
    };

    const fetchProductsList = async () => {
        try {
            const response = await productApi.GetAll()
            setProducts(response);
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
        fetchOrder_detail(id);
        fetchProductSizeList();
        fetchProductColorList();
        fetchProductsList();
    }, [id]);

    const expandedRowRender = (record) => {
        const columns = [{
            title: 'Sản phẩm',
            dataIndex: 'productId',
            key: 'product',
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
            // {
            //     title: 'Giá',
            //     dataIndex: 'price',
            //     key: 'price',
            // },
        ];

        return (
            <Table columns={columns} dataSource={record.product_entries} pagination={false} />
        );
    };

    const columns = [
        {
            title: 'Order_ID',
            dataIndex: 'order_id',
            key: 'order_id',
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: 'Giá',
            dataIndex: 'price',
            key: 'price',
        },
        // Other fields you want to display in the main table
    ];

    return (
        <div>
            {!loading ? (
                <Table
                    columns={columns}
                    expandable={{
                        expandedRowRender: expandedRowRender,
                    }}
                    dataSource={order_detail.map(order => ({ ...order, key: order._id }))}
                    defaultExpandAllRows={true} // This line will expand all rows by default
                />
            ) : (
                <p><Loading /></p>
            )}
        </div>
    );
};

export default Order_detail;
