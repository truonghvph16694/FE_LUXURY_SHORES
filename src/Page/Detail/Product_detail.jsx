import React, { useEffect, useState } from 'react';
import productApi from '../../api/products';
import { useParams } from 'react-router';
import { formatCurrency } from '../../../utils';
import { useNavigate } from 'react-router-dom';
import cartApi from '../../api/cart';
import { toastError, toastSuccess } from '../../components/toast/Toast';
import FeedbackApi from '../../api/feedback';
import { AiOutlineUser } from 'react-icons/ai';
import { format } from 'date-fns';
import { el } from 'date-fns/locale';



const ChiTietSanPham = () => {
  const [selectedProductEntry, setSelectedProductEntry] = useState(null);
  const [productImg, setProductImg] = useState([]);
  const [product, setProduct] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();
  const userLogin = localStorage.getItem('user');
  const [feedbackList, setFeedbackList] = useState([]);
  const [productConlai, setproductConlai] = useState('');
  const [quantityAdd, setquantityAdd] = useState(1);

  const handleDecrease = async () => {
    if (Number(quantityAdd - 1) < Number(1)) {
      toastError('Số lượng mua không được nhỏ hơn 1')
    } else {
      setquantityAdd(quantityAdd - 1)
    }
  }
  const handleIncrease = async () => {
    if (Number(quantityAdd + 1) > Number(productConlai)) {
      //
      toastError('Số lượng mua không được lớn hơn số lượng còn lại')
    } else {
      setquantityAdd(quantityAdd + 1)

    }
  }
  const fetchProduct = async (id) => {
    try {
      const response = await productApi.Get(id);
      console.log('rp:', response);
      setProduct(response[0]);
      if (response[0].product_images) {
        if (response[0].product_images[0]) {
          setProductImg(response[0].product_images[0][0])

        }
        // setProductImg(response[0].product_images)

      }
    } catch (error) {
      console.log('Lỗi khi lấy danh sách sản phẩm', error);
    }
  };
  const fetchFeedbackList = async () => {
    try {
      const response = await FeedbackApi.GetAll();
      console.log('response', response);

      // Filter the feedback list to get only those with the same product_id
      const filteredFeedback = response.filter(feedback => feedback.product_id === id);

      setFeedbackList(filteredFeedback);
      // setLoading(false);
      console.log('feedbackList', filteredFeedback);

    } catch (error) {
      console.log('Failed to fetch feedbackList', error);
    }
  };
  const handleSizeChange = (event) => {
    console.log('even', event)
    if (event.target.value) {
      setquantityAdd(1)
      const selectedValue = event.target.value;
      product.product_entries.map((item) => {
        if (item._id == selectedValue) {
          setproductConlai(item.quantity)
        }
      })
      setSelectedProductEntry(selectedValue);
      // setSizeNotSelected(true);
    }
    // Reset the sizeNotSelected state when a size is selected
  };

  const addToCart = async () => {
    if (userLogin) {
      if (selectedProductEntry) {
        // Check if the selected size is available
        const selectedSize = product.product_entries.find(item => item._id === selectedProductEntry);
        if (selectedSize && selectedSize.quantity > 0) {
          const objLogin = JSON.parse(userLogin);
          const data = {
            userId: objLogin._id,
            product_entry_Id: selectedProductEntry,
            quantity: quantityAdd,
          };
          const response = await cartApi.Add(data);

          if (response.code === 200) {
            toastSuccess('Thêm vào giỏ hàng thành công!');
          }

          navigate('/cart');
        } else {
          toastError("Kích thước đã chọn không còn hàng");
        }
      } else {
        toastError("Hãy chọn kích thước");
      }
    } else {
      navigate('/signin');
    }
  };
  useEffect(() => {
    fetchProduct(id);
    fetchFeedbackList();
  }, [id]);

  if (!product) {
    return null;
  }
  // console.log(product.product_images[0][0].path)
  return (
    <div className="flex justify-center p-8">
      <div className="w-full max-w-4xl p-4 border rounded-lg shadow-lg">
        <div className="flex">
          <div className="w-1/2 pr-4">
            <img className="w-full" src={productImg.path} alt={product.name} />
          </div>
          <div className="w-1/2 pl-4 " >
            <h2 className="text-2xl font-semibold ">{product.name}</h2>
            <p className="text-red-700 mb-2 font-bold">{product.price ? formatCurrency(product.price) : null}</p>

            <div>
              <div className="mb-4">
                <label className="block mb-1 font-semibold">Kích thước:</label>
                <select className="w-full form-select border py-2" onChange={handleSizeChange} required >
                  <option hidden >Chọn kích thước</option>
                  {product.product_entries &&
                    product.product_entries.map((item, i) => (

                      <option key={i} value={item._id} data={item.quantity} className='p-4'>
                        {item.product_sizes.value}
                      </option>

                    ))}
                </select>
                <p className="text-zinc-800 pb-2 pt-2">Sản phẩm còn lại: {productConlai}</p>

              </div>
            </div>
            <hr className='py-2' />
            <p className="text-gray-700 pb-4">{product.description}</p>
            <div className="inline-block h-[32px] mb-4">
              <button
                onClick={handleDecrease}
                className="bg-white-300 border-[rgba(0,0,0,.09)] border-2 h-[32px] w-[30px] text-black"
              >
                -
              </button>
              <input
                type="number"
                value={quantityAdd}
                className="w-[50px] h-[32px] border-[rgba(0,0,0,.09)] border-2 text-center"
                readOnly
              />
              <button
                // disabled={quantity >= item.item.product_entry.quantity}
                onClick={handleIncrease}
                className="bg-white-300 border-[rgba(0,0,0,.09)] border-2 h-[32px] w-[30px] text-black"
              >
                +
              </button>
            </div>
            <br />
            <button
              onClick={addToCart}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-4 rounded b-0"
            >
              Thêm vào giỏ hàng
            </button>
          </div>
        </div>
        <hr className='border mt-8' />
        <div className="mt-8 p-4">
          <h3 className="text-xl font-semibold mb-2">Đánh giá sản phẩm</h3>
          {feedbackList.map((f, i) => {

            if (f.status) return (
              <div key={i}>

                <div className='flex bg-[#D9D9D9] p-5 m-3 rounded items-center opacity-75'>
                  <AiOutlineUser className='text-6xl  rounded-full bg-gray-300' />
                  <div className='block'>
                    <p className='text-l ml-4 mt-2 '><b>{f.user.fullname} </b><small>{format(new Date(f.createdAt), "dd/MM/yyyy HH:mm:ss")}</small>  </p>
                    <p className='text-l ml-4 mt-2'>{f.content}</p>
                  </div>
                </div>
              </div>
            )
          }

          )}
        </div>
      </div>
    </div>
  );
};

export default ChiTietSanPham;