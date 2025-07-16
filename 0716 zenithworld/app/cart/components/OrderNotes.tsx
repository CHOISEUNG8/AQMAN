import React from 'react';

const OrderNotes: React.FC = () => {
    return (
        <div className="border border-gray-200 bg-gray-50 p-4 rounded-md text-sm text-gray-600">
            <h2 className="font-bold text-gray-800 mb-2">주문해주시기 전에 참고하세요!</h2>
            <ul className="list-disc list-inside space-y-1">
                <li>총 결제 금액이 50,000원 미만일 경우, 배송비 3,500원이 부과됩니다.</li>
                <li>단, 제주도 및 도서산간지역은 3,000원 이상의 추가 비용이 발생합니다.</li>
                <li>당일발송: 오후 2시까지 주문 및 결제완료분(평균배송일 1~3일 소요)</li>
                <li>주문일로부터 3일 이내에 결제확인이 안된 주문 건은 자동 취소 됩니다.</li>
                <li>장바구니에 담은 제품은 최대 3일간 저장됩니다.</li>
            </ul>
        </div>
    );
};

export default OrderNotes;
