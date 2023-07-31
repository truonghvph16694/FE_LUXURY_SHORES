// import React, { useEffect, useState } from 'react';
// import { Form, Input, Button, message, Space, Select, Upload } from 'antd';
// import { LoadingOutlined, PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
// import productApi from '../../../api/products';
// import { useNavigate, useParams } from 'react-router-dom';
// import { toastError, toastSuccess } from '../../../components/toast/Toast';
// import categoryApi from '../../../api/category';
// import colorApi from '../../../api/color';
// import sizeApi from '../../../api/size';
// import instance from "../../../api/config";
// import { CloudinaryContext, Image } from 'cloudinary-react'; 
// const { Option } = Select;

// const AddProducts = () => {
//     const [categoryList, setCategoryList] = useState([]);
//     const [productColor, setProductColorList] = useState([]);
//     const [productSize, setProductSizeList] = useState([]);
//     const [form] = Form.useForm();
//     const navigate = useNavigate();
//     const [loading, setLoading] = useState(false);
//     const [imageUrl, setImageUrl] = useState(null);
//     // const baseUrl='';

//     // Cấu hình thông tin Cloudinary của bạn
//     const cloudName = 'dufcivzn4';
//     const uploadPreset = 'ml_default';
//     const fetchCategoryList = async () => {
//         try {
//             const response = await categoryApi.GetAll();
//             setCategoryList(response);
//         } catch (error) {
//             console.log('Failed to fetch CategoryList', error);
//         }
//     };

//     const fetchProductColorList = async () => {
//         try {
//             const response = await colorApi.GetAll();
//             setProductColorList(response.docs);
//         } catch (error) {
//             console.log('Failed to fetch ProductColorList', error);
//         }
//     };

//     const fetchProductSizeList = async () => {
//         try {
//             const response = await sizeApi.GetAll();
//             setProductSizeList(response.docs);
//         } catch (error) {
//             console.log('Failed to fetch ProductSizeList', error);
//         }
//     };

//     useEffect(() => {
//         fetchCategoryList();
//         fetchProductColorList();
//         fetchProductSizeList();
//         // console.log('instance',instance.ba)
//     }, []);

//     const beforeUpload = (file) => {
//         console.log('file',file)
//         const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
//         if (!isJpgOrPng) {
//             message.error('You can only upload JPG/PNG file!');
//         }
//         const isLt2M = file.size / 1024 / 1024 < 2;
//         if (!isLt2M) {
//             message.error('Image must be smaller than 2MB!');
//         }
//         return isJpgOrPng && isLt2M;
//     };

//     // const handleChange = (info) => {
//     //     if (info.file.status === 'uploading') {
//     //         setLoading(true);
//     //         return;
//     //     }
//     //     if (info.file.status === 'done') {
//     //         // You can get the image URL here if you need it
//     //         setImageUrl(info.file.response.url);
//     //         setLoading(false);
//     //     }
//     // };
//     const handleChange = (info) => {
//         if (info.file.status === 'done') {
//             // Lưu URL hình ảnh từ Cloudinary
//             setImageUrl(info.file.response.url);
//             setLoading(false);
//         } else if (info.file.status === 'error') {
//             // Xử lý lỗi khi tải lên hình ảnh
//             message.error('Failed to upload image');
//             setLoading(false);
//         }
//     };

//     // const handleChange = (info) => {

//     //     const formData = new FormData();
//     //     formData.append("images", info.file);
//     //     formData.append("upload_preset", "s44cgkqu");
//     //     formData.append("cloud_name", "dufcivzn4");

//     //     fetch("https://api.cloudinary.com/v1_1/dufcivzn4/image/upload", {
//     //         method: "post",
//     //         body: formData,
//     //     })
//     //         .then((response) => response.json())
//     //         .then((data) => {
//     //             fetch(" http://localhost:4000/api/images/upload", {
//     //                 method: "POST",
//     //                 headers: {},
//     //                 body: JSON.stringify({ ...data, image: data.url }),
//     //             });

//     //         });
//     //     // props.onAdd(info);

//     //     navigate("/admin/products");
//     // }
//     const onFinish = async (values) => {
//         try {
//             values.image = imageUrl;
//             const response = await productApi.Add(values);
//             if (response.status === 200) {
//                 message.success('Thêm sản phẩm thành công');
//             }
//             toastSuccess('Thêm Thành Công!');
//             navigate('/admin/products');
//         } catch (error) {
//             if (error.response && error.response.status === 400) {
//                 toastError('Thêm Danh Mục Không Thành Công!');
//             }
//         }
//     };

//     return (
//         <Form form={form} onFinish={onFinish} layout="vertical">
//             <Form.Item
//                 name="name"
//                 label="Products"
//                 rules={[
//                     {
//                         required: true,
//                         message: 'Please enter category name',
//                     },
//                 ]}
//             >
//                 <Input placeholder="Enter category name" />
//             </Form.Item>
//             <Form.Item
//                 name="description"
//                 label="Description"
//                 rules={[
//                     {
//                         required: true,
//                         message: 'Please enter category name',
//                     },
//                 ]}
//             >
//                 <Input placeholder="Enter category name" />
//             </Form.Item>
//             <Form.Item
//                 name="categoryId"
//                 label="Category"
//                 rules={[
//                     {
//                         required: true,
//                         message: 'Please select a category',
//                     },
//                 ]}
//             >
//                 <Select placeholder="Select category">
//                     {categoryList.map((item, index) => (
//                         <Select.Option key={item._id} value={item._id}>
//                             {item.name}
//                         </Select.Option>
//                     ))}
//                 </Select>
//             </Form.Item>

//             {/* <Form.Item
//                 name="image"
//                 label="Image"
//                 rules={[
//                     {
//                         required: true,
//                         message: 'Please upload an image',
//                     },
//                 ]}
//             >
//                 <Upload
//                     name="images"
//                     listType="picture-card"
//                     className="avatar-uploader"
//                     showUploadList={false}
//                     action={instance.post('/images/upload')}
//                     beforeUpload={beforeUpload}
//                     onChange={handleChange}
//                 >
//                     {imageUrl ? (
//                         <img src={imageUrl} alt="avatar" style={{ width: '100%' }} />
//                     ) : (
//                         <div>
//                             {loading ? <LoadingOutlined /> : <PlusOutlined />}
//                             <div style={{ marginTop: 8 }}>Upload</div>
//                         </div>
//                     )}
//                 </Upload>
//             </Form.Item> */}
//              <CloudinaryContext cloudName={cloudName}>
//                 <Form.Item
//                     name="image"
//                     label="Hình ảnh"
//                     rules={[
//                         {
//                             required: true,
//                             message: 'Vui lòng tải lên hình ảnh',
//                         },
//                     ]}
//                 >
//                     <Upload
//                         name="images"
//                         listType="picture-card"
//                         className="avatar-uploader"
//                         showUploadList={false}
//                         action={'http://localhost:4000/api/images/upload'}
//                         data={{
//                             upload_preset: uploadPreset,
//                         }}
//                         beforeUpload={beforeUpload}
//                         onChange={handleChange}
//                     >
//                         {imageUrl ? (
//                             <Image cloudName={cloudName} publicId={imageUrl} width="100%" />
//                         ) : (
//                             <div>
//                                 {loading ? <LoadingOutlined /> : <PlusOutlined />}
//                                 <div style={{ marginTop: 8 }}>Tải lên</div>
//                             </div>
//                         )}
//                     </Upload>
//                 </Form.Item>
//             </CloudinaryContext>

//             <div >
//                 <Form.List name="product_entrys" >
//                     {(fields, { add, remove }) => (
//                         <>
//                             {fields.map(({ key, name, ...restField }) => (
//                                 <Space
//                                     key={key}
//                                     style={{
//                                         display: 'flex',
//                                         marginBottom: 8,
//                                     }}
//                                     align="baseline"
//                                 >
//                                     <Form.Item
//                                         {...restField}
//                                         name={[name, 'quantity']}
//                                         rules={[
//                                             {
//                                                 required: true,
//                                                 message: 'Missing quantity',
//                                             },
//                                         ]}
//                                     >
//                                         <Input placeholder="Quantity" />
//                                     </Form.Item>
//                                     <Form.Item
//                                         {...restField}
//                                         name={[name, 'price']}
//                                         rules={[
//                                             {
//                                                 required: true,
//                                                 message: 'Missing price',
//                                             },
//                                         ]}
//                                     >
//                                         <Input placeholder="price" />
//                                     </Form.Item>
//                                     <Form.Item
//                                         {...restField}
//                                         name={[name, 'sizeId']}
//                                         rules={[
//                                             {
//                                                 required: true,
//                                                 message: 'Missing size',
//                                             },
//                                         ]}
//                                     >
//                                         <Select placeholder="Size">
//                                             {productSize.map((item) => (
//                                                 <Option key={item._id} value={item._id}>
//                                                     {item.value}
//                                                 </Option>
//                                             ))}
//                                         </Select>
//                                     </Form.Item>
//                                     <Form.Item
//                                         {...restField}
//                                         name={[name, 'colorId']}
//                                         rules={[
//                                             {
//                                                 required: true,
//                                                 message: 'Missing color',
//                                             },
//                                         ]}
//                                     >
//                                         <Select placeholder="Color">
//                                             {productColor.map((item) => (
//                                                 <Option key={item._id} value={item._id}>
//                                                     {item.value}
//                                                 </Option>
//                                             ))}
//                                         </Select>
//                                     </Form.Item>
//                                     <MinusCircleOutlined onClick={() => remove(name)} />
//                                 </Space>
//                             ))}
//                             <Form.Item>
//                                 <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />} style={{ width: '100%' }}>
//                                     Add
//                                 </Button>
//                             </Form.Item>
//                         </>
//                     )}
//                 </Form.List>
//             </div>

//             <Form.Item>
//                 <Button type="primary" htmlType="submit">
//                     Add Products
//                 </Button>
//             </Form.Item>
//         </Form>
//     );
// };

// export default AddProducts;



import React, { useEffect, useState } from 'react';
import { Form, Input, Button, message, Space, Select, Upload } from 'antd';
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

  // Cấu hình thông tin Cloudinary của bạn
  const cloudName = 'dufcivzn4';
  const uploadPreset = 'ml_default';

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

  const beforeUpload = (file) => {
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

  const handleChange = (info) => {
    if (info.file.status === 'done') {
      setImageUrl(info.file.response.url);
      setLoading(false);
    } else if (info.file.status === 'error') {
      message.error('Failed to upload image');
      setLoading(false);
    }
  };

  const onFinish = async (values) => {
    try {
      values.image = imageUrl;
      const response = await productApi.Add(values);
      if (response.status === 200) {
        message.success('Thêm sản phẩm thành công');
      }
      toastSuccess('Thêm Thành Công!');
      navigate('/admin/products');
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toastError('Thêm Danh Mục Không Thành Công!');
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
            <Option key={item._id} value={item._id}>
              {item.name}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <CloudinaryContext cloudName={cloudName}>
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
            data={{
              upload_preset: uploadPreset,
            }}
            beforeUpload={beforeUpload}
            onChange={handleChange}
          >
            {imageUrl ? (
              <Image cloudName={cloudName} publicId={imageUrl} width="100%" />
            ) : (
              <div>
                {loading ? <LoadingOutlined /> : <PlusOutlined />}
                <div style={{ marginTop: 8 }}>Tải lên</div>
              </div>
            )}
          </Upload>
        </Form.Item>
      </CloudinaryContext>

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
          Add Products
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddProducts;
