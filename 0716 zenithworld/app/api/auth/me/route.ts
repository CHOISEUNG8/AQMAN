import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { useAuth } from "@/contexts/auth-context"

export async function GET(request: NextRequest) {
  try {
    // 쿠키에서 토큰 가져오기
    const cookieStore = await cookies()
    const token = cookieStore.get("auth-token")?.value

    if (!token) {
      return NextResponse.json({ error: "토큰이 없습니다." }, { status: 401 })
    }

    // Django 백엔드 API로 사용자 정보 요청
    const response = await fetch("http://127.0.0.1:8000/api/user/me/", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })

    if (response.ok) {
      const userData = await response.json()
      return NextResponse.json({
        id: userData.id,
        userId: userData.username,
        name: userData.name,
      })
    } else {
      // 토큰이 유효하지 않으면 쿠키에서 제거
      cookieStore.delete("auth-token")
      return NextResponse.json({ error: "유효하지 않은 토큰입니다." }, { status: 401 })
    }
  } catch (error) {
    console.error("Auth check error:", error)
    return NextResponse.json({ 
      error: "서버 연결 오류가 발생했습니다." 
    }, { status: 500 })
  }
} 