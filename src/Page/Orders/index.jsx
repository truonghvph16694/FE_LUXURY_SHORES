import React, { useEffect, useState } from 'react';
import moment from 'moment';
import ordersApi from '../../api/orders';
import { Link } from 'react-router-dom'
import { Space, Table, Popconfirm, Button } from 'antd';
// import { DeleteTwoTone, EditTwoTone, FileAddTwoTone, EyeOutlined } from '@ant-design/icons';
// import { Link, useParams } from 'react-router-dom';
import { toastError, toastSuccess } from '../../components/toast/Toast';
import Loading from "../../components/Loading/Loading"

// const { Column } = Table;

const Orders = () => {
    const [ordersList, setOrdersList] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchOrdersList = async () => {
        try {
            const userlocal = localStorage.getItem('user')
            const user = JSON.parse(userlocal)
            const response = await ordersApi.GetAll();
            const data = response.filter(item => item.user_id === user._id);
            console.log("object", data)

            const ordersWithData = await Promise.all(data.map(async (order) => {
                const provinceName = await onProvince(order.province_id);
                const districtName = await onDistrict(order.district_id);
                const wardName = await onWard(order.ward_id);
                return {
                    ...order,
                    provinceName,
                    districtName,
                    wardName
                };
            }));

            console.log('ordersWithData', ordersWithData);
            setOrdersList(ordersWithData);
            setLoading(false);
        } catch (error) {
            console.log('Failed to fetch OrdersList', error);
        }
    };




    const convertStatus = (status) => {
        switch (status) {
            case 0:
                return 'Đơn hàng mới';
            case 1:
                return 'Đang xử lý';
            case 2:
                return 'Đang giao hàng';
            case 3:
                return 'Hoàn thành';
            case 4:
                return 'Đã hủy';
            default:
                return 'Đang xử lý';
        }
    };

    const convertPayment = (payment) => {
        switch (payment) {
            case 0:
                return 'Thanh toán bằng tiền mặt';
            case 1:
                return 'Chuyển khoản';
            case 2:
                return 'Thanh toán khi nhận hàng';
            default:
                return 'Đang xử lý';
        }
    };

    const convert_status_Payment = (payment) => {
        switch (payment) {
            case 0:
                return 'Chưa thanh toán';
            case 1:
                return 'Đã thanh toán'
            default:
                return 'Đang xử lý';
        }
    };

    const cancel_Orders = async (id, record) => {
        if (record.status === 2 || record.status === 3) {
            // Đơn hàng đang giao hàng hoặc đã hoàn thành, hiển thị thông báo
            toastError("Đơn hàng của bạn đang được giao hoặc đã hoàn thành.");
            return;
        }

        // console.log('Hủy đơn hàng:', id);

        try {
            const status = 4;
            const updatedRecord = { ...record, status };
            const response = await ordersApi.Update(updatedRecord, id);

            console.log('Phản hồi:', response);
            fetchOrdersList()
            if (response.status === 200) {
                toastSuccess("Cập nhật thành công!");

                // Cập nhật ordersList sau khi hủy thành công
                setOrdersList(prevOrders =>
                    prevOrders.map(order => order._id === id ? updatedRecord : order)
                );

            }
        } catch (error) {
            toastError("Cập nhật không thành công!");

        }
    };

    const onProvince = async (id) => {
        try {
            const response = await fetch(`https://provinces.open-api.vn/api/p/${id}`);
            const data = await response.json(); // Parse JSON response
            console.log('Data:', data); // Log the data for debugging
            return data.name; // Return the 'name' property from the data
        } catch (error) {
            console.error('Error:', error);
            return null; // Return null in case of an error
        }
    };
    const onDistrict = async (id) => {
        try {
            const response = await fetch(`https://provinces.open-api.vn/api/d/${id}`);
            const data = await response.json();
            return data.name;
        } catch (error) {
            console.error('Error:', error);
            return null;
        }
    };

    const onWard = async (id) => {
        try {
            const response = await fetch(`https://provinces.open-api.vn/api/w/${id}`);
            const data = await response.json();
            return data.name;
        } catch (error) {
            console.error('Error:', error);
            return null;
        }
    };


    useEffect(() => {
        fetchOrdersList();
        // cancel_Orders();

    }, []);



    const expandedRowRender = (record) => {
        // console.log('record:', record)
        const columns = [{
            title: 'Tên sản phẩm',
            render: (record) => {
                return record.product.name;
            },
        },
        {
            title: 'Hình ảnh',
            render: (record) => {
                return <img src={record.images[0].path} width="15%" alt="" />
            },
        },
        {
            title: 'Hình ảnh',
            render: (record) => {
                return record.quantity
            },
        },
        {
            title: 'Giá',
            render: (record) => {
                return record.product.price
            }
        },
        ];
        // console.log('pr:',ordersList)
        return (
            <Table columns={columns} dataSource={record.product} pagination={false} />

        );
    };

    const columns = [
        {
            title: "Trạng thái đơn hàng",
            dataIndex: "status",
            key: "status",
            render: (status) => convertStatus(status)
        },
        {
            title: "Tên khách hàng",
            dataIndex: ['user', 'fullname'],
            key: "fullname"
        },
        {
            title: "Tỉnh/Thành phố",
            dataIndex: "provinceName", // Use the provinceName field instead of province_id
            key: "provinceName"
        },
        {
            title: "Huyện/Quận",
            dataIndex: "districtName",
            key: "districtName"
        },
        {
            title: "Xã/Phường",
            dataIndex: "wardName",
            key: "wardName"
        },
        {
            title: "Địa chỉ cụ thể",
            dataIndex: "detail_address",
            key: "detail_address"
        },
        {
            title: "Thời gian đặt",
            dataIndex: "created_at",
            key: "created_at",
            render: (created_at) => moment(created_at).format('DD/MM/YYYY')
        },
        {
            title: "Ghi chú",
            dataIndex: "note",
            key: "note"
        },
        {
            title: "Tổng tiền",
            dataIndex: "total_price",
            key: "total_price"
        },
        {
            title: "Phương thức thanh toán",
            dataIndex: "payment",
            key: "payment",
            render: (payment) => convertPayment(payment)
        },
        {
            title: "Trạng thái thanh toán",
            dataIndex: "status_payment",
            key: "status_payment",
            render: (payment) => convert_status_Payment(payment)
        },
        {
            title: "Action",
            render: (record) =>
                <div>
                    <Popconfirm
                        title="Bạn có chắc muốn huỷ đơn hàng?"
                        onConfirm={() => cancel_Orders(record._id, record)}
                        okText="Có"
                        cancelText="Không"
                        disabled={record.status === 4}
                    >
                        <button className='max-w-[180px] bg-[#ee4d2d] text-[#fff] rounded py-[5px]' type='submit'>
                            {record.status !== 4 ? "Huỷ đơn hàng" : "Đã hủy"}
                        </button>

                    </Popconfirm>
                    <Link to={`/feedback/${record._id}`}>
                        <button>
                        Viết đánh giá
                        </button>
                    </Link>
                </div>
        }
    ];


    return (
        <div>

            <div>
                {!loading ? (
                    <Table
                        className='pt-6'
                        columns={columns}
                        expandable={{
                            expandedRowRender: expandedRowRender,
                        }}
                        dataSource={ordersList.map(order => ({ ...order, key: order._id }))}
                    // defaultExpandAllRows={true} 
                    />
                ) : (
                    <div className=' flex justify-center items-center'> <Loading /> </div>
                )}
            </div>
        </div>
    );
};

export default Orders;
