// import React from 'react';
// import { Space, Table, Tag, Popconfirm, Button } from 'antd';
// import { Link } from "react-router-dom";
// import { DeleteTwoTone, EditTwoTone, FileAddTwoTone, SearchOutlined } from '@ant-design/icons';


// const columns = [
//   {
//     title: 'Name',
//     dataIndex: 'name',
//     key: 'name',
//     render: (text) => <a>{text}</a>,
//   },
//   {
//     title: 'Age',
//     dataIndex: 'age',
//     key: 'age',
//   },
//   {
//     title: 'Address',
//     dataIndex: 'address',
//     key: 'address',
//   },
//   {
//     title: 'Action',
//     key: 'action',
//     render: (_, record) => (
//       <Space size="middle">
//           <Link><EditTwoTone style={{ fontSize: '20px', color: '#08c' }} /></Link>
//           <Popconfirm
//             title="Delete the task"
//             description="Are you sure to delete this task?"
//             // onConfirm={() => onHandleDelete(record.id)}
//             okText="Yes"
//             cancelText="No"
//             okButtonProps={{ className: "text-light bg-primary" }}
//           >
//             <DeleteTwoTone style={{ fontSize: '18px' }} />
//           </Popconfirm>      </Space>
//     ),
//   },
// ];
// const products = () => (
//     <>
//      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
//       <Button type="primary" icon={<FileAddTwoTone />}>
//         Add New
//       </Button>
//     </div>
//       <Table columns={columns} dataSource={data} />
//     </>
//   );
// export default products;


import React, { useEffect, useState } from 'react'
import productApi from '../../../api/products';
import { Space, Table, Tag, Popconfirm, Button } from 'antd';
import { DeleteTwoTone, EditTwoTone, FileAddTwoTone, SearchOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";

import { AiFillDelete, AiOutlineEdit } from 'react-icons/ai'


const { Column } = Table;
const Products = () => {
    const [productList, setProductList] = useState([]);
    useEffect(() => {
        const fetchProductList = async () => {
            try {
                const response = await productApi.GetAll();
                console.log('response', response.docs);
                setProductList(response.docs)
            } catch (error) {
                console.log("Failed to fetch CategoryList", error);
            }
        }
        fetchProductList();
    }, [])
    return (
        <div>
            <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'flex-end' }}>
                <Button type="primary" icon={<FileAddTwoTone />}>
                    Add New
                </Button>
            </div>
            <Table dataSource={productList} >
                <Column title="Name" dataIndex="name" key="name" />
                <Column title="Description" dataIndex="description" key="description" />

                <Column
                    title="Action"
                    render={() => (
                        <Space size="middle">
                            <Space size="middle">
                                <Link><EditTwoTone style={{ fontSize: '20px', color: '#08c' }} /></Link>
                                <Popconfirm
                                    title="Delete the task"
                                    description="Are you sure to delete this task?"
                                    // onConfirm={() => onHandleDelete(record.id)}
                                    okText="Yes"
                                    cancelText="No"
                                    okButtonProps={{ className: "text-light bg-primary" }}
                                >
                                    <DeleteTwoTone style={{ fontSize: '18px' }} />
                                </Popconfirm>      </Space>                    </Space>
                    )}
                />
            </Table>
        </div>


    )
}

export default Products