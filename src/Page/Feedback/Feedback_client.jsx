import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ordersApi from '../../api/orders';
import FeedbackApi from '../../api/feedback';
import { toastError, toastSuccess } from '../../components/toast/Toast';
import ClientHeader from '../../Layout/ClientLayout/header';
import ClientFooter from '../../Layout/ClientLayout/footer';
import { formatCurrency } from '../../../utils';

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
  // const fetchFeedback = async () => {
  //   try {
  //     const response = await FeeApi.Get(id);
  //     setOrder(response);
  //   } catch (error) {
  //     console.log('Failed to fetch order', error);
  //   }
  // };
  // console.log(order)
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
      product_entry_id: order.product[index].product_entry_Id
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
        fetchOrder()
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

      <ClientHeader />
      <div className='container m-auto block h-auto  w-auto mt-16' >
        <div className='text-2xl font-bold mt-32 ml-18'><h1>Đánh Giá Sản Phẩm</h1></div>

        {order.product &&
          order.product.map((product, index) => (
            // product.is_feedback == 1 ?
            <div key={index} className=" p-16 h-auto border-b-4">
              <form onSubmit={(e) => handleSubmit(e, index)}>
                <div className="flex  ">

                  <div className="">
                    <img src={product.images.path} alt="" className="mb-2" />
                  </div>
                  <div className=' w-3/5 ml-10'>
                    <div className="relative " >

                      <p className="mb-2 "> {product.product.name}</p>

                      <p className="mb-2"><b>SL</b>: {product.quantity}</p>    <p className="mb-2"><b>$: {formatCurrency(product.product.price)} </b></p>

                      <textarea disabled={product.is_feedback ? true : false}
                        type="text"
                        id={`content-${index}`}
                        name="content"
                        className='border rounded-md p-2 w-full'
                        rows={5}
                        // cols={100}
                        placeholder='Nội dung đánh giá...'
                        value={product.feedback_content}
                        onChange={(e) => handleInput(e, index)}
                      />
                      <div className={"absolute  right-0 "}>
                        <button type="submit" className={'p-3 rounded-md bg-[#ba2b0f] ' + (product.is_feedback ? 'hidden' : 'block')}>Gửi đánh giá</button>
                        <p className={'color-green text-green-500 ' + (product.is_feedback ? 'block' : 'hidden')}><i>Đã đánh giá</i></p>
                      </div>
                    </div>

                  </div>

                </div>
              </form>
              {/* <hr className="my-4" /> */}
            </div>



            // : <div key={index} className=" p-16 h-auto border-b-4 ">
            //   <form onSubmit={(e) => handleSubmit(e, index)}>
            //     <div className="flex  ">
            //       <div className="">
            //         <img src={product.images.path} alt="" className="mb-2" />
            //       </div>
            //       <div className=" pl-8 w-full " >
            //         <p className="mb-2 "> {product.product.name}</p>

            //         <p className="mb-2"><b>SL</b>: {product.quantity}</p>    <p className="mb-2"><b>$: {product.product.price} VNĐ</b></p>
            //         <div className='relative w-3/5'>
            //           <textarea
            //             type="text"
            //             id={`content-${index}`}
            //             name="content"
            //             className='border rounded-md p-2 w-full'
            //             rows={5}
            //             // cols={100}
            //             placeholder='Nội dung đánh giá...'
            //             value={formDataList[index] ? formDataList[index].content : ''}
            //             onChange={(e) => handleInput(e, index)}
            //           />
            //           <div className="absolute  right-0">

            //             <button type="submit" className='p-3 rounded-md bg-[#ba2b0f]'>Gửi đánh giá</button>
            //           </div>
            //         </div>

            //       </div>

            //     </div>
            //   </form>
            //   {/* <hr className="my-4" /> */}
            // </div>
          ))}
      </div >



      <ClientFooter />

    </div >
  );
};

export default Feedback_client;
