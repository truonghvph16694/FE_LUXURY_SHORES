import React, { useEffect, useState } from 'react';
import productApi from '../../../api/products';
import categoryApi from '../../../api/category';
import { Space, Table, Popconfirm, Button } from 'antd';
import { DeleteTwoTone, EditTwoTone, FileAddTwoTone } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Column } = Table;

const Products = ({ categoryList }) => {
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    const fetchProductList = async () => {
      try {
        const response = await productApi.GetAll();
        console.log('response', response.docs);
        setProductList(response.docs);
      } catch (error) {
        console.log('Failed to fetch ProductList', error);
      }
    };
    fetchProductList();
  }, []);

  const handleDelete = async (id) => {
    console.log("_id", id);
    try {
      const response = await productApi.Remove(id);
      if (response.status === 200) {
        console.log("Xóa thành công");
        useEffect();
      } else {
        console.log('Xóa không thành công');
      }
    } catch (error) {
      console.log('Failed to delete product', error);
    }
  };

  return (
    <div>
      <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'flex-end' }}>
        <Link to={'/admin/products/add'}>
          <Button type="primary" icon={<FileAddTwoTone />}>
            Add New
          </Button>
        </Link>
      </div>
      <Table dataSource={productList}>
        {/* <Column title="id" dataIndex="dât" key="_id" /> */}
        <Column title="Name" dataIndex="name" key="name" />
        <Column title="Description" dataIndex="description" key="description" />
        <Column
          title="Category"
          dataIndex="categoryId"
          key="categoryId"
          render={(categoryId) => {
            const category = categoryList.find((item) => item._id === categoryId);
            return category ? category.name : '';
          }}
        />
        <Column
          title="Action"
          render={(record) => (
            <Space size="middle">
              <Link to={`/products/${record.id}`}>
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
          )}
        />
      </Table>
    </div>
  );
};

const ProductsContainer = () => {
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    const fetchCategoryList = async () => {
      try {
        const response = await categoryApi.GetAll();
        console.log('response', response);
        setCategoryList(response);
      } catch (error) {
        console.log('Failed to fetch CategoryList', error);
      }
    };
    fetchCategoryList();
  }, []);

  return <Products categoryList={categoryList} />;
};

export default ProductsContainer;
