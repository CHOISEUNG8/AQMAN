"use client"

import { useState } from "react"
import { useAuth } from "@/hooks/useAuth"
import { apiRequest } from "@/lib/api"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function ApiTestPage() {
  const { user, isAuthenticated, login, logout } = useAuth()
  const [testResult, setTestResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    username: "zwadmin",
    password: "0045"
  })

  const handleLogin = async () => {
    setLoading(true)
    try {
      const result = await login(formData.username, formData.password)
      setTestResult({
        type: "login",
        success: result.success,
        error: result.error,
        user: result.success ? user : null
      })
    } catch (error) {
      setTestResult({
        type: "login",
        success: false,
        error: error instanceof Error ? error.message : "Unknown error"
      })
    } finally {
      setLoading(false)
    }
  }

  const handleTestUserInfo = async () => {
    setLoading(true)
    try {
      const userInfo = await apiRequest('/api/user-info/')
      setTestResult({
        type: "user-info",
        success: true,
        data: userInfo
      })
    } catch (error) {
      setTestResult({
        type: "user-info",
        success: false,
        error: error instanceof Error ? error.message : "Unknown error"
      })
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    logout()
    setTestResult({
      type: "logout",
      success: true,
      message: "로그아웃 완료"
    })
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">API 연동 테스트</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>인증 상태</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p><strong>인증 상태:</strong> {isAuthenticated ? "로그인됨" : "로그아웃됨"}</p>
            {user && (
              <div>
                <p><strong>사용자:</strong> {user.name} ({user.username})</p>
                <p><strong>이메일:</strong> {user.email}</p>
                <p><strong>관리자 권한:</strong> {user.is_staff ? "예" : "아니오"}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {!isAuthenticated && (
        <Card>
          <CardHeader>
            <CardTitle>로그인 테스트</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="username">사용자명</Label>
                <Input
                  id="username"
                  value={formData.username}
                  onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="password">비밀번호</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                />
              </div>
              <Button onClick={handleLogin} disabled={loading}>
                {loading ? "로그인 중..." : "로그인"}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {isAuthenticated && (
        <Card>
          <CardHeader>
            <CardTitle>API 테스트</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Button onClick={handleTestUserInfo} disabled={loading}>
                {loading ? "요청 중..." : "사용자 정보 가져오기"}
              </Button>
              <Button onClick={handleLogout} variant="outline">
                로그아웃
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {testResult && (
        <Card>
          <CardHeader>
            <CardTitle>테스트 결과</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="bg-gray-100 p-4 rounded overflow-auto">
              {JSON.stringify(testResult, null, 2)}
            </pre>
          </CardContent>
        </Card>
      )}
    </div>
  )
} 