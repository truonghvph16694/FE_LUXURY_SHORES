import React, { useEffect, useState, useRef } from 'react';
import giay from '../../../public/giay.jpg';
import productApi from '../../api/products';
import { formatCurrency } from '../../../utils';
import './style.css';
import categoryApi from "../../api/category";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { Link } from "react-router-dom";

const Product = () => {
    const [productList, setProductList] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredProductList, setFilteredProductList] = useState([]);
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [showPriceRangeDropdown, setShowPriceRangeDropdown] = useState(false);
    const [showCategories, setShowCategories] = useState(false);
    const [categories, setCategories] = useState([]);

    const priceRangeOptions = [
        { label: 'Dưới 500,000đ', min: '0', max: '500000' },
        { label: 'Từ 500,000đ - 1,000,000đ', min: '500000', max: '1000000' },
        { label: 'Từ 1,000,000đ - 2,000,000đ', min: '1000000', max: '2000000' },
        { label: 'Trên 2,000,000đ', min: '2000000', max: '' },
    ];
    const handleMouseEnter = () => {
        setShowCategories(true);
    };

    const handleMouseLeave = () => {
        // Đợi 3 giây trước khi ẩn danh mục
        setTimeout(() => {
            setShowCategories(false);
        }, 100);
    };
    const fetchCategoryList = async () => {
        try {
            const response = await categoryApi.GetAll();
            setCategories(response); // Use setCategories instead of setShowCategories
        } catch (error) {
            console.log('Failed to fetch CategoryList', error);
        }
    };
    const fetchProductList = async () => {
        try {
            const response = await productApi.GetAll();
            setProductList(response);
        } catch (error) {
            console.log('Failed to fetch ProductList', error);
        }
    };

    useEffect(() => {
        fetchProductList();
        fetchCategoryList();

    }, []);

    useEffect(() => {
        // Filter the product list based on the search term and price range
        const filteredList = productList.filter(item =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (minPrice === '' || item.price >= parseFloat(minPrice)) &&
            (maxPrice === '' || item.price <= parseFloat(maxPrice))
        );
        setFilteredProductList(filteredList);
    }, [productList, searchTerm, minPrice, maxPrice]);

    const handlePriceFilter = () => {
        // Toggle the visibility of the price range dropdown when the "Lọc" button is clicked
        setShowPriceRangeDropdown(!showPriceRangeDropdown);
    };

    const handlePriceCheckboxChange = (min, max) => {
        // Toggle checkbox selection for price range
        if (min === minPrice && max === maxPrice) {
            setMinPrice('');
            setMaxPrice('');
        } else {
            setMinPrice(min);
            setMaxPrice(max);
        }
    };

    return (
        <div className="container mx-auto py-4">
                <div  onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                    <AiOutlineUnorderedList value={{ height: '40px' }} Danh Mục />
                    {showCategories && (
                        <div >
                            <ul className="mb-0">
                                {categories.map((category) => (
                                    <li key={category.id}>
                                        <Link to={`/category/${category.id}`} className="ml-4 pt-8">{category.name}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            <div className="filter-section mb-4 flex justify-end relative" style={{ marginTop: '20px' }}>
                <input
                    type="text"
                    placeholder="Tìm kiếm sản phẩm..."
                    className="px-4 py-2 border border-gray-300 rounded-md "
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button
                    className="ml-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded"
                    onClick={handlePriceFilter}
                >
                    Lọc Theo Giá                </button>
                {showPriceRangeDropdown && (
                    <div className="ml-100 mt-10 flex flex-col border border-gray-300 rounded-md p-2 absolute bg-white w-60">
                        {priceRangeOptions.map(({ label, min, max }) => (
                            <div key={label} className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={min === minPrice && max === maxPrice}
                                    onChange={() => handlePriceCheckboxChange(min, max)}
                                />
                                <label>{label}</label>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div className="grid grid-cols-4 gap-4 mt-24">
                {filteredProductList.map((item, index) => (
                    <div className="bg-white rounded-lg shadow-lg p-4 sm:p-8 transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl" key={index + 1}>
                        <img src={giay} alt="Shoe Image" className="w-full h-80 object-cover rounded-lg mb-4" />

                        <h1 className="name text-lg sm:text-xl mb-2 text-left">{item.name}</h1>
                        <div className="flex items-center justify-between">
                            <span className="text-lg sm:text-xl font-bold text-red-600">{formatCurrency(item.price)}</span>
                        </div>
                    </div>
                ))}
            </div>
    
        </div>
    );
};

export default Product;
