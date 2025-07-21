"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import HeroSection from "@/components/sections/hero-section"
import TimeSaleSection from "@/components/sections/time-sale-section"
import FeaturedProducts from "@/components/sections/featured-products"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Award, ChevronRight, Crown, Zap, Gift, Instagram, Truck, Shield, Headphones, Building2 } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

const trendingBrands = [
  {
    id: 1,
    name: "GENTLE MONSTER",
    category: "아이웨어",
    image: "/placeholder.svg?height=120&width=120&text=GM",
    followers: 45200,
    isVerified: true,
    newProducts: 12,
  },
  {
    id: 2,
    name: "ADER ERROR",
    category: "스트리트웨어",
    image: "/placeholder.svg?height=120&width=120&text=AE",
    followers: 38900,
    isVerified: true,
    newProducts: 8,
  },
  {
    id: 3,
    name: "ANDERSSON BELL",
    category: "컨템포러리",
    image: "/placeholder.svg?height=120&width=120&text=AB",
    followers: 29400,
    isVerified: true,
    newProducts: 15,
  },
  {
    id: 4,
    name: "WOOYOUNGMI",
    category: "럭셔리",
    image: "/placeholder.svg?height=120&width=120&text=WY",
    followers: 22100,
    isVerified: true,
    newProducts: 6,
  },
  {
    id: 5,
    name: "SYSTEM",
    category: "미니멀",
    image: "/placeholder.svg?height=120&width=120&text=SYS",
    followers: 18700,
    isVerified: true,
    newProducts: 9,
  },
  {
    id: 6,
    name: "KIRSH",
    category: "캐주얼",
    image: "/placeholder.svg?height=120&width=120&text=KIR",
    followers: 33600,
    isVerified: true,
    newProducts: 11,
  },
]

const serviceFeatures = [
  {
    icon: Truck,
    title: "무료 배송",
    description: "5만원 이상 구매시 전국 무료배송",
    color: "text-blue-500",
  },
  {
    icon: Shield,
    title: "안전 결제",
    description: "SSL 보안 결제 시스템으로 안전하게",
    color: "text-green-500",
  },
  {
    icon: Building2,
    title: "입점 문의",
    description: "함께 성장 할 수 있는 기회",
    color: "text-blue-600",
    clickable: true,
  },
  {
    icon: Gift,
    title: "회원 혜택",
    description: "적립금과 쿠폰으로 더욱 저렴하게",
    color: "text-orange-500",
  },
]

export default function HomePage() {
  const router = useRouter()
  const [showBenefitsModal, setShowBenefitsModal] = useState(false)

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleLinkClick = (href: string) => {
    scrollToTop()
    router.push(href)
  }

  // 페이지 로드 시 스크롤 맨 위로
  useEffect(() => {
    scrollToTop()
  }, [])

  return (
    <div className="space-y-0">
      {/* Hero Section */}
      <HeroSection />

      {/* 메인배너와 타임세일 사이 간격 */}
      <div className="mt-6 md:mt-12" />

      {/* 타임세일 섹션 */}
      <TimeSaleSection />

      {/* 추천 상품 */}
      <FeaturedProducts />

      {/* 트렌딩 브랜드 */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">🔥 트렌딩 브랜드</h2>
              <p className="text-gray-600 text-lg">지금 가장 핫한 브랜드들을 만나보세요</p>
            </div>
            <Button variant="outline" onClick={() => handleLinkClick("/products")}>전체 브랜드 <ChevronRight className="w-4 h-4 ml-1" /></Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {trendingBrands.map((brand) => (
              <Card
                key={brand.id}
                className="group hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:-translate-y-2"
                onClick={() => handleLinkClick("/products")}
              >
                <CardContent className="p-6 text-center">
                  <div className="relative mb-4">
                    <img
                      src={brand.image || "/placeholder.svg"}
                      alt={brand.name}
                      className="w-16 h-16 mx-auto rounded-full object-cover"
                    />
                    {brand.isVerified && (
                      <Badge className="absolute -top-1 -right-1 w-6 h-6 p-0 bg-blue-500 rounded-full flex items-center justify-center">
                        <Award className="w-3 h-3" />
                      </Badge>
                    )}
                  </div>
                  <h3 className="font-bold text-sm mb-1 group-hover:text-blue-600 transition-colors">{brand.name}</h3>
                  <p className="text-xs text-gray-500 mb-2">{brand.category}</p>
                  <div className="flex items-center justify-center text-xs text-gray-500 mb-2">
                    <Users className="w-3 h-3 mr-1" />
                    {brand.followers.toLocaleString()}
                  </div>
                  {brand.newProducts > 0 && (
                    <Badge variant="secondary" className="text-xs">
                      신상 {brand.newProducts}개
                    </Badge>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 뉴스레터 & 커뮤니티 */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0 px-4 py-2">
              <Gift className="w-4 h-4 mr-2" />
              특별 혜택
            </Badge>
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              ZENITH WORLD 뉴스레터 구독
            </h2>
            <p className="text-xl text-gray-600 mb-10 leading-relaxed">
              신상품 소식과 독점 할인 혜택을 가장 먼저 받아보세요
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Instagram className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold mb-2">신상품 알림</h3>
                <p className="text-sm text-gray-600">새로운 상품 출시 소식</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold mb-2">특가 정보</h3>
                <p className="text-sm text-gray-600">한정 세일과 특별 할인</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Crown className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold mb-2">VIP 혜택</h3>
                <p className="text-sm text-gray-600">회원 전용 특별 혜택</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <input
                type="email"
                placeholder="이메일 주소를 입력하세요"
                className="flex-1 px-6 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl px-8"
                onClick={scrollToTop}
              >
                구독하기
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 서비스 특징 */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {serviceFeatures.map((feature, index) => (
              <Card
                key={index}
                className={`text-center hover:shadow-lg transition-shadow duration-300 ${
                  feature.title === "회원 혜택" || feature.title === "입점 문의"
                    ? "cursor-pointer hover:scale-105 transform transition-transform"
                    : ""
                }`}
                onClick={
                  feature.title === "회원 혜택"
                    ? () => setShowBenefitsModal(true)
                    : feature.title === "입점 문의"
                      ? () => handleLinkClick("/b2b-signup")
                      : undefined
                }
              >
                <CardContent className="p-6">
                  <feature.icon className={`w-12 h-12 mx-auto mb-4 ${feature.color}`} />
                  <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 회원 혜택 모달 */}
      <Dialog open={showBenefitsModal} onOpenChange={setShowBenefitsModal}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center mb-4">신규회원 가입혜택</DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">제니스월드 첫 방문을 진심으로 환영합니다!</h3>
              <p className="text-gray-600">회원가입만 하셔도 아래와 같이 네가지의 쿠폰을 드립니다.</p>
            </div>

            {/* 쿠폰 섹션 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* 3만원 쿠폰 */}
              <Card className="border-2 border-red-200 bg-red-50">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-red-600 mb-2">3만원 쿠폰</div>
                  <p className="text-sm text-gray-600">200,000원 이상 구매시 사용가능</p>
                </CardContent>
              </Card>

              {/* 2만원 쿠폰 */}
              <Card className="border-2 border-blue-200 bg-blue-50">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600 mb-2">2만원 쿠폰</div>
                  <p className="text-sm text-gray-600">100,000원 이상 구매시 사용가능</p>
                </CardContent>
              </Card>

              {/* 1만원 쿠폰 */}
              <Card className="border-2 border-green-200 bg-green-50">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-green-600 mb-2">1만원 쿠폰</div>
                  <p className="text-sm text-gray-600">50,000원 이상 구매시 사용가능</p>
                </CardContent>
              </Card>

              {/* 즉시할인 쿠폰 */}
              <Card className="border-2 border-purple-200 bg-purple-50">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-purple-600 mb-2">즉시할인 쿠폰 5%</div>
                  <p className="text-sm text-gray-600">쿠폰 1,2,3과 중복하여 사용가능</p>
                </CardContent>
              </Card>
            </div>

            {/* 특별 쿠폰 */}
            <Card className="border-2 border-orange-200 bg-gradient-to-r from-orange-50 to-yellow-50">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-orange-600 mb-2">특별쿠폰 10%</div>
                <p className="text-sm text-gray-600">쿠폰 1,2,3과 중복하여 사용불가</p>
                <Badge className="mt-2 bg-orange-500">LIMITED</Badge>
              </CardContent>
            </Card>

            {/* 회원가입 버튼 섹션 */}
            <div className="border-t pt-6">
              <div className="text-center space-y-4">
                <h4 className="text-lg font-semibold">지금 바로 회원가입하고 혜택을 받아보세요!</h4>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    onClick={() => {
                      setShowBenefitsModal(false)
                      handleLinkClick("/signup")
                    }}
                  >
                    회원가입하기
                  </Button>
                  <Button variant="outline" size="lg" onClick={() => setShowBenefitsModal(false)}>
                    나중에 하기
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
