import React, { useEffect, useState } from "react";
import moment from "moment";
import ordersApi from "../../../api/orders";
import userApi from "../../../api/user";
import { Space, Table, Popconfirm, Button } from "antd";
import {
  DeleteTwoTone,
  EditTwoTone,
  FileAddTwoTone,
  EyeOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { toastSuccess } from "../../../components/toast/Toast";
import Loading from "../../../components/Loading/Loading";

const { Column } = Table;

const Orders = () => {
  const [ordersList, setOrdersList] = useState([]);
  const [loading, setLoading] = useState(true);

  // const fetchOrdersList = async () => {
  //     try {
  //         const response = await ordersApi.GetAll();
  //         // console.log('response', response);
  //         setOrdersList(response);
  //         setLoading(false)
  //     } catch (error) {
  //         // console.log('Failed to fetch OrdersList', error);
  //     }
  // };
  const fetchOrdersList = async () => {
    try {
      const response = await ordersApi.GetAll();
      const ordersWithData = await Promise.all(
        response.map(async (order) => {
          const provinceName = await onProvince(order.province_id);
          const districtName = await onDistrict(order.district_id);
          const wardName = await onWard(order.ward_id);
          return { ...order, provinceName, districtName, wardName };
        })
      );
      setOrdersList(ordersWithData);
      setLoading(false);
    } catch (error) {
      // console.log("Failed to fetch OrdersList", error);
    }
  };

  const convertStatus = (status) => {
    const statusStyle = {
      display: "inline-block",
      padding: "4px 10px",
      borderRadius: "4px",
      fontWeight: "bold",
      color: "white", // Màu chữ trắng
    };

    switch (status) {
      case 0:
        return (
          <span style={{ ...statusStyle, backgroundColor: "blue" }}>
            Đơn hàng mới
          </span>
        );
      case 1:
        return (
          <span style={{ ...statusStyle, backgroundColor: "orange" }}>
            Đang xử lý
          </span>
        );
      case 2:
        return (
          <span style={{ ...statusStyle, backgroundColor: "green" }}>
            Đang giao hàng
          </span>
        );
      case 3:
        return (
          <span style={{ ...statusStyle, backgroundColor: "blue" }}>
            Hoàn thành
          </span>
        );
      case 4:
        return (
          <span style={{ ...statusStyle, backgroundColor: "gray" }}>
            Đã hủy
          </span>
        );
      default:
        return (
          <span style={{ ...statusStyle, backgroundColor: "black" }}>
            Đang xử lý
          </span>
        );
    }
  };

  const convertPayment = (payment) => {
    switch (payment) {
      case 0:
        return "Thanh toán bằng tiền mặt";
      case 1:
        return "Chuyển khoản";
      case 2:
        return "Thanh toán khi nhận hàng";
      default:
        return "Đang xử lý";
    }
  };

  const convert_status_Payment = (payment) => {
    const paymentStyle = {
      display: "inline-block",
      padding: "4px 10px",
      borderRadius: "4px",
      fontWeight: "bold",
    };

    switch (payment) {
      case 0:
        return (
          <button
            style={{
              ...paymentStyle,
              color: "white", // Set text color to white
              border: "2px solid red", // Colored border
              backgroundColor: "red", // Background color
            }}
          >
            Chưa thanh toán
          </button>
        );
      case 1:
        return (
          <button
            style={{
              ...paymentStyle,
              color: "white", // Set text color to white
              border: "2px solid green", // Colored border
              backgroundColor: "green", // Background color
            }}
          >
            Đã thanh toán
          </button>
        );
      default:
        return (
          <button
            style={{
              ...paymentStyle,
              color: "white", // Set text color to white
              border: "2px solid black", // Colored border
              backgroundColor: "black", // Background color
            }}
          >
            Đang xử lý
          </button>
        );
    }
  };

  const onProvince = async (id) => {
    try {
      const response = await fetch(`https://provinces.open-api.vn/api/p/${id}`);
      const data = await response.json(); // Parse JSON response
      // // console.log('Data:', data); // Log the data for debugging
      return data.name; // Return the 'name' property from the data
    } catch (error) {
      console.error("Error:", error);
      return null; // Return null in case of an error
    }
  };
  const onDistrict = async (id) => {
    try {
      const response = await fetch(`https://provinces.open-api.vn/api/d/${id}`);
      const data = await response.json();
      return data.name;
    } catch (error) {
      console.error("Error:", error);
      return null;
    }
  };

  const onWard = async (id) => {
    try {
      const response = await fetch(`https://provinces.open-api.vn/api/w/${id}`);
      const data = await response.json();
      return data.name;
    } catch (error) {
      console.error("Error:", error);
      return null;
    }
  };

  useEffect(() => {
    fetchOrdersList();
  }, []);

  const expandedRowRender = (record, index) => {
    // // console.log('record:', record)

    const columns = [
      {
        title: "Tên sản phẩm",
        render: (record) => {
          return record.product.name;
        },
      },
      {
        title: "Hình ảnh",
        render: (record) => {
          return <img src={record.images.path} width="15%" alt="" />;
        },
      },
      {
        title: "Số Lượng",
        render: (record) => {
          return record.quantity;
        },
      },
      {
        title: "Giá",
        render: (record) => {
          return record.product.price;
        },
      },
    ];
    // // console.log('pr:',ordersList)
    return (
      <Table columns={columns} dataSource={record.product} pagination={false} />
    );
  };

  const columns = [
    {
      title: "No", // Serial Number
      dataIndex: "stt",
      key: "stt",
      render: (text, record, index) => index + 1,
      width: 70,
    },
    {
      title: "Trạng thái đơn hàng",
      dataIndex: "status",
      key: "status",
      render: (status) => convertStatus(status),
    },
    {
      title: "Tên khách hàng",
      dataIndex: ["user", "fullname"],
      key: "fullname",
    },
    {
      title: "Tỉnh/Thành phố",
      dataIndex: "provinceName", // Use the provinceName field instead of province_id
      key: "provinceName",
    },
    {
      title: "Huyện/Quận",
      dataIndex: "districtName",
      key: "districtName",
    },
    {
      title: "Xã/Phường",
      dataIndex: "wardName",
      key: "wardName",
    },
    {
      title: "Địa chỉ cụ thể",
      dataIndex: "detail_address",
      key: "detail_address",
    },
    {
      title: "Thời gian đặt",
      dataIndex: "created_at",
      key: "created_at",
      render: (created_at) => moment(created_at).format("DD/MM/YYYY"),
    },
    {
      title: "Ghi chú",
      dataIndex: "note",
      key: "note",
    },
    {
      title: "Tổng tiền",
      dataIndex: "total_price",
      key: "total_price",
    },
    {
      title: "Phương thức thanh toán",
      dataIndex: "payment",
      key: "payment",
      render: (payment) => convertPayment(payment),
    },
    // {
    //   title: "Trạng thái thanh toán",
    //   dataIndex: "status_payment",
    //   key: "status_payment",
    //   render: (payment) => convert_status_Payment(payment),
    // },
    {
      title: "Action",
      render: (record) => (
        <Space size="middle">
          <Link to={`/admin/orders/edit/${record._id}`}>
            <EditTwoTone style={{ fontSize: "20px", color: "#08c" }} />
          </Link>
        </Space>
      ),
    },
    // Other fields you want to display in the main table
  ];

  return (
    <div>
      <div>
        {!loading ? (
          <Table
            columns={columns}
            expandable={{
              expandedRowRender: expandedRowRender,
            }}
            dataSource={ordersList.map((order) => ({
              ...order,
              key: order._id,
            }))}
          // defaultExpandAllRows={true}
          />
        ) : (
          <p>
            <Loading />
          </p>
        )}
      </div>

      {/* <Table dataSource={ordersList}>
            <Column
                title="Trạng thái đơn hàng"
                dataIndex="status"
                key="status"
                render={(status) => convertStatus(status)}
            />
            <Column
                title="Tên khách hàng"
                dataIndex={['user', 'fullname']}
                key="fullname"
            />
            <Column title="Tỉnh/Thành phố" dataIndex="province_id" key="province_id" />
            <Column title="Quận/Huyện" dataIndex="district_id" key="district_id" />
            <Column title="Xã/Phường" dataIndex="ward_id" key="ward_id" />
            <Column title="Địa chỉ cụ thể" dataIndex="detail_address" key="detail_address" />
            <Column
                title="Thời gian đặt"
                dataIndex="created_at"
                key="created_at"
                render={(created_at) => moment(created_at).format('DD/MM/YYYY')}
            />
            <Column title="Ghi chú" dataIndex="note" key="note" />
            <Column title="Total Price" dataIndex="total_price" key="total_price" />
            <Column
                title="Phương thức thanh toán"
                dataIndex="payment"
                key="payment"
                render={(payment) => convertPayment(payment)}
            />
            <Column
                title="Trạng thái thanh toán"
                dataIndex="status_payment"
                key="status_payment"
                render={(payment) => convert_status_Payment(payment)}
            />
            <Column
                title="Action"
                render={(record) => (
                    <Space size="middle">
                        <button className='max-w-[150px] bg-[#ee4d2d] text-[#fff] rounded py-[5px]' type='submit' >Huỷ đơn hàng</button>
                    </Space>
                )}
            />
        </Table> */}
    </div>
  );
};

export default Orders;
