import React, { useEffect, useState } from 'react';
import { Form, Input, Button, message, Space, Select } from 'antd';
import productApi from '../../../api/products';
import { useNavigate } from "react-router-dom";
import { toastError, toastSuccess } from '../../../components/toast/Toast';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
const { Option } = Select;
import categoryApi from '../../../api/category';
import colorApi from '../../../api/color';
import sizeApi from '../../../api/size';
const AddProducts = () => {

    const [categoryList, setCategoryList] = useState([]);
    const [productColor, setProductColorList] = useState([]);
    const [productSize, setProductSizeList] = useState([]);
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const fetchCategoryList = async () => {
        try {
            const response = await categoryApi.GetAll();
            setCategoryList(response);
        } catch (error) {
            console.log('Failed to fetch CategoryList', error);
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
    const fetchProductSizeList = async () => {
        try {
            const response = await sizeApi.GetAll();
            setProductSizeList(response.docs);
        } catch (error) {
            console.log('Failed to fetch ProductSizeList', error);
        }
    };
    useEffect(() => {
        fetchCategoryList();
        fetchProductColorList();
        fetchProductSizeList();
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

            <div >
                <Form.List name="product_entrys" >
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map(({ key, name, ...restField }) => (
                                <Space
                                    key={key}
                                    style={{
                                        display: 'flex',
                                        marginBottom: 8,
                                    }}
                                    align="baseline"
                                >
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'quantity']}
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Missing quantity',
                                            },
                                        ]}
                                    >
                                        <Input placeholder="Quantity" />
                                    </Form.Item>
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'price']}
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Missing price',
                                            },
                                        ]}
                                    >
                                        <Input placeholder="price" />
                                    </Form.Item>
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'sizeId']}
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Missing size',
                                            },
                                        ]}
                                    >
                                        <Select placeholder="Size">
                                            {productSize.map((item) => (
                                                <Option key={item._id} value={item._id}>
                                                    {item.value}
                                                </Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'colorId']}
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Missing color',
                                            },
                                        ]}
                                    >
                                        <Select placeholder="Color">
                                            {productColor.map((item) => (
                                                <Option key={item._id} value={item._id}>
                                                    {item.value}
                                                </Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                    <MinusCircleOutlined onClick={() => remove(name)} />
                                </Space>
                            ))}
                            <Form.Item>
                                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />} style={{ width: '100%' }}>
                                    Add
                                </Button>
                            </Form.Item>
                        </>
                    )}
                </Form.List>
            </div>


            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Add
                </Button>
            </Form.Item>
        </Form>
    );
};

export default AddProducts;
