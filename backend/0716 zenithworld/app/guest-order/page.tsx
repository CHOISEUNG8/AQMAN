"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Search, Package, Truck, CreditCard, User, Mail, Phone } from "lucide-react"
import Link from "next/link"

interface OrderInfo {
  orderNumber: string
  orderDate: string
  status: string
  items: Array<{
    name: string
    quantity: number
    price: number
  }>
  shipping: {
    address: string
    method: string
    fee: number
    trackingNumber: string
    customsCode: string
  }
  payment: {
    method: string
    amount: number
  }
  contact: {
    name: string
    phone: string
    email: string
  }
}

export default function GuestOrderPage() {
  const [orderNumber, setOrderNumber] = useState("")
  const [contactType, setContactType] = useState("email")
  const [contactValue, setContactValue] = useState("")
  const [orderInfo, setOrderInfo] = useState<OrderInfo | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  // 샘플 주문 데이터
  const sampleOrders: Record<string, OrderInfo> = {
    "ZORD202507080001": {
      orderNumber: "ZORD202507080001",
      orderDate: "2025-07-08",
      status: "배송중",
      items: [
        { name: "무선 블루투스 이어폰", quantity: 1, price: 89000 },
        { name: "스마트폰 케이스", quantity: 2, price: 25000 },
      ],
      shipping: {
        address: "서울시 강남구 테헤란로 123",
        method: "일반배송",
        fee: 3000,
        trackingNumber: "123456781234",
        customsCode: "P123456781234",
      },
      payment: {
        method: "신용카드",
        amount: 142000,
      },
      contact: {
        name: "홍길동",
        phone: "010-1234-5678",
        email: "guest@example.com",
      },
    },
    "ZORD202401200002": {
      orderNumber: "ZORD202401200002",
      orderDate: "2024-01-20",
      status: "배송완료",
      items: [{ name: "프리미엄 백팩", quantity: 1, price: 65000 }],
      shipping: {
        address: "부산시 해운대구 센텀로 456",
        method: "택배배송",
        fee: 0,
        trackingNumber: "9876543210001",
        customsCode: "P87654321B",
      },
      payment: {
        method: "계좌이체",
        amount: 65000,
      },
      contact: {
        name: "김영희",
        phone: "010-9876-5432",
        email: "kim@example.com",
      },
    },
  }

  // 하이픈 없는 번호를 010-1234-5678 형식으로 변환
  function formatPhoneNumber(phone: string) {
    const onlyNums = phone.replace(/[^0-9]/g, "");
    if (onlyNums.length === 11) {
      return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3, 7)}-${onlyNums.slice(7)}`;
    }
    return phone;
  }

  const handleSearch = async () => {
    if (!orderNumber.trim() || !contactValue.trim()) {
      setError("주문번호와 휴대폰번호를 모두 입력해주세요.")
      return
    }

    setIsLoading(true)
    setError("")

    setTimeout(() => {
      const order = sampleOrders[orderNumber.trim()]

      if (order) {
        // 입력값을 하이픈 형식으로 변환해서 비교
        const formattedInput = formatPhoneNumber(contactValue.trim());
        const isValidContact = order.contact.phone === formattedInput;

        if (isValidContact) {
          setOrderInfo(order)
          setError("")
        } else {
          setError("입력하신 휴대폰번호 정보가 일치하지 않습니다.")
          setOrderInfo(null)
        }
      } else {
        setError("주문번호를 찾을 수 없습니다.")
        setOrderInfo(null)
      }

      setIsLoading(false)
    }, 1000)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "주문완료":
        return "bg-blue-100 text-blue-800"
      case "배송준비중":
        return "bg-yellow-100 text-yellow-800"
      case "배송중":
        return "bg-orange-100 text-orange-800"
      case "배송완료":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">비회원 주문조회</h1>
          <p className="text-muted-foreground">주문번호와 연락처로 주문 내역을 확인하세요</p>
        </div>

        {/* 주문 조회 폼 */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Search className="h-5 w-5 mr-2" />
              주문 조회
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="orderNumber">주문번호</Label>
              <Input
                id="orderNumber"
                placeholder="주문번호를 입력하세요 (예: ZORD202507080001)"
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
              />
            </div>

            <div className="space-y-4">
              <Label>휴대폰번호</Label>
              <Input
                placeholder="휴대폰번호를 입력하세요 (010-0000-0000)"
                value={contactValue}
                onChange={(e) => setContactValue(e.target.value)}
              />
            </div>

            {error && <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md">{error}</div>}

            <Button onClick={handleSearch} disabled={isLoading} className="w-full">
              {isLoading ? "조회중..." : "주문 조회"}
            </Button>

            <div className="text-sm text-muted-foreground bg-muted p-4 rounded-md">
              <p className="font-medium mb-2">테스트용 샘플 데이터:</p>
              <p>• 주문번호: ZORD202507080001, 휴대폰번호: 01012345678</p>
              <p>• 주문번호: ZORD202401200002, 휴대폰번호: 01098765432</p>
            </div>
          </CardContent>
        </Card>

        {/* 조건부 렌더링: 로딩, 주문 정보 */}
        {isLoading ? (
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-lg">로딩 중...</div>
          </div>
        ) : orderInfo ? (
          <div className="space-y-6">
            {/* 주문 상태 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center">
                    <Package className="h-5 w-5 mr-2" />
                    주문 정보
                  </span>
                  <Badge className={getStatusColor(orderInfo.status)}>{orderInfo.status}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">주문번호</p>
                    <p className="font-medium">{orderInfo.orderNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">주문일자</p>
                    <p className="font-medium">{orderInfo.orderDate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">주문자</p>
                    <p className="font-medium">{orderInfo.contact.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">연락처</p>
                    <p className="font-medium">{orderInfo.contact.phone}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 주문 상품 */}
            <Card>
              <CardHeader>
                <CardTitle>주문 상품</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {orderInfo.items.map((item, index) => (
                    <div key={index} className="flex justify-between items-center py-2">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">수량: {item.quantity}개</p>
                      </div>
                      <p className="font-medium">{(item.price * item.quantity).toLocaleString()}원</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 배송 정보 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Truck className="h-5 w-5 mr-2" />
                  배송 정보
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground">배송지</p>
                    <p className="font-medium">{orderInfo.shipping.address}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">배송방법</p>
                    <p className="font-medium">{orderInfo.shipping.method}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">배송비</p>
                    <p className="font-medium">
                      {orderInfo.shipping.fee === 0 ? "무료" : `${orderInfo.shipping.fee.toLocaleString()}원`}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">운송장번호</p>
                    <p className="font-medium">{orderInfo.shipping.trackingNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">개인통관고유부호</p>
                    <p className="font-medium">{orderInfo.shipping.customsCode}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 결제 정보 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="h-5 w-5 mr-2" />
                  결제 정보
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>상품금액</span>
                    <span>
                      {orderInfo.items.reduce((sum, item) => sum + item.price * item.quantity, 0).toLocaleString()}원
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>배송비</span>
                    <span>
                      {orderInfo.shipping.fee === 0 ? "무료" : `${orderInfo.shipping.fee.toLocaleString()}원`}
                    </span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold text-lg">
                    <span>총 결제금액</span>
                    <span>{orderInfo.payment.amount.toLocaleString()}원</span>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm text-muted-foreground">결제방법</p>
                    <p className="font-medium">{orderInfo.payment.method}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : null}

        {/* 회원가입 유도 */}
        <Card className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50">
          <CardContent className="p-6 text-center">
            <User className="h-12 w-12 mx-auto mb-4 text-blue-600" />
            <h3 className="text-xl font-semibold mb-2">회원가입하고 더 많은 혜택을 받으세요!</h3>
            <p className="text-muted-foreground mb-4">
              회원가입 시 주문 내역 관리, 적립금, 쿠폰 등 다양한 혜택을 제공합니다.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild>
                <Link href="/signup">회원가입</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/login">로그인</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
