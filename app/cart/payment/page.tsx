"use client";

import React, { useRef } from "react";

const PaymentPage: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null);

  const handlePayment = () => {
    if (formRef.current) {
      formRef.current.submit(); // 이니시스 결제창 열기
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-xl font-bold mb-4">신용카드 결제</h2>

      <form
        ref={formRef}
        method="POST"
        action="https://mobile.inicis.com/smart/payment/" // 실제 결제창 URL
      >
        {/* 필수 파라미터 */}
        <input type="hidden" name="P_MID" value="INIpayTest" /> {/* 상점 ID */}
        <input type="hidden" name="P_OID" value={`ORDER_${Date.now()}`} />
        <input type="hidden" name="P_AMT" value="10000" />
        <input type="hidden" name="P_UNAME" value="홍길동" />
        <input type="hidden" name="P_GOODS" value="청소기" />
        <input type="hidden" name="P_RETURN_URL" value="https://yourdomain.com/payment/complete" />
        <input type="hidden" name="P_NEXT_URL" value="https://yourdomain.com/payment/next" />
        <input type="hidden" name="P_CHARSET" value="utf8" />

        {/* 결제 버튼 */}
        <button
          type="button"
          onClick={handlePayment}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          카드 결제하기
        </button>
      </form>
    </div>
  );
};

export default PaymentPage; 