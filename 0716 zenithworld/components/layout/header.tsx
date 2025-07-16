"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Search,
  ShoppingCart,
  User,
  Menu,
  Heart,
  Package,
  ChevronDown,
  Smartphone,
  Laptop,
  Headphones,
  Watch,
  Camera,
  Gamepad2,
  Home,
  Shirt,
  Dumbbell,
  Book,
  Baby,
  Car,
  Utensils,
  Palette,
  LogIn,
  UserPlus,
  Grid3X3,
  Pencil,
} from "lucide-react"
import { useAuth } from "../../app/contexts/auth-context"

const categories = [
  {
    name: "전자제품",
    icon: Smartphone,
    subcategories: [
      { name: "스마트폰", href: "/products?category=smartphone" },
      { name: "노트북", href: "/products?category=laptop" },
      { name: "태블릿", href: "/products?category=tablet" },
      { name: "이어폰/헤드폰", href: "/products?category=headphones" },
      { name: "스마트워치", href: "/products?category=smartwatch" },
      { name: "카메라", href: "/products?category=camera" },
      { name: "게임기", href: "/products?category=gaming" },
    ],
  },
  {
    name: "패션",
    icon: Shirt,
    subcategories: [
      { name: "남성의류", href: "/products?category=mens-fashion" },
      { name: "여성의류", href: "/products?category=womens-fashion" },
      { name: "신발", href: "/products?category=shoes" },
      { name: "가방", href: "/products?category=bags" },
      { name: "액세서리", href: "/products?category=accessories" },
      { name: "시계", href: "/products?category=watches" },
    ],
  },
  {
    name: "홈&리빙",
    icon: Home,
    subcategories: [
      { name: "가구", href: "/products?category=furniture" },
      { name: "홈데코", href: "/products?category=home-decor" },
      { name: "주방용품", href: "/products?category=kitchen" },
      { name: "생활용품", href: "/products?category=household" },
      { name: "침구", href: "/products?category=bedding" },
    ],
  },
  {
    name: "스포츠",
    icon: Dumbbell,
    subcategories: [
      { name: "운동기구", href: "/products?category=fitness" },
      { name: "스포츠웨어", href: "/products?category=sportswear" },
      { name: "아웃도어", href: "/products?category=outdoor" },
      { name: "골프", href: "/products?category=golf" },
    ],
  },
  {
    name: "식품",
    icon: Utensils,
    subcategories: [
      { name: "신선식품", href: "/products?category=fresh-food" },
      { name: "가공식품", href: "/products?category=processed-food" },
      { name: "음료/간식", href: "/products?category=snacks" },
    ],
  },
  {
    name: "도서",
    icon: Book,
    subcategories: [
      { name: "소설", href: "/products?category=fiction" },
      { name: "자기계발", href: "/products?category=self-help" },
      { name: "전문서적", href: "/products?category=professional" },
      { name: "만화", href: "/products?category=comics" },
    ],
  },
  {
    name: "유아동",
    icon: Baby,
    subcategories: [
      { name: "유아용품", href: "/products?category=baby" },
      { name: "아동의류", href: "/products?category=kids-fashion" },
      { name: "장난감", href: "/products?category=toys" },
      { name: "교육완구", href: "/products?category=educational" },
    ],
  },
  {
    name: "자동차",
    icon: Car,
    subcategories: [
      { name: "자동차용품", href: "/products?category=car-accessories" },
      { name: "타이어", href: "/products?category=tires" },
      { name: "오토바이", href: "/products?category=motorcycle" },
    ],
  },
  {
    name: "뷰티",
    icon: Palette,
    subcategories: [
      { name: "스킨케어", href: "/products?category=skincare" },
      { name: "메이크업", href: "/products?category=makeup" },
      { name: "향수", href: "/products?category=perfume" },
      { name: "헤어케어", href: "/products?category=haircare" },
    ],
  },
  {
    name: "문구/완구",
    icon: Pencil,
    subcategories: [
      { name: "문구류", href: "/products?category=stationery" },
      { name: "완구/장난감", href: "/products?category=toys" },
      { name: "교육용품", href: "/products?category=educational" },
    ],
  },
]

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isCategoryOpen, setIsCategoryOpen] = useState(false)
  const [cartItemsCount, setCartItemsCount] = useState(0)
  const { user, logout } = useAuth();
  const router = useRouter()

  // 장바구니 카운트 로직 (user가 있을 때만)
  useEffect(() => {
    const loadCartItems = () => {
      if (!user) {
        setCartItemsCount(0)
        return
      }
      const cartKey = `cartItems_${user.id}`
      const storedCartItems = localStorage.getItem(cartKey)
      if (storedCartItems) {
        try {
          const cartItems = JSON.parse(storedCartItems)
          const now = new Date().getTime()
          const validItems = cartItems.filter((item: any) => {
            const addedTime = item.addedAt || now
            const daysDiff = (now - addedTime) / (1000 * 60 * 60 * 24)
            return daysDiff <= 7
          })
          if (validItems.length !== cartItems.length) {
            localStorage.setItem(cartKey, JSON.stringify(validItems))
          }
          setCartItemsCount(validItems.length)
        } catch (error) {
          setCartItemsCount(0)
        }
      } else {
        setCartItemsCount(0)
      }
    }
    loadCartItems()
    const handleStorageChange = (e: StorageEvent) => {
      if (user && e.key === `cartItems_${user.id}`) {
        loadCartItems()
      }
    }
    window.addEventListener("storage", handleStorageChange)
    const handleCartUpdate = () => { loadCartItems() }
    window.addEventListener("cartUpdated", handleCartUpdate)
    return () => {
      window.removeEventListener("storage", handleStorageChange)
      window.removeEventListener("cartUpdated", handleCartUpdate)
    }
  }, [user])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }
  const handleLinkClick = (href: string) => { scrollToTop() }
  const handleMyPageClick = () => {
    if (user) {
      router.push("/mypage")
    } else {
      router.push("/guest-order")
    }
    scrollToTop()
  }
  const handleOrderTrackingClick = () => {
    if (user) {
      router.push("/mypage?tab=orders")
    } else {
      router.push("/guest-order")
    }
    scrollToTop()
  }
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
      scrollToTop()
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2" onClick={() => handleLinkClick("/")}>
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-MQ5pMJM88ytq3eQJvj93CCYF4gabLD.png"
              alt="제니스월드 로고"
              className="h-10 w-10 object-contain"
            />
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-green-500 to-purple-600 bg-clip-text text-transparent mr-8">
              ZENITH SHOP
            </span>
          </Link>

          {/* Navigation Menu - Desktop */}
          <div className="hidden md:flex items-center space-x-0.1">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/products" onClick={() => handleLinkClick("/products")}>
                전체상품
              </Link>
            </Button>

            {/* Category Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsCategoryOpen(true)}
              onMouseLeave={() => setIsCategoryOpen(false)}
            >
              <Button variant="ghost" size="sm" className="flex items-center">
                카테고리
                <ChevronDown className="h-3 w-3 ml-1" />
              </Button>

              {/* Category Mega Menu */}
              {isCategoryOpen && (
                <div className="absolute top-full left-0 mt-1 w-[800px] bg-background border rounded-lg shadow-lg z-50">
                  <div className="p-6">
                    <div className="grid grid-cols-5 gap-6">
                      {categories.map((category) => {
                        const Icon = category.icon
                        return (
                          <div key={category.name} className="space-y-3">
                            <div className="flex items-center space-x-2 font-semibold text-sm text-gray-900 border-b pb-2">
                              <Icon className="h-4 w-4 text-blue-600" />
                              <span>{category.name}</span>
                            </div>
                            <div className="space-y-2">
                              {category.subcategories.map((sub) => (
                                <Link
                                  key={sub.name}
                                  href={sub.href}
                                  className="flex items-center space-x-2 p-2 rounded hover:bg-muted transition-colors text-sm text-gray-600 hover:text-gray-900"
                                  onClick={() => {
                                    handleLinkClick(sub.href)
                                    setIsCategoryOpen(false)
                                  }}
                                >
                                  <span>{sub.name}</span>
                                </Link>
                              ))}
                            </div>
                          </div>
                        )
                      })}
                    </div>

                    {/* View All Categories Button */}
                    <div className="mt-6 pt-4 border-t text-center">
                      <Button variant="outline" asChild>
                        <Link href="/products" onClick={() => handleLinkClick("/products")}>
                          <Grid3X3 className="h-4 w-4 mr-2" />
                          전체 카테고리 보기
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Button variant="ghost" size="sm" asChild>
              <Link href="/events" onClick={() => handleLinkClick("/events")}>
                이벤트
              </Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/contact" onClick={() => handleLinkClick("/contact")}>
                고객지원
              </Link>
            </Button>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-md mx-6">
            <form onSubmit={handleSearch} className="flex w-full">
              <Input
                type="search"
                placeholder="상품을 검색해보세요..."
                className="flex-1 rounded-r-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button type="submit" className="rounded-l-none">
                <Search className="h-4 w-4" />
              </Button>
            </form>
          </div>

          {/* User Actions - PC에서만 보임 */}
          <div className="flex items-center space-x-1 hidden md:flex">
            {!user ? (
              <>
                <Button variant="ghost" size="sm" asChild className="inline-flex">
                  <Link href="/login" onClick={() => handleLinkClick("/login")}>
                    <LogIn className="h-4 w-4 mr-1" />
                    로그인
                  </Link>
                </Button>
                <Button variant="ghost" size="sm" asChild className="inline-flex">
                  <Link href="/signup" onClick={() => handleLinkClick("/signup")}>
                    <UserPlus className="h-4 w-4 mr-1" />
                    회원가입
                  </Link>
                </Button>
              </>
            ) : (
              <Button variant="ghost" size="sm" onClick={logout} className="inline-flex">
                <LogIn className="h-4 w-4 mr-1" />
                로그아웃
              </Button>
            )}
            <Button variant="ghost" size="sm" asChild className="inline-flex">
              <Link href={user ? "/mypage" : "/guest-order"} onClick={() => handleLinkClick(user ? "/mypage" : "/guest-order")}>
                <User className="h-4 w-4 mr-1" />
                마이페이지
              </Link>
            </Button>
            <Button variant="ghost" size="sm" className="relative group inline-flex" asChild>
              <Link href="/cart" onClick={() => handleLinkClick("/cart")}>
                <ShoppingCart className="h-4 w-4 mr-1" />
                장바구니
                {user && cartItemsCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-200">
                    {cartItemsCount}
                  </span>
                )}
              </Link>
            </Button>
          </div>

          {/* 햄버거 버튼 - 모바일에서만 보임, 오른쪽 끝에 분리 */}
          <div className="ml-auto md:hidden">
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <SheetTitle className="sr-only">메뉴</SheetTitle>
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between py-4">
                    <h2 className="text-lg font-semibold">메뉴</h2>
                  </div>

                  {/* Mobile Search */}
                  <form onSubmit={handleSearch} className="flex mb-6">
                    <Input
                      type="search"
                      placeholder="상품 검색..."
                      className="flex-1 rounded-r-none"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Button type="submit" className="rounded-l-none">
                      <Search className="h-4 w-4" />
                    </Button>
                  </form>

                  <ScrollArea className="flex-1">
                    <div className="space-y-4">
                      {/* 모바일 전용 로그인/회원가입/로그아웃 버튼 */}
                      <div className="space-y-2 md:hidden">
                        {!user ? (
                          <>
                            <Button variant="outline" className="w-full justify-start" asChild>
                              <Link href="/login" onClick={() => { handleLinkClick("/login"); setIsMenuOpen(false); }}>
                                <LogIn className="h-4 w-4 mr-2" />
                                로그인
                              </Link>
                            </Button>
                            <Button variant="outline" className="w-full justify-start" asChild>
                              <Link href="/signup" onClick={() => { handleLinkClick("/signup"); setIsMenuOpen(false); }}>
                                <UserPlus className="h-4 w-4 mr-2" />
                                회원가입
                              </Link>
                            </Button>
                          </>
                        ) : (
                          <Button variant="outline" className="w-full justify-start" onClick={() => { logout(); setIsMenuOpen(false); }}>
                            <LogIn className="h-4 w-4 mr-2" />
                            로그아웃
                          </Button>
                        )}
                      </div>
                      {/* Mobile Actions */}
                      <div className="space-y-2">
                        <Button
                          variant="ghost"
                          className="w-full justify-start"
                          onClick={() => {
                            handleMyPageClick()
                            setIsMenuOpen(false)
                          }}
                        >
                          <User className="h-4 w-4 mr-2" />
                          {user ? "마이페이지" : "주문조회"}
                        </Button>
                        <Button
                          variant="ghost"
                          className="w-full justify-start"
                          onClick={() => {
                            handleOrderTrackingClick()
                            setIsMenuOpen(false)
                          }}
                        >
                          <Package className="h-4 w-4 mr-2" />
                          배송조회
                        </Button>
                        <Button variant="ghost" className="w-full justify-start relative group" asChild>
                          <Link
                            href="/cart"
                            onClick={() => {
                              handleLinkClick("/cart")
                              setIsMenuOpen(false)
                            }}
                          >
                            <ShoppingCart className="h-4 w-4 mr-2" />
                            장바구니
                            {user && cartItemsCount > 0 && (
                              <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-200">
                                {cartItemsCount}
                              </span>
                            )}
                          </Link>
                        </Button>
                        <Button variant="ghost" className="w-full justify-start" asChild>
                          <Link
                            href="/wishlist"
                            onClick={() => {
                              handleLinkClick("/wishlist")
                              setIsMenuOpen(false)
                            }}
                          >
                            <Heart className="h-4 w-4 mr-2" />
                            위시리스트
                          </Link>
                        </Button>
                      </div>

                      <div className="border-t pt-4">
                        <h3 className="font-medium mb-2">카테고리</h3>
                        <div className="space-y-1">
                          {categories.map((category) => {
                            const Icon = category.icon
                            return (
                              <div key={category.name}>
                                <Button
                                  variant="ghost"
                                  className="w-full justify-start"
                                  onClick={() => {
                                    handleLinkClick(`/products?category=${category.name}`)
                                    setIsMenuOpen(false)
                                  }}
                                >
                                  <Icon className="h-4 w-4 mr-2" />
                                  {category.name}
                                </Button>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    </div>
                  </ScrollArea>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
