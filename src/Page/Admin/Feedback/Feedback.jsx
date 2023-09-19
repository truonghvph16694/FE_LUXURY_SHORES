import React, { useEffect, useState } from 'react';
import FeedbackApi from '../../../api/feedback';
import { Popconfirm, Space, Switch, Table } from 'antd';
import { DeleteTwoTone } from '@ant-design/icons';
import { toastError, toastSuccess } from '../../../components/toast/Toast';
import Loading from '../../../components/Loading/Loading';

const { Column } = Table;

const Feedback = () => {
    const [feedbackList, setFeedbackList] = useState([]);
    const [loading, setLoading] = useState(true)
    const fetchFeedbackList = async () => {
        try {
            const response = await FeedbackApi.GetAll();
            console.log('response', response);
            setFeedbackList(response);
            setLoading(false);
            console.log('feedbackList', feedbackList)

        } catch (error) {
            console.log('Failed to fetch feedbackList', error);
        }
    };
    useEffect(() => {
        fetchFeedbackList();
    }, []);

    const onHandleDelete = async (id) => {
        try {
            await FeedbackApi.Remove(id);
            toastSuccess("Delete success")
            fetchFeedbackList();
        } catch (error) {
            console.log('Failed to delete Category', error);
        }
    };
    const onChange = async (checked, record) => {
        try {
            await FeedbackApi.editStatus(record._id, { status: checked });
            await fetchFeedbackList();
            toastSuccess("Thay đổi trạng thái thành công!");
        } catch (error) {
            toastError("Thay đổi trạng thái không thành công!");
        }
    };
    return (
        <>
            <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'flex-end' }}>
            </div>
            {!loading ?
                (<Table dataSource={feedbackList}>

                    <Column title="User_Name"
                        key="vote"
                        render={(record) => <span>{record.user.fullname}</span>}
                    />
                    <Column title="content" dataIndex="content" key="content" />

                    <Column title="Product"
                        key="title"
                        render={(record) => <span>{record.order[0].product[0].product.name}</span>}
                    />
                    {/* <Column title="status" dataIndex="status" key="status" /> */}

                    <Column
                        title="Trạng thái"
                        dataIndex="status"
                        key="status"
                        render={(status, record) => (
                            <Switch className='bg-gray-500'
                                checked={status}
                                onChange={(checked) => onChange(checked, record)}
                            />
                        )}
                    />


                </Table>) : <Loading />
            }
        </>
    );
};

export default Feedback;