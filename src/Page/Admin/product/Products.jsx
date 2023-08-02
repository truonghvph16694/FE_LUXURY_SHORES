// import React, { useEffect, useState } from 'react';
// import productApi from '../../../api/products';
// import categoryApi from '../../../api/category';
// import sizeApi from '../../../api/size';
// import colorApi from '../../../api/color';
// import { Badge, Dropdown, Space, Table, Popconfirm, Button } from 'antd';
// import { DeleteTwoTone, EditTwoTone, FileAddTwoTone } from '@ant-design/icons';
// import { Link } from 'react-router-dom';
// import { toastSuccess } from '../../../components/toast/Toast';

// const App = () => {
//   const [loading, setLoading] = useState(true);
//   const [productList, setProductList] = useState([]);
//   const [expandedRowKeys, setExpandedRowKeys] = useState([]);
//   const [productColor, setProductColorList] = useState([]);
//   const [productSize, setProductSizeList] = useState([]);
//   const [categoryList, setCategoryList] = useState([]);

//   const fetchProductList = async () => {
//     try {
//       const response = await productApi.GetAll();
//       setProductList(response);
//       setLoading(false);
//     } catch (error) {
//       console.log('Failed to fetch ProductList', error);
//       setLoading(false);
//     }
//   };

//   const fetchProductSizeList = async () => {
//     try {
//       const response = await sizeApi.GetAll();
//       setProductSizeList(response.docs);
//     } catch (error) {
//       console.log('Failed to fetch ProductSizeList', error);
//     }
//   };

//   const fetchProductColorList = async () => {
//     try {
//       const response = await colorApi.GetAll();
//       setProductColorList(response.docs);
//     } catch (error) {
//       console.log('Failed to fetch ProductColorList', error);
//     }
//   };

//   const fetchCategoryList = async () => {
//     try {
//       const response = await categoryApi.GetAll();
//       setCategoryList(response);
//     } catch (error) {
//       console.log('Failed to fetch CategoryList', error);
//     }
//   };
//   useEffect(() => {
//     fetchProductList();
//     fetchProductSizeList();
//     fetchProductColorList();
//     fetchCategoryList();
//   }, []);

//   const handleDelete = async (id) => {
//     try {
//       await productApi.Remove(id);
//       toastSuccess('Delete success');
//       fetchProductList();
//     } catch (error) {
//       console.log('Failed to delete products', error);
//     }
//   };

//   const expandedRowRender = (record) => {
//     const columns = [
//       {
//         title: 'Màu',
//         dataIndex: 'colorId',
//         key: 'color',
//         render: (colorId) => {
//           const color = productColor.find((item) => item._id === colorId);
//           return color ? color.value : '';
//         },
//       },
//       {
//         title: 'Size',
//         dataIndex: 'sizeId',
//         key: 'size',
//         render: (sizeId) => {
//           const size = productSize.find((item) => item._id === sizeId);
//           return size ? size.value : '';
//         },
//       },
//       {
//         title: 'Giá',
//         dataIndex: 'price',
//         key: 'price',
//       },
//       {
//         title: 'Số lượng',
//         dataIndex: 'quantity',
//         key: 'quantity',
//       },
//     ];
//     return <Table columns={columns} dataSource={record.product_entries} pagination={false} />;
//   };

//   const handleExpand = (expanded, record) => {
//     if (expanded) {
//       setExpandedRowKeys([record._id]);
//     } else {
//       setExpandedRowKeys((prevKeys) => prevKeys.filter((key) => key !== record._id));
//     }
//   };

//   const columns = [
//     {
//       title: 'Name',
//       dataIndex: 'name',
//       key: 'name',
//     },
//     {
//       title: 'Images',
//       dataIndex: 'image',
//       key: 'image',
//     },
//     {
//       title: 'Description',
//       dataIndex: 'description',
//       key: 'description',
//     },
//     {
//       title: 'Category',
//       dataIndex: 'categoryId',
//       key: 'category',
//       render: (categoryId) => {
//         const category = categoryList.find((item) => item._id === categoryId);
//         return category ? category.name : '';
//       },
//     },
//     {
//       title: 'Action',
//       key: 'operation',
//       render: (text, record) => (
//         <Space size="middle">
//           <Link to={`/admin/products/edit/${record._id}`}>
//             <EditTwoTone style={{ fontSize: '20px', color: '#08c' }} />
//           </Link>
//           <Popconfirm
//             title="Delete the task"
//             description="Are you sure to delete this task?"
//             onConfirm={() => handleDelete(record._id)}
//             okText="Yes"
//             cancelText="No"
//             okButtonProps={{ className: 'text-light bg-primary' }}
//           >
//             <DeleteTwoTone style={{ fontSize: '18px' }} />
//           </Popconfirm>
//         </Space>
//       ),
//     },
//   ];

//   return (
//     <>
//       <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'flex-end' }}>
//         <Link to={'/admin/products/add'}>
//           <Button type="primary" icon={<FileAddTwoTone />}>
//             Add New
//           </Button>
//         </Link>
//       </div>

//       {/* Render the table after the API call is completed */}
//       {!loading ? (
//         <Table
//           columns={columns}
//           expandable={{
//             expandedRowRender: expandedRowRender,
//             expandedRowKeys: expandedRowKeys,
//             onExpand: handleExpand,
//           }}
//           dataSource={productList.map((product) => ({ ...product, key: product._id }))}
//         />
//       ) : (
//         <p>Loading...</p>
//       )}
//     </>
//   );
// };

// export default App;



import React, { useEffect, useState } from 'react';
import productApi from '../../../api/products';
import categoryApi from '../../../api/category';
import sizeApi from '../../../api/size';
import colorApi from '../../../api/color';
import { Badge, Dropdown, Space, Table, Popconfirm, Button } from 'antd';
import { DeleteTwoTone, EditTwoTone, FileAddTwoTone } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { toastSuccess } from '../../../components/toast/Toast';
import { Image as CloudinaryImage } from 'cloudinary-react';

const App = () => {
  const [loading, setLoading] = useState(true);
  const [productList, setProductList] = useState([]);
  const [expandedRowKeys, setExpandedRowKeys] = useState([]);
  const [productColor, setProductColorList] = useState([]);
  const [productSize, setProductSizeList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);

  const fetchProductList = async () => {
    try {
      const response = await productApi.GetAll();
      setProductList(response);
      setLoading(false);
    } catch (error) {
      console.log('Failed to fetch ProductList', error);
      setLoading(false);
    }
  };

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

  const fetchCategoryList = async () => {
    try {
      const response = await categoryApi.GetAll();
      setCategoryList(response);
    } catch (error) {
      console.log('Failed to fetch CategoryList', error);
    }
  };

  useEffect(() => {
    fetchProductList();
    fetchProductSizeList();
    fetchProductColorList();
    fetchCategoryList();
  }, []);

  const handleDelete = async (id) => {
    try {
      await productApi.Remove(id);
      toastSuccess('Delete success');
      fetchProductList();
    } catch (error) {
      console.log('Failed to delete products', error);
    }
  };

  const expandedRowRender = (record) => {
    const columns = [
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
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Images',
      dataIndex: 'image',
      key: 'image',
      render: (imageUrl) => {
        return (
          <CloudinaryImage
            cloudName="YOUR_CLOUDINARY_CLOUD_NAME"
            publicId={imageUrl}
            width="50"
            height="50"
            crop="fill"
          />
        );
      },
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Category',
      dataIndex: 'categoryId',
      key: 'category',
      render: (categoryId) => {
        const category = categoryList.find((item) => item._id === categoryId);
        return category ? category.name : '';
      },
    },
    {
      title: 'Action',
      key: 'operation',
      render: (text, record) => (
        <Space size="middle">
          <Link to={`/admin/products/edit/${record._id}`}>
            <EditTwoTone style={{ fontSize: '20px', color: '#08c' }} />
          </Link>
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
    <>
      <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'flex-end' }}>
        <Link to={'/admin/products/add'}>
          <Button type="primary" icon={<FileAddTwoTone />}>
            Add New
          </Button>
        </Link>
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
          dataSource={productList.map((product) => ({ ...product, key: product._id }))}
        />
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default App;
