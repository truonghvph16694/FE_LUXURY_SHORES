import React, { useEffect, useState } from 'react';
import productApi from '../../../api/products';
import categoryApi from '../../../api/category';
import sizeApi from '../../../api/size';
// import colorApi from '../../../api/color';
import { Badge, Dropdown, Space, Table, Popconfirm, Button } from 'antd';
import { DeleteTwoTone, EditTwoTone, FileAddTwoTone } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { toastSuccess } from '../../../components/toast/Toast';
// import { Image as CloudinaryImage } from 'cloudinary-react';
import Loading from '../../../components/Loading/Loading';

const App = () => {
  const [loading, setLoading] = useState(true);
  const [productList, setProductList] = useState([]);
  const [expandedRowKeys, setExpandedRowKeys] = useState([]);
  // const [productColor, setProductColorList] = useState([]);
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

  // const fetchProductColorList = async () => {
  //   try {
  //     const response = await colorApi.GetAll();
  //     setProductColorList(response.docs);
  //   } catch (error) {
  //     console.log('Failed to fetch ProductColorList', error);
  //   }
  // };

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
    // fetchProductColorList();
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
      title: 'STT', // Serial Number
      dataIndex: 'stt',
      key: 'stt',
      render: (text, record, index) => index + 1,
      width: 70,
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Ảnh',
      dataIndex: 'product_images',
      key: 'product_image',
      render: (record) => {
        console.log('record', record)
        return (
          <img src={record.length > 0 ? record[0].path : null} alt="" />
        );
      },
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Danh mục',
      dataIndex: 'categoryId',
      key: 'category',
      render: (categoryId) => {
        const category = categoryList.find((item) => item._id === categoryId);
        return category ? category.name : '';
      },
    },
    {
      title: 'Sửa/Xóa',
      key: 'operation',
      render: (text, record) => (
        <Space size="middle">
          <Link to={`/admin/products/edit/${record._id}`}>
            <EditTwoTone style={{ fontSize: '20px', color: '#08c' }} />
          </Link>
          <Popconfirm
            title="Delete the task"
            description="Bạn có chắc chắn muốn xóa sản phẩm không?"
            onConfirm={() => handleDelete(record._id)}
            okText={<span style={{ color: 'white' }}>Có</span>}
            cancelText="Không"
            okButtonProps={{ style: { background: 'green' } }}
            disabled={loading}
          >
            <DeleteTwoTone style={{ fontSize: '18px' }} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, marginTop: 20, marginRight: 20 }}>
        <h1 className='text-2xl font-bold ml-10 '>Tất Cả Sản Phẩm</h1>
        <Link to={'/admin/products/add'} style={{ backgroundColor: "blue", borderRadius: 10 }}>
          <Button type="primary" icon={<FileAddTwoTone />}>
            Thêm
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
          dataSource={productList.map((product, index) => ({ ...product, key: product._id, stt: index + 1 }))} />
      ) : (
        <p><Loading /></p>
      )}
    </>
  );
};

export default App;



