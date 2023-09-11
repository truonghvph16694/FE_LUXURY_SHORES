import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import cartApi from '../../api/cart';
import CartItem from './CartItem';
import { formatCurrency } from '../../../utils';

const Cart = () => {
    const [listCart, setListCart] = useState([]);
    const [totalSum, setTotalSum] = useState(0);
    const userLogin = localStorage.getItem('user');

    const callbackFunction = () => {
        fetchCard();
    };

    const handleItemRemove = async (id) => {
        try {
            await cartApi.Remove(id);
            fetchCard();
        } catch (error) {
            console.error('Error removing item:', error);
        }
    };

    const fetchCard = async () => {
        try {
            const objLogin = JSON.parse(userLogin);

            const response = await cartApi.GetCartUser(objLogin._id);
            
            setListCart(response);

            if (response) {
                let newTotalSum = 0;
                response.forEach(item => {
                    newTotalSum += item.quantity * item.product.price;
                });
                setTotalSum(newTotalSum);
            }
        } catch (error) {
            console.log('Lỗi khi lấy danh sách sản phẩm', error);
        }
    };

    useEffect(() => {
        if (userLogin) {
            fetchCard();
        }
    }, [userLogin]);

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
                                <th className="font-semibold pb-10 text-center">Số lượng</th>
                                <th className="font-semibold pb-10 text-center">Tổng tiền</th>
                            </tr>
                        </thead>
                        <tbody className="w-full ">
                            {listCart.length > 0 ? (
                                listCart.map((item, index) => (
                                    <CartItem key={index} item={item} userLogin={userLogin ? JSON.parse(userLogin) : {}} onRemove={handleItemRemove} parentCallback={callbackFunction} />
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="font-bold text-[30px] text-center">
                                        Không có sản phẩm trong giỏ hàng
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    {/* {listCart.length > 0 && ( */}
                    <div className="border-t-2 flex justify-between">
                        <button className="border-2 bg-blue-500 text-white font-semibold p-3 px-5 mt-10">
                            <Link to="/" className="text-white">
                                Tiếp tục mua sắm
                            </Link>
                        </button>{" "}
                    </div>
                    {/* )}   */}
                </section>
                {/* {listCart.length > 0 && ( */}
                <section className="basis-2/6 w-full">
                    <section className="bg-zinc-100 mt-12">
                        <div className="p-10">
                            {" "}
                            <div className="pt-5 flex">
                                <span className="grow">Tổng tiền</span>
                                <span className="text-right font-bold text-2xl">
                                    {formatCurrency(totalSum)}
                                </span>
                            </div>
                            <div className="pt-5 flex ">
                                {" "}
                            </div>
                            {listCart.length > 0 && (
                                <button className="bg-blue-500 text-white font-semibold p-3 mt-10 w-full rounded-md">
                                    <Link to="/checkout" className="text-white text-center w-full block">
                                        Thanh Toán
                                    </Link>
                                </button>
                            )}
                        </div>
                    </section>
                </section>
                {/* )} */}
            </section>
        </div>
    );
};

export default Cart;