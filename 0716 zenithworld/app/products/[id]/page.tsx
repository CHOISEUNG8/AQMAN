"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, ShoppingCart, Heart, Share2, Truck, Shield, RotateCcw, ChevronLeft, Plus, Minus } from "lucide-react"

// 상품 데이터 (실제로는 API에서 가져올 것)
const productData = {
  1: {
    id: 1,
    name: "무선 블루투스 이어폰 프리미엄",
    price: 89000,
    originalPrice: 129000,
    images: [
      "/placeholder.svg?height=400&width=400&text=이어폰1",
      "/placeholder.svg?height=400&width=400&text=이어폰2",
      "/placeholder.svg?height=400&width=400&text=이어폰3",
      "/placeholder.svg?height=400&width=400&text=이어폰4",
    ],
    rating: 4.8,
    reviews: 1234,
    discount: 31,
    category: "appliances",
    brand: "TechSound",
    inStock: true,
    stockCount: 47,
    description: "최신 노이즈 캔슬링 기술과 프리미엄 사운드 품질을 자랑하는 무선 블루투스 이어폰입니다.",
    features: [
      "액티브 노이즈 캔슬링",
      "30시간 배터리 수명",
      "IPX7 방수 등급",
      "고해상도 오디오 지원",
      "터치 컨트롤",
      "빠른 충전 (15분 충전으로 3시간 사용)",
    ],
    specifications: {
      "드라이버 크기": "10mm",
      "주파수 응답": "20Hz - 20kHz",
      "배터리 수명": "30시간 (케이스 포함)",
      "충전 시간": "1.5시간",
      연결: "블루투스 5.2",
      "방수 등급": "IPX7",
      무게: "5.2g (이어폰 하나당)",
    },
    shipping: {
      free: true,
      estimatedDays: "1-2일",
      regions: ["전국"],
    },
    warranty: "1년 품질보증",
    returnPolicy: "7일 무료 반품",
    isNew: false,
  },
  2: {
    id: "2",
    name: "iPhone 15 Pro",
    brand: "Apple",
    price: 1290000,
    originalPrice: 1390000,
    rating: 4.8,
    reviews: 1234,
    images: [
      "/placeholder.svg?height=500&width=500",
      "/placeholder.svg?height=500&width=500",
      "/placeholder.svg?height=500&width=500",
    ],
    category: "smartphone",
    inStock: true,
    isNew: true,
    discount: 7,
    description: "혁신적인 티타늄 디자인과 강력한 A17 Pro 칩을 탑재한 iPhone 15 Pro입니다.",
    features: ["6.1인치 Super Retina XDR 디스플레이", "A17 Pro 칩", "Pro 카메라 시스템", "액션 버튼", "USB-C 커넥터"],
    specifications: {
      디스플레이: "6.1인치 Super Retina XDR",
      칩: "A17 Pro",
      카메라: "48MP 메인 + 12MP 초광각 + 12MP 망원",
      배터리: "최대 23시간 비디오 재생",
      저장용량: "128GB, 256GB, 512GB, 1TB",
      색상: "내추럴 티타늄, 블루 티타늄, 화이트 티타늄, 블랙 티타늄",
    },
  },
  // 다른 상품들도 추가...
}

const reviews = [
  {
    id: 1,
    user: "김**",
    rating: 5,
    date: "2024-01-15",
    content: "음질이 정말 좋고 노이즈 캔슬링 기능이 훌륭합니다. 배터리도 오래가서 만족스러워요!",
    helpful: 23,
    images: ["/placeholder.svg?height=100&width=100&text=리뷰1"],
    verified: true,
  },
  {
    id: 2,
    user: "이**",
    rating: 4,
    date: "2024-01-10",
    content: "가격 대비 성능이 좋습니다. 다만 케이스가 조금 큰 편이에요.",
    helpful: 15,
    images: [],
    verified: true,
  },
  {
    id: 3,
    user: "박**",
    rating: 5,
    date: "2024-01-08",
    content: "디자인도 예쁘고 착용감도 편안합니다. 추천해요!",
    helpful: 8,
    images: ["/placeholder.svg?height=100&width=100&text=리뷰2", "/placeholder.svg?height=100&width=100&text=리뷰3"],
    verified: false,
  },
]

const relatedProducts = [
  {
    id: 2,
    name: "프리미엄 가죽 백팩",
    price: 65000,
    originalPrice: 85000,
    image: "/placeholder.svg?height=200&width=200&text=백팩",
    rating: 4.6,
    discount: 24,
  },
  {
    id: 3,
    name: "스마트 워치 GPS",
    price: 199000,
    originalPrice: 249000,
    image: "/placeholder.svg?height=200&width=200&text=스마트워치",
    rating: 4.9,
    discount: 20,
  },
  {
    id: 4,
    name: "아로마 홈 디퓨저",
    price: 45000,
    originalPrice: 59000,
    image: "/placeholder.svg?height=200&width=200&text=디퓨저",
    rating: 4.7,
    discount: 24,
  },
  {
    id: 5,
    name: "운동화 러닝화",
    price: 120000,
    originalPrice: 150000,
    image: "/placeholder.svg?height=200&width=200&text=운동화",
    rating: 4.5,
    discount: 20,
  },
]

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const productId = Number(params.id)
  const product = productData[productId as keyof typeof productData]
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    // 로그인 상태 확인
    const cookieToken = document.cookie.includes("token=") || document.cookie.includes("auth-token=")
    const localToken = localStorage.getItem("auth-token")
    setIsLoggedIn(cookieToken || !!localToken)
  }, [])

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">상품을 찾을 수 없습니다</h1>
          <p className="text-gray-600 mb-4">요청하신 상품이 존재하지 않거나 삭제되었습니다.</p>
          <Button asChild>
            <a href="/products">상품 목록으로 돌아가기</a>
          </Button>
        </div>
      </div>
    )
  }

  const addToCart = () => {
    // 로그인하지 않은 경우 로그인 페이지로 이동
    if (!isLoggedIn) {
      alert("장바구니를 이용하려면 로그인이 필요합니다.")
      window.location.href = "/login"
      return
    }

    const cartItem = {
      id: product.id.toString(),
      name: product.name,
      price: product.price,
      quantity: quantity,
      addedAt: new Date().getTime(),
      image: product.images[0],
      brand: product.brand,
    }

    // Get existing cart items
    const existingCartItems = JSON.parse(localStorage.getItem("cartItems") || "[]")

    // Check if item already exists
    const existingItemIndex = existingCartItems.findIndex((item: any) => item.id === cartItem.id)

    if (existingItemIndex >= 0) {
      // Update quantity if item exists
      existingCartItems[existingItemIndex].quantity += quantity
      existingCartItems[existingItemIndex].addedAt = new Date().getTime() // Update timestamp
    } else {
      // Add new item
      existingCartItems.push(cartItem)
    }

    // Save to localStorage
    localStorage.setItem("cartItems", JSON.stringify(existingCartItems))

    // Dispatch custom event to notify header
    window.dispatchEvent(new CustomEvent("cartUpdated"))

    // Show success message (you can add toast notification here)
    alert(`${product.name}이(가) 장바구니에 추가되었습니다!`)
  }

  const buyNow = () => {
    // 로그인하지 않은 경우 로그인 페이지로 이동
    if (!isLoggedIn) {
      alert("구매하려면 로그인이 필요합니다.")
      window.location.href = "/login"
      return
    }

    addToCart()
    // Then redirect to checkout or cart page
    window.location.href = "/cart"
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* 뒤로가기 버튼 */}
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="mb-6 hover:bg-blue-50 transition-colors duration-200"
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          뒤로가기
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* 상품 이미지 */}
          <div className="space-y-4">
            <div className="relative aspect-square bg-white rounded-2xl overflow-hidden shadow-lg">
              <img
                src={product.images[selectedImage] || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.isNew && <Badge className="absolute top-4 left-4 bg-green-500">NEW</Badge>}
              {product.discount > 0 && (
                <Badge className="absolute top-4 right-4 bg-red-500 text-white text-lg px-3 py-1">
                  {product.discount}% OFF
                </Badge>
              )}
            </div>

            {/* 썸네일 이미지 */}
            {product.images.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                      selectedImage === index ? "border-blue-500 shadow-md" : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 상품 정보 */}
          <div className="space-y-6">
            <div>
              <p className="text-gray-500 mb-2">{product.brand}</p>
              <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{product.rating}</span>
                </div>
                <span className="text-gray-500">({product.reviews.toLocaleString()} 리뷰)</span>
              </div>
            </div>

            <div className="space-y-2">
              {product.originalPrice > product.price && (
                <p className="text-xl text-gray-500 line-through">{product.originalPrice.toLocaleString()}원</p>
              )}
              <p className="text-3xl font-bold text-blue-600">{product.price.toLocaleString()}원</p>
            </div>

            <p className="text-gray-600">{product.description}</p>

            {/* 수량 선택 */}
            <div className="flex items-center gap-4">
              <span className="font-medium">수량:</span>
              <div className="flex items-center border rounded-lg">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="px-4 py-2 font-medium">{quantity}</span>
                <Button variant="ghost" size="sm" onClick={() => setQuantity(quantity + 1)}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* 액션 버튼 */}
            <div className="space-y-3">
              <div className="flex gap-3">
                <Button className="flex-1" size="lg" onClick={addToCart} disabled={!product.inStock}>
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  {product.inStock ? "장바구니 담기" : "품절"}
                </Button>
                <Button variant="outline" size="lg">
                  <Heart className="h-5 w-5" />
                </Button>
                <Button variant="outline" size="lg">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
              <Button
                className="w-full bg-transparent"
                size="lg"
                variant="outline"
                onClick={buyNow}
                disabled={!product.inStock}
              >
                바로 구매하기
              </Button>
            </div>

            {/* 배송 정보 */}
            <div className="space-y-3 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Truck className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="font-medium">무료배송</p>
                  <p className="text-sm text-gray-600">50,000원 이상 구매 시</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="h-5 w-5 text-green-600" />
                <div>
                  <p className="font-medium">품질보증</p>
                  <p className="text-sm text-gray-600">정품 보장 및 A/S 지원</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <RotateCcw className="h-5 w-5 text-orange-600" />
                <div>
                  <p className="font-medium">교환/반품</p>
                  <p className="text-sm text-gray-600">7일 이내 무료 교환/반품</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 상품 상세 정보 탭 */}
        <Card className="mb-12">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="description">상품설명</TabsTrigger>
              <TabsTrigger value="specifications">상품정보</TabsTrigger>
              <TabsTrigger value="reviews">리뷰</TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">주요 특징</h3>
                  <ul className="space-y-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-600 rounded-full" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="specifications" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">제품 사양</h3>
                  <div className="space-y-4">
                    {Object.entries(product.specifications).map(([key, value], index) => (
                      <div key={index}>
                        <div className="flex justify-between py-3">
                          <span className="font-medium text-gray-700">{key}</span>
                          <span className="text-gray-600">{value}</span>
                        </div>
                        {index < Object.entries(product.specifications).length - 1 && <Separator />}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">고객 리뷰</h3>
                  <div className="text-center py-8 text-gray-500">리뷰 기능은 준비 중입니다.</div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </Card>

        {/* 관련 상품 */}
        <div>
          <h2 className="text-2xl font-bold mb-8">관련 상품</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <Card
                key={relatedProduct.id}
                className="group hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
                onClick={() => router.push(`/products/${relatedProduct.id}`)}
              >
                <CardHeader className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img
                      src={relatedProduct.image || "/placeholder.svg"}
                      alt={relatedProduct.name}
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    {relatedProduct.discount > 0 && (
                      <Badge className="absolute top-2 left-2 bg-red-500">{relatedProduct.discount}% OFF</Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <CardTitle className="text-lg mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {relatedProduct.name}
                  </CardTitle>
                  <div className="flex items-center mb-3">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm ml-1">{relatedProduct.rating}</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-xl font-bold text-blue-600">{relatedProduct.price.toLocaleString()}원</span>
                    </div>
                    {relatedProduct.originalPrice > relatedProduct.price && (
                      <span className="text-sm text-gray-500 line-through">
                        {relatedProduct.originalPrice.toLocaleString()}원
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
