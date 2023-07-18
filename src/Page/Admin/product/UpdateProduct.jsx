import React, { useEffect ,useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Input, Button, message, Select } from 'antd';
import productApi from '../../../api/products';
import { toastError, toastSuccess } from '../../../components/toast/Toast';
import categoryApi from '../../../api/category';

const UpdateProduct = () => {
    const { id } = useParams();
    // const history = useHistory();
    const [form] = Form.useForm();
    const navigate = useNavigate();
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await productApi.Get(id);
                console.log('product:', response);
                form.setFieldsValue({ name: response.name, description: response.description,categoryId: response.categoryId }); // Đặt giá trị mặc định cho trường name trong Form
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
                // Xử lý lỗi từ phía server
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
    }, []);

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

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Update Products
                </Button>
            </Form.Item>
        </Form>
    );
};

export default UpdateProduct;