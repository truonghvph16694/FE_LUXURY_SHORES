import React, { useEffect, useState } from 'react';
import categoryApi from '../../../api/category';
import { Button, Popconfirm, Space, Table, Modal, message } from 'antd';
import { DeleteTwoTone, EditTwoTone, FileAddTwoTone } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { toastSuccess } from '../../../components/toast/Toast';
import Loading from '../../../components/Loading/Loading';

const { Column } = Table;

const Categories = () => {
    const [categoryList, setCategoryList] = useState([]);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    const [loading, setLoading] = useState(true);
    console.log("first", categoryList)
    const fetchCategoryList = async () => {
        try {
            const response = await categoryApi.GetAll();
            // Thêm trường "stt" vào dữ liệu
            const categoryListWithStt = response.map((category, index) => ({ ...category, stt: index + 1 }));
            setCategoryList(categoryListWithStt);
            setLoading(false);
        } catch (error) {
            console.log('Failed to fetch CategoryList', error);
        }
    };
    const onHandleDelete = async (id) => {
        try {
            const response = await categoryApi.GetProducts(id);
            const products = response.data || [];

            if (products.length > 0) {
                setSelectedCategoryId(id);
                setConfirmDelete(true);
            } else {
                await deleteCategory(id);
            }
        } catch (error) {
            console.log('Failed to delete Category', error);
            message.error('Failed to delete Category. Please try again.');
        }
    };

    const deleteCategory = async (id) => {
        try {
            setLoading(true);
            await categoryApi.Remove(id);
            toastSuccess('Delete success');
            fetchCategoryList();
        } catch (error) {
            console.log('Failed to delete Category', error);
            message.error('Failed to delete Category. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const confirmDeleteProducts = async () => {
        try {
            setLoading(true);
            const response = await categoryApi.GetProducts(selectedCategoryId);
            const products = response.data || [];

            const deleteProductPromises = products.map(async (product) => {
                await categoryApi.RemoveProduct(selectedCategoryId, product._id);
            });

            await Promise.all(deleteProductPromises);

            await deleteCategory(selectedCategoryId);
        } catch (error) {
            console.log('Failed to delete products', error);
            message.error('Failed to delete products. Please try again.');
        } finally {
            setLoading(false);
            setConfirmDelete(false);
            setSelectedCategoryId(null);
        }
    };

    useEffect(() => {
        fetchCategoryList();
    }, []);

    return (
        <>
            <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'flex-end', marginTop: 20, marginRight: 20 }}>
                <Link to={'/admin/category/add'} style={{ backgroundColor: "blue", borderRadius: 10 }}>
                    <Button type="primary" icon={<FileAddTwoTone />}>
                        Add New
                    </Button>
                </Link>
            </div>
            {!loading ? (<Table dataSource={categoryList}>
                <Column title="STT" dataIndex="stt" key="stt" />

                <Column title="Name" dataIndex="name" key="name" />
                <Column
                    title="Quantity-Product"
                    key="products.length"
                    render={(record) => (
                        <span>{record.products.length} </span>
                    )}
                />
                <Column
                    title="Action"
                    render={(record) => (
                        <Space size="middle">
                            <Link to={`/admin/category/edit/${record._id}`}>
                                <EditTwoTone style={{ fontSize: '20px', color: '#08c' }} />
                            </Link>
                            <Popconfirm
                                title="Delete the task"
                                description="Trong danh mục có sản phẩm bạn có chắc chắn muốn xóa!"
                                onConfirm={() => onHandleDelete(record._id)}
                                okText={<span style={{ color: 'white' }}>Yes</span>}
                                cancelText="No"
                                okButtonProps={{ style: { background: 'green' } }}
                                disabled={loading}
                            >
                                <DeleteTwoTone style={{ fontSize: '18px' }} />
                            </Popconfirm>
                        </Space>
                    )}
                />
            </Table>) : <Loading />}

            <Modal
                visible={confirmDelete}
                title="Delete Category"
                onOk={confirmDeleteProducts}
                onCancel={() => setConfirmDelete(false)}
                okText="Yes"
                cancelText="No"
                confirmLoading={loading}
            >
                <p>Are you sure to delete this category and all its products?</p>
            </Modal>
        </>
    );
};

export default Categories;