import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function POST(request: NextRequest) {
  try {
    const { userId, password } = await request.json()

    // Django 백엔드 API로 로그인 요청
    const response = await fetch("http://127.0.0.1:8000/api/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: userId,
        password: password,
      }),
    })

    if (response.ok) {
      const data = await response.json()
      
      return NextResponse.json({
        message: "로그인 성공",
        user: {
          id: data.user.id,
          userId: data.user.username,
          name: data.user.name,
        },
        tokens: data.tokens,
      })
    } else {
      const errorData = await response.json()
      return NextResponse.json({ 
        error: errorData.error || "로그인에 실패했습니다." 
      }, { status: response.status })
    }
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ 
      error: "서버 연결 오류가 발생했습니다." 
    }, { status: 500 })
  }
} 