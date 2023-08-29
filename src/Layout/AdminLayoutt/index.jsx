import styles from "./AdminLayout.module.css";
import React, { useEffect, useRef, useState } from "react";
import { IoHomeOutline, IoMenuOutline } from "react-icons/io5";
import { RiProductHuntLine } from "react-icons/ri";
import { VscFeedback } from "react-icons/vsc";
import { BiCategoryAlt } from "react-icons/bi";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { TiShoppingCart } from "react-icons/ti";
import { FaRegUser } from "react-icons/fa";
import logo from "../../../public/logo3.png"

const AdminLayout = () => {
    const boxUser = useRef(null);
    const navigationElement = useRef(null);
    const mainElement = useRef(null);
    const [toggle, setToggle] = useState(false);
    const [showModelUser, setShowModelUser] = useState(false);

    const userlocal = localStorage.getItem('user')
    const tokenlocal = localStorage.getItem('token')
    const user = JSON.parse(userlocal);
    const navigate = useNavigate();

    const userjson = JSON.parse(userlocal)

    // const dispatch = useDispatch();

    const handleSignout = async () => {
        // await dispatch(signout());
        localStorage.removeItem('token')
        localStorage.removeItem('user')

        setTimeout(() => {
            navigate("/signin");
        }, 1000)

    };

    useEffect(() => {
        const navigationE = navigationElement.current;
        const mainE = mainElement.current;

        if (userlocal && userjson.type === "admin" && tokenlocal) {
            setTimeout(() => {
                navigate('/admin')
            }, 500)
        } else {
            setTimeout(() => {
                navigate('/')
            }, 500)
        }

        if (toggle) {
            navigationE.classList.toggle(styles.active);
            mainE.classList.toggle(styles.active);
        } else {
            navigationE.classList.remove(styles.active);
            mainE.classList.remove(styles.active);
        }
    }, [toggle]);

    useEffect(() => {
        const boxUserElement = boxUser.current;
        if (showModelUser) {
            boxUserElement.style.display = "block";
        } else {
            boxUserElement.style.display = "none";
        }
    }, [showModelUser]);

    // useEffect(() => {
    //     (async () => {
    //         await dispatch(readUserLocal());
    //     })();
    // }, []);

    return (
        <>
            {/* =============== Navigation ================ */}
            <div className={styles.container}>
                <div ref={navigationElement} className={styles.navigation}>
                    <ul>
                        <li>
                            <Link to="/">
                                <span className={styles.icon}>
                                    <img
                                        src={logo}
                                        className={styles.io}
                                        alt=""
                                        width="100px"
                                    />
                                </span>
                                <span className="text-[19px] font-[600] ml-[10px] mt-2 italic hover:text-red-600 ">
                                    LUXURY STORE
                                </span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/admin">
                                <span className={styles.icon}>
                                    <IoHomeOutline className={styles.io} />
                                </span>
                                <span className={styles.title}>Thống kê</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/admin/orders">
                                <span className={styles.icon}>
                                    <TiShoppingCart className={styles.io} />
                                </span>
                                <span className={styles.title}>Danh sách đơn hàng</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/admin/products">
                                <span className={styles.icon}>
                                    <RiProductHuntLine className={styles.io} />
                                </span>
                                <span className={styles.title}>Tất cả sản phẩm</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/admin/category">
                                <span className={styles.icon}>
                                    <BiCategoryAlt className={styles.io} />
                                </span>
                                <span className={styles.title}>Danh mục sản phẩm</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/admin/user">
                                <span className={styles.icon}>
                                    <FaRegUser className={styles.io} />
                                </span>
                                <span className={styles.title}>Danh sách tài khoản</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/admin/feedback">
                                <span className={styles.icon}>
                                    <VscFeedback className={styles.io} />
                                </span>
                                <span className={styles.title}>Quản lý feedback</span>
                            </Link>
                        </li>
                    </ul>
                </div>
                {/* ========================= Main ==================== */}
                <div ref={mainElement} className={styles.main}>
                    <div className={styles.topbar}>
                        <div onClick={() => setToggle(!toggle)} className={styles.toggle}>
                            <IoMenuOutline className={styles.io} />
                        </div>
                        <div
                            className={styles.user}
                            onClick={() => setShowModelUser(!showModelUser)}
                        >
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
                                            {user.fullname}
                                            {/* <p>hvt</p> */}
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
                    </div>
                    <div className={styles.content}>
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminLayout;