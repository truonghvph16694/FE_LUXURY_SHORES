import React from "react";
import { Outlet } from "react-router-dom";
import ClientHeader from "./header";
import ClientFooter from "./footer";
const ClientLayout = () => {
    return (
        <>
            <header className='bg-[#fff]'>
                <ClientHeader />
            </header>
            
            <main className="pt-16">
                <Outlet />
            </main>
            <div className='bg-[#fff] py-[20px] pt-4'>
                <ClientFooter />
            </div>
        </>
    );
};

export default ClientLayout;
