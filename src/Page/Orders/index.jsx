import React from 'react'
import { Link } from 'react-router-dom'
import './styles.css'
// import Loading from '../../components/Loading/Loading'
const OrdersClient = () => {
    return (
        // <div>
        <div className="scoll h-[350px] w-full pt-4 overflow-auto">
            {/* {Loading == false ? <Loading /> : ""} */}
            <div className="m-auto max-w-full pb-36 mt-5">
                <div className="mt-5 md:mt-0 md:col-span-2">
                    <table className="table-auto w-full ">
                        <thead className="pb-10 ">
                            <tr className="text-left ">
                                <th className=" font-semibold pb-5">STT</th>
                                <th className=" font-semibold pb-5 text-center">Sản phẩm</th>
                                <th className="font-semibold pb-5">Tổng tiền</th>
                                <th className="font-semibold pb-5">Chi tiết đơn hàng </th>
                                <th className="font-semibold pb-5">Thông tin thanh toán</th>
                                <th className="font-semibold pb-5">Hành động</th>
                            </tr>
                        </thead>
                        <tbody className="w-full">
                            {/* {Orders?.map((item: any, index: number) => { */}
                            <tr className="border-t-2">
                                <td className=" py-10  gap-8">1</td>
                                <td className="prod py-10 gap-8 inline-flex ml-[40px]">

                                    <div className="pt-3">
                                        <div className="text-[15px] text-gray-500 pt-[7px]">Số lượng :</div>
                                        <div className="sales  w-[110px] pt-[8px]"> <p className="text-[#ee4d2d] text-[11px]">7 ngày đổi trả hàng</p> </div>
                                    </div>
                                </td>
                                <td className=" py-10  gap-8">
                                    {/* {<NumberFormat
                                            value={item?.totalprice}
                                            displayType={"text"}
                                            thousandSeparator={true}
                                            prefix={""}
                                        />} */}
                                    VND</td>
                                <td className=" py-10  gap-8 "> <Link><button className="btn" >Chi tiết sản phẩm</button></Link> </td>
                                <td className=" text-red-500 font-bold py-10  gap-8">
                                    {/* {item?.payment_status == 0
                                                ? "Chưa thanh toán"
                                                : "Đã thanh toán"} */}
                                    chưa thanh toán
                                </td>
                                <td className="py-10  gap-8">

                                    <button className='max-w-[150px] bg-[#ee4d2d] text-[#fff] rounded py-[5px]' type='submit' >Huỷ đơn hàng</button>


                                </td>
                            </tr>
                            {/* })} */}
                        </tbody>

                    </table>
                </div>
            </div>
        </div>
        // </div>
    )
}

export default OrdersClient