import React from 'react';
import { ArrowLeft, ShoppingCart as CartIcon } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { CartItem } from './CartItem';
import { EmptyCart } from './EmptyCart';
import { OrderSummary } from './OrderSummary';

export const ShoppingCart: React.FC = () => {
  const { cartState, updateQuantity, removeItem } = useCart();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <ArrowLeft size={20} />
              </button>
              <h1 className="text-xl font-bold">장바구니</h1>
              <span className="bg-red-600 text-white text-xs px-2 py-1 rounded-full">
                {cartState.items.length}
              </span>
            </div>
            <CartIcon size={24} className="text-gray-600" />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h3 className="font-medium text-blue-900 mb-2">주문예정시기 안내 참고하세요!</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• 현재 금액이 50,000원 미달일 경우, 배송비 3,500원이 부과됩니다.</li>
            <li>• 단, 제주도 및 도서산간지역은 3,000원 이상의 추가 배송비가 발생됩니다.</li>
            <li>• 당일발송 : 오늘 24시까지 주문 및 결제완료 (평일/화장실 1~3일 소요)</li>
            <li>• 공휴일 제외한 3일 이내에 발송하며, 만일 재고 같은 지연 시 유스 습니다.</li>
            <li>• 장마구에 얽은 제품은 최대 3일간 저장됩니다.</li>
          </ul>
        </div>

        {cartState.items.length === 0 ? (
          <EmptyCart />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm">
                <div className="p-6">
                  <div className="grid grid-cols-4 gap-4 text-sm font-medium text-gray-500 mb-4 hidden md:grid">
                    <div className="col-span-2">상품명</div>
                    <div className="text-center">할인가</div>
                    <div className="text-center">옵션 / 수량</div>
                    <div className="text-center">합계금액</div>
                  </div>
                  
                  <div className="space-y-0">
                    {cartState.items.map((item) => (
                      <CartItem
                        key={item.id}
                        item={item}
                        onQuantityChange={updateQuantity}
                        onRemove={removeItem}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary & Action Buttons */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <OrderSummary cartState={cartState} />
              </div>
              
              {/* Action Buttons */}
              <div className="space-y-3">
                <button className="w-full bg-gray-800 text-white py-4 px-6 rounded-lg font-medium hover:bg-gray-900 transition-colors text-lg">
                  계속 쇼핑하기
                </button>
                <button className="w-full bg-red-600 text-white py-4 px-6 rounded-lg font-medium hover:bg-red-700 transition-colors text-lg">
                  주문하기
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Stats */}
        {cartState.items.length > 0 && (
          <div className="bg-gray-600 text-white p-4 rounded-lg mt-8 text-center">
            <span className="text-sm">
              상품 가격 {cartState.items.reduce((sum, item) => sum + item.quantity, 0)}개 • 배송비 {cartState.shipping === 0 ? '무료' : '3,000원'} • 총 결제금액 {cartState.items.reduce((sum, item) => sum + item.quantity, 0)}개
            </span>
          </div>
        )}
      </div>
    </div>
  );
};