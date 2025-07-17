"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Home,
  UserPlus,
  ShoppingCart,
  CreditCard,
  Truck,
  RotateCcw,
  RefreshCw,
  Gift,
  Phone,
  Mail,
  MapPin,
  Clock,
  AlertCircle,
  CheckCircle,
  XCircle,
} from "lucide-react"

export default function UsageGuidePage() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [])

  const handleLinkClick = (href: string) => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  if (!isMounted) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
            <div className="space-y-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white p-6 rounded-lg">
                  <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* 헤더 */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">이용안내</h1>
              <p className="text-gray-600">제니스월드 온라인 쇼핑몰 이용 방법을 안내해드립니다.</p>
            </div>
            <Button variant="outline" asChild>
              <Link href="/" onClick={() => handleLinkClick("/")}>
                <Home className="h-4 w-4 mr-2" />
                홈으로
              </Link>
            </Button>
          </div>
        </div>

        <div className="space-y-8">
          {/* 회원가입 안내 */}
          <Card className="border-green-200 bg-green-50">
            <CardHeader>
              <CardTitle className="flex items-center text-green-800">
                <UserPlus className="h-5 w-5 mr-2" />
                회원가입 안내
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700 leading-relaxed">
                [회원가입] 메뉴를 통해 이용약관, 개인정보보호정책 동의 및 일정 양식의 가입항목을 기입함으로써 회원에
                가입되며, 가입 즉시 서비스를 무료로 이용하실 수 있습니다.
              </p>
              <div className="bg-white p-4 rounded-lg border border-green-200">
                <h4 className="font-semibold text-green-800 mb-2">회원가입 혜택</h4>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• 주문 시 각종 정보를 일일이 입력하지 않아도 됩니다</li>
                  <li>• 제니스월드에서 진행하는 이벤트 및 각종 행사에 항상 참여하실 수 있습니다</li>
                  <li>• 주문내역 및 배송현황을 실시간으로 확인할 수 있습니다</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* 주문 안내 */}
          <Card className="border-blue-200 bg-blue-50">
            <CardHeader>
              <CardTitle className="flex items-center text-blue-800">
                <ShoppingCart className="h-5 w-5 mr-2" />
                주문 안내
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">상품주문은 다음단계로 이루어집니다.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { step: "Step 1", title: "상품검색", desc: "원하는 상품을 검색합니다" },
                  { step: "Step 2", title: "장바구니에 담기", desc: "상품을 장바구니에 추가합니다" },
                  { step: "Step 3", title: "로그인 또는 비회원 주문", desc: "회원 로그인 또는 비회원으로 주문" },
                  { step: "Step 4", title: "주문서 작성", desc: "배송지 및 주문 정보를 입력합니다" },
                  { step: "Step 5", title: "결제방법선택 및 결제", desc: "결제 방법을 선택하고 결제합니다" },
                  { step: "Step 6", title: "주문 성공", desc: "주문번호를 확인합니다" },
                ].map((item, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg border border-blue-200">
                    <div className="flex items-center mb-2">
                      <Badge className="bg-blue-500 text-white mr-2">{item.step}</Badge>
                      <h4 className="font-semibold text-blue-800">{item.title}</h4>
                    </div>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-start">
                  <AlertCircle className="h-5 w-5 text-yellow-600 mr-2 mt-0.5" />
                  <div>
                    <p className="font-semibold text-yellow-800">중요 안내</p>
                    <p className="text-sm text-yellow-700">
                      비회원 주문인 경우 6단계에서 주문번호와 승인번호(카드결제시)를 꼭 메모해 두시기 바랍니다. 회원인
                      경우 자동 저장되므로 따로 관리하실 필요가 없습니다.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 결제안내 */}
          <Card className="border-purple-200 bg-purple-50">
            <CardHeader>
              <CardTitle className="flex items-center text-purple-800">
                <CreditCard className="h-5 w-5 mr-2" />
                결제안내
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-white p-4 rounded-lg border border-purple-200">
                <h4 className="font-semibold text-purple-800 mb-2">카드결제</h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  고액결제의 경우 안전을 위해 카드사에서 확인전화를 드릴 수도 있습니다. 확인과정에서 도난 카드의
                  사용이나 타인 명의의 주문등 정상적인 주문이 아니라고 판단될 경우 임의로 주문을 보류 또는 취소할 수
                  있습니다.
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-purple-200">
                <h4 className="font-semibold text-purple-800 mb-2">무통장 입금</h4>
                <p className="text-sm text-gray-600 leading-relaxed mb-2">
                  상품 구매 대금은 PC뱅킹, 인터넷뱅킹, 텔레뱅킹 혹은 가까운 은행에서 직접 입금하시면 됩니다.
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• 주문시 입력한 입금자명과 실제입금자의 성명이 반드시 일치하여야 합니다</li>
                  <li>• 3일 이내로 입금을 하셔야 하며 입금되지 않은 주문은 자동취소 됩니다</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* 배송안내 */}
          <Card className="border-orange-200 bg-orange-50">
            <CardHeader>
              <CardTitle className="flex items-center text-orange-800">
                <Truck className="h-5 w-5 mr-2" />
                배송안내
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg border border-orange-200">
                    <h4 className="font-semibold text-orange-800 mb-2">배송 정보</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>
                        <strong>배송 방법:</strong> 택배
                      </li>
                      <li>
                        <strong>배송 지역:</strong> 전국지역
                      </li>
                      <li>
                        <strong>배송 비용:</strong> 조건부 무료 (50,000원 미만 시 3,000원)
                      </li>
                      <li>
                        <strong>배송 기간:</strong> 1일 ~ 3일
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg border border-orange-200">
                    <h4 className="font-semibold text-orange-800 mb-2">배송 안내사항</h4>
                    <ul className="space-y-1 text-sm text-gray-600">
                      <li>• 총 결제 금액이 50,000원 미만일 경우, 배송비 3,000원이 부과됩니다</li>
                      <li>• 제주도 및 도서산간지역은 3,000원 이상의 추가 비용이 발생합니다</li>
                      <li>• 당일발송: 오후 12시까지 주문 및 결제완료분</li>
                      <li>• 주문일로부터 3일 이내에 결제확인이 안된 주문 건은 자동 취소됩니다</li>
                      <li>• 장바구니에 담은 제품은 최대 3일간 저장됩니다</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 교환/반품안내 */}
          <Card className="border-red-200 bg-red-50">
            <CardHeader>
              <CardTitle className="flex items-center text-red-800">
                <RotateCcw className="h-5 w-5 mr-2" />
                교환/반품안내
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg border border-red-200">
                    <div className="flex items-center mb-2">
                      <MapPin className="h-4 w-4 text-red-600 mr-2" />
                      <h4 className="font-semibold text-red-800">반품 주소</h4>
                    </div>
                    <p className="text-sm text-gray-600">[04033] 서울특별시 마포구 잔다리로 58 서경빌딩 6층</p>
                  </div>

                  <div className="bg-white p-4 rounded-lg border border-green-200">
                    <div className="flex items-center mb-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                      <h4 className="font-semibold text-green-800">반품이 가능한 경우</h4>
                    </div>
                    <ul className="space-y-1 text-sm text-gray-600">
                      <li>• 계약내용에 관한 서면을 받은 날부터 7일 이내</li>
                      <li>• 공급받은 상품의 내용이 표시·광고 내용과 다른 경우 (상품 수령 후 3개월 이내)</li>
                    </ul>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg border border-red-200">
                    <div className="flex items-center mb-2">
                      <XCircle className="h-4 w-4 text-red-600 mr-2" />
                      <h4 className="font-semibold text-red-800">반품이 불가능한 경우</h4>
                    </div>
                    <ul className="space-y-1 text-sm text-gray-600">
                      <li>• 이용자에게 책임 있는 사유로 재화 등이 멸실 또는 훼손된 경우</li>
                      <li>• 이용자의 사용으로 재화의 가치가 현저히 감소한 경우</li>
                      <li>• 시간의 경과로 재판매가 곤란할 정도로 가치가 감소한 경우</li>
                      <li>• 복제가 가능한 재화등의 포장을 훼손한 경우</li>
                      <li>• 개별 주문 생산되는 재화 등</li>
                      <li>• 디지털 콘텐츠의 제공이 개시된 경우</li>
                    </ul>
                  </div>

                  <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                    <div className="flex items-start">
                      <AlertCircle className="h-4 w-4 text-yellow-600 mr-2 mt-0.5" />
                      <div>
                        <p className="text-sm text-yellow-800">
                          <strong>배송비 안내:</strong> 고객님의 마음이 바뀌어 교환, 반품을 하실 경우 상품반송 비용은
                          고객님께서 부담하셔야 합니다. (색상 교환, 사이즈 교환 등 포함)
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 환불안내 */}
          <Card className="border-indigo-200 bg-indigo-50">
            <CardHeader>
              <CardTitle className="flex items-center text-indigo-800">
                <RefreshCw className="h-5 w-5 mr-2" />
                환불안내
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-white p-4 rounded-lg border border-indigo-200">
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• 환불시 반품 확인여부를 확인한 후 3영업일 이내에 결제 금액을 환불해 드립니다</li>
                  <li>• 신용카드로 결제하신 경우는 신용카드 승인을 취소하여 결제 대금이 청구되지 않게 합니다</li>
                  <li>
                    • 신용카드 결제일자에 맞추어 대금이 청구될 수 있으며, 이 경우 익월 신용카드 대금청구시 카드사에서
                    환급처리됩니다
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* 기타안내 */}
          <Card className="border-yellow-200 bg-yellow-50">
            <CardHeader>
              <CardTitle className="flex items-center text-yellow-800">
                <Gift className="h-5 w-5 mr-2" />
                기타안내 (적립금 시스템)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white p-4 rounded-lg border border-yellow-200">
                  <h4 className="font-semibold text-yellow-800 mb-2">이용기간</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    주문으로 발생한 적립금은 구매확정일로부터 하루가 지나야 실제 사용 가능 적립금으로 변환됩니다.
                    구매확정 전에는 미가용 적립금으로 분류됩니다.
                  </p>
                </div>

                <div className="bg-white p-4 rounded-lg border border-yellow-200">
                  <h4 className="font-semibold text-yellow-800 mb-2">이용조건</h4>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>• 최소구매가능적립금: 0원</li>
                    <li>• 최대구매가능적립금: 한도제한없음</li>
                    <li>• 상품구매시 즉시 사용 가능</li>
                  </ul>
                </div>

                <div className="bg-white p-4 rounded-lg border border-yellow-200">
                  <h4 className="font-semibold text-yellow-800 mb-2">소멸조건</h4>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>• 주문취소/환불시 적립금 함께 취소</li>
                    <li>• 회원 탈퇴시 자동 소멸</li>
                    <li>• 최종 적립일로부터 3년간 미사용시 소멸</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 고객센터 정보 */}
          <Card className="bg-gradient-to-r from-blue-50 to-green-50 border-blue-200">
            <CardHeader>
              <CardTitle className="text-blue-800">추가 문의가 필요하신가요?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                    <Phone className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">전화 상담</p>
                    <p className="text-blue-600 font-medium">070-4304-7220</p>
                    <p className="text-sm text-gray-600">평일 10:00 ~ 17:00</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                    <Mail className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">이메일 문의</p>
                    <p className="text-green-600 font-medium">help@zenithworld.com</p>
                    <p className="text-sm text-gray-600">24시간 접수 가능</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                    <Clock className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">운영시간</p>
                    <p className="text-orange-600 font-medium">평일 10:00 ~ 17:00</p>
                    <p className="text-sm text-gray-600">점심시간 12:00 ~ 13:00</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
