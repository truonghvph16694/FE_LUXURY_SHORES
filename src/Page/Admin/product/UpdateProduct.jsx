import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Input, Button, message, Space, Select } from 'antd';
import productApi from '../../../api/products';
import sizeApi from '../../../api/size';
import colorApi from '../../../api/color';
import { toastError, toastSuccess } from '../../../components/toast/Toast';
import categoryApi from '../../../api/category';
const { Option } = Select;
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';


const UpdateProduct = () => {
    const { id } = useParams();
    const [productColor, setProductColorList] = useState([]);
    const [productSize, setProductSizeList] = useState([]);
    // const history = useHistory();
    const [form] = Form.useForm();
    const navigate = useNavigate();
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await productApi.Get(id);
                console.log('product:', response);
                form.setFieldsValue({ name: response.name, description: response.description, categoryId: response.categoryId }); // Đặt giá trị mặc định cho trường name trong Form
            } catch (error) {
                console.log('Failed to fetch category', error);
            }
        };

        fetchProduct();
    }, [id, form]);

    const onFinish = async (values) => {
        try {

            const response = await productApi.Update({ ...values, _id: id });
            console.log('Update product response:', response);
            if (response.status === 200) {
                message.success('product updated successfully');
            }
            toastSuccess("Cập nhật thành công!")
            navigate("/admin/products");
        } catch (error) {
            if (error.response && error.response.status === 400) {
                const errorData = error.response.data;
                message.error(errorData.message);
            }
            toastError("Cập nhật không thành công!")
        }
    };
    //gọi caterory
    const [categoryList, setCategoryList] = useState([]);
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
        fetchProductSizeList();
        fetchProductColorList();
    }, []);
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
    return (
        <Form form={form} onFinish={onFinish} layout="vertical">
            <Form.Item
                name="name"
                label="Product Name"
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
                        message: 'Please enter product description',
                    },
                ]}
            >
                <Input placeholder="Enter product description" />
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
                    Update Products
                </Button>
            </Form.Item>
        </Form>
    );
};

export default UpdateProduct;