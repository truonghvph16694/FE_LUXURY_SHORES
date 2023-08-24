import React, { useEffect, useState } from 'react';
import FeedbackApi from '../../../api/feedback';
import { Popconfirm, Space, Table } from 'antd';
import { DeleteTwoTone } from '@ant-design/icons';
import { toastSuccess } from '../../../components/toast/Toast';
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
    return (
        <>
            <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'flex-end' }}>
                {/* <Link >
                    <Button type="primary" icon={<FileAddTwoTone />}>
                        Add New
                    </Button>
                </Link> */}

            </div>
            {!loading ?
                (<Table dataSource={feedbackList}>
                    <Column title="title" dataIndex="title" key="title" />
                    <Column title="content" dataIndex="content" key="content" />
                    <Column title="vote" dataIndex="vote" key="vote" />
                    <Column title="status" dataIndex="status" key="status" />


                    <Column
                        title="Action"
                        render={(record) => (
                            <Space size="middle">
                                {/* <Link>
                                <EditTwoTone style={{ fontSize: '20px', color: '#08c' }} />
                            </Link> */}
                                <Popconfirm
                                    title="Delete the task"
                                    description="Are you sure to delete this task?"
                                    onConfirm={() => onHandleDelete(record._id)}
                                    okText="Yes"
                                    cancelText="No"
                                    okButtonProps={{ className: 'text-light bg-primary' }}
                                >
                                    <DeleteTwoTone style={{ fontSize: '18px' }} />
                                </Popconfirm>
                            </Space>
                        )}
                    />
                </Table>) : <Loading />
            }
        </>
    );
};

export default Feedback;