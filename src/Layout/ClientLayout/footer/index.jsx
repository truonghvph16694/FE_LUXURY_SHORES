import React from 'react';
import { BsFacebook, BsInstagram, BsYoutube } from 'react-icons/bs';
import { FaTiktok } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import logo from "../../../../public/logo5.png"
import styles from "./footer.module.css";

const ClientFooter = () => {
    return (
        <footer className="mx-auto px-5 xl:px-20 pt-5 border border-t-gray-300 border-b-0">
            <div className="footer__row  grid grid-cols-1 lg:grid-cols-4 py-3 lg:py-8 gap-5 lg:gap-5 xl:gap-20">
                <div className=''>
                    <img
                        src={logo}
                        className={styles.img_logo}
                        alt="logo"

                    />
                    <h3 className="uppercase font-bold text-2xl ml-14">LUXURY STORE</h3>

                    <p className="pt-2 mr-[50px] lg:mr-0 leading-tight">
                        Với thông điệp <b>Refined Life</b> Shop mong muốn đem đến cho khách hàng một lối sống tinh gọn bằng các sản phẩm thời trang tinh tế.
                    </p>
                </div>

                <div>
                    <h4 className='font-semibold text-xl py-4'>Về chúng tôi</h4>
                    <ul>
                        <li className='font-semibold text-[#888888] pb-3 hover:text-blue-400 transition duration-400 ease-in-out'><Link to=''>Giới thiệu</Link></li>
                        <li className='font-semibold text-[#888888] pb-3 hover:text-blue-400 transition duration-400 ease-in-out'><Link to='/lienhe'>Liên hệ</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className='font-semibold text-xl py-4'>Hỗ trợ khách hàng</h4>
                    <ul>
                        <li className='font-semibold text-[#888888] pb-3 hover:text-blue-400 transition duration-400 ease-in-out'><Link to={''}>Hướng dẫn chọn size</Link></li>
                        <li className='font-semibold text-[#888888] pb-3 hover:text-blue-400 transition duration-400 ease-in-out'><Link to={''}>Hướng dẫn đổi trả</Link></li>
                        <li className='font-semibold text-[#888888] pb-3 hover:text-blue-400 transition duration-400 ease-in-out'><Link to={''}>Hướng dẫn mua hàng</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className='font-semibold text-xl py-4'>Kết nối với chúng tôi</h4>
                    <ul className="flex gap-5 text-2xl items-center">
                        <li className="hover:text-blue-400 transition duration-400 ease-in-out"><BsFacebook /></li>
                        <li className="hover:text-blue-400 transition duration-400 ease-in-out"><BsInstagram /></li>
                        <li className="hover:text-blue-400 transition duration-400 ease-in-out"><FaTiktok /></li>
                        <li className="hover:text-blue-400 transition duration-400 ease-in-out"><Link to={''}><BsYoutube /></Link></li>
                    </ul>
                </div>
            </div>
            <p className="border border-t-gray-300 border-b-0 border-l-0 border-r-0 text-sm font-semibold text-[#888888] pt-5 text-center">Copyright ⓒ 2023 by LUXURY STORE</p>
        </footer>
    );
};

export default ClientFooter;