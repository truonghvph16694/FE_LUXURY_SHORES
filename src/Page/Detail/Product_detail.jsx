import React, { useEffect, useState } from 'react';
import productApi from '../../api/products';
import { useParams } from 'react-router';
// import { formatCurrency } from '../../../utils';
import img from '../../../public/logo.png'
import cartApi from '../../api/cart';

const Product_detail = () => {
  // const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [product, setProductList] = useState({});
  // console.log("product", productList)
  const { id } = useParams();
  // console.log("object", id)    const dataFromLocalStorage = localStorage.getItem('myData');
  const userLogin = localStorage.getItem('user');

  const fetchProductList = async (id) => {
    try {
      const response = await productApi.Get(id);

      setProductList(response[0]);
    } catch (error) {
      console.log('Lỗi khi lấy danh sách sản phẩm', error);
    }
  };
  const handleSizeChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedSize(selectedValue);
  };

  // const isOutOfStock = product.product_entries.quantity === 0;

  useEffect(() => {
    console.log('dataFromLocalStorage', JSON.parse(userLogin))
    fetchProductList(id);
  }, [id]);


  const addToCart = async () => {
    if (userLogin) {
      // Nếu tồn tại userLogin thì thêm vào giở hàng
      const objLogin = JSON.parse(userLogin);
      const data = {
        'userId': objLogin._id,
        'product': product,
      }
      const response = await cartApi.Add(data);
      // gửi data về backend để sử lí
    } else {
      // nếu không có thì bắt đăng nhập
      // return về trag đăng nhập 

    }
  };
  // console.log('product.product_entries', product)
  if (product != undefined) {
    return (
      <div className="flex justify-center p-4" >
        <div className="w-full max-w-3xl p-4 border rounded-lg shadow-lg">
          <div className="flex">
            <div className="w-1/2 pr-4">
              <img
                className="w-full"
                src={img}
              />
            </div>
            <div className="w-1/2 pl-4">
              <h2 className="text-2xl font-semibold mb-2">{product.name?.toString()}</h2>
              <p className="text-gray-700 mb-2">{product.price}</p>

              <div >
                <div className="mb-4">
                  <label className="block mb-1 font-semibold">Size:</label>
                  <select className="w-full form-select" onChange={handleSizeChange}>
                    <option value="">Select size</option>
                    {product.product_entries &&
                      product.product_entries.map((item, i) => (
                        <option key={i} value={item.product_sizes.value}>
                          {item.product_sizes.value}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
              {/* {isOutOfStock && <span>Hết hàng</span>} */}
              <p className="text-gray-700 mb-4">{product.description}</p>
              <button
                onClick={addToCart}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Add to Cart
              </button>
            </div>
          </div>
          <div className="mt-8 p-4">
            <h3 className="text-xl font-semibold mb-2">Comments</h3>
            {/* Hiển thị danh sách comment */}
            {/* Form thêm comment */}
          </div>
        </div>
      </div>
    );
  }

};



export default Product_detail;
