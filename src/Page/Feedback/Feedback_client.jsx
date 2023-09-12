import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ordersApi from '../../api/orders';
import FeedbackApi from '../../api/feedback';
import { toastError, toastSuccess } from '../../components/toast/Toast';

const Feedback_client = () => {
  const { id } = useParams();
  const userlocal = localStorage.getItem('user');
  const user = JSON.parse(userlocal);
  const [order, setOrder] = useState([]);
  const [formDataList, setFormDataList] = useState([]);
  const nav = useNavigate();

  const fetchOrder = async () => {
    try {
      const response = await ordersApi.Get(id);
      setOrder(response);
    } catch (error) {
      console.log('Failed to fetch order', error);
    }
  };

  const dieukien = async () => {
    try {
      const data = await FeedbackApi.Get(id);
      if (data.orderid) {
        nav('/*');
      }
    } catch (error) {
      console.log('Failed to fetch category', error);
    }
  };

  const handleInput = (e, index) => {
    const updatedFormDataList = [...formDataList];
    const formData = {
      ...updatedFormDataList[index],
      content: e.target.value,
      product_id: order.product[index].product._id,
      user_id: user._id,
      order_id: id,
    };
    updatedFormDataList[index] = formData;
    setFormDataList(updatedFormDataList);
  };

  const handleSubmit = async (e, index) => {
    e.preventDefault();
    try {
      const response = await FeedbackApi.Add(formDataList[index]);
      console.log(response)
      if (response.status === 200) {
        toastSuccess('Đã đánh giá!');
        // Có thể thực hiện các hành động sau khi đánh giá thành công, ví dụ: cập nhật trạng thái sản phẩm
      } else {
        toastError('Đánh giá không thành công!');
      }
    } catch (error) {
      console.log('Failed to add feedback', error);
      toastError('Đánh giá không thành công!');
    }
  };

  useEffect(() => {
    fetchOrder();
    dieukien();
  }, []);

  return (
    <div>
      {order.product &&
        order.product.map((product, index) => (
          <div key={index}>
            <form onSubmit={(e) => handleSubmit(e, index)}>
              <input type="text" value={user._id} hidden />
              <input type="text" value={id} hidden />
              <input type="text" value={product.product._id} hidden />
              <br />
              <p>Name: {product.product.name}</p>
              <img src={product.images[0].path} alt="" />
              <p>Price: {product.product.price} VNĐ</p>
              <p>Quantity: {product.quantity}</p>

              <label htmlFor={`content-${index}`}>Nội dung đánh giá * :</label>
              <textarea
                type="text"
                id={`content-${index}`}
                name="content"
                value={formDataList[index] ? formDataList[index].content : ''}
                onChange={(e) => handleInput(e, index)}
              />
              <button type="submit">Gửi đánh giá</button>
            </form>
            <hr />
          </div>
        ))}
    </div>
  );
};

export default Feedback_client;
