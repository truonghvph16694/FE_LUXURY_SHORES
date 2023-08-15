import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import img from '../../../public/logo.png'
import cartApi from '../../api/cart';
import CartItem from './CartItem';

const Cart = () => {
    const [listCart, setListCart] = useState();
    let sum = 0;
    const [products, setProducts] = useState([
        {
            img: img,
            name: 'Product A',
            price: 12345,
            quantity: 7,
            size: 41,
        },
        {
            img: img,
            name: 'Product B',
            price: 54321,
            quantity: 3,
            size: 39,
        },
        // Add more products here
    ]);
    const userLogin = localStorage.getItem('user');


    useEffect(() => {
        const fetchCard = async () => {
            try {
                const objLogin = JSON.parse(userLogin);

                const response = await cartApi.GetCartUser(objLogin._id);
                console.log('cart', response);
                setListCart(response);
            } catch (error) {
                console.log('Lỗi khi lấy danh sách sản phẩm', error);
            }
        };
        fetchCard();
    }, [])
    const updateQuantity = (index, newQuantity) => {
        const updatedProducts = [...products];
        updatedProducts[index].quantity = newQuantity;
        setProducts(updatedProducts);
    };

    const calculateTotalPrice = () => {
        return products.reduce(
            (total, product) => total + product.price * product.quantity,
            0
        );
    };
    return (
        <div>
            <section className="flex gap-8 w-10/12 m-auto py-20">
                <section className="basis-4/6">
                    <table className="table-auto w-full ">
                        <thead className="pb-10 ">
                            <tr className="text-left ">
                                <th className=" font-semibold pb-10">Sản phẩm</th>
                                <th className=" font-semibold pb-10">Kích cỡ </th>
                                <th className=" font-semibold pb-10">Giá tiền</th>
                                <th className="font-semibold pb-10">Số lượng</th>
                                <th className="font-semibold pb-10">Tổng tiền</th>
                            </tr>
                        </thead>
                        <tbody className="w-full ">
                            {listCart ? listCart.map((item, index) => {
                                {
                                    sum += item.quantity * item.price;

                                }

                                return <CartItem key={index} item={item} />;
                            }
                            ) : <h1 className="font-bold text-[30px]"> Không có sản phẩm </h1>}
                        </tbody>

                        {/* <tbody>
                            {products.map((product, index) => (
                                <tr key={index} className="border-b">
                                    <td className="p-3 flex items-center">
                                        <img src={product.img} alt={product.name} className="w-16 h-16 mr-4" />
                                        {product.name}<br />
                                        <br />
                                    </td>
                                    <td className="p-3">{product.size}</td>
                                    <td className="p-3">{product.price}</td>
                                    <td className="p-3">
                                        <input
                                            type="number"
                                            value={product.quantity}
                                            min={1}
                                            onChange={(e) =>
                                                updateQuantity(index, parseInt(e.target.value))
                                            }
                                            className="w-16 p-2 border rounded"
                                        />
                                    </td>
                                    <td className="p-3">
                                        {product.price * product.quantity}
                                    </td>
                                </tr>
                            ))}
                        </tbody> */}

                    </table>
                    <div className="border-t-2 flex justify-between">
                        <button className="border-2 bg-blue-500 text-white font-semibold p-3 px-5 mt-10">
                            <Link to="/" className="text-white">
                                Tiếp tục mua sắm
                            </Link>
                        </button>{" "}
                    </div>
                </section>
                <section className="basis-2/6 w-full">

                    <section className="bg-zinc-100 mt-12">
                        <div className="p-10">
                            {" "}
                            <div className=" pt-5 flex">
                                {" "}
                                <span className="grow">Tổng tiền</span>
                                {/* <span className="text-right font-bold">
                      {" "}
                      <NumberFormat
                        value={sum}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={""}
                      />{" "}
                      VNĐ
                    </span> */}
                            </div>
                            <div className="pt-5 flex ">
                                {" "}
                            </div>
                            <button className="bg-blue-500 text-white font-semibold p-3 mt-10 w-full rounded-md">
                                <Link to="/checkout" className="text-white text-center w-full block">
                                    Thanh Toán
                                </Link>
                            </button>
                        </div>
                    </section>
                </section>
            </section>
        </div>
    );
};

export default Cart