import React, { useEffect, useState } from 'react'
import giay from '../../../public/giay.jpg'
// import colorApi from '../../api/color';
// import sizeApi from '../../api/size';
import productApi from '../../api/products';
import { formatCurrency } from '../../../utils';
import './style.css';
const Product = () => {
    // const [loading, setLoading] = useState(true);
    const [productList, setProductList] = useState([]);
    console.log("product", productList);

    const fetchProductList = async () => {
        try {
            const response = await productApi.GetAll();
            setProductList(response);
            // setLoading(false);
        } catch (error) {
            console.log('Failed to fetch ProductList', error);
            // setLoading(false);
        }
    };



    useEffect(() => {
        fetchProductList();
    }, []);
    return (
        <div className="container mx-auto py-4 grid grid-cols-4 gap-4">
            {productList.map((item, index) => {
                return (
                    <div className="bg-white rounded-lg shadow-lg p-4 sm:p-8 transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl" key={index + 1}>
                        <img src={giay} alt="Shoe Image" className="w-full h-80 object-cover rounded-lg mb-4" />

                        <h1 className="name text-lg sm:text-xl mb-2 text-left">{item.name}</h1>
                        <div className="flex items-center justify-between">
                            <span className="text-lg sm:text-xl font-bold text-red-600">{formatCurrency(item.price)}</span>
                            {/* <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105">Add to Cart</button> */}
                        </div>
                    </div>
                );
            })}
        </div>
    )
}

export default Product