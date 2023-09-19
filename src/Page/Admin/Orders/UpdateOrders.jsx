import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Input, Button, message, Select, Table } from 'antd';
import ordersApi from '../../../api/orders';
import { toastError, toastSuccess } from '../../../components/toast/Toast';
import Loading from '../../../components/Loading/Loading';
import { formatCurrency } from '../../../../utils';


const UpdateOrders = () => {
    const { id } = useParams();
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [status, setStatus] = useState(0);
    const [previousStatus, setPreviousStatus] = useState(status);

    const [ordersList, setOrdersList] = useState([]);
    const [loading, setLoading] = useState(true);

    console.log("Selected status:", status);

    // const handleStatusChange = (value) => {
    //     console.log("Selected status:", value);
    //     setStatus(value);
    // };
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await ordersApi.Get(id);
                console.log('order:', response);
                setStatus(response.status);
                setOrdersList(response);
                console.log("rp: ", response)
                setLoading(false);
                form.setFieldsValue({ status: response.status, user_id: response.user_id, province_id: response.province_id, district_id: response.district_id, ward_id: response.ward_id, detail_address: response.detail_address, created_at: response.created_at, note: response.note, ships: response.ships, finish_date: response.finish_date, total_price: response.total_price, payment: response.payment }); // Đặt giá trị mặc định cho trường name trong Form
            } catch (error) {
                console.log('Failed to fetch category', error);
            }
        };

        fetchOrders();
    }, [id, form]);
    const handleStatusChange = (value) => {
        let newStatus = value;

        if (newStatus === 3) {
            const confirm = window.confirm("Are you sure you want to set the status to Completed?");
            if (!confirm) {
                // User clicked cancel, so reset status to the previous value
                newStatus = previousStatus;
            } else {
                // User confirmed, update previousStatus to the new value
                setPreviousStatus(newStatus);
            }
        } else {
            // Update previousStatus for other status changes
            setPreviousStatus(newStatus);
        }

        setStatus(newStatus);
    };


    const onFinish = async (values) => {
        try {

            const response = await ordersApi.Update({ ...values, _id: id });
            console.log('Update orders response:', response);
            if (response.status === 200) {
                message.success('Orders updated successfully');
            }
            toastSuccess("Cập nhật thành công!")
            navigate("/admin/orders");
        } catch (error) {
            if (error.response && error.response.status === 400) {
                // Xử lý lỗi từ phía server
                const errorData = error.response.data;
                message.error(errorData.message);
            }
            toastError("Cập nhật không thành công!")
        }
    };


    const columns = [
        {
            title: "Sản phẩm",
            render: (record) => {
                return record.product.name
            }
        },
        {
            title: "Ảnh",
            render: (record) => {
                return <img src={record.images.path} width="25%" alt="" />
            }
        },
        {
            title: "Số lượng",
            dataIndex: "quantity"
        },
        {
            title: "Giá",
            render: (record) => {
                return formatCurrency(record.product.price)
            }
        }
    ];

    const columns2 = [
        {
            title: "Địa chỉ cụ thể",
            dataIndex: "detail_address",
            key: "detail_address"
        },
    ];



    return (
        <div >
            <Form form={form} onFinish={onFinish} layout="vertical">


                <Form.Item
                    name="status"
                    label="Trạng thái đơn hàng"
                    rules={[
                        {
                            required: true,
                            message: 'Please enter Status',
                        },
                    ]}
                >
                    <Select
                        placeholder="Select Status"
                        onChange={handleStatusChange}
                        value={status}
                        disabled={status === 3}
                    >
                        <Select.Option value={0} disabled={status >= 0}>Đơn hàng mới</Select.Option>
                        <Select.Option value={1} disabled={status >= 1}>Xác nhận</Select.Option>
                        <Select.Option value={2} disabled={status >= 2}>Đang giao hàng</Select.Option>
                        <Select.Option value={3} disabled={status >= 3}>Hoàn thành</Select.Option>
                        <Select.Option value={4} disabled={status >= 3}>Đã hủy</Select.Option>
                    </Select>
                </Form.Item>

                {/* <Form.Item
                    name="created_at"
                    label="created_at"
                    rules={[
                        {
                            required: true,
                            message: 'Please enter created_at',
                        },
                    ]}
                >
                    <Input placeholder="Enter created_at" disabled />
                </Form.Item> */}

                {/* <Form.Item
                    name="note"
                    label="note"
                    rules={[
                        {
                            // required: true,
                            message: 'Please enter note',
                        },
                    ]}
                >
                    <Input placeholder="Note" disabled />
                </Form.Item> */}

                {/* <Form.Item
                    name="ships"
                    label="ships"
                    rules={[
                        {
                            required: false,
                            message: 'Please enter ships',
                        },
                    ]}
                >
                    <Input placeholder="Enter ships" disabled />
                </Form.Item> */}

                {/* <Form.Item
                    name="total_price"
                    label="total_price"
                    rules={[
                        {
                            required: true,
                            message: 'Please enter total_price',
                        },
                    ]}
                >
                    <Input placeholder="Enter total_price" disabled />
                </Form.Item>

                <Form.Item
                    name="payment"
                    label="payment"
                    rules={[
                        {
                            required: true,
                            message: 'Please enter payment',
                        },
                    ]}
                >
                    <Select placeholder="Select Payment" disabled>

                        <Select.Option value={0}>Thanh toán bằng tiền mặt</Select.Option>
                        <Select.Option value={1}>Chuyển khoản</Select.Option>
                        <Select.Option value={2}>Thanh toán khi nhận hàng</Select.Option>

                    </Select>
                </Form.Item> */}

                <Form.Item>
                    <Button htmlType="submit" className='bg-blue-400'>
                        Update Orders
                    </Button>
                </Form.Item>
            </Form >

            <div>
                {!loading ? (
                    <div className='relative'>
                        <Table
                            columns={columns}
                            dataSource={ordersList.product}
                            pagination={false}
                        />
                        <div className='flex pt-4'>
                            <div className=''>
                                <label htmlFor="" className='font-bold'>Ghi chú :</label>
                                <span>{ordersList.note}</span>
                            </div>
                            <div className='absolute  right-24'>
                                <div className='ml-36'>
                                    <label className='font-bold' >Phí ship :</label>
                                    <span> {formatCurrency(ordersList.ships)}</span>
                                </div>

                                <br />
                                <br />
                                <br />
                                <label className='font-bold text-3xl '>Tổng tiền:</label>
                                <span className='text-3xl'> {formatCurrency(ordersList.total_price)}</span>
                            </div>
                        </div>
                    </div>
                ) : (
                    <p><Loading /></p>
                )}
            </div>
        </div>
    );
};

export default UpdateOrders;