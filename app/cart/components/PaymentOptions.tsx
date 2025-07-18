import React from 'react';

export const PaymentOptions: React.FC = () => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">결제 방법</h3>
      
      <div className="space-y-3">
        <label className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
          <input type="radio" name="payment" value="naver" defaultChecked className="text-green-600" />
          <div className="flex items-center space-x-2">
            <div className="bg-green-600 text-white px-3 py-1 rounded text-sm font-bold">
              NAVER
            </div>
            <span>네이버페이 간편결제</span>
          </div>
        </label>
        
        <label className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
          <input type="radio" name="payment" value="card" className="text-blue-600" />
          <span>신용카드</span>
        </label>
        
        <label className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
          <input type="radio" name="payment" value="bank" className="text-purple-600" />
          <span>무통장입금</span>
        </label>
      </div>
      
      <div className="text-sm text-gray-500 mt-4">
        <p>• Npay 10누적 시카 플러쿠폰 <span className="text-blue-600">‹ ›</span></p>
      </div>
    </div>
  );
};