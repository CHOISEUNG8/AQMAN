"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "../contexts/auth-context"

export default function MainPage() {
  const { user, logout, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">로딩 중...</div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">메인 페이지</h1>
          <p className="mt-2 text-gray-600">로그인에 성공했습니다!</p>
        </div>

        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle>사용자 정보</CardTitle>
            <CardDescription>현재 로그인된 사용자의 정보입니다</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <strong>이름:</strong> {user.name}
            </div>
            <div>
              <strong>아이디:</strong> {user.userId}
            </div>
            <div>
              <strong>사용자 ID:</strong> {user.id}
            </div>

            <Button onClick={logout} variant="outline" className="w-full bg-transparent">
              로그아웃
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
