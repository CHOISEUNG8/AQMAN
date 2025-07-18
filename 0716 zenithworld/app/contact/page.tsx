"use client"

import type React from "react"
import { useEffect } from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowLeft,
  MessageCircle,
  Shield,
  User,
  Building,
  CreditCard,
  Package,
  RefreshCw,
} from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    category: "",
    subject: "",
    message: "",
  })

  // 페이지 로드 시 상단으로 스크롤
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // 실제로는 서버로 전송
    alert("문의가 접수되었습니다. 빠른 시일 내에 답변드리겠습니다.")
    setFormData({
      name: "",
      email: "",
      phone: "",
      category: "",
      subject: "",
      message: "",
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center gap-4 mb-6">
            <Button variant="outline" size="sm" asChild className="bg-white/80 backdrop-blur-sm">
              <Link href="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                홈으로
              </Link>
            </Button>
            <div className="h-6 w-px bg-border"></div>
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              <MessageCircle className="w-3 h-3 mr-1" />
              고객센터
            </Badge>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent mb-4">
            고객센터
          </h1>
          <p className="text-xl text-muted-foreground">
            궁금한 점이 있으시면 언제든지 문의해 주세요. 친절하게 도와드리겠습니다.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 연락처 정보 */}
          <div className="lg:col-span-1 space-y-6">
            {/* 기본 연락처 */}
            <Card className="shadow-medium border-0 bg-white/90 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg">
                <CardTitle className="text-xl text-slate-900 flex items-center gap-2">
                  <Phone className="w-5 h-5 text-primary" />
                  연락처 정보
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <p className="font-semibold text-slate-900">대표전화</p>
                    <p className="text-primary font-bold text-lg">070-4304-7220</p>
                    <p className="text-sm text-slate-600">평일 09:00 - 18:00</p>
                  </div>
                </div>

                <Separator />

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <p className="font-semibold text-slate-900">이메일</p>
                    <p className="text-slate-700">help@zenithworld.co.kr</p>
                    <p className="text-sm text-slate-600">24시간 접수 가능</p>
                  </div>
                </div>

                <Separator />

                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <p className="font-semibold text-slate-900">주소</p>
                    <p className="text-slate-700">서울특별시 마포구 잔다리로 58</p>
                    <p className="text-slate-700">서경빌딩 6층</p>
                  </div>
                </div>

                <Separator />

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <p className="font-semibold text-slate-900">운영시간</p>
                    <p className="text-slate-700">평일: 09:00 - 18:00</p>
                    <p className="text-slate-700">토요일: 09:00 - 13:00</p>
                    <p className="text-slate-600 text-sm">일요일 및 공휴일 휴무</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 문의 유형별 안내 */}
            <Card className="shadow-medium border-0 bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg text-slate-900">문의 유형별 안내</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-3">
                {[
                  { icon: Shield, title: "개인정보 문의", desc: "개인정보 처리, 수정, 삭제 관련" },
                  { icon: Package, title: "주문/배송 문의", desc: "주문 확인, 배송 조회, 교환/환불" },
                  { icon: CreditCard, title: "결제 문의", desc: "결제 오류, 환불, 영수증 발급" },
                  { icon: User, title: "회원 문의", desc: "회원가입, 로그인, 정보 수정" },
                  { icon: Building, title: "기타 문의", desc: "서비스 이용, 제휴, 기타 문의" },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    <item.icon className="w-5 h-5 text-primary mt-1" />
                    <div>
                      <p className="font-medium text-slate-800">{item.title}</p>
                      <p className="text-sm text-slate-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* 문의 양식 */}
          <div className="lg:col-span-2">
            <Card className="shadow-medium border-0 bg-white/90 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-t-lg">
                <CardTitle className="text-2xl text-slate-900">문의하기</CardTitle>
                <CardDescription className="text-base">
                  아래 양식을 작성해 주시면 빠른 시일 내에 답변드리겠습니다.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                        이름 <span className="text-red-500">*</span>
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="이름을 입력해 주세요"
                        className="bg-white"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                        이메일 <span className="text-red-500">*</span>
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="이메일을 입력해 주세요"
                        className="bg-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-2">
                        연락처
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="연락처를 입력해 주세요"
                        className="bg-white"
                      />
                    </div>
                    <div>
                      <label htmlFor="category" className="block text-sm font-medium text-slate-700 mb-2">
                        문의 유형 <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="category"
                        name="category"
                        required
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-input bg-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                      >
                        <option value="">문의 유형을 선택해 주세요</option>
                        <option value="privacy">개인정보 문의</option>
                        <option value="order">주문/배송 문의</option>
                        <option value="payment">결제 문의</option>
                        <option value="member">회원 문의</option>
                        <option value="product">상품 문의</option>
                        <option value="food">식품</option>
                        <option value="stationery">문구/완구</option>
                        <option value="other">기타 문의</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-slate-700 mb-2">
                      제목 <span className="text-red-500">*</span>
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="문의 제목을 입력해 주세요"
                      className="bg-white"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">
                      문의 내용 <span className="text-red-500">*</span>
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="문의 내용을 자세히 입력해 주세요"
                      rows={6}
                      className="bg-white resize-none"
                    />
                  </div>

                  <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <strong>개인정보 수집 및 이용 동의</strong>
                    </p>
                    <p className="text-sm text-blue-700 mt-1">
                      문의 처리를 위해 개인정보를 수집하며, 문의 처리 완료 후 즉시 파기됩니다.
                    </p>
                  </div>

                  <div className="flex gap-4">
                    <Button
                      type="submit"
                      className="flex-1 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
                    >
                      문의 접수
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() =>
                        setFormData({
                          name: "",
                          email: "",
                          phone: "",
                          category: "",
                          subject: "",
                          message: "",
                        })
                      }
                    >
                      <RefreshCw className="w-4 h-4 mr-2" />
                      초기화
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ 섹션 */}
        <div className="mt-12">
          <Card className="shadow-medium border-0 bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl text-slate-900">자주 묻는 질문</CardTitle>
              <CardDescription>자주 묻는 질문들을 확인해 보세요. 빠른 해결책을 찾을 수 있습니다.</CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    q: "주문 취소는 어떻게 하나요?",
                    a: "마이페이지 > 주문내역에서 배송 준비 중 상태일 때 취소 가능합니다.",
                  },
                  {
                    q: "배송비는 얼마인가요?",
                    a: "5만원 이상 구매 시 무료배송, 미만 시 3,000원의 배송비가 부과됩니다.",
                  },
                  {
                    q: "교환/환불은 언제까지 가능한가요?",
                    a: "상품 수령 후 7일 이내에 신청 가능하며, 상품 상태가 양호해야 합니다.",
                  },
                  {
                    q: "회원가입 혜택이 있나요?",
                    a: "신규 회원가입 시 5,000원 적립금과 10% 할인 쿠폰을 드립니다.",
                  },
                  {
                    q: "개인정보는 어떻게 관리되나요?",
                    a: "개인정보보호법에 따라 안전하게 암호화하여 보관하며, 목적 달성 시 즉시 파기합니다.",
                  },
                  {
                    q: "적립금은 언제 사용할 수 있나요?",
                    a: "적립금은 적립일로부터 1년간 유효하며, 1,000원 이상부터 사용 가능합니다.",
                  },
                ].map((faq, index) => (
                  <div
                    key={index}
                    className="p-4 border border-slate-200 rounded-lg hover:border-primary/30 transition-colors"
                  >
                    <h4 className="font-semibold text-slate-900 mb-2">{faq.q}</h4>
                    <p className="text-slate-600 text-sm">{faq.a}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
