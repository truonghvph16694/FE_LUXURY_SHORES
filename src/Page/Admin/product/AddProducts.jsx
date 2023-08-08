import React, { useEffect, useState } from 'react';
import { Form, Input, Button, message, Space, Select, Upload, Modal } from 'antd';
import { LoadingOutlined, PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import productApi from '../../../api/products';
import { useNavigate, useParams } from 'react-router-dom';
import { toastError, toastSuccess } from '../../../components/toast/Toast';
import categoryApi from '../../../api/category';
import colorApi from '../../../api/color';
import sizeApi from '../../../api/size';
import instance from "../../../api/config";
import { CloudinaryContext, Image } from 'cloudinary-react';
const { Option } = Select;

const AddProducts = () => {
  const [categoryList, setCategoryList] = useState([]);
  const [productColor, setProductColorList] = useState([]);
  const [productSize, setProductSizeList] = useState([]);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [fileList, setFileList] = useState([])
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewTitle, setPreviewTitle] = useState('');
  const [previewImage, setPreviewImage] = useState('');
  const [fileOrigin, setFileOrigin] = useState([]);

  // Cấu hình thông tin Cloudinary của bạn
  const cloudName = 'datn2023';
  const uploadPreset = 'ml_default';
  const handleCancel = () => setPreviewOpen(false);

  const fetchCategoryList = async () => {
    try {
      const response = await categoryApi.GetAll();
      setCategoryList(response);
    } catch (error) {
      console.log('Failed to fetch CategoryList', error);
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
    // fetchProductColorList();
    fetchProductSizeList();
  }, []);

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


  const onFinish = async (values) => {
    // try {
    const a = [];
    fileList.map(item => {
      console.log('item', item)
      a.push(item.thumbUrl)
    })
    console.log('ògin', a)
    values.uploads = a;
    // const formData = new FormData();
    // formData.append("value", { value: values });
    // formData.append("file", a);
    // this.buildFormData(formData, { values: values, attachments: a })
    // const config = {}
    // if (formData instanceof FormData) {
    //   config['headers'] = { 'Content-Type': 'multipart/form-data' }
    // }

    const response = await productApi.Add(values);
    if (response.status === 200) {
      message.success('Thêm sản phẩm thành công');
    }
    toastSuccess('Thêm Thành Công!');
    navigate('/admin/products');
    // } catch (error) {
    //   if (error.response && error.response.status === 400) {
    //     toastError('Thêm Danh Mục Không Thành Công!');
    //   }
    // }
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
            <Option key={item._id} value={item._id}>
              {item.name}
            </Option>
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
      {/* <CloudinaryContext cloudName={cloudName}>
        <Form.Item
          name="image"
          label="Hình ảnh"
          rules={[
            {
              required: true,
              message: 'Vui lòng tải lên hình ảnh',
            },
          ]}
        >
          <Upload
            name="images"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action={'http://localhost:4000/api/images/upload'}
            onPreview={handlePreview}
            fileList={fileList}
            
            beforeUpload={beforeUpload}
            onChange={handleChange}
          >
          </Upload>
        </Form.Item>
      </CloudinaryContext> */}

      <div>
        <Form.List name="product_entrys">
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
          Add Products
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddProducts;
