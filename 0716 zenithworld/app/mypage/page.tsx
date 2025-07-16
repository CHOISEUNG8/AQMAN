"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, Package, Heart, CreditCard, Settings, ShoppingBag, Truck, CheckCircle, Clock, Star, LogIn } from "lucide-react"
import { useAuth } from "../contexts/auth-context"
import Link from "next/link"

const orderHistory = [
  {
    id: "ZW202507110001",
    date: "2024-01-15",
    status: "delivered",
    total: 156000,
    items: [
      { name: "무선 블루투스 이어폰", quantity: 1, price: 89000 },
      { name: "프리미엄 백팩", quantity: 1, price: 67000 },
    ],
  },
  {
    id: "ZW202507110002",
    date: "2024-01-20",
    status: "shipping",
    total: 199000,
    items: [{ name: "스마트 워치 GPS", quantity: 1, price: 199000 }],
  },
  {
    id: "ZW202507110003",
    date: "2024-01-25",
    status: "processing",
    total: 45000,
    items: [{ name: "아로마 홈 디퓨저", quantity: 1, price: 45000 }],
  },
]

const wishlistItems = [
  {
    id: 1,
    name: "게이밍 키보드",
    price: 129000,
    originalPrice: 159000,
    image: "/placeholder.svg?height=100&width=100&text=키보드",
    inStock: true,
  },
  {
    id: 2,
    name: "무선 마우스",
    price: 65000,
    originalPrice: 85000,
    image: "/placeholder.svg?height=100&width=100&text=마우스",
    inStock: false,
  },
  {
    id: 3,
    name: "모니터 스탠드",
    price: 89000,
    originalPrice: 109000,
    image: "/placeholder.svg?height=100&width=100&text=스탠드",
    inStock: true,
  },
]

const getStatusBadge = (status: string) => {
  switch (status) {
    case "delivered":
      return (
        <Badge className="bg-green-500">
          <CheckCircle className="h-3 w-3 mr-1" />
          배송완료
        </Badge>
      )
    case "shipping":
      return (
        <Badge className="bg-blue-500">
          <Truck className="h-3 w-3 mr-1" />
          배송중
        </Badge>
      )
    case "processing":
      return (
        <Badge className="bg-yellow-500">
          <Clock className="h-3 w-3 mr-1" />
          처리중
        </Badge>
      )
    default:
      return <Badge variant="secondary">{status}</Badge>
  }
}

export default function MyPage() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    joinDate: "",
  })
  const router = useRouter()
  const { user } = useAuth()

  // 로그인 상태 확인 - user가 없을 때 리다이렉트
  useEffect(() => {
    if (user === null) {
      router.push("/login")
    }
  }, [user, router])

  // user 정보가 있을 때 formData 업데이트 (adminId 기준)
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        phone: "010-1234-5678",
        joinDate: "2023-06-15",
      })
    }
  }, [user])

  // 사용자가 없을 때는 아무것도 표시하지 않음 (리다이렉트 중)
  if (!user) {
    return null
  }

  const displayName =
    (user.name && typeof user.name === "string" && user.name.trim() !== "") ? user.name : user.adminId;

  const userInfo = {
    name: displayName,
    email: user.adminId + "@example.com",
    phone: "010-1234-5678",
    membershipLevel: "VIP",
    joinDate: "2023-06-15",
    totalOrders: 15,
    totalSpent: 2340000,
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const membershipProgress = (userInfo.totalSpent / 3000000) * 100

  const handleLinkClick = (path: string) => {
    // 링크 클릭 시 수행할 작업
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center space-x-4 mb-8">
          <Avatar className="h-16 w-16">
            <AvatarImage src="/placeholder.svg?height=64&width=64&text=User" />
            <AvatarFallback>{displayName}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold">{displayName}님</h1>
            <p className="text-muted-foreground">{userInfo.email}</p>
            <Badge variant="secondary" className="mt-1">
              {userInfo.membershipLevel} 회원
            </Badge>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="dashboard" className="flex items-center space-x-2">
              <User className="h-4 w-4" />
              <span>대시보드</span>
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex items-center space-x-2">
              <Package className="h-4 w-4" />
              <span>주문내역</span>
            </TabsTrigger>
            <TabsTrigger value="wishlist" className="flex items-center space-x-2">
              <Heart className="h-4 w-4" />
              <span>찜목록</span>
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center space-x-2">
              <Settings className="h-4 w-4" />
              <span>개인정보</span>
            </TabsTrigger>
            <TabsTrigger value="membership" className="flex items-center space-x-2">
              <Star className="h-4 w-4" />
              <span>멤버십</span>
            </TabsTrigger>
          </TabsList>

          {/* Dashboard */}
          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">총 주문</CardTitle>
                  <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{userInfo.totalOrders}건</div>
                  <p className="text-xs text-muted-foreground">지난달 대비 +2건</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">총 구매금액</CardTitle>
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{userInfo.totalSpent.toLocaleString()}원</div>
                  <p className="text-xs text-muted-foreground">지난달 대비 +15%</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">찜한 상품</CardTitle>
                  <Heart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{wishlistItems.length}개</div>
                  <p className="text-xs text-muted-foreground">새로운 할인 상품 1개</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>최근 주문</CardTitle>
                  <CardDescription>최근 3개월간의 주문 내역입니다</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {orderHistory.slice(0, 3).map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">{order.id}</div>
                        <div className="text-sm text-muted-foreground">{order.date}</div>
                      </div>
                      <div className="text-right">
                        {getStatusBadge(order.status)}
                        <div className="text-sm font-medium mt-1">{order.total.toLocaleString()}원</div>
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full bg-transparent">
                    전체 주문내역 보기
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>멤버십 혜택</CardTitle>
                  <CardDescription>다음 등급까지 {(3000000 - userInfo.totalSpent).toLocaleString()}원</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>현재: {userInfo.membershipLevel}</span>
                      <span>다음: VVIP</span>
                    </div>
                    <Progress value={membershipProgress} className="h-2" />
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span>무료배송</span>
                      <Badge variant="secondary">적용중</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>적립률</span>
                      <span className="font-medium">3%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>생일 쿠폰</span>
                      <Badge variant="secondary">사용가능</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Orders */}
          <TabsContent value="orders" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>주문 내역</CardTitle>
                <CardDescription>전체 주문 내역을 확인하실 수 있습니다</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {orderHistory.map((order) => (
                  <div key={order.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-semibold">{order.id}</h3>
                        <p className="text-sm text-muted-foreground">{order.date}</p>
                      </div>
                      <div className="text-right">
                        {getStatusBadge(order.status)}
                        <p className="text-lg font-bold mt-1">{order.total.toLocaleString()}원</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex justify-between text-sm">
                          <span>
                            {item.name} x {item.quantity}
                          </span>
                          <span>{item.price.toLocaleString()}원</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex space-x-2 mt-4">
                      <Button variant="outline" size="sm">
                        주문 상세
                      </Button>
                      {order.status === "delivered" && (
                        <Button variant="outline" size="sm">
                          리뷰 작성
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Wishlist */}
          <TabsContent value="wishlist" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>찜한 상품</CardTitle>
                <CardDescription>관심 있는 상품들을 모아보세요</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {wishlistItems.map((item) => (
                    <div key={item.id} className="border rounded-lg p-4">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-full h-32 object-cover rounded-lg mb-3"
                      />
                      <h3 className="font-medium mb-2 line-clamp-2">{item.name}</h3>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <span className="font-bold">{item.price.toLocaleString()}원</span>
                          {item.originalPrice > item.price && (
                            <span className="text-sm text-muted-foreground line-through">
                              {item.originalPrice.toLocaleString()}원
                            </span>
                          )}
                        </div>
                        <Button className="w-full" size="sm" disabled={!item.inStock}>
                          {item.inStock ? "장바구니 담기" : "품절"}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Profile */}
          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>개인정보 수정</CardTitle>
                <CardDescription>회원 정보를 수정하실 수 있습니다</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">이름</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      className="w-full mt-1 p-2 border rounded-lg"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">이메일</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="w-full mt-1 p-2 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">휴대폰번호</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      className="w-full mt-1 p-2 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">가입일</label>
                    <input
                      type="text"
                      value={formData.joinDate}
                      className="w-full mt-1 p-2 border rounded-lg"
                      readOnly
                    />
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button>정보 수정</Button>
                  <Button variant="outline">비밀번호 변경</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Membership */}
          <TabsContent value="membership" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>멤버십 정보</CardTitle>
                <CardDescription>현재 멤버십 등급과 혜택을 확인하세요</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">{userInfo.membershipLevel}</div>
                  <p className="text-muted-foreground">
                    다음 등급까지 {(3000000 - userInfo.totalSpent).toLocaleString()}원
                  </p>
                  <Progress value={membershipProgress} className="mt-4" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-green-600">3%</div>
                    <div className="text-sm text-muted-foreground">적립률</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">무료</div>
                    <div className="text-sm text-muted-foreground">배송비</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">30일</div>
                    <div className="text-sm text-muted-foreground">무료반품</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="font-semibold">등급별 혜택</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between p-2 bg-gray-50 rounded">
                      <span>일반 (0원 이상)</span>
                      <span>1% 적립</span>
                    </div>
                    <div className="flex justify-between p-2 bg-blue-50 rounded border-2 border-blue-200">
                      <span>VIP (100만원 이상)</span>
                      <span>3% 적립 + 무료배송</span>
                    </div>
                    <div className="flex justify-between p-2 bg-gray-50 rounded">
                      <span>VVIP (300만원 이상)</span>
                      <span>5% 적립 + 무료배송 + 전용 상담</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
