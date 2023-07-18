import React, { useEffect, useState } from 'react';
import userApi from '../../../api/user';
// import { Link } from 'react-router-dom';
import { Table, Switch } from 'antd';
// import { FileAddTwoTone } from '@ant-design/icons';
import { toastError, toastSuccess } from '../../../components/toast/Toast';

const { Column } = Table;

const User = () => {
    const [userList, setUserList] = useState([]);

    const fetchUserList = async () => {
        try {
            const response = await userApi.GetAll();
            console.log('response', response);
            setUserList(response);
        } catch (error) {
            console.log('Failed to fetch UserList', error);
        }
    };

    useEffect(() => {
        fetchUserList();
    }, []);

    const onChange = async (checked, record) => {
        console.log('record', record._id, checked);
        try {
            await userApi.editStatus(record._id, { status: checked });
            fetchUserList();
            toastSuccess("Thay đổi trạng thái thành công!")
        } catch (error) {
            toastError("Thay đổi trạng thái không thành công!")
        }
    };

    return (
        <>
            <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'flex-end' }}>
            </div>
            <Table dataSource={userList}>
                <Column title="FullName" dataIndex="fullname" key="fullname" />
                <Column title="Số điện thoại" dataIndex="phone" key="phone" />
                <Column title="Email" dataIndex="email" key="email" />
                <Column
                    title="Trạng thái"
                    dataIndex="status"
                    key="status"
                    render={(status, record) => (
                        <Switch checked={status} onChange={(checked) => onChange(checked, record)} />
                    )}
                />
            </Table>
        </>
    );
};

export default User;