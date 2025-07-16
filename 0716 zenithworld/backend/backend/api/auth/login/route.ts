import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { users, signupLogs } from "../signup/route"

export async function POST(request: NextRequest) {
  try {
    const { userId, password } = await request.json()

    // 1. 회원가입 로그 확인
    const signupLog = signupLogs.find((log) => log.userId === userId && log.success === true)

    if (!signupLog) {
      return NextResponse.json({ error: "회원가입 기록을 찾을 수 없습니다." }, { status: 401 })
    }

    // 2. 사용자 정보 확인
    const user = users.find((u) => u.userId === userId && u.password === password)

    if (!user) {
      return NextResponse.json({ error: "아이디 또는 비밀번호가 올바르지 않습니다." }, { status: 401 })
    }

    // 3. 회원가입 시간과 로그 시간 일치 확인
    const signupTime = new Date(user.signupTime).getTime()
    const logTime = new Date(signupLog.timestamp).getTime()
    const timeDifference = Math.abs(signupTime - logTime)

    // 1분 이내의 차이만 허용 (실제로는 더 엄격하게 설정 가능)
    if (timeDifference > 60000) {
      return NextResponse.json({ error: "회원가입 로그가 일치하지 않습니다." }, { status: 401 })
    }

    // 4. 로그인 성공 - 쿠키 설정
    const cookieStore = await cookies()
    cookieStore.set("auth-token", user.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7, // 7일
    })

    return NextResponse.json({
      message: "로그인 성공",
      user: {
        id: user.id,
        userId: user.userId,
        name: user.name,
      },
    })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "로그인 중 오류가 발생했습니다." }, { status: 500 })
  }
}
