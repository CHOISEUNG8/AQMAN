"use client"

import type React from "react"

import { useState, useEffect, useMemo } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import {
  Star,
  ShoppingCart,
  Filter,
  Grid,
  List,
  Search,
  X,
  SlidersHorizontal,
  TrendingUp,
  Clock,
  Heart,
  Eye,
  ArrowUpDown,
} from "lucide-react"

// 확장된 상품 데이터
const allProducts = [
  {
    id: 1,
    name: "무선 블루투스 이어폰 프리미엄",
    price: 89000,
    originalPrice: 129000,
    image: "/placeholder.svg?height=200&width=200&text=이어폰",
    rating: 4.8,
    reviews: 1234,
    discount: 31,
    category: "appliances",
    brand: "TechSound",
    inStock: true,
    tags: ["무선", "블루투스", "노이즈캔슬링"],
    releaseDate: "2024-01-15",
    views: 15420,
    sales: 892,
    features: ["방수", "고음질", "장시간배터리"],
  },
  {
    id: 2,
    name: "프리미엄 가죽 백팩",
    price: 65000,
    originalPrice: 85000,
    image: "/placeholder.svg?height=200&width=200&text=백팩",
    rating: 4.6,
    reviews: 856,
    discount: 24,
    category: "lifestyle",
    brand: "StyleBag",
    inStock: true,
    tags: ["가죽", "백팩", "비즈니스"],
    releaseDate: "2024-01-10",
    views: 8930,
    sales: 445,
    features: ["진짜가죽", "노트북수납", "방수"],
  },
  {
    id: 3,
    name: "스마트 워치 GPS 프로",
    price: 199000,
    originalPrice: 249000,
    image: "/placeholder.svg?height=200&width=200&text=스마트워치",
    rating: 4.9,
    reviews: 2341,
    discount: 20,
    category: "appliances",
    brand: "SmartTech",
    inStock: false,
    tags: ["스마트워치", "GPS", "헬스케어"],
    releaseDate: "2024-01-20",
    views: 23450,
    sales: 1203,
    features: ["GPS", "심박측정", "방수"],
  },
  {
    id: 4,
    name: "아로마 홈 디퓨저",
    price: 45000,
    originalPrice: 59000,
    image: "/placeholder.svg?height=200&width=200&text=디퓨저",
    rating: 4.7,
    reviews: 567,
    discount: 24,
    category: "living",
    brand: "HomeScent",
    inStock: true,
    tags: ["아로마", "디퓨저", "홈케어"],
    releaseDate: "2023-12-15",
    views: 5670,
    sales: 234,
    features: ["자동타이머", "LED조명", "조용한작동"],
  },
  {
    id: 5,
    name: "운동화 러닝화 에어맥스",
    price: 120000,
    originalPrice: 150000,
    image: "/placeholder.svg?height=200&width=200&text=운동화",
    rating: 4.5,
    reviews: 892,
    discount: 20,
    category: "sports",
    brand: "SportRun",
    inStock: true,
    tags: ["운동화", "러닝", "에어쿠션"],
    releaseDate: "2024-01-05",
    views: 12340,
    sales: 567,
    features: ["에어쿠션", "통기성", "가벼움"],
  },
  {
    id: 6,
    name: "무선 충전기 패드 고속",
    price: 35000,
    originalPrice: 45000,
    image: "/placeholder.svg?height=200&width=200&text=충전기",
    rating: 4.4,
    reviews: 445,
    discount: 22,
    category: "appliances",
    brand: "ChargeFast",
    inStock: true,
    tags: ["무선충전", "고속충전", "패드"],
    releaseDate: "2023-11-20",
    views: 7890,
    sales: 334,
    features: ["고속충전", "안전보호", "LED표시"],
  },
  {
    id: 7,
    name: "미니멀 화장대 세트",
    price: 180000,
    originalPrice: 220000,
    image: "/placeholder.svg?height=200&width=200&text=화장대",
    rating: 4.8,
    reviews: 234,
    discount: 18,
    category: "living",
    brand: "MinimalHome",
    inStock: true,
    tags: ["화장대", "미니멀", "수납"],
    releaseDate: "2024-01-12",
    views: 4560,
    sales: 123,
    features: ["LED거울", "수납공간", "조립간편"],
  },
  {
    id: 8,
    name: "프리미엄 스킨케어 세트",
    price: 95000,
    originalPrice: 130000,
    image: "/placeholder.svg?height=200&width=200&text=스킨케어",
    rating: 4.9,
    reviews: 1567,
    discount: 27,
    category: "beauty",
    brand: "GlowSkin",
    inStock: true,
    tags: ["스킨케어", "세트", "안티에이징"],
    releaseDate: "2024-01-08",
    views: 18920,
    sales: 789,
    features: ["천연성분", "안티에이징", "보습"],
  },
]

const categories = [
  { value: "all", label: "전체", count: allProducts.length },
  { value: "appliances", label: "가전", count: allProducts.filter((p) => p.category === "appliances").length },
  { value: "living", label: "리빙", count: allProducts.filter((p) => p.category === "living").length },
  { value: "sports", label: "스포츠/레저", count: allProducts.filter((p) => p.category === "sports").length },
  { value: "food", label: "식품", count: allProducts.filter((p) => p.category === "food").length },
  { value: "beauty", label: "뷰티", count: allProducts.filter((p) => p.category === "beauty").length },
  { value: "lifestyle", label: "생활", count: allProducts.filter((p) => p.category === "lifestyle").length },
  { value: "automotive", label: "자동차", count: allProducts.filter((p) => p.category === "automotive").length },
  { value: "stationery", label: "문구/완구", count: allProducts.filter((p) => p.category === "stationery").length },
]

const brands = Array.from(new Set(allProducts.map((p) => p.brand)))

const sortOptions = [
  { value: "relevance", label: "관련도순", icon: Search },
  { value: "popular", label: "인기순", icon: TrendingUp },
  { value: "latest", label: "최신순", icon: Clock },
  { value: "price-low", label: "낮은 가격순", icon: ArrowUpDown },
  { value: "price-high", label: "높은 가격순", icon: ArrowUpDown },
  { value: "rating", label: "평점순", icon: Star },
  { value: "reviews", label: "리뷰순", icon: Eye },
]

export default function SearchPage() {
  const searchParams = useSearchParams()
  const router = useRouter()

  // State
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("relevance")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState([0, 300000])
  const [ratingFilter, setRatingFilter] = useState(0)
  const [showOnlyInStock, setShowOnlyInStock] = useState(false)
  const [showOnlyDiscount, setShowOnlyDiscount] = useState(false)
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleProductClick = (productId: number) => {
    scrollToTop()
    router.push(`/products/${productId}`)
  }

  // 페이지 로드 시 스크롤 맨 위로
  useEffect(() => {
    scrollToTop()
  }, [])

  // URL 파라미터 동기화
  useEffect(() => {
    const category = searchParams.get("category")
    const search = searchParams.get("q")
    const sort = searchParams.get("sort")

    if (category) setSelectedCategory(category)
    if (search) setSearchQuery(search)
    if (sort) setSortBy(sort)
  }, [searchParams])

  // 필터링된 상품들
  const filteredProducts = useMemo(() => {
    let filtered = allProducts

    // 검색어 필터
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.brand.toLowerCase().includes(query) ||
          product.tags.some((tag) => tag.toLowerCase().includes(query)) ||
          product.features.some((feature) => feature.toLowerCase().includes(query)),
      )
    }

    // 카테고리 필터
    if (selectedCategory !== "all") {
      filtered = filtered.filter((product) => product.category === selectedCategory)
    }

    // 브랜드 필터
    if (selectedBrands.length > 0) {
      filtered = filtered.filter((product) => selectedBrands.includes(product.brand))
    }

    // 가격 필터
    filtered = filtered.filter((product) => product.price >= priceRange[0] && product.price <= priceRange[1])

    // 평점 필터
    if (ratingFilter > 0) {
      filtered = filtered.filter((product) => product.rating >= ratingFilter)
    }

    // 재고 필터
    if (showOnlyInStock) {
      filtered = filtered.filter((product) => product.inStock)
    }

    // 할인 필터
    if (showOnlyDiscount) {
      filtered = filtered.filter((product) => product.discount > 0)
    }

    // 기능 필터
    if (selectedFeatures.length > 0) {
      filtered = filtered.filter((product) => selectedFeatures.some((feature) => product.features.includes(feature)))
    }

    // 정렬
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case "reviews":
        filtered.sort((a, b) => b.reviews - a.reviews)
        break
      case "latest":
        filtered.sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime())
        break
      case "popular":
        filtered.sort((a, b) => b.views - a.views)
        break
      default:
        // 관련도순 (검색어가 있을 때)
        if (searchQuery) {
          filtered.sort((a, b) => {
            const aScore = calculateRelevanceScore(a, searchQuery)
            const bScore = calculateRelevanceScore(b, searchQuery)
            return bScore - aScore
          })
        }
        break
    }

    return filtered
  }, [
    searchQuery,
    selectedCategory,
    selectedBrands,
    priceRange,
    ratingFilter,
    showOnlyInStock,
    showOnlyDiscount,
    selectedFeatures,
    sortBy,
  ])

  // 관련도 점수 계산
  const calculateRelevanceScore = (product: any, query: string) => {
    const lowerQuery = query.toLowerCase()
    let score = 0

    // 제품명에 포함되면 높은 점수
    if (product.name.toLowerCase().includes(lowerQuery)) score += 10

    // 브랜드에 포함되면 중간 점수
    if (product.brand.toLowerCase().includes(lowerQuery)) score += 5

    // 태그에 포함되면 낮은 점수
    product.tags.forEach((tag: string) => {
      if (tag.toLowerCase().includes(lowerQuery)) score += 3
    })

    // 기능에 포함되면 낮은 점수
    product.features.forEach((feature: string) => {
      if (feature.toLowerCase().includes(lowerQuery)) score += 2
    })

    return score
  }

  // 필터 핸들러들
  const handleBrandChange = (brand: string, checked: boolean) => {
    if (checked) {
      setSelectedBrands([...selectedBrands, brand])
    } else {
      setSelectedBrands(selectedBrands.filter((b) => b !== brand))
    }
  }

  const handleFeatureChange = (feature: string, checked: boolean) => {
    if (checked) {
      setSelectedFeatures([...selectedFeatures, feature])
    } else {
      setSelectedFeatures(selectedFeatures.filter((f) => f !== feature))
    }
  }

  const clearAllFilters = () => {
    setSelectedCategory("all")
    setSelectedBrands([])
    setPriceRange([0, 300000])
    setRatingFilter(0)
    setShowOnlyInStock(false)
    setShowOnlyDiscount(false)
    setSelectedFeatures([])
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (searchQuery) params.set("q", searchQuery)
    if (selectedCategory !== "all") params.set("category", selectedCategory)
    if (sortBy !== "relevance") params.set("sort", sortBy)

    scrollToTop()
    router.push(`/search?${params.toString()}`)
  }

  // 모든 기능들 추출
  const allFeatures = Array.from(new Set(allProducts.flatMap((p) => p.features)))

  const FilterContent = () => (
    <div className="space-y-6">
      {/* 카테고리 */}
      <div>
        <h3 className="font-semibold mb-3 flex items-center gap-2">
          <Filter className="w-4 h-4" />
          카테고리
        </h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <div
              key={category.value}
              className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-colors ${
                selectedCategory === category.value ? "bg-primary text-primary-foreground" : "hover:bg-muted"
              }`}
              onClick={() => setSelectedCategory(category.value)}
            >
              <span className="text-sm">{category.label}</span>
              <Badge variant="secondary" className="text-xs">
                {category.count}
              </Badge>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* 브랜드 */}
      <div>
        <h3 className="font-semibold mb-3">브랜드</h3>
        <div className="space-y-2 max-h-40 overflow-y-auto">
          {brands.map((brand) => (
            <div key={brand} className="flex items-center space-x-2">
              <Checkbox
                id={brand}
                checked={selectedBrands.includes(brand)}
                onCheckedChange={(checked) => handleBrandChange(brand, checked as boolean)}
              />
              <label htmlFor={brand} className="text-sm cursor-pointer">
                {brand}
              </label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* 가격 범위 */}
      <div>
        <h3 className="font-semibold mb-3">가격 범위</h3>
        <div className="space-y-4">
          <Slider
            value={priceRange}
            onValueChange={setPriceRange}
            max={300000}
            min={0}
            step={10000}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>{priceRange[0].toLocaleString()}원</span>
            <span>{priceRange[1].toLocaleString()}원</span>
          </div>
        </div>
      </div>

      <Separator />

      {/* 평점 */}
      <div>
        <h3 className="font-semibold mb-3">평점</h3>
        <div className="space-y-2">
          {[4.5, 4.0, 3.5, 3.0].map((rating) => (
            <div
              key={rating}
              className={`flex items-center space-x-2 p-2 rounded-lg cursor-pointer transition-colors ${
                ratingFilter === rating ? "bg-primary text-primary-foreground" : "hover:bg-muted"
              }`}
              onClick={() => setRatingFilter(ratingFilter === rating ? 0 : rating)}
            >
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-3 w-3 ${
                      i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm">{rating}점 이상</span>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* 기능 */}
      <div>
        <h3 className="font-semibold mb-3">기능</h3>
        <div className="space-y-2 max-h-32 overflow-y-auto">
          {allFeatures.map((feature) => (
            <div key={feature} className="flex items-center space-x-2">
              <Checkbox
                id={feature}
                checked={selectedFeatures.includes(feature)}
                onCheckedChange={(checked) => handleFeatureChange(feature, checked as boolean)}
              />
              <label htmlFor={feature} className="text-sm cursor-pointer">
                {feature}
              </label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* 기타 옵션 */}
      <div className="space-y-3">
        <h3 className="font-semibold">기타 옵션</h3>
        <div className="flex items-center space-x-2">
          <Checkbox id="inStock" checked={showOnlyInStock} onCheckedChange={setShowOnlyInStock} />
          <label htmlFor="inStock" className="text-sm cursor-pointer">
            재고 있는 상품만
          </label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="discount" checked={showOnlyDiscount} onCheckedChange={setShowOnlyDiscount} />
          <label htmlFor="discount" className="text-sm cursor-pointer">
            할인 상품만
          </label>
        </div>
      </div>

      <Button variant="outline" onClick={clearAllFilters} className="w-full bg-transparent">
        <X className="w-4 h-4 mr-2" />
        필터 초기화
      </Button>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        {/* 검색 헤더 */}
        <div className="mb-8 animate-fade-in">
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                type="search"
                placeholder="상품명, 브랜드, 기능을 검색해보세요..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 h-14 text-lg bg-white/80 backdrop-blur-sm shadow-soft border-0 rounded-2xl"
              />
              <Button type="submit" className="absolute right-2 top-2 h-10 px-6 rounded-xl">
                검색
              </Button>
            </div>
          </form>

          {searchQuery && (
            <div className="text-center">
              <h1 className="text-2xl font-bold mb-2">
                '<span className="text-primary">{searchQuery}</span>' 검색 결과
              </h1>
              <p className="text-muted-foreground">
                총 <span className="font-semibold text-primary">{filteredProducts.length}</span>개의 상품을 찾았습니다
              </p>
            </div>
          )}
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Filters */}
          <aside className="hidden lg:block w-80">
            <Card className="sticky top-8 shadow-soft border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <SlidersHorizontal className="w-5 h-5 text-primary" />
                  필터
                </CardTitle>
              </CardHeader>
              <CardContent>
                <FilterContent />
              </CardContent>
            </Card>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* 상단 컨트롤 */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div className="flex items-center gap-4">
                {/* Mobile Filter */}
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="sm" className="lg:hidden bg-white/80 backdrop-blur-sm">
                      <Filter className="h-4 w-4 mr-2" />
                      필터
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-80">
                    <SheetHeader>
                      <SheetTitle>필터</SheetTitle>
                    </SheetHeader>
                    <div className="mt-6">
                      <FilterContent />
                    </div>
                  </SheetContent>
                </Sheet>

                {/* 활성 필터 표시 */}
                <div className="flex flex-wrap gap-2">
                  {selectedCategory !== "all" && (
                    <Badge variant="secondary" className="bg-primary/10 text-primary">
                      {categories.find((c) => c.value === selectedCategory)?.label}
                      <X className="w-3 h-3 ml-1 cursor-pointer" onClick={() => setSelectedCategory("all")} />
                    </Badge>
                  )}
                  {selectedBrands.map((brand) => (
                    <Badge key={brand} variant="secondary" className="bg-primary/10 text-primary">
                      {brand}
                      <X className="w-3 h-3 ml-1 cursor-pointer" onClick={() => handleBrandChange(brand, false)} />
                    </Badge>
                  ))}
                  {showOnlyInStock && (
                    <Badge variant="secondary" className="bg-green-100 text-green-700">
                      재고있음
                      <X className="w-3 h-3 ml-1 cursor-pointer" onClick={() => setShowOnlyInStock(false)} />
                    </Badge>
                  )}
                  {showOnlyDiscount && (
                    <Badge variant="secondary" className="bg-red-100 text-red-700">
                      할인상품
                      <X className="w-3 h-3 ml-1 cursor-pointer" onClick={() => setShowOnlyDiscount(false)} />
                    </Badge>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-4">
                {/* 정렬 */}
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40 bg-white/80 backdrop-blur-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {sortOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        <div className="flex items-center gap-2">
                          <option.icon className="w-4 h-4" />
                          {option.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* 뷰 모드 */}
                <div className="flex border rounded-lg bg-white/80 backdrop-blur-sm">
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

            {/* 상품 목록 */}
            {filteredProducts.length === 0 ? (
              <Card className="text-center py-16 bg-white/80 backdrop-blur-sm shadow-soft border-0">
                <CardContent>
                  <Search className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-xl font-semibold mb-2">검색 결과가 없습니다</h3>
                  <p className="text-muted-foreground mb-6">다른 검색어를 시도하거나 필터를 조정해보세요</p>
                  <Button onClick={clearAllFilters} variant="outline">
                    필터 초기화
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <Tabs value={viewMode} className="w-full">
                <TabsContent value="grid">
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredProducts.map((product, index) => (
                      <Card
                        key={product.id}
                        className="group hover:shadow-strong transition-all duration-500 cursor-pointer transform hover:-translate-y-2 animate-fade-in border-0 overflow-hidden bg-white/90 backdrop-blur-sm"
                        style={{ animationDelay: `${index * 0.1}s` }}
                        onClick={() => handleProductClick(product.id)}
                      >
                        <CardHeader className="p-0 relative overflow-hidden">
                          <div className="relative">
                            <img
                              src={product.image || "/placeholder.svg"}
                              alt={product.name}
                              className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            {product.discount > 0 && (
                              <Badge className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-pink-500 text-white border-0 shadow-medium">
                                {product.discount}% OFF
                              </Badge>
                            )}
                            {!product.inStock && (
                              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                <span className="text-white font-semibold bg-black/70 px-3 py-1 rounded-lg">품절</span>
                              </div>
                            )}
                            <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <Button
                                size="sm"
                                variant="secondary"
                                className="w-8 h-8 p-0 rounded-full"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <Heart className="w-4 h-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="secondary"
                                className="w-8 h-8 p-0 rounded-full"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <Eye className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="p-4">
                          <div className="text-sm text-muted-foreground mb-1">{product.brand}</div>
                          <CardTitle className="text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors duration-300">
                            {product.name}
                          </CardTitle>
                          <div className="flex items-center mb-3">
                            <div className="flex items-center">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              <span className="text-sm ml-1 font-semibold">{product.rating}</span>
                            </div>
                            <span className="text-sm text-muted-foreground ml-2">
                              ({product.reviews.toLocaleString()})
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-1 mb-3">
                            {product.features.slice(0, 2).map((feature) => (
                              <Badge key={feature} variant="outline" className="text-xs">
                                {feature}
                              </Badge>
                            ))}
                          </div>
                          <div className="space-y-1">
                            <div className="flex items-center space-x-2">
                              <span className="text-xl font-bold text-primary">{product.price.toLocaleString()}원</span>
                            </div>
                            {product.originalPrice > product.price && (
                              <span className="text-sm text-muted-foreground line-through">
                                {product.originalPrice.toLocaleString()}원
                              </span>
                            )}
                          </div>
                        </CardContent>
                        <CardFooter className="p-4 pt-0">
                          <Button
                            className="w-full rounded-xl bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-medium hover:shadow-strong transition-all duration-300 transform hover:scale-105"
                            size="sm"
                            disabled={!product.inStock}
                            onClick={(e) => {
                              e.stopPropagation()
                              scrollToTop()
                            }}
                          >
                            <ShoppingCart className="h-4 w-4 mr-2" />
                            {product.inStock ? "장바구니 담기" : "품절"}
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="list">
                  <div className="space-y-4">
                    {filteredProducts.map((product, index) => (
                      <Card
                        key={product.id}
                        className="hover:shadow-medium transition-all duration-300 animate-fade-in bg-white/90 backdrop-blur-sm border-0 cursor-pointer"
                        style={{ animationDelay: `${index * 0.05}s` }}
                        onClick={() => handleProductClick(product.id)}
                      >
                        <div className="flex p-6">
                          <div className="relative w-32 h-32 mr-6 flex-shrink-0">
                            <img
                              src={product.image || "/placeholder.svg"}
                              alt={product.name}
                              className="w-full h-full object-cover rounded-lg"
                            />
                            {product.discount > 0 && (
                              <Badge className="absolute top-1 left-1 bg-red-500 text-xs">
                                {product.discount}% OFF
                              </Badge>
                            )}
                            {!product.inStock && (
                              <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg">
                                <span className="text-white text-xs font-semibold">품절</span>
                              </div>
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <div className="text-sm text-muted-foreground mb-1">{product.brand}</div>
                                <h3 className="text-xl font-semibold mb-2 hover:text-primary transition-colors">
                                  {product.name}
                                </h3>
                                <div className="flex items-center mb-3">
                                  <div className="flex items-center">
                                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                    <span className="text-sm ml-1 font-semibold">{product.rating}</span>
                                  </div>
                                  <span className="text-sm text-muted-foreground ml-2">
                                    ({product.reviews.toLocaleString()})
                                  </span>
                                  <span className="text-sm text-muted-foreground ml-4">
                                    조회 {product.views.toLocaleString()}
                                  </span>
                                </div>
                                <div className="flex flex-wrap gap-1 mb-3">
                                  {product.features.map((feature) => (
                                    <Badge key={feature} variant="outline" className="text-xs">
                                      {feature}
                                    </Badge>
                                  ))}
                                </div>
                                <div className="flex items-center space-x-3">
                                  <span className="text-2xl font-bold text-primary">
                                    {product.price.toLocaleString()}원
                                  </span>
                                  {product.originalPrice > product.price && (
                                    <span className="text-lg text-muted-foreground line-through">
                                      {product.originalPrice.toLocaleString()}원
                                    </span>
                                  )}
                                </div>
                              </div>
                              <div className="ml-6 flex flex-col gap-2">
                                <Button
                                  size="sm"
                                  disabled={!product.inStock}
                                  className="min-w-32"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    scrollToTop()
                                  }}
                                >
                                  <ShoppingCart className="h-4 w-4 mr-2" />
                                  {product.inStock ? "장바구니" : "품절"}
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="min-w-32 bg-transparent"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    scrollToTop()
                                  }}
                                >
                                  <Heart className="h-4 w-4 mr-2" />
                                  찜하기
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            )}

            {/* 페이지네이션 (추후 구현) */}
            {filteredProducts.length > 0 && (
              <div className="mt-12 text-center">
                <p className="text-muted-foreground">{filteredProducts.length}개의 상품을 모두 표시했습니다</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
