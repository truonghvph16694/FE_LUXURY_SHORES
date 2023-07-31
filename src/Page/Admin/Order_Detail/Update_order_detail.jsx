// import React, { useEffect, useState } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { Form, Input, Button, message, Select } from 'antd';
// import order_detail_api from '../../../api/order-detail-Api';
// import { toastError, toastSuccess } from '../../../components/toast/Toast';


// const UpdateOrders = () => {
//     const { id } = useParams();
//     // const history = useHistory();
//     const [form] = Form.useForm();
//     const navigate = useNavigate();
//     useEffect(() => {
//         const fetchOrders = async () => {
//             try {
//                 const response = await order_detail_api.Get(id);
//                 console.log('order:', response);
//                 form.setFieldsValue({ status: response.status, user_id: response.user_id, province_id: response.province_id, district_id: response.district_id, ward_id: response.ward_id, detail_address: response.detail_address, created_at: response.created_at, note: response.note, ships: response.ships, finish_date: response.finish_date, total_price: response.total_price, payment: response.payment }); // Đặt giá trị mặc định cho trường name trong Form
//             } catch (error) {
//                 console.log('Failed to fetch category', error);
//             }
//         };

//         fetchOrders();
//     }, [id, form]);

//     const onFinish = async (values) => {
//         try {

//             const response = await order_detail_api.Update({ ...values, _id: id });
//             console.log('Update orders response:', response);
//             if (response.status === 200) {
//                 message.success('Orders updated successfully');
//             }
//             toastSuccess("Cập nhật thành công!")
//             navigate("/admin/orders");
//         } catch (error) {
//             if (error.response && error.response.status === 400) {
//                 // Xử lý lỗi từ phía server
//                 const errorData = error.response.data;
//                 message.error(errorData.message);
//             }
//             toastError("Cập nhật không thành công!")
//         }
//     };


//     return (
//         <Form form={form} onFinish={onFinish} layout="vertical">
//             <Form.Item
//                 name="user_id"
//                 label="User_ID"
//                 rules={[
//                     {
//                         required: true,
//                         message: 'Please enter User ID',
//                     },
//                 ]}
//             >
//                 <Input placeholder="User_ID" disabled />
//             </Form.Item>

//             <Form.Item
//                 name="province_id"
//                 label="Province_id"
//                 rules={[
//                     {
//                         required: true,
//                         message: 'Please enter Province_id',
//                     },
//                 ]}
//             >
//                 <Input placeholder="Enter province id" disabled />
//             </Form.Item>

//             <Form.Item
//                 name="district_id"
//                 label="district_id"
//                 rules={[
//                     {
//                         required: true,
//                         message: 'Please enter district_id',
//                     },
//                 ]}
//             >
//                 <Input placeholder="Enter district_id" disabled />
//             </Form.Item>

//             <Form.Item
//                 name="ward_id"
//                 label="ward_id"
//                 rules={[
//                     {
//                         required: true,
//                         message: 'Please enter ward_id',
//                     },
//                 ]}
//             >
//                 <Input placeholder="Enter ward_id" disabled />
//             </Form.Item>

//             <Form.Item
//                 name="detail_address"
//                 label="detail_address"
//                 rules={[
//                     {
//                         required: true,
//                         message: 'Please enter detail_address' ,
//                     },
//                 ]}
//             >
//                 <Input placeholder="Enter detail_address" disabled />
//             </Form.Item>


//             <Form.Item
//                 name="status"
//                 label="Status"
//                 rules={[
//                     {
//                         required: true,
//                         message: 'Please enter Status',
//                     },
//                 ]}
//             >
//                 <Select placeholder="Select category">

//                     <Select.Option value={0}>Đơn hàng mới</Select.Option>
//                     <Select.Option value={1}>Đang xử lí</Select.Option>
//                     <Select.Option value={2}>Đang giao hàng</Select.Option>
//                     <Select.Option value={3}>Hoàn Thành</Select.Option>

//                 </Select>
//             </Form.Item>

//             <Form.Item
//                 name="created_at"
//                 label="created_at"
//                 rules={[
//                     {
//                         required: true,
//                         message: 'Please enter created_at',
//                     },
//                 ]}
//             >
//                 <Input placeholder="Enter created_at" disabled />
//             </Form.Item>

//             <Form.Item
//                 name="note"
//                 label="note"
//                 rules={[
//                     {
//                         required: true,
//                         message: 'Please enter note',
//                     },
//                 ]}
//             >
//                 <Input placeholder="Enter note" />
//             </Form.Item>

//             {/* <Form.Item
//                 name="finish_date"
//                 label="finish_date"
//                 rules={[
//                     {
//                         required: true,
//                         message: 'Please enter finish_date',
//                     },
//                 ]}
//             >
//                 <Input placeholder="Enter finish_date" disabled />
//             </Form.Item> */}

//             <Form.Item
//                 name="ships"
//                 label="ships"
//                 rules={[
//                     {
//                         required: true,
//                         message: 'Please enter ships',
//                     },
//                 ]}
//             >
//                 <Input placeholder="Enter ships" disabled />
//             </Form.Item>

//             <Form.Item
//                 name="total_price"
//                 label="total_price"
//                 rules={[
//                     {
//                         required: true,
//                         message: 'Please enter total_price',
//                     },
//                 ]}
//             >
//                 <Input placeholder="Enter total_price" disabled />
//             </Form.Item>

//             <Form.Item
//                 name="payment"
//                 label="payment"
//                 rules={[
//                     {
//                         required: true,
//                         message: 'Please enter payment',
//                     },
//                 ]}
//             >
//                 <Select placeholder="Select Payment">

//                     <Select.Option value={0}>Thanh toán bằng tiền mặt</Select.Option>
//                     <Select.Option value={1}>Chuyển khoản</Select.Option>
//                     <Select.Option value={2}>Thanh toán khi nhận hàng</Select.Option>

//                 </Select>
//             </Form.Item>





//             <Form.Item>
//                 <Button type="primary" htmlType="submit">
//                     Update Orders
//                 </Button>
//             </Form.Item>
//         </Form>
//     );
// };

// export default UpdateOrders;