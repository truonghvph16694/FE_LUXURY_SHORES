import React, { useEffect, useState } from 'react';
import giay from '../../../public/giay.jpg';
import productApi from '../../api/products';
import { formatCurrency } from '../../../utils';
import './styles.css'
import categoryApi from "../../api/category";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { FiFilter } from "react-icons/fi";
import { Link, useParams } from "react-router-dom";

const Product = () => {
    const { _id } = useParams();
    console.log("id", _id);

    const [productList, setProductList] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredProductList, setFilteredProductList] = useState([]);
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [showPriceRangeDropdown, setShowPriceRangeDropdown] = useState(false);
    // const [showCategories, setShowCategories] = useState(false);
    const [categories, setCategories] = useState([]);
    const [pfromc, setPfromC] = useState([])
    const priceRangeOptions = [
        { label: 'Dưới 500,000đ', min: '0', max: '500000' },
        { label: 'Từ 500,000đ - 1,000,000đ', min: '500000', max: '1000000' },
        { label: 'Từ 1,000,000đ - 2,000,000đ', min: '1000000', max: '2000000' },
        { label: 'Trên 2,000,000đ', min: '2000000', max: '' },
    ];



    const fetchPfromC = async (_id) => {
        try {
            const respose = await categoryApi.GetProducts(_id);
            console.log("p", respose);
            setPfromC(respose)
        } catch (error) {
            console.log('Lỗi khi lấy danh sách sản phẩm danh mục', error);
        }
    }

    const fetchCategoryList = async () => {
        try {
            const response = await categoryApi.GetAll();
            setCategories(response);
        } catch (error) {
            console.log('Lỗi khi lấy danh sách danh mục', error);
        }
    };

    const fetchProductList = async () => {
        try {
            const response = await productApi.GetAll();
            console.log('response', response)
            setProductList(response);
        } catch (error) {
            console.log('Lỗi khi lấy danh sách sản phẩm', error);
        }
    };

    useEffect(() => {
        fetchProductList();
        fetchCategoryList();
        fetchPfromC(_id);
    }, [_id]);

    useEffect(() => {
        // Lọc danh sách sản phẩm dựa trên từ khóa tìm kiếm và khoảng giá
        const filteredList = productList.filter(item =>
            (item.name && item.name.toLowerCase().includes(searchTerm.toLowerCase())) &&
            (minPrice === '' || item.price >= parseFloat(minPrice)) &&
            (maxPrice === '' || item.price <= parseFloat(maxPrice))
        );
        setFilteredProductList(filteredList);
    }, [productList, searchTerm, minPrice, maxPrice]);
    const handlePriceFilter = () => {
        // Toggle sự hiển thị của dropdown khoảng giá khi click vào nút "Lọc"
        setShowPriceRangeDropdown(!showPriceRangeDropdown);
    };

    const handlePriceCheckboxChange = (min, max) => {
        // Toggle chọn các checkbox theo khoảng giá
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
            <div className='flex mt-8'>
                <Link to={'/'}> <h6>Trang Chủ/</h6></Link>
                <span>  Sản phẩm</span>
            </div>
            <div className="flex">
                {/* Sidebar */}
                <div className="w-1/4 mr-4 min-h-[450px] sidebar1">
                    <div className='categories ' >
                        <div className='flex '>
                            <AiOutlineUnorderedList />
                            <h2 className='mt-[22px] ml-4 font-bold text-2xl '>Danh Sách Sản Phẩm</h2>
                        </div>
                        <div className='categories'>
                            <ul className="mb-0 ">
                                {categories.map((category) => (
                                    <li key={category.id} className='font-Roboto Mono  hover:text-blue-500 '>
                                        <Link className="ml-[45px] pt-8">{category.name.toUpperCase()}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                    </div>
                    {/* <button
                        className="ml-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded"
                       
                    > */}
                    {/* </button> */}
                    <div className='flex '>
                        <div className='pt-[28px] text-xl'>
                            <FiFilter />
                        </div>
                        <h2 className='mt-[22px] ml-4 font-bold text-2xl ' onClick={handlePriceFilter}>Lọc Theo Giá</h2>
                    </div>
                    <div className="ml-8  flex flex-col  rounded-md p-2 absolute bg-white w-60">
                        {priceRangeOptions.map(({ label, min, max }) => (
                            <div key={label} className="flex items-center pt-4">
                                <input
                                    type="checkbox"
                                    checked={min === minPrice && max === maxPrice}
                                    onChange={() => handlePriceCheckboxChange(min, max)}
                                />
                                <label className='ml-2'>{label}</label>
                            </div>
                        ))}
                    </div>

                </div>


                {/* Danh sách sản phẩm */}
                <div className="w-3/4">
                    <div className="filter-section mb-4 flex justify-end relative" style={{ marginTop: '20px' }}>
                        <input
                            type="text"
                            placeholder="Tìm kiếm sản phẩm..."
                            className="px-4 py-2 border border-gray-300 rounded-md "
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />

                    </div>
                    <div className="grid grid-cols-3 gap-3 mt-8 m-[0px,10px]">
                        {filteredProductList.map((item, index) => (
                            <div className="bg-white rounded-lg shadow-lg p-4 sm:p-8 transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl" key={index + 1}>
                                <Link to={`/product/${item._id}`}>
                                    <div className="w-full h-60 mb-4">
                                        {item.product_images.length > 0 ? (
                                            // Display the first image in the product_images array
                                            <img src={item.product_images[0].path} alt={item.name} className="w-full h-full object-cover rounded-lg" />
                                        ) : (
                                            <img src={giay} alt={item.name} className="w-full h-full object-cover rounded-lg" />
          )}
                                    </div>
                                    <h1 className="name text-lg sm:text-xl mb-2 text-left">{item.name}</h1>
                                    <div className="flex items-center justify-between">
                                        <span className="text-lg sm:text-xl font-bold text-red-600">{item.price ? formatCurrency(item.price) : null}</span>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>



                </div>
            </div>
        </div>
    );
};

export default Product;