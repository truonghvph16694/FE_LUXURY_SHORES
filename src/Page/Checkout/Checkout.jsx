import React, { useState, useEffect } from "react";
// import { FaPray } from "react-icons/fa";
import cartApi from "../../api/cart";
import { formatCurrency } from "../../../utils";
import { useForm } from "react-hook-form";
import ordersApi from "../../api/orders";
import { toastError, toastSuccess } from "../../components/toast/Toast";
import paymentApi from "../../api/payment";
import { useNavigate } from "react-router-dom";

const LocationList = () => {
    const [provinces, setProvinces] = useState([]);
    const [selectedProvince, setSelectedProvince] = useState("");
    const [districts, setDistricts] = useState([]);
    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [selectedWard, setSelectedWard] = useState("");
    const [communes, setCommunes] = useState([]);
    const [listCart, setListCart] = useState();
    const [totalSum, setTotalSum] = useState(0);
    const [Payment, setPayment] = useState(0);
    // console.log("province", selectedProvince)
    let ship = 30000
    // let sum = 0 const {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const navigate = useNavigate();
    const totalFinal = (ship, totalSum) => {
        return ship + totalSum
    }
    const userLogin = localStorage.getItem('user');
    const objLogin = JSON.parse(userLogin);
    // console.log(userLogin);
    useEffect(() => {
        async function fetchProvinces() {
            try {
                const response = await fetch("https://provinces.open-api.vn/api/p/");

                if (response.ok) {
                    const data = await response.json();
                    setProvinces(data);
                } else {
                    console.error("Error fetching provinces:", response.statusText);
                }
            } catch (error) {
                console.error("Error fetching provinces:", error);
            }
        }

        fetchProvinces();
    }, []);

    useEffect(() => {
        async function fetchDistricts() {
            if (selectedProvince) {
                try {
                    const response = await fetch(`https://provinces.open-api.vn/api/p/${selectedProvince}?depth=2`);
                    if (response.ok) {
                        const data = await response.json();
                        setDistricts(data.districts);
                    } else {
                        console.error("Error fetching districts:", response.statusText);
                    }
                } catch (error) {
                    console.error("Error fetching districts:", error);
                }
            }
        }
        fetchDistricts();
    }, [selectedProvince]);

    useEffect(() => {
        async function fetchCommunes() {
            if (selectedDistrict) {
                try {
                    const response = await fetch(
                        `https://provinces.open-api.vn/api/d/${selectedDistrict}?depth=2`
                    );
                    if (response.ok) {
                        const data = await response.json();
                        setCommunes(data.wards);
                    } else {
                        console.error("Error fetching communes:", response.statusText);
                    }
                } catch (error) {
                    console.error("Error fetching communes:", error);
                }
            }
        }

        fetchCommunes();
    }, [selectedDistrict]);
    const fetchCard = async () => {
        try {
            const objLogin = JSON.parse(userLogin);

            const response = await cartApi.GetCartUser(objLogin._id);
            setListCart(response);
            if (response) {
                let newTotalSum = 0;
                response.forEach(item => {
                    newTotalSum += (item.quantity) * item.product.price;
                });
                setTotalSum(newTotalSum);
            }
        } catch (error) {
            console.log('Lỗi khi lấy danh sách sản phẩm', error);
        }
    };
    useEffect(() => {
        fetchCard();
    }, [userLogin]);

    const onAdd = async (data) => {

        let product = [];
        product = listCart;
        let products = {}
        if (Payment == 1) {
            products = {
                user_id: objLogin._id,
                product,
                ...data,
                province_id: Number(selectedProvince),
                district_id: Number(selectedDistrict),
                ward_id: Number(selectedWard),
                total_price: parseInt((parseInt(totalSum)) + ((parseInt(ship)))),
                payment: Payment,
                // linkpay
            };
        } else {
            products = {
                user_id: objLogin._id,
                product,
                ...data,
                province_id: Number(selectedProvince),
                district_id: Number(selectedDistrict),
                ward_id: Number(selectedWard),
                total_price: parseInt((parseInt(totalSum)) + ((parseInt(ship)))),
                payment: Payment,
                // linkpay
            }
        }
        const response = await ordersApi.Add(products);

        const payment = {
            amount: parseInt((parseInt(totalSum)) + ((parseInt(ship)))),
            orderDescription: "Thanh toán đơn hàng ",
            orderType: 200000,
            bankCode: "",
            language: "vn",
            // orderid: "A1128"
            orderid: response.data._id
        };
        console.log("object", listCart)
        // let linkpay = "";
        if (Payment == 1) {
            const res = await paymentApi.createUrlPayment(payment);
            console.log('res', res);
            if (res?.code == 200) {
                // linkpay = res.vnpUrl;
                // const res = await paymentApi.changStatusPayment(response.data._id);

                window.open(res.vnpUrl, "_blank");
            } else {
                return toastError("Lỗi, Vui lòng thử lại");
            }
        }

        console.log("order1", response);
        console.log("id: ", response.data._id)

        if (response.status === 200) {
            toastSuccess('Bạn đã đặt hàng thành công!');
            navigate(`/thanks/${response.data._id}`);
        } else {
            navigate('/carts')
        }



    }
    return (

        <div>
            <form onSubmit={handleSubmit(onAdd)}>
                <section className="flex gap-8 w-10/12 m-auto py-20">

                    <section className="basis-4/6">

                        <h3 className="text-2xl font-bold mb-10">THÔNG TIN GIAO HÀNG</h3>
                        <table className="table-auto w-full ">
                            <label htmlFor="" className="font-semibold">
                                Họ và Tên <span className="text-red-700">*</span>
                            </label>
                            <br />
                            <input
                                className="border w-8/12 py-3 px-2  mt-5 mb-5"
                                type="text"
                                placeholder="Họ và Tên"
                                {...register("fullName", {
                                    required: true,
                                })}
                            />
                            {errors?.fullName && (
                                <span className="ml-[5px] font-bold text-red-500">
                                    Vui lòng không bỏ trống
                                </span>
                            )}
                        </table>

                        <table className="table-auto w-full ">
                            <label htmlFor="" className="font-semibold">
                                Số Điện Thoại <span className="text-red-700">*</span>
                            </label>
                            <br />
                            <input
                                className="border w-8/12 py-3 px-2  mt-5 mb-5"
                                type="text"
                                placeholder="Số Điện Thoại"
                                {...register("phone", {
                                    required: true,
                                    pattern: /((09|03|07|08|05|\+84)+([0-9]{8,9})\b)/g,
                                })}
                            />
                            {errors?.phone && (
                                <span className="ml-[5px] font-bold text-red-500">
                                    Vui lòng nhập đúng định dạng số điện thoại!{" "}
                                </span>
                            )}


                            <table className="table-auto w-full flex pb-[30px] ">

                                <tr>
                                    <label htmlFor="" className="font-semibold">
                                        Địa chỉ <span className="text-red-700">*</span>
                                    </label>

                                    <td>
                                        <br />

                                        <select
                                            onChange={(e) => setSelectedProvince(e.target.value)}
                                            className="py-[12px] border-[1px]"
                                            name=""
                                            id=""
                                        >
                                            <option value="">Tỉnh</option>
                                            {provinces.map((item) => (
                                                <option key={item.code} value={item.code}>
                                                    {item.name}
                                                </option>
                                            ))}
                                        </select>
                                    </td>
                                    <td>
                                        <br />

                                        <select
                                            onChange={(e) => setSelectedDistrict(e.target.value)}
                                            className="py-[12px] mx-[10px] border-[1px]"
                                            name=""
                                            id=""
                                            value={selectedDistrict}
                                        >
                                            <option value="">Huyện</option>
                                            {districts.map((item) => (
                                                <option key={item.code} value={item.code}>
                                                    {item.name}
                                                </option>
                                            ))}
                                        </select>

                                    </td>
                                    <td>
                                        <br />

                                        <select
                                            onChange={(e) => setSelectedWard(e.target.value)}
                                            className="py-[12px]  border-[1px]"
                                            name=""
                                            id=""
                                            value={provinces.to_ward_code}
                                        >
                                            <option value="">Xã</option>
                                            {communes.map((item) => (
                                                <option key={item.code} value={item.code}>
                                                    {item.name}
                                                </option>
                                            ))}
                                        </select>
                                    </td>
                                </tr>
                            </table>
                            <table className="table-auto w-full ">
                                <label htmlFor="" className="font-semibold">
                                    Address Detail <span className="text-red-700">*</span>
                                </label>
                                <br />
                                <input
                                    className="border w-8/12 py-3 px-2 mt-5 mb-5"
                                    type="text"
                                    placeholder="Address Detail"
                                    {...register("detail_address", {
                                        required: true,
                                    })}
                                />
                                {errors?.detail_address && (
                                    <span className="ml-[5px] font-bold text-red-500">
                                        Vui lòng không bỏ trống
                                    </span>
                                )}
                            </table>

                            <table className="table-auto w-full ">
                                <label htmlFor="" className="font-semibold">
                                    Ghi Chú <span className="text-red-700">*</span>                                </label>
                                <br />
                                <input
                                    className="border w-8/12 py-3 px-2  mt-5 mb-5"
                                    type="text"
                                    placeholder="Ghi chú"
                                    {...register("note")}
                                />
                                {errors?.note && (
                                    <span className="ml-[5px] font-bold text-red-500">
                                        Vui lòng không bỏ trống
                                    </span>
                                )}
                            </table>


                        </table>
                    </section>



                    <section className="basis-4/6 w-full">
                        <section className="bg-zinc-100 mt-12">
                            <div className="p-10">
                                <p className="text-2xl font-bold mb-[25px]">ĐƠN HÀNG CỦA BẠN</p>
                                <div className=" pt-5 flex ">
                                    <span className="grow font-bold">Sản Phẩm</span>
                                    <span className="text-right font-semibold">Giá</span>
                                </div>
                                {listCart && listCart.map((item, i) => {
                                    return (
                                        <div className=" pt-5 flex mb-[20px]" key={i}>
                                            <span className="grow flex">
                                                <span className="font-bold">{item.product.name}</span> -{" "}
                                                <div

                                                    className="w-[20px] h-[20px] rounded-[50%]"
                                                >{item.size.value}</div>{" "}

                                            </span>
                                            <span className="text-right ">
                                                {formatCurrency(item.quantity * item.product.price)}
                                            </span>
                                        </div>
                                    )
                                })}

                                <div className=" pt-5 flex ">
                                    <span className="grow font-semibold">Tạm Tính </span>
                                    <span className="text-right ">{formatCurrency(totalSum)}</span>
                                </div>
                                <div className=" pt-5 flex justify-between">
                                    <div className="flex">
                                        <img
                                            className="w-[50px] mr-[5px]"
                                            src="https://cdn.haitrieu.com/wp-content/uploads/2022/05/Logo-GHN-Slogan-En.png"
                                            alt=""
                                        />{" "}
                                        <span>Phí giao hàng:</span>
                                    </div>
                                    <span className="text-right">
                                        {ship}
                                    </span>
                                </div>
                                <div className=" pt-5 flex">
                                    <span className="grow font-semibold text-xl">Tổng tiền</span>
                                    <span className="text-right ">
                                        {/* {fee ? formatCurrency(total + fee) : formatCurrency(total)} */}
                                        {formatCurrency(totalFinal(ship, totalSum))}
                                    </span>
                                </div>

                                <div className="flex flex-col  my-[10px]">
                                    <div className="flex items-center mr-4">
                                        <input
                                            defaultChecked
                                            id="inline-radio"
                                            type="radio"
                                            onClick={() => setPayment(0)}
                                            name="inline-radio-group"
                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                        />
                                        <label
                                            htmlFor="inline-radio"
                                            className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                        >
                                            Thanh toán khi nhận hàng
                                        </label>
                                    </div>
                                    <div className="flex items-center mr-4">
                                        <input
                                            id="inline-2-radio"
                                            type="radio"
                                            onClick={() => setPayment(1)}
                                            name="inline-radio-group"
                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                        />
                                        <label
                                            htmlFor="inline-2-radio"
                                            className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                        >
                                            Thanh toán tự động qua VNPAY{" "}
                                            <img
                                                src="https://i0.wp.com/discvietnam.com/wp-content/uploads/2020/07/C%E1%BB%95ng-thanh-to%C3%A1n-VNPAY-Logo-Th%E1%BA%BB-ATM-T%C3%A0i-kho%E1%BA%A3n-ng%C3%A2n-h%C3%A0ng-Online-Banking-M%C3%A3-QR-QR-Pay-Qu%C3%A9t-QR-Transparent.png?fit=360%2C140&ssl=1"
                                                className="w-[80px]"
                                                alt=""
                                            />
                                        </label>
                                    </div>
                                </div>

                                <button className="bg-black text-white font-semibold p-3 mt-10 w-full">
                                    Hoàn tất Đơn hàng
                                </button>
                            </div>
                        </section>
                    </section>

                </section>
            </form>
        </div>
    );
};

export default LocationList;
