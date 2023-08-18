import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Input, Button, message, Space, Select, Upload, Modal } from 'antd';
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
    const [imageUrl, setImageUrl] = useState(null);
    const [fileList, setFileList] = useState([])
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewTitle, setPreviewTitle] = useState('');
    const [previewImage, setPreviewImage] = useState('');
    const [fileOrigin, setFileOrigin] = useState([]);
    const handleCancel = () => setPreviewOpen(false);
    // const history = useHistory();
    const [form] = Form.useForm();
    const navigate = useNavigate();
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await productApi.GetEdit(id);
                console.log('product:', response[0]);
                const e = [];
                response[0].product_entries.map(item => {
                    e.push({ quantity: item.path, sizeId: item.sizeId });
                })

                form.setFieldsValue({ name: response[0].name, description: response[0].description, categoryId: response[0].categoryId, price: response[0].price, fields: e }); // Đặt giá trị mặc định cho trường name trong Form
                const i = [];
                response[0].product_images.map(item => {
                    i.push({ thumbUrl: item.path });
                })
                setFileList(i);

            } catch (error) {
                console.log('Failed to fetch category', error);
            }
        };

        fetchProduct();
    }, [id, form]);

    const onFinish = async (values) => {
        // const a = [];
        // fileList.map(item => {
        //     console.log('item', item)
        //     a.push(item.thumbUrl)
        // })
        const a = [];
        fileList.map(item => {
            console.log('item', item)
            a.push(item.thumbUrl)
        })
        values.uploads = a;
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
    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    };
    const uploadButton = (
        <div>
            <PlusOutlined />
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Upload
            </div>
        </div>
    );
    const beforeUpload = (file) => {
        console.log('file', file)
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must be smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
    };

    const handleChange = ({ fileList: newFileList }) => { console.log(newFileList); setFileList(newFileList) };

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
                name="price"
                label="Price"
                rules={[
                    {
                        required: true,
                        message: 'Please enter price',
                    },
                ]}
            >
                <Input placeholder="Enter price" />
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

            <Form.Item
                name="upload"
                label="File">
                <Upload
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={handlePreview}
                    onChange={handleChange}
                >
                    {fileList.length >= 8 ? null : uploadButton}
                </Upload>
                <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                    <img
                        alt="example" style={{
                            width: '100%',
                        }} src={previewImage} />
                </Modal>

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
                                    {/* <Form.Item
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
                                    </Form.Item> */}
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
                                    {/* <Form.Item
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
                                    </Form.Item> */}
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
                <Button type="primary" htmlType="submit" style={{ backgroundColor: "blue", borderRadius: 10 }}>
                    Update Products
                </Button>
            </Form.Item>
        </Form>
    );
};

export default UpdateProduct;