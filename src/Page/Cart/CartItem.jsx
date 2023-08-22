import React, { useState } from 'react'
import { formatCurrency } from '../../../utils';
import { AiTwotoneDelete } from 'react-icons/ai'
import cartApi from '../../api/cart';
import { toastError, toastSuccess } from '../../components/toast/Toast';

const CartItem = (item) => {
    const sendData = () => {
        item.parentCallback();
    }
    // console.log('item', item)
    const [quantity, setQuantity] = useState(item.item.quantity);

    const handleDecrease = async () => {
        if (quantity > 1) {
            await setQuantity(quantity - 1);
            await changeQuantityAPI(quantity - 1)
            await sendData()
        }
    };
    const changeQuantityAPI = async (quantity) => {
        await cartApi.ChangeQuantity({ quantity: quantity, _id: item.item._id });
    }
    const handleIncrease = async () => {
        setQuantity(quantity + 1);
        await changeQuantityAPI(quantity + 1)
        sendData()
    };
    const handleRemove = async () => {
        try {
            await cartApi.Remove(item.item._id); // Sử dụng item.id
            sendData()
            // onRemove(item.item._id); // Gọi hàm onRemove ở component cha để cập nhật danh sách giỏ hàng 
            toastSuccess('Delete success');
        } catch (error) {
            toastError("Delete Fail");
        }
    };
    return (
        <tr className="border-t-2">
            <td className="flex py-10  gap-4">
                <img src={item.item.images ? item.item.images[0].path : null} className="w-20"></img>
                <div className="pt-7 w-[300px]">
                    <p>{item.item.product.name}</p>

                </div>
            </td>

            <td className="w-40">
                <div className="font-bold flex text-center">

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
            <td className="font-bold w-[150px] text-center">
                {formatCurrency(quantity * item.item.product.price)}
            </td>
            <td className="text-slate-400 text-base">
                <div> <AiTwotoneDelete onClick={handleRemove} /></div>
            </td>
        </tr>

    )
}
export default CartItem