import { Form } from "antd";
import React, { useState, useEffect } from "react";
import { FaPray } from "react-icons/fa";

const LocationList = () => {
    const [provinces, setProvinces] = useState([]);
    const [selectedProvince, setSelectedProvince] = useState("");
    const [districts, setDistricts] = useState([]);
    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [communes, setCommunes] = useState([]);

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
                    const response = await fetch(`https://provinces.open-api.vn/api/d/`);
                    if (response.ok) {
                        const data = await response.json();
                        // Lọc danh sách huyện dựa trên mã tỉnh được chọn
                        const filteredDistricts = data.filter(
                            (district) => district.parent_code === selectedProvince
                        );
                        setDistricts(filteredDistricts);
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
                        `https://provinces.open-api.vn/api/d/${selectedDistrict}/w`
                    );
                    if (response.ok) {
                        const data = await response.json();
                        setCommunes(data);
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

    return (

        <div>
            <Form>
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
                            />
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
                            // {...register("phonenumber", {
                            //   required: true,
                            //   pattern: /((09|03|07|08|05|\+84)+([0-9]{8,9})\b)/g,
                            // })}
                            />
                            {/* {errors?.phonenumber && (
                <span className="ml-[5px] font-bold text-red-500">
                  Vui lòng nhập đúng định dạng sđt{" "}
                </span>
              )} */}


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
                                            onChange={(e) => onWard(e)}
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
                                    Email <span className="text-red-700">*</span>
                                </label>
                                <br />
                                <input
                                    className="border w-8/12 py-3 px-2 mt-5 mb-5"
                                    type="text"
                                    placeholder="Email"
                                // {...register("email", {
                                //     required: true,
                                //     pattern:
                                //         /^[a-zA-Z0-9?:\.?:\_]+@[a-zA-Z0-9-]+\.+([a-zA-Z]{2,5})$/,
                                // })}
                                />
                                {/* {errors?.email && (
                        <span className="ml-[5px] font-bold text-red-500">
                            Vui lòng viết đúng định dạng email
                        </span>
                    )} */}
                            </table>

                            <table className="table-auto w-full ">
                                <label htmlFor="" className="font-semibold">
                                    Ghi Chú <span className="text-red-700">*</span>                                </label>
                                <br />
                                <input
                                    className="border w-8/12 py-3 px-2  mt-5 mb-5"
                                    type="text"
                                    placeholder="Ghi chú"
                                // {...register("note")}
                                />
                            </table>
                        </table>
                    </section>



                    <section>                           <h3 className="text-2xl font-bold mb-10">ĐƠN HÀNG CỦA BẠN</h3>

                              </section>

                </section>
            </Form>
        </div>
    );
};

export default LocationList;
