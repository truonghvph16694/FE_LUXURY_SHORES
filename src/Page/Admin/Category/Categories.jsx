import React, { useEffect, useState } from 'react';
import categoryApi from '../../../api/category';
import { Button, Popconfirm, Space, Table } from 'antd';
import { DeleteTwoTone, EditTwoTone, FileAddTwoTone } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { toastSuccess } from '../../../components/toast/Toast';

const { Column } = Table;

const Categories = () => {
    const [categoryList, setCategoryList] = useState([]);
    const fetchCategoryList = async () => {
        try {
            const response = await categoryApi.GetAll();
            console.log('response', response);
            setCategoryList(response);
        } catch (error) {
            console.log('Failed to fetch CategoryList', error);
        }
    };
    useEffect(() => {
        fetchCategoryList();
    }, []);

    const onHandleDelete = async (id) => {
        try {
            await categoryApi.Remove(id);
            toastSuccess("Delete success")
            fetchCategoryList();
        } catch (error) {
            console.log('Failed to delete Category', error);
        }
    };
    return (
        <>
            <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'flex-end' }}>
                <Link to={'/admin/category/add'}>
                    <Button type="primary" icon={<FileAddTwoTone />}>
                        Add New
                    </Button>
                </Link>

            </div>
            <Table dataSource={categoryList}>
                <Column title="Category" dataIndex="name" key="name" />
                <Column
                    title="Action"
                    render={(record) => (
                        <Space size="middle">
                            <Link to={`/admin/category/edit/${record._id}`}>
                                <EditTwoTone style={{ fontSize: '20px', color: '#08c' }} />
                            </Link>
                            <Popconfirm
                                title="Delete the task"
                                description="Are you sure to delete this task?"
                                onConfirm={() => onHandleDelete(record._id)}
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
        </>
    );
};

export default Categories;