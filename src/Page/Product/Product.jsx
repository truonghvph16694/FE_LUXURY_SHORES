import React, { useEffect, useState } from 'react'
import giay from '../../../public/giay.jpg'
// import colorApi from '../../api/color';
// import sizeApi from '../../api/size';
import productApi from '../../api/products';
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
        <div className="container mx-auto py-8">
            {productList.length > 0 && productList.map((item, index) => {
                return (<div className="bg-white rounded-lg shadow-lg p-8" key={index + 1}>
                    <img src={giay} alt="Shoe Image" className="w-full h-64 object-cover rounded-lg mb-4" />

                    <h1 className="text-3xl font-semibold mb-2 name">{item.name}</h1>
                    <p className="text-gray-600 mb-4">{item.product_entries.product_sizes.value}</p>

                    <div className="flex items-center justify-between">
                        <span className="text-xl font-bold">$99.99</span>
                        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Add to Cart</button>
                    </div>

                </div>)

            })}
        </div>
    )
}

export default Product