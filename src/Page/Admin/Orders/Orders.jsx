import React, { useEffect, useState } from "react";
import moment from "moment";
import ordersApi from "../../../api/orders";
import { Space, Table, Select, Button } from "antd";
import {
  DeleteTwoTone,
  EditTwoTone,
  FileAddTwoTone,
  EyeOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import Loading from "../../../components/Loading/Loading";

const { Column } = Table;
const { Option } = Select;

const Orders = () => {
  const [ordersList, setOrdersList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [searchOrderId, setSearchOrderId] = useState(""); // Thêm state cho ID đơn hàng

  const handleStatusChange = (value) => {
    setSelectedStatus(value);
  };

  const handleOrderIdChange = (e) => {
    setSearchOrderId(e.target.value);
  };

  const handleSearchOrderId = () => {
    if (searchOrderId.trim() === "") {
      setFilteredOrders([]);
    } else {
      const foundOrder = ordersList.find((order) => order._id === searchOrderId);
      if (foundOrder) {
        setFilteredOrders([foundOrder]);
      } else {
        // Hiển thị thông báo nếu không tìm thấy đơn hàng
        // Ví dụ: toastError("Không tìm thấy đơn hàng với ID này");
        setFilteredOrders([]);
      }
    }
  };

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
      console.error("Error fetching orders:", error);
    }
  };

  const convertStatus = (status) => {
    const statusStyle = {
      display: "inline-block",
      padding: "2px 6px",
      borderRadius: "4px",
      fontWeight: "bold",
      color: "white",
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
          <span style={{ ...statusStyle, backgroundColor: "orange" }}>
            Đang Giao Hàng
          </span>
        );
      case 3:
        return (
          <span style={{ ...statusStyle, backgroundColor: "Green" }}>
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

  const onProvince = async (id) => {
    try {
      const response = await fetch(`https://provinces.open-api.vn/api/p/${id}`);
      const data = await response.json();
      return data.name;
    } catch (error) {
      console.error("Error fetching province:", error);
      return null;
    }
  };

  const onDistrict = async (id) => {
    try {
      const response = await fetch(`https://provinces.open-api.vn/api/d/${id}`);
      const data = await response.json();
      return data.name;
    } catch (error) {
      console.error("Error fetching district:", error);
      return null;
    }
  };

  const onWard = async (id) => {
    try {
      const response = await fetch(`https://provinces.open-api.vn/api/w/${id}`);
      const data = await response.json();
      return data.name;
    } catch (error) {
      console.error("Error fetching ward:", error);
      return null;
    }
  };

  useEffect(() => {
    fetchOrdersList();
  }, []);

  const columns = [
    {
      title: "No",
      dataIndex: "stt",
      key: "stt",
      render: (text, record, index) => {
        return index + 1;
      },
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
      dataIndex: "provinceName",
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
        <div className="mb-4 flex items-center justify-end mr-8">
          <input
            type="text"
            value={searchOrderId}
            onChange={handleOrderIdChange}
            placeholder="Nhập ID đơn hàng"
            className="px-4 py-2 border rounded-l-md focus:outline-none focus:ring focus:border-blue-300"
            style={{ marginRight: "10px" }}
          />
          <Button
            type="primary"
            onClick={handleSearchOrderId}
            style={{ marginRight: "10px" }}
            className="bg-blue-500"
          >
            Tìm kiếm theo ID
          </Button>
          Lọc:<Select
            style={{ width: 150, marginLeft: "10px" }}
            placeholder="Chọn trạng thái"
            onChange={handleStatusChange}
            value={selectedStatus}
          >
            <Option value={null}>Tất cả</Option>
            <Option value={0}>Đang xử lí</Option>
            <Option value={1}>Xác nhận</Option>
            <Option value={2}>Đang Giao Hàng</Option>
            <Option value={3}>Hoàn Thành</Option>
            <Option value={4}>Đã Hủy</Option>
          </Select>
        </div>

        {!loading ? (
          <Table
            columns={columns}
            dataSource={
              filteredOrders.length > 0
                ? filteredOrders
                : selectedStatus !== null
                  ? ordersList.filter((order) => order.status === selectedStatus)
                  : searchQuery
                    ? filteredOrders
                    : ordersList
            }
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
