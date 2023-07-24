// import React, { useEffect ,useState} from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { Form, Input, Button, message, Select } from 'antd';
// import billApi from '../../../api/billsApi';
// import { toastError, toastSuccess } from '../../../components/toast/Toast';


// const UpdateBills = () => {
//     const { id } = useParams();
//     // const history = useHistory();
//     const [form] = Form.useForm();
//     const navigate = useNavigate();
//     useEffect(() => {
//         const fetchBills = async () => {
//             try {
//                 const response = await billApi.Get(id);
//                 console.log('bills:', response);
//                 form.setFieldsValue({ user_id: response.user_id, code: response.code,VAT: response.VAT, total_price: response.total_price, order_id: response.order_id }); // Đặt giá trị mặc định cho trường name trong Form
//             } catch (error) {
//                 console.log('Failed to fetch bills', error);
//             }
//         };

//         fetchBills();
//     }, [id, form]);

//     const onFinish = async (values) => {
//         try {

//             const response = await billApi.Update({ ...values, _id: id });
//             console.log('Update bills response:', response);
//             if (response.status === 200) {
//                 message.success('Bill updated successfully');
//             }
//             toastSuccess("Cập nhật thành công!")
//             navigate("/admin/bills");
//         } catch (error) {
//             if (error.response && error.response.status === 400) {
//                 // Xử lý lỗi từ phía server
//                 const errorData = error.response.data;
//                 message.error(errorData.message);
//             }
//             toastError("Cập nhật không thành công!")
//         }
//     };
// //gọi caterory
    

//     return (
//         <Form form={form} onFinish={onFinish} layout="vertical">
//             <Form.Item
//                 name="user_id"
//                 label="User_ID"
//                 rules={[
//                     {
//                         required: true,
//                         message: 'Please enter',
//                     },
//                 ]}
//             >
//                 <Input placeholder="Enter user_id"  disabled/>
//             </Form.Item>
//             <Form.Item
//                 name="code"
//                 label="Code"
//                 rules={[
//                     {
//                         required: true,
//                         message: 'Please enter',
//                     },
//                 ]}
//             >
//                 <Input placeholder="Enter code" disabled/>
//             </Form.Item>

//             <Form.Item
//                 name="total_price"
//                 label="Total_Price"
//                 rules={[
//                     {
//                         required: true,
//                         message: 'Please enter',
//                     },
//                 ]}
//             >
//                 <Input placeholder="Enter Total_Price" disabled/>
//             </Form.Item>

//             <Form.Item
//                 name="VAT"
//                 label="VAT"
//                 rules={[
//                     {
//                         required: true,
//                         message: 'VAT',
//                     },
//                 ]}
//             >
//                 <Input placeholder="VAT" disabled/>

//             </Form.Item>

//             <Form.Item
//                 name="order_id"
//                 label="Order_ID"
//                 rules={[
//                     {
//                         required: true,
//                         message: 'Please enter',
//                     },
//                 ]}
//             >
//                 <Input placeholder="Enter Order_ID" disabled/>
//             </Form.Item>

//             <Form.Item>
//                 <Button type="primary" htmlType="submit">
//                     Update Products
//                 </Button>
//             </Form.Item>
//         </Form>
//     );
// };

// export default UpdateBills;