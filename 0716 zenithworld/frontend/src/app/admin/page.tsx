"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  BarChart3,
  Package,
  ShoppingCart,
  Users,
  Ticket,
  Truck,
  TrendingUp,
  Megaphone,
  MessageCircle,
  Settings,
  Bell,
  Plus,
  Eye,
  Edit,
  Download,
  ChevronDown,
  Menu,
  X,
  DollarSign,
} from "lucide-react"

const theme = {
  primary: "#ff8c00", // 네온 오렌지
  primaryLight: "#ffedd5",
  primaryDark: "#ea580c",
  accent: "#C5D3E8", // 연한 라벤더
  accentDark: "#9CA3AF",
  background: "#f9fafb",
  surface: "#ffffff",
  text: "#111827",
  textMuted: "#6b7280",
  border: "#e5e7eb",
  success: "#10b981",
  warning: "#f59e0b",
  error: "#ef4444",
}

const menuItems = [
  {
    id: "dashboard",
    name: "대시보드",
    icon: BarChart3,
    items: [
      { name: "매출 요약", path: "/dashboard/sales" },
      { name: "주문 현황", path: "/dashboard/orders" },
      { name: "인기 상품", path: "/dashboard/products" },
      { name: "신규회원", path: "/dashboard/members" },
    ],
  },
  {
    id: "products",
    name: "상품관리",
    icon: Package,
    items: [
      { name: "상품 목록", path: "/products" },
      { name: "상품 등록/수정", path: "/products/edit" },
      { name: "옵션/재고 관리", path: "/products/inventory" },
      { name: "카테고리 관리", path: "/products/categories" },
      { name: "진열/태그 관리", path: "/products/display" },
    ],
  },
  {
    id: "orders",
    name: "주문관리",
    icon: ShoppingCart,
    items: [
      { name: "전체 주문 조회", path: "/orders" },
      { name: "주문 상태 변경", path: "/orders/status" },
      { name: "송장번호 등록", path: "/orders/tracking" },
      { name: "반품/교환/환불", path: "/orders/returns" },
      { name: "CS 메모 관리", path: "/orders/notes" },
    ],
  },
  {
    id: "members",
    name: "회원관리",
    icon: Users,
    items: [
      { name: "회원 목록/검색", path: "/members" },
      { name: "회원 상세정보", path: "/members/details" },
      { name: "등급 관리", path: "/members/grades" },
      { name: "포인트 관리", path: "/members/points" },
      { name: "마케팅 수신 동의", path: "/members/marketing" },
    ],
  },
  {
    id: "coupons",
    name: "쿠폰관리",
    icon: Ticket,
    items: [
      { name: "쿠폰 생성", path: "/coupons/create" },
      { name: "발급 대상 설정", path: "/coupons/targets" },
      { name: "사용 이력 조회", path: "/coupons/history" },
      { name: "자동 발급 설정", path: "/coupons/auto" },
    ],
  },
  {
    id: "shipping",
    name: "배송설정",
    icon: Truck,
    items: [
      { name: "기본 배송비 설정", path: "/shipping/fees" },
      { name: "지역/도서산간", path: "/shipping/regions" },
      { name: "택배사 설정", path: "/shipping/carriers" },
      { name: "출고지/반품지", path: "/shipping/locations" },
    ],
  },
  {
    id: "analytics",
    name: "통계/리포트",
    icon: TrendingUp,
    items: [
      { name: "매출 통계", path: "/analytics/sales" },
      { name: "상품별 판매량", path: "/analytics/products" },
      { name: "회원 유입/이탈", path: "/analytics/members" },
      { name: "이벤트 성과", path: "/analytics/events" },
    ],
  },
  {
    id: "marketing",
    name: "마케팅/기획전",
    icon: Megaphone,
    items: [
      { name: "기획전 등록", path: "/marketing/events" },
      { name: "메인배너/팝업", path: "/marketing/banners" },
      { name: "후기/리뷰 관리", path: "/marketing/reviews" },
    ],
  },
  {
    id: "support",
    name: "고객센터",
    icon: MessageCircle,
    items: [
      { name: "1:1 문의 응대", path: "/support/inquiries" },
      { name: "후기/Q&A 댓글", path: "/support/comments" },
      { name: "FAQ/공지사항", path: "/support/faq" },
    ],
  },
  {
    id: "settlement",
    name: "정산관리",
    icon: DollarSign,
    items: [
      { name: "정산 내역", path: "/settlement/history" },
      { name: "정산 요청", path: "/settlement/request" },
    ],
  },
  {
    id: "admin",
    name: "관리자 설정",
    icon: Settings,
    items: [
      { name: "관리자 계정", path: "/admin/accounts" },
      { name: "권한 그룹 설정", path: "/admin/permissions" },
      { name: "로그인 기록", path: "/admin/logs" },
    ],
  },
]

const permissions = {
  최고관리자: { color: theme.error, access: "모든 기능" },
  상품관리자: { color: theme.primary, access: "상품 관련" },
  주문관리자: { color: theme.success, access: "주문 처리" },
  회원관리자: { color: theme.accent, access: "회원 관리" },
  마케팅관리자: { color: theme.warning, access: "마케팅" },
  고객센터: { color: theme.textMuted, access: "CS 업무" },
}

const dashboardStats = [
  { title: "오늘 매출", value: "₩2,450,000", change: "+12.5%", trend: "up" },
  { title: "신규 주문", value: "156건", change: "+8.2%", trend: "up" },
  { title: "신규 회원", value: "23명", change: "-2.1%", trend: "down" },
  { title: "재고 부족", value: "8개", change: "0%", trend: "neutral" },
]

const recentOrders = [
  { id: "ORD-2024-001", customer: "김철수", amount: "₩125,000", status: "배송완료", time: "2분 전" },
  { id: "ORD-2024-002", customer: "이영희", amount: "₩89,000", status: "배송중", time: "5분 전" },
  { id: "ORD-2024-003", customer: "박민수", amount: "₩234,000", status: "입금대기", time: "12분 전" },
  { id: "ORD-2024-004", customer: "정수진", amount: "₩67,000", status: "취소요청", time: "18분 전" },
]

const statusColors = {
  배송완료: theme.success,
  배송중: theme.primary,
  입금대기: theme.warning,
  취소요청: theme.error,
  처리중: theme.accent,
}

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
  activeMenu: string
  setActiveMenu: (menu: string) => void
}

function Sidebar({ isOpen, onClose, activeMenu, setActiveMenu }: SidebarProps) {
  const [expandedMenu, setExpandedMenu] = useState<string>("dashboard")

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={onClose} />}

      {/* Sidebar */}
      <div
        className={`
        fixed left-0 top-0 h-full w-64 transform transition-transform duration-300 ease-in-out z-50
        lg:translate-x-0 lg:static lg:z-auto
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}
        style={{ backgroundColor: theme.surface, borderRight: `1px solid ${theme.border}` }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4" style={{ borderBottom: `1px solid ${theme.border}` }}>
          <div className="flex items-center space-x-2">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center overflow-hidden"
              style={{ backgroundColor: theme.primary }}
            >
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-MQ5pMJM88ytq3eQJvj93CCYF4gabLD.png"
                alt="제니스 로고"
                className="w-8 h-8 object-contain"
              />
            </div>
            <span className="font-bold text-lg" style={{ color: theme.text }}>
              제니스 쇼핑몰 관리
            </span>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} className="lg:hidden">
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Menu Items */}
        <div className="p-2 space-y-1 overflow-y-auto h-full pb-20">
          {menuItems.map((menu) => {
            const Icon = menu.icon
            const isExpanded = expandedMenu === menu.id
            const isActive = activeMenu === menu.id

            return (
              <div key={menu.id}>
                <button
                  onClick={() => {
                    setExpandedMenu(isExpanded ? "" : menu.id)
                    setActiveMenu(menu.id)
                  }}
                  className={`
                    w-full flex items-center justify-between p-3 rounded-lg text-left transition-all
                    hover:scale-105
                  `}
                  style={{
                    backgroundColor: isActive ? theme.primaryLight : "transparent",
                    color: isActive ? theme.primary : theme.text,
                  }}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{menu.name}</span>
                  </div>
                  <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                </button>

                {/* Submenu */}
                {isExpanded && (
                  <div className="ml-8 mt-1 space-y-1">
                    {menu.items.map((item, index) => (
                      <button
                        key={index}
                        className="w-full text-left p-2 rounded text-sm transition-colors hover:bg-gray-50"
                        style={{ color: theme.textMuted }}
                      >
                        {item.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

function TopBar({ onMenuClick, userRole }: { onMenuClick: () => void; userRole: string }) {
  return (
    <div
      className="flex items-center justify-between p-4"
      style={{
        backgroundColor: theme.surface,
        borderBottom: `1px solid ${theme.border}`,
        boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
      }}
    >
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="sm" onClick={onMenuClick} className="lg:hidden">
          <Menu className="w-5 h-5" />
        </Button>

        <div className="flex items-center space-x-2">
          <Bell className="w-5 h-5" style={{ color: theme.primary }} />
          <Badge style={{ backgroundColor: theme.error, color: "white" }}>3</Badge>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div
          className="hidden md:flex items-center space-x-2 px-3 py-2 rounded-lg"
          style={{ backgroundColor: theme.accent + "40" }}
        >
          <span className="text-sm font-medium" style={{ color: theme.text }}>
            권한: {userRole}
          </span>
          <div
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: permissions[userRole as keyof typeof permissions]?.color }}
          />
        </div>

        <div className="flex items-center space-x-2">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{ backgroundColor: theme.primary }}
          >
            <span className="text-white text-sm font-bold">관</span>
          </div>
          <span className="hidden md:block font-medium" style={{ color: theme.text }}>
            관리자
          </span>
        </div>
      </div>
    </div>
  )
}

function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {dashboardStats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium" style={{ color: theme.textMuted }}>
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold" style={{ color: theme.text }}>
                    {stat.value}
                  </p>
                  <p
                    className={`text-sm ${stat.trend === "up" ? "text-green-600" : stat.trend === "down" ? "text-red-600" : "text-gray-600"}`}
                  >
                    {stat.change}
                  </p>
                </div>
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{
                    backgroundColor:
                      stat.trend === "up"
                        ? theme.success + "20"
                        : stat.trend === "down"
                          ? theme.error + "20"
                          : theme.accent + "20",
                  }}
                >
                  <TrendingUp
                    className={`w-6 h-6 ${stat.trend === "up" ? "text-green-600" : stat.trend === "down" ? "text-red-600" : "text-gray-600"}`}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Orders */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle style={{ color: theme.text }}>최근 주문 현황</CardTitle>
            <div className="flex space-x-2">
              <Button size="sm" style={{ backgroundColor: theme.primary, color: "white" }}>
                <Plus className="w-4 h-4 mr-1" />새 주문
              </Button>
              <Button size="sm" variant="outline">
                <Download className="w-4 h-4 mr-1" />
                내보내기
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentOrders.map((order, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="font-mono text-sm" style={{ color: theme.textMuted }}>
                    {order.id}
                  </div>
                  <div>
                    <div className="font-medium" style={{ color: theme.text }}>
                      {order.customer}
                    </div>
                    <div className="text-sm" style={{ color: theme.textMuted }}>
                      {order.time}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="font-bold" style={{ color: theme.text }}>
                    {order.amount}
                  </div>
                  <Badge
                    style={{
                      backgroundColor: statusColors[order.status as keyof typeof statusColors] + "20",
                      color: statusColors[order.status as keyof typeof statusColors],
                    }}
                  >
                    {order.status}
                  </Badge>
                  <div className="flex space-x-1">
                    <Button size="sm" variant="ghost">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="ghost">
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center">
            <Package className="w-12 h-12 mx-auto mb-4" style={{ color: theme.primary }} />
            <h3 className="font-semibold mb-2" style={{ color: theme.text }}>
              상품 등록
            </h3>
            <p className="text-sm" style={{ color: theme.textMuted }}>
              새로운 상품을 등록하고 관리하세요
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center">
            <Ticket className="w-12 h-12 mx-auto mb-4" style={{ color: theme.accent }} />
            <h3 className="font-semibold mb-2" style={{ color: theme.text }}>
              쿠폰 발급
            </h3>
            <p className="text-sm" style={{ color: theme.textMuted }}>
              고객에게 쿠폰을 발급하세요
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center">
            <Megaphone className="w-12 h-12 mx-auto mb-4" style={{ color: theme.warning }} />
            <h3 className="font-semibold mb-2" style={{ color: theme.text }}>
              기획전 등록
            </h3>
            <p className="text-sm" style={{ color: theme.textMuted }}>
              새로운 이벤트를 기획하세요
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default function EcommerceAdmin() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeMenu, setActiveMenu] = useState("dashboard")
  const [userRole] = useState("최고관리자")

  return (
    <div className="min-h-screen" style={{ backgroundColor: theme.background }}>
      <div className="flex">
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          activeMenu={activeMenu}
          setActiveMenu={setActiveMenu}
        />

        <div className="flex-1 lg:ml-0">
          <TopBar onMenuClick={() => setSidebarOpen(true)} userRole={userRole} />

          <main className="p-6">
            <div className="mb-6">
              <h1 className="text-2xl font-bold mb-2" style={{ color: theme.text }}>
                {menuItems.find((item) => item.id === activeMenu)?.name || "대시보드"}
              </h1>
              <p style={{ color: theme.textMuted }}>실시간 쇼핑몰 운영 현황을 확인하고 관리하세요</p>
            </div>

            <Dashboard />
          </main>
        </div>
      </div>
    </div>
  )
} 