import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { AiOutlineUnorderedList } from "react-icons/ai";
// import { CiSearch } from 'react-icons/ci';
// import { IoSearchOutline } from 'react-icons/io';
import { CiUser, CiShoppingCart } from 'react-icons/ci';
import styles from "./Header.module.css";
import logo from "../../../../public/logo5.png"
import cartApi from "../../../api/cart";


const ClientHeader = () => {
    const boxUser = useRef(null);
    const [listCart, setListCart] = useState();
    const [showModelUser, setShowModelUser] = useState(false);

    const nav = useNavigate();

    const userlocal = localStorage.getItem('user')
    const localtoken = localStorage.getItem('token')
    const user = JSON.parse(userlocal);

    const handleSignout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        setTimeout(() => {
            nav('/signin')
        }, 500)
    }
    const userLogin = localStorage.getItem('user');
    const fetchCard = async () => {
        try {
            const objLogin = JSON.parse(userLogin);

            const response = await cartApi.GetCartUser(objLogin._id);
            // console.log('cart', response)
            setListCart(response);
        } catch (error) {
            console.log('Lỗi khi lấy danh sách sản phẩm', error);
        }
    };
    useEffect(() => {
        fetchCard();
    }, [userLogin]);

    return (
        <header>
            <div className={styles.header}>
                <div className={styles.nav_bar_desktop}>
                    <ul className={styles.menu}>
                        <li className={styles.item}>
                            <Link to={"/"} className={styles.itemLink}>
                                Trang chủ
                            </Link>
                            <div className={styles.line}></div>
                        </li>
                        <li className={`${styles.item} ${styles.itemSubNav}`}>
                            <Link to={"/Product"} className={styles.itemLink}>
                                Sản phẩm
                            </Link>
                            <div className={styles.line}></div>
                        </li>

                        <li className={styles.item}>
                            <Link to={"/tintuc"} className={styles.itemLink}>
                                Tin tức
                            </Link>
                            <div className={styles.line}></div>
                        </li>
                        <li className={styles.item}>
                            <Link to={"/lienhe"} className={styles.itemLink}>
                                Liên Hệ
                            </Link>
                            <div className={styles.line}></div>
                        </li>
                    </ul>
                </div>

                <Link to={"/"} className={styles.logo}>
                    <img
                        src={logo}
                        className={styles.img_logo}
                        alt="logo"
                    />
                    {/* <span className="text-[25px] font-[600] italic hover:text-red-600 block">
                        Luxury Shoes
                    </span> */}
                </Link>


                <div className={styles.box_icon}>
                    {/* <div className={styles.search}>
                        <div className={styles.icon}>
                            <CiSearch />
                        </div>
                        <div className={styles.search_input}>
                            <form >
                                <input
                                    type="text"
                                    // {...register("name")}
                                    placeholder="Tìm kiếm sản phẩm...."
                                />
                                <button type="submit" className={styles.ico}>
                                    <CiSearch />
                                </button>
                            </form>
                        </div>
                    </div> */}
                    <div className={styles.box_user}>
                        <div className={styles.icon}>
                            <CiUser />
                        </div>
                        <div className={styles.modal_user}>
                            {/* Kiểm tra xem người dùng đã đăng nhập hay chưa */}
                            {localtoken && userlocal ? (
                                <div>
                                    <div className={styles.hello}>
                                        <span>Xin chào!</span>
                                        <h3 className="pt-2">{user.fullname}</h3>
                                    </div>
                                    <Link to={"/account"}>
                                        <div className={styles.item_user}>Thông tin tài khoản</div>
                                    </Link>

                                    {user?.type == 'admin' ? (
                                        <Link to={"/admin/"}>
                                            <div className={styles.item_user}>Trang quản trị</div>
                                        </Link>
                                    ) : null}
                                    <Link to={"/orders"}>
                                        <div className={styles.item_user}>Đơn hàng</div>
                                    </Link>
                                    <div className={styles.item_user} onClick={() => handleSignout()}>
                                        Đăng xuất
                                    </div>
                                </div>

                            ) : (

                                <div className={styles.user}
                                    onClick={() => setShowModelUser(!showModelUser)}>
                                    <Link to="/signin" className="flex pb-4">
                                        {/* Hiển thị đường dẫn đến trang đăng nhập nếu chưa đăng nhập */}
                                        <CiUser /> <span className="ml-2 font-bold">Đăng nhập</span>
                                    </Link>
                                    <div ref={boxUser} className={styles.box}>
                                        <ul>
                                            <li>
                                                <Link to="/signup" className="flex">
                                                    {/* Hiển thị đường dẫn đến trang đăng nhập nếu chưa đăng nhập */}
                                                    <CiUser />
                                                    <span className="ml-2 font-bold">Đăng kí</span>
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                            )}
                        </div>
                    </div>
                    {localtoken && userlocal ?
                        <div className={styles.box_cart}>

                            <Link to={"/cart"}>
                                <div className={styles.icon2}>
                                    <CiShoppingCart />
                                </div>
                            </Link>
                            <div className={styles.count_cart}>
                                {listCart ? listCart.length : 0}
                            </div>

                        </div>
                        : (
                            ""
                        )
                    }
                </div>


            </div>
            <div>
                {/* <Voucher /> */}
            </div>
        </header>
    );
};

export default ClientHeader;