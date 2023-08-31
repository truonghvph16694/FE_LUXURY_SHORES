import React, { useEffect, useState } from 'react';
import userApi from '../../../api/user';
import { Table, Switch } from 'antd';
import { toastError, toastSuccess } from '../../../components/toast/Toast';
import Loading from '../../../components/Loading/Loading';

const { Column } = Table;

const User = () => {
    const [userList, setUserList] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchUserList = async () => {
        try {
            const response = await userApi.GetAll();
            // Thêm trường "stt" vào dữ liệu
            const userListWithStt = response.map((user, index) => ({ ...user, stt: index + 1 }));
            setUserList(userListWithStt);
            setLoading(false);
        } catch (error) {
            console.log('Failed to fetch UserList', error);
        }
    };

    useEffect(() => {
        fetchUserList();
    }, []);

    const onChange = async (checked, record) => {
        try {
            await userApi.editStatus(record._id, { status: checked });
            fetchUserList();
            toastSuccess('Thay đổi trạng thái thành công!');
        } catch (error) {
            toastError('Thay đổi trạng thái không thành công!');
        }
    };

    return (
        <>
            <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'flex-end' }}>
            </div>
            {!loading ? (
                <Table dataSource={userList}>
                    <Column title="No" dataIndex="stt" key="stt" />
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
            ) : (
                <Loading />
            )}
        </>
    );
};

export default User;
