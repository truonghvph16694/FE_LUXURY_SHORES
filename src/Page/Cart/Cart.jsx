import React from 'react'
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
    return (
        <div>
          <section className="flex gap-8 w-10/12 m-auto py-20">
            <section className="basis-4/6">
              <table className="table-auto w-full ">
                <thead className="pb-10 ">
                  <tr className="text-left ">
                    <th className=" font-semibold pb-10">Sản phẩm</th>
                    <th className=" font-semibold pb-10">Kích cỡ </th>
                    <th className="font-semibold pb-10">Số lượng</th>
                    <th className="font-semibold pb-10">Tổng tiền</th>
                  </tr>
                </thead>
                {/* <tbody className="w-full ">
                  {carts?.carts?.products ? carts?.carts?.products?.map((item: any, index: number) => {
                    {
                      sum += item.quantity * item.price;
                      
                    }
                   
                    return <CartItem key={index} item={item} id={Id} />;
                  }
                  ) : <h1 className="font-bold text-[30px]"> Không có sản phẩm </h1>}
                </tbody> */}
              </table>
              <div className="border-t-2 flex justify-between">
                <button className="border-2  font-semibold p-3 px-5 mt-10">
                  <Link to="/"> Tiếp tục mua sắm</Link>
                </button>{" "}
              </div>
            </section>
            <section className="basis-2/6 w-full">
              
              <section className="bg-zinc-100 mt-12">
                <div className="p-10">
                  {" "}
                  <div className=" pt-5 flex">
                    {" "}
                    <span className="grow">Tổng tiền</span>
                    {/* <span className="text-right font-bold">
                      {" "}
                      <NumberFormat
                        value={sum}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={""}
                      />{" "}
                      VNĐ
                    </span> */}
                  </div>
                  <div className="pt-5 flex ">
                    {" "}
                    
                  </div>
                  <button
                    // onClick={() => navigate("/checkout")}
                    className="bg-black text-white font-semibold p-3 mt-10 w-full rounded-md"
                  >
  <Link to="/checkout"> Thanh Toán</Link>                  </button>
                </div>
              </section>
            </section>
          </section>
        </div>
      );
    };

export default Cart