import React, { useState } from "react";
import {
  ShoppingCart,
  X,
  Minus,
  Plus,
  TicketPercent,
} from "lucide-react"; // npm install lucide-react

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

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-xl mt-8">
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
              <li key={item.id} className="flex justify-between py-4 items-center">
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-500">
                    ₩{item.price.toLocaleString()} x {item.quantity}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => updateQuantity(item.id, -1)}>
                    <Minus className="w-4 h-4 text-gray-600" />
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, 1)}>
                    <Plus className="w-4 h-4 text-gray-600" />
                  </button>
                  <button onClick={() => removeItem(item.id)}>
                    <X className="w-4 h-4 text-red-500 ml-2" />
                  </button>
                </div>
              </li>
            ))}
          </ul>

          {/* 쿠폰 입력 */}
          <div className="flex items-center mb-4">
            <TicketPercent className="w-5 h-5 text-purple-600 mr-2" />
            <input
              type="text"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              placeholder="쿠폰 코드 입력 (예: DISCOUNT10)"
              className="border px-3 py-2 rounded-md w-full mr-2"
            />
            <button
              onClick={applyCoupon}
              className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700"
            >
              적용
            </button>
          </div>

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
        </>
      )}
    </div>
  );
};

export default CartApp;
