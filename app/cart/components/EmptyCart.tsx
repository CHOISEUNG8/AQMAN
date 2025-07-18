import React from 'react';
import { ShoppingBag } from 'lucide-react';

export const EmptyCart: React.FC = () => {
  return (
    <div className="text-center py-16">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
        <ShoppingBag size={32} className="text-gray-400" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">장바구니가 비어있습니다.</h3>
      <p className="text-gray-500 mb-6">원하는 상품을 장바구니에 담아보세요.</p>
      <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700 transition-colors">
        쇼핑 계속하기
      </button>
    </div>
  );
};