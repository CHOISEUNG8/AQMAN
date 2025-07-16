import { type NextRequest, NextResponse } from "next/server"
import { signupLogs } from "../signup/route"

export async function POST(request: NextRequest) {
  try {
    const { userId } = await request.json()

    const signupLog = signupLogs.find((log) => log.userId === userId && log.success === true)

    if (!signupLog) {
      return NextResponse.json({ error: "회원가입 로그를 찾을 수 없습니다." }, { status: 404 })
    }

    return NextResponse.json({
      message: "회원가입 로그 확인 완료",
      signupTime: signupLog.timestamp,
    })
  } catch (error) {
    console.error("Verify signup error:", error)
    return NextResponse.json({ error: "회원가입 로그 확인 중 오류가 발생했습니다." }, { status: 500 })
  }
}
