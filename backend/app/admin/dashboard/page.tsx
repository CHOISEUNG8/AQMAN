"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  MessageCircle,
  Users,
  ShoppingCart,
  Clock,
  CheckCircle,
  AlertCircle,
  LogOut,
  Settings,
  Bell,
} from "lucide-react"
import Link from "next/link"

// Mock 데이터
const dashboardStats = {
  totalInquiries: 156,
  pendingInquiries: 23,
  completedInquiries: 133,
  totalUsers: 1247,
  totalOrders: 892,
  todayInquiries: 8,
}

const recentInquiries = [
  {
    id: 1,
    name: "김민수",
    email: "kim@example.com",
    category: "주문/배송 문의",
    subject: "배송 지연 문의",
    status: "pending",
    createdAt: "2025-01-02 14:30",
  },
  {
    id: 2,
    name: "이영희",
    email: "lee@example.com",
    category: "상품 문의",
    subject: "상품 교환 요청",
    status: "processing",
    createdAt: "2025-01-02 13:15",
  },
  {
    id: 3,
    name: "박철수",
    email: "park@example.com",
    category: "결제 문의",
    subject: "결제 오류 신고",
    status: "completed",
    createdAt: "2025-01-02 11:45",
  },
  {
    id: 4,
    name: "정수진",
    email: "jung@example.com",
    category: "개인정보 문의",
    subject: "개인정보 수정 요청",
    status: "pending",
    createdAt: "2025-01-02 10:20",
  },
]

export default function AdminDashboard() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // 관리자 인증 확인
    const adminToken = document.cookie.includes("admin-token")
    if (!adminToken) {
      router.push("/admin/login")
    } else {
      setIsAuthenticated(true)
    }
  }, [router])

  const handleLogout = () => {
    document.cookie = "admin-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
    router.push("/admin/login")
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="destructive" className="bg-red-500">
            <Clock className="w-3 h-3 mr-1" />
            대기중
          </Badge>
        )
      case "processing":
        return (
          <Badge variant="secondary" className="bg-yellow-500">
            <AlertCircle className="w-3 h-3 mr-1" />
            처리중
          </Badge>
        )
      case "completed":
        return (
          <Badge className="bg-green-500">
            <CheckCircle className="w-3 h-3 mr-1" />
            완료
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>인증 확인 중...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-slate-900">ZENITH WORLD</h1>
              <Badge className="ml-3 bg-blue-600">Admin</Badge>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Bell className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Settings className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                로그아웃
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-2">관리자 대시보드</h2>
          <p className="text-slate-600">고객 문의 및 사이트 현황을 관리하세요</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">전체 문의</CardTitle>
              <MessageCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardStats.totalInquiries}</div>
              <p className="text-xs text-muted-foreground">오늘 +{dashboardStats.todayInquiries}건</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">대기중 문의</CardTitle>
              <Clock className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{dashboardStats.pendingInquiries}</div>
              <p className="text-xs text-muted-foreground">처리 필요</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">완료된 문의</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{dashboardStats.completedInquiries}</div>
              <p className="text-xs text-muted-foreground">처리 완료</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">전체 회원</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardStats.totalUsers}</div>
              <p className="text-xs text-muted-foreground">활성 회원</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>빠른 작업</CardTitle>
              <CardDescription>자주 사용하는 기능들</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button asChild className="w-full justify-start">
                <Link href="/admin/inquiries">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  문의 관리
                </Link>
              </Button>
              <Button variant="outline" asChild className="w-full justify-start bg-transparent">
                <Link href="/admin/users">
                  <Users className="w-4 h-4 mr-2" />
                  회원 관리
                </Link>
              </Button>
              <Button variant="outline" asChild className="w-full justify-start bg-transparent">
                <Link href="/admin/orders">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  주문 관리
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Recent Inquiries */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>최근 문의</CardTitle>
              <CardDescription>최근 접수된 고객 문의 내역</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentInquiries.map((inquiry) => (
                  <div
                    key={inquiry.id}
                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium">{inquiry.name}</span>
                        <Badge variant="outline" className="text-xs">
                          {inquiry.category}
                        </Badge>
                      </div>
                      <p className="text-sm text-slate-600 mb-1">{inquiry.subject}</p>
                      <p className="text-xs text-slate-500">{inquiry.createdAt}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusBadge(inquiry.status)}
                      <Button size="sm" variant="outline" asChild>
                        <Link href={`/admin/inquiries/${inquiry.id}`}>보기</Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <Button variant="outline" asChild className="w-full bg-transparent">
                  <Link href="/admin/inquiries">전체 문의 보기</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
