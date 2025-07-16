"use client"

import React from "react";
import { CartItemType } from "../../types/CartItemType";

interface Props {
  subtotal: number;
  shippingFee: number;
  totalAmount: number;
}
const CartSummary: React.FC<Props> = ({ subtotal, shippingFee, totalAmount }) => (
  <div className="mt-8 p-4 bg-gray-50 rounded-lg text-right">
    <div>상품 가격: <b>{(subtotal ?? 0).toLocaleString()}원</b></div>
    <div>배송비: <b>{(shippingFee ?? 0).toLocaleString()}원</b></div>
    <div className="text-xl mt-2">총 합계: <b className="text-blue-600">{(totalAmount ?? 0).toLocaleString()}원</b></div>
  </div>
);
export default CartSummary;
