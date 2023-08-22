import React, { useEffect, useState } from 'react';
import productApi from '../../api/products';
import { useParams } from 'react-router';
import { formatCurrency } from '../../../utils';
import { useNavigate } from 'react-router-dom';
import cartApi from '../../api/cart';
import { toastError, toastSuccess } from '../../components/toast/Toast';




const ChiTietSanPham = () => {
  const [selectedProductEntry, setSelectedProductEntry] = useState(null);
  const [productImg, setProductImg] = useState([]);
  const [product, setProduct] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();
  const userLogin = localStorage.getItem('user');
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
  const handleSizeChange = (event) => {
    if (event.target.value) {
      const selectedValue = event.target.value;
      setSelectedProductEntry(selectedValue);
      // setSizeNotSelected(true);
    }
    // Reset the sizeNotSelected state when a size is selected
  };
  const addToCart = async () => {

    // return;
    console.log('selectedProductEntry', selectedProductEntry)
    if (userLogin) {
      if (selectedProductEntry) {
        const objLogin = JSON.parse(userLogin);
        const data = {
          userId: objLogin._id,
          product_entry_Id: selectedProductEntry,
          quantity: 1,
        };
        const response = await cartApi.Add(data);

        if (response.code === 200) {
          toastSuccess('Thêm vào giỏ hàng thành công!');
        }
        // setTimeout(() => {
        // }, 1000);
        navigate('/cart');


      } else {
        toastError("Hay chon size")
      }

    } else {
      navigate('/signin');
    }

  }


  useEffect(() => {
    fetchProduct(id);
  }, [id]);

  if (!product) {
    return null;
  }
  // console.log(product.product_images[0][0].path)
  return (
    <div className="flex justify-center p-8">
      <div className="w-full max-w-3xl p-4 border rounded-lg shadow-lg">
        <div className="flex">
          <div className="w-1/2 pr-4">
            <img className="w-full" src={productImg.path} alt={product.name} />

            {/* {productImg.map((item, index) => {
              productImg[index]
              console.log("");
              if (item[0]) {
                return (
                  <div key={index}>
                    <img src={item[0].path} />
                  </div>
                )
              }
            })} */}

          </div>
          <div className="w-1/2 pl-4 " >
            <h2 className="text-2xl font-semibold mb-2">{product.name}</h2>
            <p className="text-red-700 mb-2">{product.price ? formatCurrency(product.price) : null}</p>

            <div>
              <div className="mb-4">
                <label className="block mb-1 font-semibold">Kích thước:</label>
                <select className="w-full form-select border py-2" onChange={handleSizeChange} required>
                  <option hidden >Chọn kích thước</option>
                  {product.product_entries &&
                    product.product_entries.map((item, i) => (
                      <option key={i} value={item._id} className='p-4'>
                        {item.product_sizes.value}
                      </option>
                    ))}
                </select>
                {/* {!sizeNotSelected && (
                  <p className="text-red-500 flex">Vui lòng chọn kích thước trước khi thêm vào giỏ hàng</p>
                )} */}
              </div>
            </div>
            <hr className='py-2' />
            <p className="text-gray-700 pb-4">{product.description}</p>
            <button
              onClick={addToCart}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-4 rounded b-0"
            >
              Thêm vào giỏ hàng
            </button>
          </div>
        </div>
        <div className="mt-8 p-4">
          <h3 className="text-xl font-semibold mb-2">Bình luận</h3>
          {/* Hiển thị danh sách bình luận */}
          {/* Biểu mẫu thêm bình luận */}
        </div>
      </div>
    </div>
  );
};

export default ChiTietSanPham;