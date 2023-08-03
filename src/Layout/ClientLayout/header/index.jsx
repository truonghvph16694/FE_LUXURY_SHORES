import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { AiOutlineUnorderedList } from "react-icons/ai";
// import { CiSearch } from 'react-icons/ci';
import { CiUser, CiShoppingCart } from 'react-icons/ci';
import styles from "./Header.module.css";
// import { readCart } from "../../../redux/slices/cartSlice";
// import { SubmitHandler, useForm } from "react-hook-form";
// import { search } from "../../../redux/slices/productSlice";
// import Voucher from "../../../components/Voucher";
import logo from "../../../../public/logo5.png"


const ClientHeader = () => {
    // const navBar = useRef(null);
    const boxUser = useRef(null);
    // const cart = useSelector((state) => state.carts);
    // const navigate = useNavigate();
    // const [showNav, setShowNav] = useState(false);
    const [showModelUser, setShowModelUser] = useState(false);

    const nav = useNavigate();

    const userlocal = localStorage.getItem('user')
    const localtoken = localStorage.getItem('token')
    // useEffect(() => {
    //     const navBarElement = navBar.current;
    //     if (showNav) {
    //         navBarElement.style.left = "0px";
    //     } else {
    //         navBarElement.style.left = "-100%";
    //     }
    // }, [showNav]);

    const handleSignout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        setTimeout(() => {
            nav('/signin')
        }, 500)
    }

    useEffect(() => {
        const boxUserElement = boxUser.current;
        if (showModelUser) {
            boxUserElement.style.display = "block";
        } else {
            boxUserElement.style.display = "none";
        }
    }, [showModelUser])
    // const {
    //     register,
    //     handleSubmit,
    //     formState: { errors },
    //     reset,
    // } = useForm();
    // let isLogged = useSelector((state) => state.auth.isLogged);
    // let currentUser = useSelector((state) => state.auth.currentUser);

    // const handleMouseEnter = () => {
    //     setShowCategories(true);
    // };

    // const handleMouseLeave = () => {
    //     // Đợi 3 giây trước khi ẩn danh mục
    //     setTimeout(() => {
    //         setShowCategories(false);
    //     }, 100);
    // };
    // const fetchCategoryList = async () => {
    //     try {
    //         const response = await categoryApi.GetAll();
    //         setCategories(response); // Use setCategories instead of setShowCategories
    //     } catch (error) {
    //         console.log('Failed to fetch CategoryList', error);
    //     }
    // };

    // useEffect(() => {
    //     fetchCategoryList();
    // }, []);
    return (
        <header>
            <div className={styles.header}>
                {/* <div className={styles.icon_bar1} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                    <AiOutlineUnorderedList value={{ height: '40px' }} />
                    {showCategories && (
                        <div className={styles.categories}>
                            <ul className="mb-0">
                                {categories.map((category) => (
                                    <li key={category.id}>
                                        <Link to={`/category/${category.id}`} className="ml-4 pt-8">{category.name}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div> */}
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

                    <div className={styles.box_user}>
                        {/* <div className={styles.icon}>
                            <Link to="/signin"><CiUser /></Link>
                        </div> */}

                        <div className={styles.icon}>



                            {/* Kiểm tra xem người dùng đã đăng nhập hay chưa */}
                            {localtoken && userlocal ? (
                                <div className={styles.user}
                                    onClick={() => setShowModelUser(!showModelUser)}>
                                    <img
                                        src={
                                            "https://res.cloudinary.com/assignmentjs/image/upload/v1664199286/nextjsuser/dw1r1yybpmahpl8qwmkb.png"
                                        }
                                        alt=""
                                    />
                                    <div ref={boxUser} className={styles.box}>
                                        <ul>
                                            <li>
                                                <span className="block italic">Xin chào!</span>
                                                <span className="font-bold text-blue-600">
                                                    {userlocal?.users?.fullname}
                                                </span>
                                            </li>
                                            <li>
                                                <Link to="/">Trang chủ</Link>
                                            </li>
                                            <li>
                                                <div onClick={() => handleSignout()}>Đăng xuất</div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                            ) : (

                                <div className={styles.user}
                                    onClick={() => setShowModelUser(!showModelUser)}>
                                    <Link to="/signin">
                                        {/* Hiển thị đường dẫn đến trang đăng nhập nếu chưa đăng nhập */}
                                        <CiUser />
                                    </Link>
                                    <div ref={boxUser} className={styles.box}>
                                        <ul>
                                            <li>
                                                <Link to="/signin">
                                                    {/* Hiển thị đường dẫn đến trang đăng nhập nếu chưa đăng nhập */}
                                                    <CiUser />
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                            )}
                        </div>

                        {/* <div className={styles.modal_user}>
                            {isLogged && currentUser ? (
                                <div>
                                    <div className={styles.hello}>
                                        <span>Xin chào!</span>
                                        <h3>{currentUser?.users?.fullname}</h3>
                                    </div>
                                    <Link to={"/account"}>
                                        <div className={styles.item_user}>Thông tin tài khoản</div>
                                    </Link>

                                    {currentUser?.users?.role == 1 ? (
                                        <Link to={"/admin/dashboard"}>
                                            <div className={styles.item_user}>Trang quản trị</div>
                                        </Link>
                                    ) : null}
                                    <Link to={"/order"}>
                                        <div className={styles.item_user}>Đơn hàng</div>
                                    </Link>
                                    <div className={styles.item_user} onClick={() => handleSignout()}>
                                        Đăng xuất
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <Link to={"/signin"}>
                                        <div className={styles.item_user}>Đăng nhập</div>
                                    </Link>
                                    <Link to={"/signup"}>
                                        <div className={styles.item_user}>Đăng ký</div>
                                    </Link>
                                </div>
                            )}
                        </div> */}
                    </div>


                    <div className={styles.box_cart}>
                        <Link to={"/cart"}>
                            <div className={styles.icon2}>
                                <CiShoppingCart />
                            </div>
                        </Link>
                        <div className={styles.count_cart}>
                            {/* {cart?.carts?.products ? cart.carts.products.length : 0} */}
                        </div>
                    </div>

                </div>
            </div>
            <div>
                {/* <Voucher /> */}
            </div>
        </header>
    );
};

// const SubNav = () => {
//     return (
//         <div className={styles.subNav}>
//             <div className={styles.rowSubNav}>
//                 <div className={styles.colSubNav}>
//                     <h3>Áo</h3>
//                     <ul>
//                         <li className={styles.liSub}>
//                             <Link to="#">Áo Sơ Mi Trắng</Link>
//                         </li>
//                         <li className={styles.liSub}>
//                             <Link to="#">Áo Sơ Mi</Link>
//                         </li>
//                         <li className={styles.liSub}>
//                             <Link to="#">Áo Jacket</Link>
//                         </li>
//                         <li className={styles.liSub}>
//                             <Link to="#">Áo Blazer</Link>
//                         </li>
//                         <li className={styles.liSub}>
//                             <Link to="#">Áo Len</Link>
//                         </li>
//                         <li className={styles.liSub}>
//                             <Link to="#">Áo Veston</Link>
//                         </li>
//                         <li className={styles.liSub}>
//                             <Link to="#">Áo Polo</Link>
//                         </li>
//                     </ul>
//                 </div>

//                 <div className={styles.colSubNav}>
//                     <h3>Áo</h3>
//                     <ul>
//                         <li className={styles.liSub}>
//                             <Link to="#">Áo Sơ Mi Trắng</Link>
//                         </li>
//                         <li className={styles.liSub}>
//                             <Link to="#">Áo Sơ Mi</Link>
//                         </li>
//                         <li className={styles.liSub}>
//                             <Link to="#">Áo Jacket</Link>
//                         </li>
//                         <li className={styles.liSub}>
//                             <Link to="#">Áo Blazer</Link>
//                         </li>
//                         <li className={styles.liSub}>
//                             <Link to="#">Áo Len</Link>
//                         </li>
//                         <li className={styles.liSub}>
//                             <Link to="#">Áo Veston</Link>
//                         </li>
//                         <li className={styles.liSub}>
//                             <Link to="#">Áo Polo</Link>
//                         </li>
//                     </ul>
//                 </div>

//                 <div className={styles.colSubNav}>
//                     <h3>Áo</h3>
//                     <ul>
//                         <li className={styles.liSub}>
//                             <Link to="#">Áo Sơ Mi Trắng</Link>
//                         </li>
//                         <li className={styles.liSub}>
//                             <Link to="#">Áo Sơ Mi</Link>
//                         </li>
//                         <li className={styles.liSub}>
//                             <Link to="#">Áo Jacket</Link>
//                         </li>
//                         <li className={styles.liSub}>
//                             <Link to="#">Áo Blazer</Link>
//                         </li>
//                         <li className={styles.liSub}>
//                             <Link to="#">Áo Len</Link>
//                         </li>
//                         <li className={styles.liSub}>
//                             <Link to="#">Áo Veston</Link>
//                         </li>
//                         <li className={styles.liSub}>
//                             <Link to="#">Áo Polo</Link>
//                         </li>
//                     </ul>
//                 </div>
//             </div>
//         </div>
//     );
// };

export default ClientHeader;