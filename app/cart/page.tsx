"use client";

import React, { useState, useEffect } from "react";
import {
  ShoppingCart,
  X,
  Minus,
  Plus,
  TicketPercent,
} from "lucide-react"; // npm install lucide-react
import { useRouter } from "next/navigation";
import { useAuth } from "../contexts/auth-context";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

const initialCartItems: CartItem[] = [
  { id: 1, name: "무선 청소기", price: 120000, quantity: 1 },
  { id: 2, name: "스탠드 선풍기", price: 29000, quantity: 2 },
];

const validCoupons: { [key: string]: { type: string; value?: number } } = {
  DISCOUNT10: { type: "percent", value: 10 },
  FREEDELIVERY: { type: "free_shipping" },
};

const CartApp: React.FC = () => {
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (user === null) {
      router.push("/");
    }
  }, [user, router]);

  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);
  const [couponCode, setCouponCode] = useState<string>("");
  const [appliedCoupon, setAppliedCoupon] = useState<any>(null);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = cartItems.length > 0 && subtotal < 50000 ? 3000 : 0;

  const discount =
    appliedCoupon?.type === "percent"
      ? Math.floor((subtotal * appliedCoupon.value) / 100)
      : 0;

  const deliveryFee = appliedCoupon?.type === "free_shipping" ? 0 : shipping;
  const total = subtotal - discount + deliveryFee;

  const applyCoupon = () => {
    const code = couponCode.trim().toUpperCase();
    const coupon = validCoupons[code];
    if (coupon) {
      setAppliedCoupon(coupon);
      alert("쿠폰이 적용되었습니다!");
    } else {
      alert("유효하지 않은 쿠폰입니다.");
    }
  };

  const updateQuantity = (id: number, delta: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(item.quantity + delta, 1) }
          : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleOrder = () => {
    localStorage.setItem("orderItems", JSON.stringify(cartItems));
    router.push("/cart/order");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto p-6 bg-white shadow-md rounded-xl mt-8">
        <div className="flex items-center mb-6">
          <ShoppingCart className="w-6 h-6 mr-2" />
          <h2 className="text-xl font-bold">장바구니</h2>
        </div>

        {cartItems.length === 0 ? (
          <p className="text-center text-gray-500 py-8">장바구니가 비어 있습니다.</p>
        ) : (
          <>
            <ul className="divide-y mb-4">
              {cartItems.map((item) => (
                <li
                  key={item.id}
                  className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-4"
                >
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-500">
                      ₩{item.price.toLocaleString()} x {item.quantity}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 mt-2 sm:mt-0">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="p-1 border rounded hover:bg-gray-100"
                      aria-label="수량 감소"
                    >
                      <Minus className="w-4 h-4 text-gray-600" />
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="p-1 border rounded hover:bg-gray-100"
                      aria-label="수량 증가"
                    >
                      <Plus className="w-4 h-4 text-gray-600" />
                    </button>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-1 ml-2 border rounded hover:bg-red-100"
                      aria-label="상품 삭제"
                    >
                      <X className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            {/* 요약 */}
            <div className="border-t pt-4 space-y-2 text-sm text-gray-700">
              <div className="flex justify-between">
                <span>상품 금액</span>
                <span>₩{subtotal.toLocaleString()}</span>
              </div>
              {appliedCoupon?.type === "percent" && (
                <div className="flex justify-between text-green-600 font-medium">
                  <span>할인 적용</span>
                  <span>- ₩{discount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>배송비</span>
                <span>{deliveryFee > 0 ? `₩${deliveryFee.toLocaleString()}` : "무료"}</span>
              </div>
              <div className="flex justify-between font-bold text-base mt-2">
                <span>총 결제금액</span>
                <span>₩{total.toLocaleString()}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <button
                type="button"
                className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                onClick={() => (window.location.href = "/")}
              >
                계속 쇼핑하기
              </button>
              <button
                type="button"
                className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                onClick={() => {
                  localStorage.setItem("orderItems", JSON.stringify(cartItems));
                  router.push("/cart/order");
                }}
              >
                주문하기
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartApp;
