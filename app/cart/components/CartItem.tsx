
import React from 'react';
import { type CartItemType } from '../types';

interface CartItemProps {
    item: CartItemType;
    onCheck: (id: number) => void;
    onQuantityChange: (id: number, quantity: number) => void;
    onDelete: (id: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, onCheck, onQuantityChange, onDelete }) => {
    return (
        <div className="grid grid-cols-12 items-center text-center p-4 border-b border-gray-200 last:border-b-0">
            <div className="col-span-1 flex items-center justify-center">
                <input
                    type="checkbox"
                    className="h-4 w-4"
                    checked={item.checked}
                    onChange={() => onCheck(item.id)}
                />
            </div>
            <div className="col-span-5 flex items-center text-left">
                <img src={item.imageUrl} alt={item.name} className="w-16 h-16 rounded-md mr-4" />
                <div>
                    <p className="font-semibold text-gray-800">{item.name}</p>
                    <p className="text-xs text-gray-500">{item.option}</p>
                </div>
            </div>
            <div className="col-span-2 font-medium">
                {item.price.toLocaleString('ko-KR')}원
            </div>
            <div className="col-span-2 flex items-center justify-center space-x-2">
                <button
                    onClick={() => onQuantityChange(item.id, item.quantity - 1)}
                    className="w-6 h-6 border rounded bg-gray-100 hover:bg-gray-200"
                >
                    -
                </button>
                <input
                    type="text"
                    value={item.quantity}
                    readOnly
                    className="w-10 text-center border-t border-b"
                />
                <button
                    onClick={() => onQuantityChange(item.id, item.quantity + 1)}
                    className="w-6 h-6 border rounded bg-gray-100 hover:bg-gray-200"
                >
                    +
                </button>
                 <button onClick={() => onDelete(item.id)} className="ml-3 text-gray-400 hover:text-red-500 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
            <div className="col-span-2 font-bold text-red-600">
                {(item.price * item.quantity).toLocaleString('ko-KR')}원
            </div>
        </div>
    );
};

export default CartItem;
