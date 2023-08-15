import React, { useState } from 'react'
import { formatCurrency } from '../../../utils';
import { useDispatch } from "react-redux";


const CartItem = (item) => {
    console.log('item', item)
    const [quantity, setQuantity] = useState(item.item.quantity);

    const handleDecrease = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const handleIncrease = () => {
        setQuantity(quantity + 1);
    };
    return (
        <tr className="border-t-2">
            <td className="flex py-10  gap-8">
                {/* <img src={item.image} className="w-20"></img> */}
                <div className="pt-7">
                    <p>{item.item.product.name}</p>

                </div>
            </td>
            <td className="w-40">
                <div className="font-bold flex">

                    {item.item.size.value}
                </div>
            </td>
            <td className="w-40">
                <div className="font-bold flex">

                    {formatCurrency(item.item.product.price)}
                </div>
            </td>
            <td className="mr-[300px]">
                <div className="inline-block h-[32px]">
                    <button
                        onClick={handleDecrease}
                        className="bg-white-300 border-[rgba(0,0,0,.09)] border-2 h-[32px] w-[30px] text-black"
                    >
                        -
                    </button>
                    <input
                        type="number"
                        value={quantity}
                        className="w-[50px] h-[32px] border-[rgba(0,0,0,.09)] border-2 text-center"
                        readOnly
                    />
                    <button
                        onClick={handleIncrease}
                        className="bg-white-300 border-[rgba(0,0,0,.09)] border-2 h-[32px] w-[30px] text-black"
                    >
                        +
                    </button>
                </div>
            </td>
            <td className="font-bold">
                {formatCurrency(item.item.quantity * item.item.product.price)}
            </td>
        </tr>

    )
}
export default CartItem