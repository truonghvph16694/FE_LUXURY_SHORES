import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ordersApi from '../../api/orders';
import FeedbackApi from '../../api/feedback';
import {message} from 'antd';
import { toastSuccess } from '../../components/toast/Toast';

const Feedback_client = () => {
  const { id } = useParams();
  const userlocal = localStorage.getItem('user');
  const user = JSON.parse(userlocal);
  const [order, setOrder] = useState([]);
  const [formDataList, setFormDataList] = useState([]); // State to hold form data list
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
    // Create a copy of the formDataList array
    const updatedFormDataList = [...formDataList];

    // Create an object to store form data
    const formData = {
      ...updatedFormDataList[index],
      content: e.target.value,
      product_id: order.product[index].product._id,
      user_id: user._id,
      order_id: id,
    };

    // Update the form data state for the specific form at the given index
    updatedFormDataList[index] = formData;

    // Update the formDataList state with the updated array
    setFormDataList(updatedFormDataList);
  };

  const handleSubmit = (e, index) => {
    e.preventDefault(); // Prevent the default form submission behavior
    console.log('Form Data:', formDataList[index]); // Log the form data to the console for the specific form

    // You can send the form data to your API or perform any other actions here

    // Clear the form data after submission if needed
    const updatedFormDataList = [...formDataList];
    updatedFormDataList[index] = { content: '' };
    setFormDataList(updatedFormDataList);
    addFeedback(formDataList)
  };

  const addFeedback = (data) => {
    try {
      const response = FeedbackApi.Add(data);
      if (response.status === 200) {
        message.success('Đánh giá thành công');
        toastSuccess('Đã đánh giá!');
      }else{
        message.success('Đánh giá không thành công thành công');
        toastSuccess('Đánh giá không thành công thành công!');
      }
      
    } catch (error) {
      console.log('Failed to fetch category', error);
    }
  }

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
