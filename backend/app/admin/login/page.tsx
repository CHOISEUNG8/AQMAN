"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Package,
  Eye,
  EyeOff,
  Lock,
  User,
  Shield,
  ArrowRight,
  AlertCircle,
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

// 관리자 계정 데이터 (admin page에서 가져온 데이터)
const adminAccounts = [
  {
    id: "admin001",
    adminId: "admin@company.com",
    username: "zwadmin",
    password: "0045", // 실제 환경에서는 해시된 비밀번호 사용
    name: "김관리",
    role: "Admin",
    lastLogin: "2024-01-15 14:30",
    status: "활성",
  },
  {
    id: "admin002",
    adminId: "product.manager@company.com",
    username: "product_manager",
    password: "product123",
    name: "이상품",
    role: "Product",
    lastLogin: "2024-01-15 10:15",
    status: "활성",
  },
  {
    id: "admin003",
    adminId: "order.manager@company.com",
    username: "order_manager",
    password: "order123",
    name: "박주문",
    role: "Order",
    lastLogin: "2024-01-14 16:45",
    status: "활성",
  },
  {
    id: "admin004",
    adminId: "member.manager@company.com",
    username: "member_manager",
    password: "member123",
    name: "최회원",
    role: "Member",
    lastLogin: "2024-01-13 09:20",
    status: "활성",
  },
  {
    id: "admin005",
    adminId: "marketing@company.com",
    username: "marketing_team",
    password: "marketing123",
    name: "정마케팅",
    role: "Marketing",
    lastLogin: "2024-01-12 11:30",
    status: "활성",
  },
  {
    id: "admin006",
    adminId: "support@company.com",
    username: "cs_support",
    password: "support123",
    name: "한상담",
    role: "Support",
    lastLogin: "2024-01-11 13:45",
    status: "비활성",
  },
]

export default function AdminLogin() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    rememberMe: false,
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    // 에러 메시지 초기화
    if (error) setError("")
  }

  // 관리자 계정 검증 함수
  const validateAdminAccount = (username: string, password: string) => {
    const account = adminAccounts.find(acc => 
      (acc.username === username || acc.adminId === username) && 
      acc.password === password &&
      acc.status === "활성"
    )
    return account
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // 간단한 유효성 검사
    if (!formData.username || !formData.password) {
      setError("아이디와 비밀번호를 모두 입력해주세요.")
      setIsLoading(false)
      return
    }

    try {
      // 관리자 계정 검증
      const validatedAccount = validateAdminAccount(formData.username, formData.password)
      
      if (!validatedAccount) {
        setError("아이디 또는 비밀번호가 올바르지 않습니다. 다시 확인해주세요.")
        setIsLoading(false)
        return
      }

      // 로그인 성공 시 사용자 정보 저장
      const adminUser = {
        id: validatedAccount.id,
        adminId: validatedAccount.adminId,
        username: validatedAccount.username,
        name: validatedAccount.name,
        role: validatedAccount.role,
      }

      // 로컬 스토리지에 관리자 정보 저장
      localStorage.setItem('admin_user', JSON.stringify(adminUser))
      localStorage.setItem('admin_role', validatedAccount.role)
      
      // 로그인 시간 업데이트 (실제 환경에서는 서버에서 처리)
      const now = new Date().toISOString().slice(0, 19).replace('T', ' ')
      
      // 임시 로그인 시뮬레이션
      await new Promise(resolve => setTimeout(resolve, 1000))

      // 로그인 성공 시 리다이렉트
      router.push("/admin")
    } catch (err) {
      setError("로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4"
      style={{ 
        backgroundColor: theme.background,
        backgroundImage: `
          radial-gradient(circle at 20% 80%, ${theme.primary}15 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, ${theme.accent}15 0%, transparent 50%),
          radial-gradient(circle at 40% 40%, ${theme.primary}10 0%, transparent 50%)
        `
      }}
    >
      <div className="w-full max-w-md">
        {/* 로고 및 헤더 */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4" 
               style={{ backgroundColor: theme.primary, boxShadow: `0 8px 32px ${theme.primary}40` }}>
            <Package className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold mb-2" style={{ color: theme.text }}>
            관리자 로그인
          </h1>
          <p className="text-sm" style={{ color: theme.textMuted }}>
            쇼핑몰 관리 시스템에 접속하세요
          </p>
        </div>

        {/* 로그인 카드 */}
        <Card className="shadow-2xl border-0" style={{ backgroundColor: theme.surface }}>
          <CardHeader className="pb-6">
            <CardTitle className="text-center text-lg" style={{ color: theme.text }}>
              계정 정보 입력
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* 에러 메시지 */}
              {error && (
                <Alert style={{ borderColor: theme.error, backgroundColor: theme.error + "10" }}>
                  <AlertCircle className="h-4 w-4" style={{ color: theme.error }} />
                  <AlertDescription style={{ color: theme.error }}>
                    {error}
                  </AlertDescription>
                </Alert>
              )}

              {/* 아이디 입력 */}
              <div className="space-y-2">
                <Label htmlFor="username" className="text-sm font-medium" style={{ color: theme.text }}>
                  아이디
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4" 
                        style={{ color: theme.textMuted }} />
                  <Input
                    id="username"
                    type="text"
                    placeholder="관리자 아이디를 입력하세요"
                    value={formData.username}
                    onChange={(e) => handleInputChange("username", e.target.value)}
                    className="pl-10 h-12 border-2 transition-all focus:border-2"
                    style={{
                      borderColor: theme.border,
                      backgroundColor: theme.background,
                      color: theme.text,
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = theme.primary
                      e.target.style.backgroundColor = theme.surface
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = theme.border
                      e.target.style.backgroundColor = theme.background
                    }}
                  />
                </div>
              </div>

              {/* 비밀번호 입력 */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium" style={{ color: theme.text }}>
                  비밀번호
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4" 
                        style={{ color: theme.textMuted }} />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="비밀번호를 입력하세요"
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    className="pl-10 pr-10 h-12 border-2 transition-all focus:border-2"
                    style={{
                      borderColor: theme.border,
                      backgroundColor: theme.background,
                      color: theme.text,
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = theme.primary
                      e.target.style.backgroundColor = theme.surface
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = theme.border
                      e.target.style.backgroundColor = theme.background
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-md hover:bg-gray-100 transition-colors"
                    style={{ color: theme.textMuted }}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* 추가 옵션 */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="rememberMe"
                    checked={formData.rememberMe}
                    onCheckedChange={(checked) => handleInputChange("rememberMe", checked as boolean)}
                    style={{ 
                      borderColor: theme.border,
                      backgroundColor: formData.rememberMe ? theme.primary : theme.surface 
                    }}
                  />
                  <Label 
                    htmlFor="rememberMe" 
                    className="text-sm cursor-pointer"
                    style={{ color: theme.textMuted }}
                  >
                    로그인 상태 유지
                  </Label>
                </div>
                <button
                  type="button"
                  className="text-sm hover:underline transition-colors"
                  style={{ color: theme.primary }}
                >
                  비밀번호 찾기
                </button>
              </div>

              {/* 로그인 버튼 */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 text-base font-medium transition-all duration-300 hover:scale-105 disabled:scale-100"
                style={{ 
                  backgroundColor: theme.primary,
                  color: "white",
                  boxShadow: `0 4px 16px ${theme.primary}40`
                }}
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>로그인 중...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Shield className="w-4 h-4" />
                    <span>관리자 로그인</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                )}
              </Button>
            </form>

            {/* 보안 안내 */}
            <div className="text-center pt-4 border-t" style={{ borderColor: theme.border }}>
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Shield className="w-4 h-4" style={{ color: theme.primary }} />
                <span className="text-sm font-medium" style={{ color: theme.text }}>
                  보안 접속
                </span>
              </div>
              <p className="text-xs" style={{ color: theme.textMuted }}>
                모든 데이터는 암호화되어 안전하게 전송됩니다
              </p>
            </div>

            {/* 테스트 계정 안내 */}
            <div className="mt-4 p-3 rounded-lg border" style={{ 
              backgroundColor: theme.primaryLight + "20", 
              borderColor: theme.primary + "30" 
            }}>
              <div className="flex items-center space-x-2 mb-2">
                <AlertCircle className="w-4 h-4" style={{ color: theme.primary }} />
                <span className="text-sm font-medium" style={{ color: theme.text }}>
                  테스트 계정 정보
                </span>
              </div>
              <div className="text-xs space-y-1" style={{ color: theme.textMuted }}>
                <p><strong>최고관리자:</strong> zwadmin / 0045</p>
                <p><strong>상품관리자:</strong> product / 0045</p>
                <p><strong>주문관리자:</strong> order / 0045</p>
                <p><strong>회원관리자:</strong> member / 0045</p>
                <p><strong>마케팅관리자:</strong> marketing / 0045</p>
                <p><strong>고객센터담당자:</strong> cssupport / 0045</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 하단 정보 */}
        <div className="text-center mt-6">
          <p className="text-xs" style={{ color: theme.textMuted }}>
            © 2024 쇼핑몰 관리 시스템. 모든 권리 보유.
          </p>
        </div>
      </div>
    </div>
  )
}
