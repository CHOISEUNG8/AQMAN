"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Home, Pin, Eye, Calendar } from "lucide-react"

interface Notice {
  id: number
  title: string
  content: string
  category: "공지" | "이벤트" | "시스템" | "배송"
  date: string
  views: number
  isPinned?: boolean
}

const mockNotices: Notice[] = [
  {
    id: 1,
    title: "[중요] 제니스월드 개인정보처리방침 개정 안내",
    content:
      "개인정보보호법 개정에 따른 개인정보처리방침이 2024년 1월 1일부터 개정됩니다. 주요 변경사항을 확인해 주세요.",
    category: "공지",
    date: "2024-01-15",
    views: 1250,
    isPinned: true,
  },
  {
    id: 2,
    title: "[시스템] 정기 점검 안내 (1월 20일 새벽 2시~4시)",
    content:
      "더 나은 서비스 제공을 위한 정기 시스템 점검이 진행됩니다. 점검 시간 동안 일시적으로 서비스 이용이 제한됩니다.",
    category: "시스템",
    date: "2024-01-18",
    views: 890,
    isPinned: true,
  },
  {
    id: 3,
    title: "신년 특가 이벤트 - 최대 70% 할인!",
    content: "2024년 신년을 맞아 전 상품 특가 이벤트를 진행합니다. 이 기회를 놓치지 마세요!",
    category: "이벤트",
    date: "2024-01-10",
    views: 2340,
  },
  {
    id: 4,
    title: "[배송] 설연휴 배송 일정 안내",
    content: "설연휴 기간 중 배송 일정이 변경됩니다. 주문 시 배송 일정을 확인해 주세요.",
    category: "배송",
    date: "2024-01-08",
    views: 567,
  },
  {
    id: 5,
    title: "고객센터 운영시간 변경 안내",
    content: "고객센터 운영시간이 평일 오전 9시부터 오후 6시로 변경됩니다.",
    category: "공지",
    date: "2024-01-05",
    views: 423,
  },
  {
    id: 6,
    title: "모바일 앱 업데이트 안내 (v2.1.0)",
    content: "새로운 기능과 개선사항이 포함된 모바일 앱 업데이트가 출시되었습니다.",
    category: "시스템",
    date: "2024-01-03",
    views: 789,
  },
]

const categories = ["전체", "공지", "이벤트", "시스템", "배송"] as const

export default function NoticesPage() {
  const [selectedCategory, setSelectedCategory] = useState<(typeof categories)[number]>("전체")
  const [isMounted, setIsMounted] = useState(false)

  const handleLinkClick = (href: string) => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  useEffect(() => {
    setIsMounted(true)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [])

  if (!isMounted) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Header Skeleton */}
            <div className="mb-8">
              <div className="h-8 bg-gray-200 rounded w-32 mb-4 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-64 animate-pulse"></div>
            </div>

            {/* Category Filter Skeleton */}
            <div className="flex flex-wrap gap-2 mb-6">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-8 bg-gray-200 rounded w-16 animate-pulse"></div>
              ))}
            </div>

            {/* Notice List Skeleton */}
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="bg-white p-6 rounded-lg border animate-pulse">
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
                  <div className="flex items-center gap-4">
                    <div className="h-4 bg-gray-200 rounded w-16"></div>
                    <div className="h-4 bg-gray-200 rounded w-20"></div>
                    <div className="h-4 bg-gray-200 rounded w-24"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  const filteredNotices =
    selectedCategory === "전체" ? mockNotices : mockNotices.filter((notice) => notice.category === selectedCategory)

  const pinnedNotices = filteredNotices.filter((notice) => notice.isPinned)
  const regularNotices = filteredNotices.filter((notice) => !notice.isPinned)

  const getCategoryColor = (category: Notice["category"]) => {
    switch (category) {
      case "공지":
        return "bg-blue-100 text-blue-800"
      case "이벤트":
        return "bg-green-100 text-green-800"
      case "시스템":
        return "bg-orange-100 text-orange-800"
      case "배송":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-3xl font-bold text-gray-900">공지사항</h1>
              <Button variant="outline" size="sm" asChild>
                <Link href="/" onClick={() => handleLinkClick("/")}>
                  <Home className="h-4 w-4 mr-2" />
                  홈으로
                </Link>
              </Button>
            </div>
            <p className="text-gray-600">제니스월드의 최신 소식과 공지사항을 확인하세요.</p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-6">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="transition-all duration-200"
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Notice List */}
          <div className="space-y-4">
            {/* Pinned Notices */}
            {pinnedNotices.map((notice) => (
              <Card key={notice.id} className="border-red-200 bg-red-50/50">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3 mb-3">
                    <Pin className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="destructive" className="text-xs">
                          고정
                        </Badge>
                        <Badge className={getCategoryColor(notice.category)}>{notice.category}</Badge>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{notice.title}</h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{notice.content}</p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {notice.date}
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          {notice.views.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Regular Notices */}
            {regularNotices.map((notice) => (
              <Card key={notice.id} className="hover:shadow-md transition-shadow duration-200">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className={getCategoryColor(notice.category)}>{notice.category}</Badge>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-blue-600 cursor-pointer">
                    {notice.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{notice.content}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {notice.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      {notice.views.toLocaleString()}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Empty State */}
            {filteredNotices.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Calendar className="h-12 w-12 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">공지사항이 없습니다</h3>
                <p className="text-gray-500">선택한 카테고리에 해당하는 공지사항이 없습니다.</p>
              </div>
            )}
          </div>

          {/* Pagination Placeholder */}
          {filteredNotices.length > 0 && (
            <div className="mt-8 flex justify-center">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" disabled>
                  이전
                </Button>
                <Button variant="default" size="sm">
                  1
                </Button>
                <Button variant="outline" size="sm" disabled>
                  다음
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
