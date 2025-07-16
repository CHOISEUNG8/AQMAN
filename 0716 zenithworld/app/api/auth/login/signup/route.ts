import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log("Signup API called with data:", body)
    
    const { userId, password, name, phone, birth_date, gender } = body

    // Django 백엔드 API로 회원가입 요청
    const djangoData = {
      username: userId,
      password: password,
      confirm_password: password,
      name: name,
      phone: phone || "",
      birth_date: birth_date || null,
      gender: gender || "",
    }
    
    console.log("Sending to Django:", djangoData)
    
    const response = await fetch("http://127.0.0.1:8000/api/register/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(djangoData),
    })

    console.log("Django response status:", response.status)
    
    if (response.ok) {
      const data = await response.json()
      console.log("Django response data:", data)
      return NextResponse.json({ 
        message: "회원가입이 완료되었습니다.",
        user: data.user 
      }, { status: 201 })
    } else {
      const errorData = await response.json()
      console.log("Django error:", errorData)
      return NextResponse.json({ 
        error: errorData.error || "회원가입에 실패했습니다." 
      }, { status: response.status })
    }
  } catch (error) {
    console.error("Signup error:", error)
    return NextResponse.json({ 
      error: "서버 연결 오류가 발생했습니다." 
    }, { status: 500 })
  }
} 