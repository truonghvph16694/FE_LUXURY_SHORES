import React, { useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Form, Input, Button, message } from 'antd';
import categoryApi from '../../../api/category';
import { toastError, toastSuccess } from '../../../components/toast/Toast';

const UpdateCategory = () => {
    const { id } = useParams();
    // const history = useHistory();
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const userlocal = localStorage.getItem('user')
    const userjson = JSON.parse(userlocal)

    const tokenlocal = localStorage.getItem('token')

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const response = await categoryApi.Get(id);
                // console.log('Category:', response);
                form.setFieldsValue({ name: response.name }); // Đặt giá trị mặc định cho trường name trong Form
            } catch (error) {
                console.log('Failed to fetch category', error);
            }
        };

        fetchCategory();

        if (userlocal && userjson.type === "admin" && tokenlocal) {
            setTimeout(() => {
                navigate(`/admin/category/edit/${id}`)
            }, 500)
        } else {
            setTimeout(() => {
                navigate('/')
            }, 500)
        }

    }, [id, form]);

    const onFinish = async (values) => {
        try {

            const response = await categoryApi.Update({ ...values, _id: id });
            // console.log('Update Category response:', response);
            if (response.status === 200) {
                message.success('Category updated successfully');
            }
            toastSuccess("Cập nhật danh mục thành công!")
            navigate("/admin/category");
        } catch (error) {
            if (error.response && error.response.status === 400) {
                // Xử lý lỗi từ phía server
                const errorData = error.response.data;
                message.error(errorData.message);
            }
            toastError("Cập nhật danh mục không thành công!")
        }
    };
    return (
        <Form form={form} onFinish={onFinish} layout="vertical">
            <Form.Item
                name="name"
                label="Category Name"
                rules={[
                    {
                        required: true,
                        message: 'Please enter category name',
                    },
                ]}
            >
                <Input placeholder="Enter category name" />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" className='bg-blue-500'>
                    Update Category
                </Button>
                <Link to={`/admin/category`}><Button>Back</Button></Link>
            </Form.Item>
        </Form>
    );
};

export default UpdateCategory;