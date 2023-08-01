import React from 'react';
import { Table } from 'antd';

const dataSource = [
  {
    key: '1',
    name: 'John Doe',
    age: 30,
    address: '123 ABC Street',
  },
  {
    key: '2',
    name: 'Jane Smith',
    age: 28,
    address: '456 XYZ Street',
  },
];

const expandedRowRender = (record) => {
  // Thông tin bổ sung hoặc chi tiết về mỗi hàng
  return (
    <p>
      Additional information for {record.name}: <br />
      Age: {record.age} <br />
      Address: {record.address}
    </p>
  );
};

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
];

const Demo = () => {
  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      expandable={{
        expandedRowRender: expandedRowRender,
        // rowExpandable: (record) => record.name !== 'Jane Smith', // Điều kiện để mở rộng hàng
      }}
    />
  );
};

export default Demo;
