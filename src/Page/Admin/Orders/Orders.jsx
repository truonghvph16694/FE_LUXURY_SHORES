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
  const handleSearch = () => {
    const filtered = ordersList.filter((order) =>
      order.fullName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredOrders(filtered);
  };

  const handleClear = () => {
    setSearchQuery("");
    setFilteredOrders([]);
  };

  const [ordersList, setOrdersList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredOrders, setFilteredOrders] = useState([]);

  console.log("img", ordersList);
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
      // Handle error
    }
  };

  const convertStatus = (status) => {
    const statusStyle = {
      display: "inline-block",
      padding: "2px 6px",
      borderRadius: "4px",
      fontWeight: "bold",
      color: "white", // Màu chữ trắng
    };

    switch (status) {
      case 0:
        return (
          <span style={{ ...statusStyle, backgroundColor: "Yellow" }}>
            Đang xử lí
          </span>
        );
      case 1:
        return (
          <span style={{ ...statusStyle, backgroundColor: "orange" }}>
            Xác nhận
          </span>
        );
      case 2:
        return (
          <span style={{ ...statusStyle, backgroundColor: "Green" }}>
            Đang Giao Hàng
          </span>
        );
      case 3:
        return (
          <span style={{ ...statusStyle, backgroundColor: "Gray" }}>
            Hoàn Thành
          </span>
        );
      case 4:
        return (
          <span style={{ ...statusStyle, backgroundColor: "Red" }}>Đã Hủy</span>
        );
      default:
        return (
          <span style={{ ...statusStyle, backgroundColor: "Yellow" }}>
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

  const columns = [
    {
      title: "No", // Serial Number
      dataIndex: "stt",
      key: "stt",
      render: (text, record, index) => index + 1,
      width: 30,
    },
    {
      title: "Trạng thái đơn hàng",
      dataIndex: "status",
      key: "status",
      render: (status) => convertStatus(status),
      width: 160,
    },
    {
      title: "Tên khách hàng",
      dataIndex: ["fullName"],
      key: "fullname",
      width: 150,
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
      width: 10,
    },
    // Other fields you want to display in the main table
  ];

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
          marginTop: 20,
          marginRight: 20,
        }}
      >
        <h1 className="text-2xl font-bold ml-10">Danh Sách Đơn Hàng</h1>
      </div>
      <div>
      <div className="mb-4 flex items-center justify-end">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 border rounded-l-md focus:outline-none focus:ring focus:border-blue-300"
            style={{ marginRight: "10px" }}
          />
          <button
            onClick={handleSearch}
            className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 transition duration-300"
          >
            Search
          </button>
        </div>

        {!loading ? (
          <Table
            columns={columns}
            dataSource={(searchQuery ? filteredOrders : ordersList).map(
              (order) => ({
                ...order,
                key: order._id,
              })
            )}
          />
        ) : (
          <p>
            <Loading />
          </p>
        )}
      </div>
    </div>
  );
};

export default Orders;
