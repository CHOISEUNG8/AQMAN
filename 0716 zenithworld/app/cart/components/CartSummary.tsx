
import React from 'react';

interface CartSummaryProps {
    subtotal: number;
    shippingFee: number;
    totalAmount: number;
}

const CartSummary: React.FC<CartSummaryProps> = ({ subtotal, shippingFee, totalAmount }) => {
    const formatCurrency = (amount: number) => `${amount.toLocaleString('ko-KR')}원`;

    return (
        <div className="mt-8 border-2 border-gray-800 rounded-md">
            <div className="grid grid-cols-2 md:grid-cols-4 text-center">
                <div className="p-4">
                    <p className="text-gray-500">상품 가격</p>
                    <p className="text-2xl font-bold mt-1">{formatCurrency(subtotal)}</p>
                </div>
                <div className="p-4 flex items-center justify-center text-2xl font-light text-gray-400">+</div>
                <div className="p-4">
                    <p className="text-gray-500">배송비</p>
                    <p className="text-2xl font-bold mt-1">{formatCurrency(shippingFee)}</p>
                </div>
                <div className="p-4 bg-gray-100 flex flex-col justify-center items-center">
                    <p className="text-gray-500">총 결제 금액</p>
                    <p className="text-3xl font-extrabold text-red-600 mt-1">{formatCurrency(totalAmount)}</p>
                </div>
            </div>
        </div>
    );
};

export default CartSummary;
