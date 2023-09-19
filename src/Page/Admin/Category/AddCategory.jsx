import React from "react";
import { Form, Input, Button, message } from "antd";
import categoryApi from "../../../api/category";
import { useNavigate } from "react-router-dom";
import { toastError, toastSuccess } from "../../../components/toast/Toast";
const AddCategory = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      const response = await categoryApi.Add(values);
      if (response.status === 200) {
        message.success("Category added successfully");
      }
      toastSuccess("Thêm Danh Mục Thành Công!");
      navigate("/admin/category");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // Xử lý lỗi từ phía server
        // const errorData = error.response.data;
        // message.error(errorData.message);
        toastError("Thêm Danh Mục Không Thành Công!");
      }
    }
  };

  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <Form.Item
        name="name"
        label="Tên Danh Mục"
        rules={[
          {
            required: true,
            message: "Please enter category name",
          },
        ]}
      >
        <Input placeholder="tên danh mục" />
      </Form.Item>

      <Form.Item>
        <Button
          htmlType="submit"
          className="btn-primary"
          style={{ backgroundColor: "#007FFF", color: "white" }}
        >
          Thêm Danh Mục
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddCategory;
