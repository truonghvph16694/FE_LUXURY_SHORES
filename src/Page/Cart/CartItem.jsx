import React, { useState } from 'react';
import { formatCurrency } from '../../../utils';
import { AiTwotoneDelete } from 'react-icons/ai';
import cartApi from '../../api/cart';
import { toastError, toastSuccess } from '../../components/toast/Toast';

const CartItem = (item) => {
    const sendData = () => {
        item.parentCallback();
    };

    const [quantity, setQuantity] = useState(item.item.quantity);
    const [confirmVisible, setConfirmVisible] = useState(false); // State to control modal visibility

    const handleDecrease = async () => {
        if (quantity > 1) {
            await setQuantity(quantity - 1);
            await changeQuantityAPI(quantity - 1);
            await sendData();
        }
    };

    const changeQuantityAPI = async (quantity) => {
        await cartApi.ChangeQuantity({ quantity: quantity, _id: item.item._id });
    };

    const handleIncrease = async () => {
        setQuantity(quantity + 1);
        await changeQuantityAPI(quantity + 1);
        sendData();
    };

    const showConfirmModal = () => {
        setConfirmVisible(true);
    };

    const handleRemove = async () => {
        try {
            await cartApi.Remove(item.item._id);
            sendData();
            toastSuccess('Delete success');
        } catch (error) {
            toastError('Delete Fail');
        } finally {
            setConfirmVisible(false);
        }
    };

    const handleCancel = () => {
        setConfirmVisible(false);
    };
    return (
        <tr className="border-t-2">
            <td className="flex py-10  gap-4">
                <img src={item.item.images ? item.item.images?.path : null} className="w-20"></img>
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
                <div>
                    <AiTwotoneDelete onClick={showConfirmModal} />
                </div>
            </td>

            {/* Confirm Modal */}
            {confirmVisible && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <p className="text-lg font-semibold mb-4">
                            Bạn có chắc chắn muốn xóa không?
                        </p>
                        <div className="flex justify-end">
                            <button
                                onClick={handleCancel}
                                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-white rounded mr-2"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleRemove}
                                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </tr>
    );
};

export default CartItem;