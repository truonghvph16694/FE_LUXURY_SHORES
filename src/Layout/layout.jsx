import React from "react";
import { Outlet } from "react-router-dom";

const Layout = () => {
    return (
        <div className="flex justify-between items-start h-full">

            <div className="max-w-[20%] w-full flex justify-between items-start h-[100%]">

            </div>

            <div className="w-full bg-[#fff] pl-[50px] pt-[20px]">
                <main className="">
                    <Outlet />
                </main>
            </div>

        </div>
    );
};

export default Layout;
