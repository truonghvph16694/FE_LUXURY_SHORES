import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
    AiOutlineBars,
} from "react-icons/ai";
import { CiSearch } from 'react-icons/ci';
import { CiUser } from 'react-icons/ci';
// import { IoSearchOutline } from 'react-icons/io';
// import { useSelector } from "react-redux";
// import { User } from "../../../models/User";
// import { signout } from "../../../redux/slices/authSlice";
import styles from "./Header.module.css";
// import { readCart } from "../../../redux/slices/cartSlice";
// import { SubmitHandler, useForm } from "react-hook-form";
// import { search } from "../../../redux/slices/productSlice";
// import Voucher from "../../../components/Voucher";

const ClientHeader = () => {
    const navBar = useRef(null);
    // const cart = useSelector((state) => state.carts);
    // const navigate = useNavigate();
    const [showNav, setShowNav] = useState(false);
    // useEffect(() => {
    //     const navBarElement = navBar.current;
    //     if (showNav) {
    //         navBarElement.style.left = "0px";
    //     } else {
    //         navBarElement.style.left = "-100%";
    //     }
    // }, [showNav]);
    // const {
    //     register,
    //     handleSubmit,
    //     formState: { errors },
    //     reset,
    // } = useForm();
    // let isLogged = useSelector((state) => state.auth.isLogged);
    // let currentUser = useSelector((state) => state.auth.currentUser);

    // if (localStorage.getItem("user")) {
    //     isLogged = true;
    //     currentUser = JSON.parse(localStorage.getItem("user") || "{}");
    // }
    // const dispatch = useDispatch();
    // const handleSignout = async () => {
    //     await dispatch(signout());
    // };
    // useEffect(() => {
    //     (async () => {
    //         if (currentUser?.users?.id) {
    //             await dispatch(readCart(currentUser?.users?.id));
    //         }
    //     })();
    // }, [dispatch]);

    // const onSubmit = async (values) => {
    //     navigate(`/search/${values?.name}`);
    // };

    return (
        <header>
            <div className={styles.header}>
                <div className={styles.icon_bar} onClick={() => setShowNav(!showNav)}>
                    <AiOutlineBars />
                </div>
                <nav ref={navBar} className={styles.nav_bar}>
                    <div className={styles.overlay} onClick={() => setShowNav(!showNav)}></div>
                    <div className={styles.menu}>
                        <li className={styles.item}>
                            <Link to={"/"}>Trang chủ</Link>
                            <div className={styles.line}></div>
                        </li>
                        <li className={styles.item}>
                            <Link to={""}>Quần</Link>
                            <div className={styles.line}></div>
                        </li>
                        <li className={styles.item}>
                            <Link to={""}>Phụ Kiện</Link>
                            <div className={styles.line}></div>
                        </li>
                        <li className={styles.item}>
                            <Link to={""}>Giới Thiệu</Link>
                            <div className={styles.line}></div>
                        </li>
                        <li className={styles.item}>
                            <Link to={"/contact"}>Liên Hệ</Link>
                            <div className={styles.line}></div>
                        </li>
                    </div>
                </nav>

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
                            {/* <SubNav /> */}
                        </li>
                        {/* <li className={`${styles.item} ${styles.itemSubNav}`}>
            <Link to={""} className={styles.itemLink}>
              Phụ Kiện
            </Link>
            <div className={styles.line}></div>
            <SubNav />
          </li> */}
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
                        src="https://i.postimg.cc/8FRzkGHk/logo.png"
                        className={styles.img_logo}
                        alt="logo"
                    />
                </Link>

                <div className={styles.box_icon}>
                    <div className={styles.search}>
                        <div className={styles.icon}>
                            <CiSearch />
                        </div>
                        <div className={styles.search_input}>
                            <form >
                                <input
                                    type="text"

                                    placeholder="Tìm kiếm sản phẩm...."
                                />
                                <button type="submit" className={styles.ico}>
                                    {/* <IoSearchOutline /> */}<p></p>
                                </button>
                            </form>
                        </div>
                    </div>

                    <div className={styles.box_user}>
                        <div className={styles.icon}>
                            <CiUser />
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

                    {/* {isLogged && currentUser ? (
                        <div className={styles.box_cart}>
                            <Link to={"/cart"}>
                                <div className={styles.icon2}>
                                    <CiShoppingCart />
                                </div>
                            </Link>
                            <div className={styles.count_cart}>
                                {cart?.carts?.products ? cart.carts.products.length : 0}
                            </div>
                        </div>
                    ) : (
                        ""
                    )} */}
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