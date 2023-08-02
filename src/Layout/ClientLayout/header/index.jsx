import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { CiSearch } from 'react-icons/ci';
import { CiUser, CiShoppingCart } from 'react-icons/ci';
import styles from "./Header.module.css";
import categoryApi from "../../../api/category";
import logo from "../../../../public/logo5.png"

const ClientHeader = () => {
    const [categories, setCategories] = useState([]);
    const [showCategories, setShowCategories] = useState(false);

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

    useEffect(() => {
        fetchCategoryList();
    }, []);
    return (
        <header>
            <div className={styles.header}>
                <div className={styles.icon_bar1} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
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
                </div>
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