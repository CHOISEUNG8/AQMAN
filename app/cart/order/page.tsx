"use client";

import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/auth-context';
import { useRouter } from 'next/navigation';
import { ShoppingBag, Building2, CreditCard, Smartphone } from 'lucide-react';

interface OrderItem {
  id: number | string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

function OrderPage() {
  const { user } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (user === null) {
      router.push('/');
    }
  }, [user, router]);

  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);

  useEffect(() => {
    const items = localStorage.getItem("orderItems");
    if (items) {
      setOrderItems(JSON.parse(items));
    }
  }, []);

  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    emailDomain: 'naver.com',
    customEmailDomain: '',
    phone1: '010',
    phone2: '',
    phone3: '',
    zipcode: '',
    address: '',
    detailAddress: ''
  });

  const [shippingInfo, setShippingInfo] = useState({
    name: '',
    email: '',
    emailDomain: 'naver.com',
    customEmailDomain: '',
    phone1: '010',
    phone2: '',
    phone3: '',
    zipcode: '',
    address: '',
    detailAddress: '',
    deliveryMessage: ''
  });

  const [paymentMethod, setPaymentMethod] = useState('');
  const [usePoints, setUsePoints] = useState(0);
  const [sameAsCustomer, setSameAsCustomer] = useState(true);

  const shippingFee = 0;
  const totalPrice = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = 0; // 쿠폰 할인액 (필요하면 state 추가하여 처리)
  const finalPrice = totalPrice + shippingFee - discount - usePoints;

  // 고객정보 변경 시 배송지 자동 업데이트
  const handleCustomerInfoChange = (field: string, value: string) => {
    setCustomerInfo(prev => ({ ...prev, [field]: value }));
    if (sameAsCustomer) {
      setShippingInfo(prev => ({ ...prev, [field]: value }));
    }
  };

  // 배송지 정보 변경
  const handleShippingInfoChange = (field: string, value: string) => {
    setShippingInfo(prev => ({ ...prev, [field]: value }));
  };

  // 배송지 복사 여부 토글
  const handleSameAsCustomerChange = (checked: boolean) => {
    setSameAsCustomer(checked);
    if (checked) {
      setShippingInfo({
        ...customerInfo,
        deliveryMessage: shippingInfo.deliveryMessage
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-800 mb-8">주문서작성/결제</h1>

          {/* 주문 상품 */}
          <section className="bg-white rounded-lg shadow-sm mb-8">
            <header className="bg-blue-600 text-white px-6 py-3 rounded-t-lg">
              <h2 className="font-semibold">주문 상품</h2>
            </header>
            <div className="p-6 flex flex-col gap-4">
              {orderItems.length === 0 ? (
                <div className="text-center text-gray-500">주문 상품이 없습니다.</div>
              ) : (
                orderItems.map((item) => (
                  <div key={item.id} className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-2 md:space-y-0 border-b last:border-b-0 pb-4 last:pb-0">
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded"
                      />
                    )}
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-800">{item.name}</h3>
                      <p className="text-sm text-gray-600">₩{item.price.toLocaleString()} x {item.quantity}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600">합계금액</p>
                      <p className="text-red-600 font-bold text-lg">{(item.price * item.quantity).toLocaleString()}원</p>
                    </div>
                  </div>
                ))
              )}
            </div>
            <footer className="bg-blue-600 text-white px-6 py-3 text-center rounded-b-lg">
              상품 가격 {totalPrice.toLocaleString()}원 + 배송비 {shippingFee.toLocaleString()}원 = 총 합계 {finalPrice.toLocaleString()}원
            </footer>
          </section>

          {/* 주문고객 정보 */}
          <section className="bg-white rounded-lg shadow-sm mb-8">
            <header className="bg-blue-600 text-white px-6 py-3 rounded-t-lg">
              <h2 className="font-semibold">주문고객 정보</h2>
            </header>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                <label className="font-medium">주문고객</label>
                <input
                  type="text"
                  value={customerInfo.name}
                  onChange={(e) => handleCustomerInfoChange('name', e.target.value)}
                  placeholder="성명을 입력해주세요"
                  className="md:col-span-3 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                <label className="font-medium">이메일</label>
                <div className="md:col-span-3 flex items-center gap-2">
                  <div className="flex flex-1 gap-2">
                    <input
                      type="text"
                      value={customerInfo.email}
                      onChange={(e) => handleCustomerInfoChange('email', e.target.value)}
                      className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="self-center">@</span>
                    {customerInfo.emailDomain === 'custom' && (
                      <input
                        type="text"
                        value={customerInfo.customEmailDomain || ''}
                        onChange={e => handleCustomerInfoChange('customEmailDomain', e.target.value)}
                        placeholder="도메인 입력"
                        className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    )}
                    <select
                      value={customerInfo.emailDomain}
                      onChange={(e) => handleCustomerInfoChange('emailDomain', e.target.value)}
                      className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="custom">직접입력</option>
                      <option value="naver.com">naver.com</option>
                      <option value="hanmail.net">hanmail.net</option>
                      <option value="daum.net">daum.net</option>
                      <option value="gmail.com">gmail.com</option>
                      <option value="nate.com">nate.com</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                <label className="font-medium">핸드폰번호</label>
                <div className="md:col-span-3 flex items-center space-x-2">
                  <select
                    value={customerInfo.phone1}
                    onChange={(e) => handleCustomerInfoChange('phone1', e.target.value)}
                    className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="010">010</option>
                    <option value="011">011</option>
                    <option value="016">016</option>
                  </select>
                  <span>-</span>
                  <input
                    type="text"
                    value={customerInfo.phone2}
                    onChange={(e) => handleCustomerInfoChange('phone2', e.target.value)}
                    maxLength={4}
                    className="w-20 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <span>-</span>
                  <input
                    type="text"
                    value={customerInfo.phone3}
                    onChange={(e) => handleCustomerInfoChange('phone3', e.target.value)}
                    maxLength={4}
                    className="w-20 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
                <label className="font-medium pt-2">주소</label>
                <div className="md:col-span-3 space-y-2">
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={customerInfo.zipcode}
                      onChange={(e) => handleCustomerInfoChange('zipcode', e.target.value)}
                      placeholder="우편번호"
                      className="w-32 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors">주소검색</button>
                  </div>
                  <input
                    type="text"
                    value={customerInfo.address}
                    onChange={(e) => handleCustomerInfoChange('address', e.target.value)}
                    placeholder="기본주소"
                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    value={customerInfo.detailAddress}
                    onChange={(e) => handleCustomerInfoChange('detailAddress', e.target.value)}
                    placeholder="상세주소"
                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* 배송지 정보 */}
          <section className="bg-white rounded-lg shadow-sm mb-8">
            <header className="bg-blue-600 text-white px-6 py-3 rounded-t-lg flex flex-col md:flex-row md:items-center md:justify-between gap-2">
              <h2 className="font-semibold">배송지 정보</h2>
              <div className="flex gap-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    checked={sameAsCustomer}
                    onChange={() => handleSameAsCustomerChange(true)}
                    className="text-blue-600"
                  />
                  <span>주문고객 정보와 동일</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    checked={!sameAsCustomer}
                    onChange={() => handleSameAsCustomerChange(false)}
                    className="text-blue-600"
                  />
                  <span>새로운 주소</span>
                </label>
              </div>
            </header>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                <label className="font-medium">받는 분</label>
                <input
                  type="text"
                  value={shippingInfo.name}
                  onChange={(e) => handleShippingInfoChange('name', e.target.value)}
                  placeholder="성명을 입력해주세요"
                  className="md:col-span-3 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={sameAsCustomer}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                <label className="font-medium">이메일</label>
                <div className="md:col-span-3 flex items-center gap-2">
                  <div className="flex flex-1 gap-2">
                    <input
                      type="text"
                      value={shippingInfo.email}
                      onChange={(e) => handleShippingInfoChange('email', e.target.value)}
                      className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      disabled={sameAsCustomer}
                    />
                    <span className="self-center">@</span>
                    {shippingInfo.emailDomain === 'custom' && (
                      <input
                        type="text"
                        value={shippingInfo.customEmailDomain || ''}
                        onChange={e => handleShippingInfoChange('customEmailDomain', e.target.value)}
                        placeholder="도메인 입력"
                        className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        disabled={sameAsCustomer}
                      />
                    )}
                    <select
                      value={shippingInfo.emailDomain}
                      onChange={(e) => handleShippingInfoChange('emailDomain', e.target.value)}
                      className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      disabled={sameAsCustomer}
                    >
                      <option value="custom">직접입력</option>
                      <option value="naver.com">naver.com</option>
                      <option value="hanmail.net">hanmail.net</option>
                      <option value="daum.net">daum.net</option>
                      <option value="gmail.com">gmail.com</option>
                      <option value="nate.com">nate.com</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
                <label className="font-medium pt-2">배송 메세지</label>
                <div className="md:col-span-3">
                  <select
                    value={shippingInfo.deliveryMessage}
                    onChange={(e) => handleShippingInfoChange('deliveryMessage', e.target.value)}
                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                    disabled={sameAsCustomer}
                  >
                    <option value="">직접입력</option>
                    <option value="부재시 문앞에 놓아주세요">부재시 문앞에 놓아주세요</option>
                    <option value="부재시 경비실에 맡겨주세요">부재시 경비실에 맡겨주세요</option>
                    <option value="배송전 연락바랍니다">배송전 연락바랍니다</option>
                  </select>
                  <textarea
                    value={shippingInfo.deliveryMessage}
                    onChange={(e) => handleShippingInfoChange('deliveryMessage', e.target.value)}
                    placeholder="배송 메시지를 입력해주세요"
                    rows={3}
                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={sameAsCustomer}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* 할인 및 적립금 */}
          <section className="bg-white rounded-lg shadow-sm mb-8">
            <header className="bg-blue-600 text-white px-6 py-3 rounded-t-lg flex items-center gap-4">
              <h2 className="font-semibold">할인 및 적립금</h2>
              <label className="flex items-center space-x-2">
                <input type="radio" name="discount" className="text-blue-600" defaultChecked />
                <span>쿠폰 + 적립금</span>
              </label>
            </header>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-medium mb-2">쿠폰</h3>
                <button className="bg-pink-600 text-white px-4 py-2 rounded text-sm hover:bg-pink-700">쿠폰조회 및 적용</button>
                <p className="text-sm text-gray-600 mt-2">쿠폰할인: {discount.toLocaleString()}원</p>
              </div>
              <div>
                <h3 className="font-medium mb-2">적립금</h3>
                <div className="flex items-center space-x-2">
                  <span className="text-sm">사용가능: 103,788원</span>
                  <span className="text-sm">사용:</span>
                  <input
                    type="number"
                    value={usePoints}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      if (val >= 0 && val <= 103788 && val <= finalPrice) setUsePoints(val);
                    }}
                    className="w-20 border rounded px-2 py-1 text-sm"
                  />
                  <span className="text-sm">원</span>
                  <button
                    className="bg-gray-500 text-white px-3 py-1 rounded text-sm hover:bg-gray-600"
                    onClick={() => setUsePoints(Math.min(103788, finalPrice))}
                  >
                    전액사용
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* 결제 금액 */}
          <section className="bg-white rounded-lg shadow-sm mb-8">
            <header className="bg-blue-600 text-white px-6 py-3 rounded-t-lg">
              <h2 className="font-semibold">결제 금액</h2>
            </header>
            <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <p className="text-sm text-gray-600">상품 가격</p>
                <p className="font-bold text-lg">{totalPrice.toLocaleString()}원 <span className="text-red-600 text-sm">(할인가)</span></p>
              </div>
              <div>
                <p className="text-sm text-gray-600">배송비(+)</p>
                <p className="font-bold text-lg">{shippingFee.toLocaleString()}원</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">포인트/쿠폰(-)</p>
                <p className="font-bold text-lg">{(discount + usePoints).toLocaleString()}원</p>
                <p className="text-blue-600 text-sm">예상 적립금: 4,746원</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">최종 결제액</p>
                <p className="font-bold text-xl text-red-600">{finalPrice.toLocaleString()}원</p>
              </div>
            </div>
          </section>

          {/* 결제 방법 */}
          <section className="bg-white rounded-lg shadow-sm mb-8">
            <header className="bg-blue-600 text-white px-6 py-3 rounded-t-lg">
              <h2 className="font-semibold">결제 방법</h2>
            </header>
            <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { value: 'bank', label: '계좌이체', icon: <Building2 className="w-8 h-8 mx-auto mb-2 text-gray-600" /> },
                { value: 'credit', label: '신용·체크카드', icon: <CreditCard className="w-8 h-8 mx-auto mb-2 text-gray-600" /> },
                { value: 'mobile', label: '무통장입금', icon: <Smartphone className="w-8 h-8 mx-auto mb-2 text-gray-600" /> },
                { value: 'kakaopay', label: 'KakaoPay', icon: <div className="w-8 h-8 mx-auto mb-2 bg-yellow-400 rounded flex items-center justify-center"><span className="text-black font-bold text-xs">pay</span></div> }
              ].map(({ value, label, icon }) => (
                <label key={value} className={`border-2 border-gray-200 rounded-lg p-4 cursor-pointer hover:border-blue-500 transition-colors ${paymentMethod === value ? 'border-blue-500' : ''}`}>
                  <input
                    type="radio"
                    name="payment"
                    value={value}
                    checked={paymentMethod === value}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="sr-only"
                  />
                  <div className="text-center">
                    {icon}
                    <p className="font-medium">{label}</p>
                  </div>
                </label>
              ))}
            </div>
          </section>

          {/* 이용약관 동의 */}
          <section className="bg-white rounded-lg shadow-sm mb-8">
            <div className="p-6">
              <label className="flex items-center space-x-3">
                <input type="checkbox" className="w-5 h-5 text-blue-600 rounded" />
                <span className="text-sm">[필수] 결제 서비스 이용 약관, 개인정보 처리 동의 &gt;</span>
              </label>
            </div>
          </section>

          {/* 버튼 */}
          <div className="flex gap-4 mb-8">
            <button type="button" className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors">이전 페이지</button>
            <button className="flex-1 bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors">결제하기</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderPage;
