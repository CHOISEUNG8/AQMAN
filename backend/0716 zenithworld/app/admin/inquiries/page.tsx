"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, Clock, CheckCircle, AlertCircle, ArrowLeft, Eye, Mail, Phone } from "lucide-react"
import Link from "next/link"

// Mock 데이터
const mockInquiries = [
  {
    id: 1,
    name: "김민수",
    email: "kim@example.com",
    phone: "010-1234-5678",
    category: "order",
    categoryLabel: "주문/배송 문의",
    subject: "배송 지연 문의",
    message: "주문한 상품이 예정일보다 늦게 배송되고 있습니다. 언제쯤 받을 수 있을까요?",
    status: "pending",
    createdAt: "2025-01-02 14:30",
    updatedAt: "2025-01-02 14:30",
  },
  {
    id: 2,
    name: "이영희",
    email: "lee@example.com",
    phone: "010-2345-6789",
    category: "product",
    categoryLabel: "상품 문의",
    subject: "상품 교환 요청",
    message: "받은 상품에 하자가 있어서 교환을 요청드립니다. 어떻게 진행하면 될까요?",
    status: "processing",
    createdAt: "2025-01-02 13:15",
    updatedAt: "2025-01-02 15:20",
  },
  {
    id: 3,
    name: "박철수",
    email: "park@example.com",
    phone: "010-3456-7890",
    category: "payment",
    categoryLabel: "결제 문의",
    subject: "결제 오류 신고",
    message: "결제가 완료되었는데 주문이 취소되었다고 나옵니다. 확인 부탁드립니다.",
    status: "completed",
    createdAt: "2025-01-02 11:45",
    updatedAt: "2025-01-02 16:30",
  },
  {
    id: 4,
    name: "정수진",
    email: "jung@example.com",
    phone: "010-4567-8901",
    category: "privacy",
    categoryLabel: "개인정보 문의",
    subject: "개인정보 수정 요청",
    message: "회원정보에서 주소를 변경하고 싶은데 방법을 알려주세요.",
    status: "pending",
    createdAt: "2025-01-02 10:20",
    updatedAt: "2025-01-02 10:20",
  },
  {
    id: 5,
    name: "최영수",
    email: "choi@example.com",
    phone: "010-5678-9012",
    category: "member",
    categoryLabel: "회원 문의",
    subject: "로그인 문제",
    message: "비밀번호를 잊어버려서 로그인이 안됩니다. 재설정 방법을 알려주세요.",
    status: "processing",
    createdAt: "2025-01-01 16:45",
    updatedAt: "2025-01-02 09:15",
  },
]

export default function AdminInquiriesPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [inquiries, setInquiries] = useState(mockInquiries)
  const [filteredInquiries, setFilteredInquiries] = useState(mockInquiries)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")

  useEffect(() => {
    // 관리자 인증 확인
    const adminToken = document.cookie.includes("admin-token")
    if (!adminToken) {
      router.push("/admin/login")
    } else {
      setIsAuthenticated(true)
    }
  }, [router])

  useEffect(() => {
    // 필터링 로직
    let filtered = inquiries

    if (searchQuery) {
      filtered = filtered.filter(
        (inquiry) =>
          inquiry.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          inquiry.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          inquiry.subject.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((inquiry) => inquiry.status === statusFilter)
    }

    if (categoryFilter !== "all") {
      filtered = filtered.filter((inquiry) => inquiry.category === categoryFilter)
    }

    setFilteredInquiries(filtered)
  }, [searchQuery, statusFilter, categoryFilter, inquiries])

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

  const getStatusCount = (status: string) => {
    if (status === "all") return inquiries.length
    return inquiries.filter((inquiry) => inquiry.status === status).length
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
              <Button variant="ghost" size="sm" asChild className="mr-4">
                <Link href="/admin/dashboard">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  대시보드
                </Link>
              </Button>
              <h1 className="text-2xl font-bold text-slate-900">문의 관리</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>문의 검색 및 필터</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="이름, 이메일, 제목 검색..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="상태 선택" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">전체 상태 ({getStatusCount("all")})</SelectItem>
                  <SelectItem value="pending">대기중 ({getStatusCount("pending")})</SelectItem>
                  <SelectItem value="processing">처리중 ({getStatusCount("processing")})</SelectItem>
                  <SelectItem value="completed">완료 ({getStatusCount("completed")})</SelectItem>
                </SelectContent>
              </Select>

              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="카테고리 선택" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">전체 카테고리</SelectItem>
                  <SelectItem value="order">주문/배송 문의</SelectItem>
                  <SelectItem value="product">상품 문의</SelectItem>
                  <SelectItem value="payment">결제 문의</SelectItem>
                  <SelectItem value="member">회원 문의</SelectItem>
                  <SelectItem value="privacy">개인정보 문의</SelectItem>
                  <SelectItem value="other">기타 문의</SelectItem>
                </SelectContent>
              </Select>

              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery("")
                  setStatusFilter("all")
                  setCategoryFilter("all")
                }}
                className="bg-transparent"
              >
                <Filter className="w-4 h-4 mr-2" />
                초기화
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Inquiries List */}
        <Card>
          <CardHeader>
            <CardTitle>문의 목록</CardTitle>
            <CardDescription>총 {filteredInquiries.length}건의 문의가 있습니다</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredInquiries.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">검색 조건에 맞는 문의가 없습니다.</div>
              ) : (
                filteredInquiries.map((inquiry) => (
                  <div key={inquiry.id} className="border rounded-lg p-4 hover:bg-slate-50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-semibold text-lg">{inquiry.name}</span>
                          <Badge variant="outline" className="text-xs">
                            {inquiry.categoryLabel}
                          </Badge>
                          {getStatusBadge(inquiry.status)}
                        </div>

                        <h3 className="font-medium text-slate-900 mb-2">{inquiry.subject}</h3>

                        <p className="text-slate-600 text-sm mb-3 line-clamp-2">{inquiry.message}</p>

                        <div className="flex items-center gap-4 text-xs text-slate-500">
                          <div className="flex items-center gap-1">
                            <Mail className="w-3 h-3" />
                            {inquiry.email}
                          </div>
                          <div className="flex items-center gap-1">
                            <Phone className="w-3 h-3" />
                            {inquiry.phone}
                          </div>
                          <span>접수: {inquiry.createdAt}</span>
                          {inquiry.updatedAt !== inquiry.createdAt && <span>수정: {inquiry.updatedAt}</span>}
                        </div>
                      </div>

                      <div className="ml-4">
                        <Button size="sm" asChild>
                          <Link href={`/admin/inquiries/${inquiry.id}`}>
                            <Eye className="w-4 h-4 mr-2" />
                            상세보기
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
