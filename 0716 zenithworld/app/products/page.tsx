"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Heart, ShoppingCart, Star, Filter, Grid, List, Search } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Mock product data
const products = [
  {
    id: "1",
    name: "프리미엄 무선 이어폰",
    brand: "TechSound",
    price: 199000,
    originalPrice: 249000,
    discount: 20,
    rating: 4.8,
    reviews: 1247,
    image: "/placeholder.svg?height=300&width=300&text=무선+이어폰",
    category: "전자제품",
    subcategory: "이어폰/헤드폰",
    tags: ["무선", "노이즈캔슬링", "고음질"],
    inStock: true,
    isNew: true,
    isBestSeller: false,
  },
  {
    id: "2",
    name: "스마트워치 프로",
    brand: "WearTech",
    price: 329000,
    originalPrice: 399000,
    discount: 18,
    rating: 4.6,
    reviews: 892,
    image: "/placeholder.svg?height=300&width=300&text=스마트워치",
    category: "전자제품",
    subcategory: "스마트워치",
    tags: ["스마트워치", "건강관리", "GPS"],
    inStock: true,
    isNew: false,
    isBestSeller: true,
  },
  {
    id: "3",
    name: "게이밍 노트북",
    brand: "GameMax",
    price: 1299000,
    originalPrice: 1499000,
    discount: 13,
    rating: 4.7,
    reviews: 456,
    image: "/placeholder.svg?height=300&width=300&text=게이밍+노트북",
    category: "전자제품",
    subcategory: "노트북",
    tags: ["게이밍", "고성능", "RGB"],
    inStock: true,
    isNew: false,
    isBestSeller: true,
  },
  {
    id: "4",
    name: "캐주얼 티셔츠",
    brand: "ComfortWear",
    price: 29000,
    originalPrice: 39000,
    discount: 26,
    rating: 4.4,
    reviews: 2341,
    image: "/placeholder.svg?height=300&width=300&text=캐주얼+티셔츠",
    category: "패션",
    subcategory: "남성의류",
    tags: ["캐주얼", "면100%", "편안함"],
    inStock: true,
    isNew: false,
    isBestSeller: false,
  },
  {
    id: "5",
    name: "운동화",
    brand: "SportMax",
    price: 89000,
    originalPrice: 119000,
    discount: 25,
    rating: 4.5,
    reviews: 1876,
    image: "/placeholder.svg?height=300&width=300&text=운동화",
    category: "패션",
    subcategory: "신발",
    tags: ["운동화", "편안함", "스타일"],
    inStock: true,
    isNew: true,
    isBestSeller: false,
  },
  {
    id: "6",
    name: "홈 카페 머신",
    brand: "BrewMaster",
    price: 459000,
    originalPrice: 529000,
    discount: 13,
    rating: 4.9,
    reviews: 234,
    image: "/placeholder.svg?height=300&width=300&text=커피머신",
    category: "홈&리빙",
    subcategory: "주방용품",
    tags: ["커피", "홈카페", "자동"],
    inStock: false,
    isNew: true,
    isBestSeller: false,
  },
]

const categories = ["전체", "전자제품", "패션", "홈&리빙", "스포츠", "도서", "유아동", "자동차", "뷰티"]

const brands = ["전체", "TechSound", "WearTech", "GameMax", "ComfortWear", "SportMax", "BrewMaster"]

const sortOptions = [
  { value: "popular", label: "인기순" },
  { value: "newest", label: "최신순" },
  { value: "price-low", label: "낮은 가격순" },
  { value: "price-high", label: "높은 가격순" },
  { value: "rating", label: "평점순" },
  { value: "reviews", label: "리뷰 많은순" },
]

export default function ProductsPage() {
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const [filteredProducts, setFilteredProducts] = useState(products)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("popular")
  const [selectedCategory, setSelectedCategory] = useState("전체")
  const [selectedBrand, setSelectedBrand] = useState("전체")
  const [priceRange, setPriceRange] = useState([0, 2000000])
  const [searchQuery, setSearchQuery] = useState("")
  const [showOnlyInStock, setShowOnlyInStock] = useState(false)
  const [showOnlyNew, setShowOnlyNew] = useState(false)
  const [showOnlyBestSeller, setShowOnlyBestSeller] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentUserId, setCurrentUserId] = useState<string | null>(null)

  useEffect(() => {
    // 로그인 상태 확인
    const cookieToken = document.cookie.includes("token=") || document.cookie.includes("auth-token=")
    const localToken = localStorage.getItem("auth-token")
    const userId = localStorage.getItem("current-user-id")
    const userLoggedIn = cookieToken || !!localToken

    setIsLoggedIn(userLoggedIn)
    setCurrentUserId(userId)
  }, [])

  useEffect(() => {
    // URL 파라미터에서 카테고리 설정
    const category = searchParams.get("category")
    if (category) {
      setSelectedCategory(category)
    }
  }, [searchParams])

  useEffect(() => {
    // 필터링 로직
    let filtered = products

    // 카테고리 필터
    if (selectedCategory !== "전체") {
      filtered = filtered.filter((product) => product.category === selectedCategory)
    }

    // 브랜드 필터
    if (selectedBrand !== "전체") {
      filtered = filtered.filter((product) => product.brand === selectedBrand)
    }

    // 가격 범위 필터
    filtered = filtered.filter((product) => product.price >= priceRange[0] && product.price <= priceRange[1])

    // 검색어 필터
    if (searchQuery) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
      )
    }

    // 재고 필터
    if (showOnlyInStock) {
      filtered = filtered.filter((product) => product.inStock)
    }

    // 신상품 필터
    if (showOnlyNew) {
      filtered = filtered.filter((product) => product.isNew)
    }

    // 베스트셀러 필터
    if (showOnlyBestSeller) {
      filtered = filtered.filter((product) => product.isBestSeller)
    }

    // 정렬
    switch (sortBy) {
      case "newest":
        filtered = filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))
        break
      case "price-low":
        filtered = filtered.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filtered = filtered.sort((a, b) => b.price - a.price)
        break
      case "rating":
        filtered = filtered.sort((a, b) => b.rating - a.rating)
        break
      case "reviews":
        filtered = filtered.sort((a, b) => b.reviews - a.reviews)
        break
      default:
        // 인기순 (베스트셀러 우선, 그 다음 평점순)
        filtered = filtered.sort((a, b) => {
          if (a.isBestSeller && !b.isBestSeller) return -1
          if (!a.isBestSeller && b.isBestSeller) return 1
          return b.rating - a.rating
        })
    }

    setFilteredProducts(filtered)
  }, [
    selectedCategory,
    selectedBrand,
    priceRange,
    searchQuery,
    showOnlyInStock,
    showOnlyNew,
    showOnlyBestSeller,
    sortBy,
  ])

  const handleAddToCart = (product: any) => {
    if (!isLoggedIn || !currentUserId) {
      toast({
        title: "로그인 필요",
        description: "장바구니에 상품을 추가하려면 로그인이 필요합니다.",
        variant: "destructive",
      })
      return
    }

    const cartKey = `cartItems_${currentUserId}`
    const existingCartItems = JSON.parse(localStorage.getItem(cartKey) || "[]")

    const existingItemIndex = existingCartItems.findIndex((item: any) => item.id === product.id)

    if (existingItemIndex > -1) {
      existingCartItems[existingItemIndex].quantity += 1
    } else {
      existingCartItems.push({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        image: product.image,
        brand: product.brand,
        addedAt: new Date().getTime(),
      })
    }

    localStorage.setItem(cartKey, JSON.stringify(existingCartItems))

    // Dispatch custom event to notify header of cart changes
    window.dispatchEvent(new CustomEvent("cartUpdated"))

    toast({
      title: "장바구니에 추가됨",
      description: `${product.name}이(가) 장바구니에 추가되었습니다.`,
    })
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* 필터 사이드바 */}
        <div className="lg:w-1/4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                필터
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* 검색 */}
              <div>
                <Label htmlFor="search">상품 검색</Label>
                <div className="relative mt-2">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    id="search"
                    placeholder="상품명, 브랜드 검색..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* 카테고리 */}
              <div>
                <Label>카테고리</Label>
                <div className="mt-2 space-y-2">
                  {categories.map((category) => (
                    <div key={category} className="flex items-center space-x-2">
                      <Checkbox
                        id={category}
                        checked={selectedCategory === category}
                        onCheckedChange={() => setSelectedCategory(category)}
                      />
                      <Label htmlFor={category} className="text-sm">
                        {category}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* 브랜드 */}
              <div>
                <Label>브랜드</Label>
                <Select value={selectedBrand} onValueChange={setSelectedBrand}>
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {brands.map((brand) => (
                      <SelectItem key={brand} value={brand}>
                        {brand}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* 가격 범위 */}
              <div>
                <Label>가격 범위</Label>
                <div className="mt-2 space-y-4">
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={2000000}
                    step={10000}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>{priceRange[0].toLocaleString()}원</span>
                    <span>{priceRange[1].toLocaleString()}원</span>
                  </div>
                </div>
              </div>

              {/* 추가 필터 */}
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="inStock"
                    checked={showOnlyInStock}
                    onCheckedChange={(checked) => setShowOnlyInStock(checked as boolean)}
                  />
                  <Label htmlFor="inStock" className="text-sm">
                    재고 있는 상품만
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="new"
                    checked={showOnlyNew}
                    onCheckedChange={(checked) => setShowOnlyNew(checked as boolean)}
                  />
                  <Label htmlFor="new" className="text-sm">
                    신상품만
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="bestSeller"
                    checked={showOnlyBestSeller}
                    onCheckedChange={(checked) => setShowOnlyBestSeller(checked as boolean)}
                  />
                  <Label htmlFor="bestSeller" className="text-sm">
                    베스트셀러만
                  </Label>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 상품 목록 */}
        <div className="lg:w-3/4">
          {/* 상단 컨트롤 */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold">전체 상품</h1>
              <p className="text-muted-foreground mt-1">총 {filteredProducts.length}개의 상품</p>
            </div>

            <div className="flex items-center gap-4">
              {/* 정렬 */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* 뷰 모드 */}
              <div className="flex border rounded-lg">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="rounded-r-none"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="rounded-l-none"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* 상품 그리드/리스트 */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">조건에 맞는 상품이 없습니다.</p>
            </div>
          ) : (
            <div className={viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
              {filteredProducts.map((product) => (
                <Card
                  key={product.id}
                  className={`group hover:shadow-lg transition-shadow ${viewMode === "list" ? "flex flex-row" : ""}`}
                >
                  <div className={viewMode === "list" ? "w-48 flex-shrink-0" : ""}>
                    <div className="relative overflow-hidden rounded-t-lg">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className={`object-cover transition-transform group-hover:scale-105 ${
                          viewMode === "list" ? "w-full h-48" : "w-full h-64"
                        }`}
                      />
                      {product.discount > 0 && (
                        <Badge className="absolute top-2 left-2 bg-red-500">-{product.discount}%</Badge>
                      )}
                      {product.isNew && <Badge className="absolute top-2 right-2 bg-green-500">NEW</Badge>}
                      {product.isBestSeller && <Badge className="absolute top-8 right-2 bg-orange-500">BEST</Badge>}
                      {!product.inStock && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <Badge variant="secondary">품절</Badge>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className={viewMode === "list" ? "flex-1" : ""}>
                    <CardHeader className={viewMode === "list" ? "pb-2" : ""}>
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <p className="text-sm text-muted-foreground">{product.brand}</p>
                          <CardTitle className="text-lg line-clamp-2">{product.name}</CardTitle>
                        </div>
                        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-red-500">
                          <Heart className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardHeader>

                    <CardContent className={viewMode === "list" ? "py-2" : ""}>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {product.rating} ({product.reviews.toLocaleString()})
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-xl font-bold text-blue-600">{product.price.toLocaleString()}원</span>
                          {product.originalPrice > product.price && (
                            <span className="text-sm text-muted-foreground line-through">
                              {product.originalPrice.toLocaleString()}원
                            </span>
                          )}
                        </div>

                        <div className="flex flex-wrap gap-1">
                          {product.tags.slice(0, 3).map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>

                    <CardFooter className="gap-2">
                      <Button variant="outline" className="flex-1 bg-transparent" asChild onClick={scrollToTop}>
                        <Link href={`/products/${product.id}`}>상세보기</Link>
                      </Button>
                      <Button className="flex-1" onClick={() => handleAddToCart(product)} disabled={!product.inStock}>
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        {product.inStock ? "장바구니" : "품절"}
                      </Button>
                    </CardFooter>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
