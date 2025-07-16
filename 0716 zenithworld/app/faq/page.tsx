"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Home, HelpCircle, ShoppingCart, Truck, RotateCcw, User, Gift, Phone, Mail } from "lucide-react"

interface FAQ {
  id: string
  category: string
  question: string
  answer: string
  isPopular?: boolean
}

const faqData: FAQ[] = [
  // 회원가입/로그인
  {
    id: "1",
    category: "회원가입/로그인",
    question: "회원가입은 어떻게 하나요?",
    answer:
      "홈페이지 상단의 '회원가입' 버튼을 클릭하여 이용약관 및 개인정보처리방침에 동의한 후, 필수 정보를 입력하시면 됩니다. 가입 즉시 서비스를 무료로 이용하실 수 있습니다.",
    isPopular: true,
  },
  {
    id: "2",
    category: "회원가입/로그인",
    question: "비밀번호를 잊어버렸어요.",
    answer:
      "로그인 페이지에서 '비밀번호 찾기'를 클릭하시고, 가입 시 등록한 이메일 주소를 입력하시면 비밀번호 재설정 링크를 보내드립니다.",
  },
  {
    id: "3",
    category: "회원가입/로그인",
    question: "회원 탈퇴는 어떻게 하나요?",
    answer:
      "마이페이지 > 회원정보 수정에서 회원탈퇴를 신청하실 수 있습니다. 탈퇴 시 적립금은 자동으로 소멸되며, 개인정보는 관련 법령에 따라 처리됩니다.",
  },

  // 주문/결제
  {
    id: "4",
    category: "주문/결제",
    question: "주문은 어떻게 하나요?",
    answer:
      "상품 검색 → 장바구니 담기 → 로그인 또는 비회원 주문 → 주문서 작성 → 결제방법 선택 → 결제 완료 순으로 진행됩니다. 비회원 주문 시에는 주문번호를 꼭 메모해 두세요.",
    isPopular: true,
  },
  {
    id: "5",
    category: "주문/결제",
    question: "결제 방법은 어떤 것들이 있나요?",
    answer:
      "신용카드, 무통장입금, 실시간 계좌이체, 휴대폰 결제 등을 지원합니다. 고액결제 시 카드사에서 확인전화를 드릴 수 있습니다.",
  },
  {
    id: "6",
    category: "주문/결제",
    question: "무통장입금 후 입금확인은 언제 되나요?",
    answer:
      "평일 오전 10시부터 오후 5시까지 실시간으로 확인됩니다. 주문 시 입력한 입금자명과 실제 입금자명이 일치해야 하며, 3일 이내 입금하지 않으면 주문이 자동 취소됩니다.",
  },

  // 배송
  {
    id: "7",
    category: "배송",
    question: "배송비는 얼마인가요?",
    answer:
      "주문 금액이 50,000원 이상이면 무료배송이며, 50,000원 미만일 경우 3,000원의 배송비가 부과됩니다. 제주도 및 도서산간지역은 추가 배송비가 발생할 수 있습니다.",
    isPopular: true,
  },
  {
    id: "8",
    category: "배송",
    question: "배송기간은 얼마나 걸리나요?",
    answer:
      "평일 오후 12시까지 주문 및 결제 완료 시 당일 발송되며, 평균 1~3일 소요됩니다. 주말 및 공휴일에는 발송되지 않습니다.",
  },
  {
    id: "9",
    category: "배송",
    question: "배송지 변경이 가능한가요?",
    answer:
      "상품 발송 전까지는 마이페이지에서 배송지 변경이 가능합니다. 이미 발송된 상품은 배송지 변경이 불가능하니 주문 시 정확한 주소를 입력해 주세요.",
  },

  // 교환/반품
  {
    id: "10",
    category: "교환/반품",
    question: "교환/반품은 언제까지 가능한가요?",
    answer:
      "상품 수령 후 7일 이내에 신청 가능합니다. 단, 상품의 내용이 표시·광고와 다르거나 계약내용과 다를 경우 상품 수령 후 3개월 이내 또는 그 사실을 안 날로부터 30일 이내입니다.",
    isPopular: true,
  },
  {
    id: "11",
    category: "교환/반품",
    question: "교환/반품이 불가능한 경우가 있나요?",
    answer:
      "고객님의 사용으로 상품 가치가 현저히 감소한 경우, 시간 경과로 재판매가 곤란한 경우, 복제 가능한 상품의 포장을 훼손한 경우, 개별 주문 제작 상품 등은 교환/반품이 제한됩니다.",
  },
  {
    id: "12",
    category: "교환/반품",
    question: "교환/반품 배송비는 누가 부담하나요?",
    answer:
      "상품 하자나 오배송의 경우 판매자가 부담하며, 단순 변심의 경우 고객님께서 부담하셔야 합니다. 반품 주소: 서울특별시 마포구 잔다리로 58 서경빌딩 6층",
  },

  // 적립금/혜택
  {
    id: "13",
    category: "적립금/혜택",
    question: "적립금은 언제부터 사용할 수 있나요?",
    answer:
      "구매확정일로부터 하루가 지나야 실제 사용 가능한 적립금으로 변환됩니다. 구매확정 전에는 미가용 적립금으로 분류됩니다.",
  },
  {
    id: "14",
    category: "적립금/혜택",
    question: "적립금 사용에 제한이 있나요?",
    answer:
      "최소 사용 금액은 0원이며, 최대 사용 금액에는 제한이 없습니다. 단, 주문 취소나 환불 시 적립금도 함께 취소됩니다.",
  },
  {
    id: "15",
    category: "적립금/혜택",
    question: "적립금이 소멸되는 경우가 있나요?",
    answer: "회원 탈퇴 시 자동 소멸되며, 최종 적립금 발생일로부터 3년 동안 추가 적립이 없을 경우에도 소멸됩니다.",
  },

  // 기타
  {
    id: "16",
    category: "기타",
    question: "고객센터 운영시간은 어떻게 되나요?",
    answer:
      "평일 오전 10:00 ~ 오후 5:00 (점심시간: 오후 12:00 ~ 1:00)이며, 토·일·공휴일은 휴무입니다. 전화: 070-4304-7220, 이메일: help@zenithworld.com",
  },
  {
    id: "17",
    category: "기타",
    question: "상품 문의는 어떻게 하나요?",
    answer:
      "각 상품 페이지 하단의 '상품문의' 게시판을 이용하시거나, 고객센터로 직접 연락주시면 됩니다. 빠른 답변을 위해 주문번호를 함께 알려주세요.",
  },
]

const categories = [
  { name: "전체", icon: HelpCircle, color: "bg-blue-500" },
  { name: "회원가입/로그인", icon: User, color: "bg-green-500" },
  { name: "주문/결제", icon: ShoppingCart, color: "bg-purple-500" },
  { name: "배송", icon: Truck, color: "bg-orange-500" },
  { name: "교환/반품", icon: RotateCcw, color: "bg-red-500" },
  { name: "적립금/혜택", icon: Gift, color: "bg-yellow-500" },
  { name: "기타", icon: HelpCircle, color: "bg-gray-500" },
]

export default function FAQPage() {
  const [selectedCategory, setSelectedCategory] = useState("전체")
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [])

  const handleLinkClick = (href: string) => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const filteredFAQs =
    selectedCategory === "전체" ? faqData : faqData.filter((faq) => faq.category === selectedCategory)

  const popularFAQs = faqData.filter((faq) => faq.isPopular)

  if (!isMounted) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-8">
              {[...Array(7)].map((_, i) => (
                <div key={i} className="h-20 bg-gray-200 rounded"></div>
              ))}
            </div>
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-16 bg-gray-200 rounded"></div>
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
              <h1 className="text-3xl font-bold text-gray-900 mb-2">자주 묻는 질문</h1>
              <p className="text-gray-600">제니스월드 이용 중 궁금한 점을 빠르게 해결해보세요.</p>
            </div>
            <Button variant="outline" asChild>
              <Link href="/" onClick={() => handleLinkClick("/")}>
                <Home className="h-4 w-4 mr-2" />
                홈으로
              </Link>
            </Button>
          </div>
        </div>

        {/* 인기 FAQ */}
        <Card className="mb-8 border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center text-blue-800">
              <HelpCircle className="h-5 w-5 mr-2" />
              인기 FAQ
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {popularFAQs.map((faq) => (
                <div key={faq.id} className="bg-white p-4 rounded-lg border border-blue-200">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-gray-900 flex-1">{faq.question}</h3>
                    <Badge variant="secondary" className="ml-2 bg-blue-100 text-blue-800">
                      {faq.category}
                    </Badge>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 카테고리 필터 */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">카테고리별 FAQ</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {categories.map((category) => {
              const Icon = category.icon
              const isSelected = selectedCategory === category.name
              return (
                <button
                  key={category.name}
                  onClick={() => setSelectedCategory(category.name)}
                  className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                    isSelected
                      ? "border-blue-500 bg-blue-50 text-blue-700"
                      : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full ${category.color} flex items-center justify-center mx-auto mb-2`}
                  >
                    <Icon className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm font-medium">{category.name}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* FAQ 목록 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>{selectedCategory} FAQ</span>
              <Badge variant="outline">{filteredFAQs.length}개</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {filteredFAQs.length > 0 ? (
              <Accordion type="single" collapsible className="w-full">
                {filteredFAQs.map((faq) => (
                  <AccordionItem key={faq.id} value={faq.id}>
                    <AccordionTrigger className="text-left hover:no-underline">
                      <div className="flex items-start justify-between w-full pr-4">
                        <span className="font-medium">{faq.question}</span>
                        <div className="flex items-center space-x-2 ml-4">
                          {faq.isPopular && (
                            <Badge variant="secondary" className="bg-red-100 text-red-800 text-xs">
                              인기
                            </Badge>
                          )}
                          <Badge variant="outline" className="text-xs">
                            {faq.category}
                          </Badge>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="pt-2 pb-4 text-gray-600 leading-relaxed">{faq.answer}</div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            ) : (
              <div className="text-center py-12">
                <HelpCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">해당 카테고리에 FAQ가 없습니다.</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* 고객센터 정보 */}
        <Card className="mt-8 bg-gradient-to-r from-blue-50 to-green-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-blue-800">추가 문의가 필요하신가요?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
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
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
