import React, { useEffect, useState } from 'react';
import { Form, Input, Button, message, Select } from 'antd';
import productApi from '../../../api/products';
import { useNavigate } from "react-router-dom";
import { toastError, toastSuccess } from '../../../components/toast/Toast';
import categoryApi from '../../../api/category';
const AddProducts = () => {

    const [categoryList, setCategoryList] = useState([]);
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const fetchCategoryList = async () => {
        try {
            const response = await categoryApi.GetAll();
            console.log('response', response);
            setCategoryList(response);
            console.log('categoryList', categoryList)
        } catch (error) {
            console.log('Failed to fetch CategoryList', error);
        }
    };

    useEffect(() => {
        fetchCategoryList();
    }, []);

    const onFinish = async (values) => {
        try {
            const response = await productApi.Add(values);
            if (response.status === 200) {
                message.success('Products added successfully');
            }
            toastSuccess("Thêm Thành Công!")
            navigate("/admin/products");
        } catch (error) {
            if (error.response && error.response.status === 400) {
                // Xử lý lỗi từ phía server
                // const errorData = error.response.data;
                // message.error(errorData.message);
                toastError("Thêm Danh Mục Không Thành Công!")
            }
        }
    };

    return (
        <Form form={form} onFinish={onFinish} layout="vertical">
            <Form.Item
                name="name"
                label="Products"
                rules={[
                    {
                        required: true,
                        message: 'Please enter category name',
                    },
                ]}
            >
                <Input placeholder="Enter category name" />
            </Form.Item>
            <Form.Item
                name="description"
                label="Description"
                rules={[
                    {
                        required: true,
                        message: 'Please enter category name',
                    },
                ]}
            >
                <Input placeholder="Enter category name" />
            </Form.Item>
            <Form.Item
                name="categoryId"
                label="Category"
                rules={[
                    {
                        required: true,
                        message: 'Please select a category',
                    },
                ]}
            >
                <Select placeholder="Select category">
                    {categoryList.map((item, index) => (
                        <Select.Option value={item._id}>{item.name}</Select.Option>
                    ))}
                </Select>

            </Form.Item>




            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Add
                </Button>
            </Form.Item>
        </Form>
    );
};

export default AddProducts;



