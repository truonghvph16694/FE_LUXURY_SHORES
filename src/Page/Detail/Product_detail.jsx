import React, { useState } from 'react';

const Product_detail = () => {
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');

  const product = {
    id: 1,
    name: 'Awesome Sneakers',
    price: 99.99,
    sizes: ['US 7', 'US 8', 'US 9'],
    colors: ['Red', 'Blue', 'Black'],
    description: 'These awesome sneakers will make you stand out in any crowd.',
    imageUrl: 'https://picsum.photos/2160',
  };

  const addToCart = () => {
    // Thêm logic xử lý thêm sản phẩm vào giỏ hàng ở đây
    console.log('Thêm sản phẩm vào giỏ hàng:', product);
  };

  return (
    <div className="flex justify-center p-4">
      <div className="w-full max-w-3xl p-4 border rounded-lg shadow-lg">
        <div className="flex">
          <div className="w-1/2 pr-4">
            <img
              className="w-full"
              src={product.imageUrl}
              alt={product.name}
            />
          </div>
          <div className="w-1/2 pl-4">
            <h2 className="text-2xl font-semibold mb-2">{product.name}</h2>
            <p className="text-gray-700 mb-2">${product.price.toFixed(2)}</p>
            <div className="mb-4">
              <strong className="block mb-1">Colors:</strong>
              {product.colors.map((color, index) => (
                <label key={index} className="inline-flex items-center mr-4">
                  <input
                    type="radio"
                    value={color}
                    checked={selectedColor === color}
                    onChange={() => setSelectedColor(color)}
                    className="form-radio"
                  />
                  <span className="ml-2">{color}</span>
                </label>
              ))}
            </div>
            <div className="mb-4">
              <label className="block mb-1 font-semibold">Size:</label>
              <select
                className="w-full form-select"
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
              >
                <option value="">Select size</option>
                {product.sizes.map((size, index) => (
                  <option key={index} value={size}>{size}</option>
                ))}
              </select>
            </div>
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
};



export default Product_detail;
