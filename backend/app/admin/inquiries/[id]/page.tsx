"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Clock, CheckCircle, AlertCircle, Mail, Phone, User, Calendar, Send, Save } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

// Mock 데이터
const mockInquiry = {
  id: 1,
  name: "김민수",
  email: "kim@example.com",
  phone: "010-1234-5678",
  category: "order",
  categoryLabel: "주문/배송 문의",
  subject: "배송 지연 문의",
  message:
    "안녕하세요. 지난주에 주문한 상품(주문번호: ORD-2024-001)이 예정일보다 늦게 배송되고 있습니다. 원래는 어제까지 받기로 되어 있었는데, 아직 배송이 시작되지 않은 것 같습니다. 언제쯤 받을 수 있을까요? 급하게 필요한 상품이라 빠른 답변 부탁드립니다.",
  status: "pending",
  createdAt: "2025-01-02 14:30",
  updatedAt: "2025-01-02 14:30",
  adminNotes: "",
  response: "",
}

export default function AdminInquiryDetailPage() {
  const router = useRouter()
  const params = useParams()
  const { toast } = useToast()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [inquiry, setInquiry] = useState(mockInquiry)
  const [status, setStatus] = useState(inquiry.status)
  const [response, setResponse] = useState(inquiry.response)
  const [adminNotes, setAdminNotes] = useState(inquiry.adminNotes)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // 관리자 인증 확인
    const adminToken = document.cookie.includes("admin-token")
    if (!adminToken) {
      router.push("/admin/login")
    } else {
      setIsAuthenticated(true)
    }
  }, [router])

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

  const handleSave = async () => {
    setIsLoading(true)
    try {
      // 실제로는 서버에 저장
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setInquiry({
        ...inquiry,
        status,
        response,
        adminNotes,
        updatedAt: new Date().toLocaleString("ko-KR"),
      })

      toast({
        title: "저장 완료",
        description: "문의 정보가 성공적으로 저장되었습니다.",
      })
    } catch (error) {
      toast({
        title: "저장 실패",
        description: "저장 중 오류가 발생했습니다.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSendResponse = async () => {
    if (!response.trim()) {
      toast({
        title: "답변 내용 필요",
        description: "답변 내용을 입력해주세요.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    try {
      // 실제로는 이메일 발송 및 서버 저장
      await new Promise((resolve) => setTimeout(resolve, 1500))

      setInquiry({
        ...inquiry,
        status: "completed",
        response,
        adminNotes,
        updatedAt: new Date().toLocaleString("ko-KR"),
      })
      setStatus("completed")

      toast({
        title: "답변 발송 완료",
        description: "고객에게 답변이 성공적으로 발송되었습니다.",
      })
    } catch (error) {
      toast({
        title: "발송 실패",
        description: "답변 발송 중 오류가 발생했습니다.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
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
              <Button variant="ghost" size="sm" asChild className="mr-4">
                <Link href="/admin/inquiries">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  문의 목록
                </Link>
              </Button>
              <h1 className="text-2xl font-bold text-slate-900">문의 상세보기</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 문의 내용 */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>문의 내용</CardTitle>
                  {getStatusBadge(inquiry.status)}
                </div>
                <CardDescription>문의 ID: #{inquiry.id}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg mb-2">{inquiry.subject}</h3>
                  <Badge variant="outline">{inquiry.categoryLabel}</Badge>
                </div>

                <Separator />

                <div className="bg-slate-50 p-4 rounded-lg">
                  <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">{inquiry.message}</p>
                </div>

                <div className="flex items-center gap-4 text-sm text-slate-500">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    접수일: {inquiry.createdAt}
                  </div>
                  {inquiry.updatedAt !== inquiry.createdAt && (
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      수정일: {inquiry.updatedAt}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* 답변 작성 */}
            <Card>
              <CardHeader>
                <CardTitle>답변 작성</CardTitle>
                <CardDescription>고객에게 발송될 답변을 작성하세요</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="고객에게 발송할 답변을 작성해주세요..."
                  value={response}
                  onChange={(e) => setResponse(e.target.value)}
                  rows={8}
                  className="resize-none"
                />
                <div className="flex gap-2">
                  <Button onClick={handleSendResponse} disabled={isLoading}>
                    <Send className="w-4 h-4 mr-2" />
                    {isLoading ? "발송 중..." : "답변 발송"}
                  </Button>
                  <Button variant="outline" onClick={handleSave} disabled={isLoading}>
                    <Save className="w-4 h-4 mr-2" />
                    임시 저장
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 사이드바 */}
          <div className="space-y-6">
            {/* 고객 정보 */}
            <Card>
              <CardHeader>
                <CardTitle>고객 정보</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-slate-500" />
                  <span className="font-medium">{inquiry.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-slate-500" />
                  <span className="text-sm">{inquiry.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-slate-500" />
                  <span className="text-sm">{inquiry.phone}</span>
                </div>
              </CardContent>
            </Card>

            {/* 상태 관리 */}
            <Card>
              <CardHeader>
                <CardTitle>상태 관리</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">처리 상태</label>
                  <Select value={status} onValueChange={setStatus}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">대기중</SelectItem>
                      <SelectItem value="processing">처리중</SelectItem>
                      <SelectItem value="completed">완료</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">관리자 메모</label>
                  <Textarea
                    placeholder="내부 메모 (고객에게 표시되지 않음)"
                    value={adminNotes}
                    onChange={(e) => setAdminNotes(e.target.value)}
                    rows={4}
                    className="resize-none"
                  />
                </div>

                <Button onClick={handleSave} disabled={isLoading} className="w-full">
                  <Save className="w-4 h-4 mr-2" />
                  {isLoading ? "저장 중..." : "변경사항 저장"}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
