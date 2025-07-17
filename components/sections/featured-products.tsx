"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, ShoppingCart, Heart, Eye } from "lucide-react"
import { useState } from "react"

const featuredProducts = [
  {
    id: 1,
    name: "프리미엄 무선 헤드폰",
    price: 299000,
    originalPrice: 399000,
    image: "https://images.pexels.com/photos/374870/pexels-photo-374870.jpeg?auto=compress&cs=tinysrgb&w=800",
    rating: 4.8,
    reviews: 234,
    badge: "베스트",
    discount: 25,
  },
  {
    id: 2,
    name: "스마트 워치 시리즈",
    price: 189000,
    originalPrice: 249000,
    image: "https://images.pexels.com/photos/267394/pexels-photo-267394.jpeg?auto=compress&cs=tinysrgb&w=800",
    rating: 4.9,
    reviews: 156,
    badge: "신상품",
    discount: 24,
  },
  {
    id: 3,
    name: "고급 가죽 백팩",
    price: 159000,
    originalPrice: 199000,
    image: "https://images.pexels.com/photos/322207/pexels-photo-322207.jpeg?auto=compress&cs=tinysrgb&w=800",
    rating: 4.7,
    reviews: 89,
    badge: "한정판",
    discount: 20,
  },
  {
    id: 4,
    name: "미니멀 데스크 램프",
    price: 79000,
    originalPrice: 99000,
    image: "https://images.pexels.com/photos/205316/pexels-photo-205316.jpeg?auto=compress&cs=tinysrgb&w=800",
    rating: 4.6,
    reviews: 67,
    badge: "인기",
    discount: 20,
  },
  {
    id: 5,
    name: "블루투스 스피커",
    price: 129000,
    originalPrice: 159000,
    image: "https://images.pexels.com/photos/63703/pexels-photo-63703.jpeg?auto=compress&cs=tinysrgb&w=800",
    rating: 4.8,
    reviews: 123,
    badge: "추천",
    discount: 19,
  },
  {
    id: 6,
    name: "프리미엄 커피 머신",
    price: 449000,
    originalPrice: 549000,
    image: "https://images.pexels.com/photos/324028/pexels-photo-324028.jpeg?auto=compress&cs=tinysrgb&w=800",
    rating: 4.9,
    reviews: 78,
    badge: "럭셔리",
    discount: 18,
  },
  {
    id: 7,
    name: "스마트 홈 카메라",
    price: 99000,
    originalPrice: 129000,
    image: "https://images.pexels.com/photos/1027130/pexels-photo-1027130.jpeg?auto=compress&cs=tinysrgb&w=800",
    rating: 4.5,
    reviews: 54,
    badge: "홈IoT",
    discount: 23,
  },
  {
    id: 8,
    name: "프리미엄 전동 칫솔",
    price: 69000,
    originalPrice: 99000,
    image: "https://images.pexels.com/photos/3755761/pexels-photo-3755761.jpeg?auto=compress&cs=tinysrgb&w=800",
    rating: 4.7,
    reviews: 88,
    badge: "위생",
    discount: 30,
  },
  {
    id: 9,
    name: "고속 무선 충전기",
    price: 39000,
    originalPrice: 59000,
    image: "https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&cs=tinysrgb&w=800",
    rating: 4.4,
    reviews: 41,
    badge: "가전",
    discount: 34,
  },
  {
    id: 10,
    name: "프리미엄 텀블러",
    price: 29000,
    originalPrice: 39000,
    image: "https://images.pexels.com/photos/416528/pexels-photo-416528.jpeg?auto=compress&cs=tinysrgb&w=800",
    rating: 4.8,
    reviews: 112,
    badge: "라이프",
    discount: 26,
  },
  {
    id: 11,
    name: "스마트 체중계",
    price: 59000,
    originalPrice: 89000,
    image: "https://images.pexels.com/photos/39671/weight-scale-39671.jpeg?auto=compress&cs=tinysrgb&w=800",
    rating: 4.6,
    reviews: 73,
    badge: "헬스",
    discount: 34,
  },
  {
    id: 12,
    name: "프리미엄 에어프라이어",
    price: 159000,
    originalPrice: 199000,
    image: "https://images.pexels.com/photos/461382/pexels-photo-461382.jpeg?auto=compress&cs=tinysrgb&w=800",
    rating: 4.9,
    reviews: 95,
    badge: "주방",
    discount: 20,
  },
  {
    id: 13,
    name: "스마트 플러그",
    price: 19000,
    originalPrice: 29000,
    image: "https://images.pexels.com/photos/276528/pexels-photo-276528.jpeg?auto=compress&cs=tinysrgb&w=800",
    rating: 4.3,
    reviews: 38,
    badge: "IoT",
    discount: 34,
  },
  {
    id: 14,
    name: "프리미엄 블렌더",
    price: 129000,
    originalPrice: 179000,
    image: "https://images.pexels.com/photos/461382/pexels-photo-461382.jpeg?auto=compress&cs=tinysrgb&w=800",
    rating: 4.7,
    reviews: 67,
    badge: "주방",
    discount: 28,
  },
  {
    id: 15,
    name: "스마트 무드등",
    price: 39000,
    originalPrice: 59000,
    image: "https://images.pexels.com/photos/716398/pexels-photo-716398.jpeg?auto=compress&cs=tinysrgb&w=800",
    rating: 4.5,
    reviews: 52,
    badge: "인테리어",
    discount: 34,
  },
  {
    id: 16,
    name: "★DIY 선반 1위 ★ 홈던트하우스 간편 조립식 인테리어 선반 행거",
    price: 59000,
    originalPrice: 89000,
    image: "/path/to/your/uploaded/image.jpg",
    rating: 4.9,
    reviews: 210,
    badge: "인기",
    discount: 34,
  },
]

export default function FeaturedProducts() {
  const router = useRouter()
  const [visibleCount, setVisibleCount] = useState(6)

  const formatPrice = (price: number) => {
    return price.toLocaleString("ko-KR")
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleProductClick = (productId: number) => {
    scrollToTop()
    router.push(`/products/${productId}`)
  }

  const handleMoreProductsClick = () => {
    scrollToTop()
    router.push("/products")
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">추천 상품</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">엄선된 인기 상품들을 특별한 가격으로 만나보세요</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.slice(0, visibleCount).map((product) => (
            <Card
              key={product.id}
              className="group overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
              onClick={() => handleProductClick(product.id)}
            >
              <div className="relative overflow-hidden">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-blue-500 text-white">{product.badge}</Badge>
                </div>
                <div className="absolute top-4 right-4">
                  <div className="bg-red-500 text-white px-2 py-1 rounded text-sm font-bold">-{product.discount}%</div>
                </div>
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="flex space-x-2">
                    <Button size="sm" variant="secondary" className="bg-white/90 hover:bg-white">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="secondary" className="bg-white/90 hover:bg-white">
                      <Heart className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-2 group-hover:text-blue-600 transition-colors">
                  {product.name}
                </h3>

                <div className="flex items-center mb-3">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-600">
                    {product.rating} ({product.reviews})
                  </span>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-2xl font-bold text-blue-600">{formatPrice(product.price)}원</span>
                    <span className="ml-2 text-sm text-gray-500 line-through">
                      {formatPrice(product.originalPrice)}원
                    </span>
                  </div>
                </div>
              </CardContent>

              <div className="px-6 pb-6">
                <Button
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={(e) => {
                    e.stopPropagation()
                    scrollToTop()
                  }}
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  장바구니 담기
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {visibleCount < featuredProducts.length && (
          <div className="text-center mt-12">
            <Button
              variant="outline"
              size="lg"
              className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white bg-transparent"
              onClick={() => setVisibleCount((prev) => prev + 6)}
            >
              더 많은 상품 보기
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
