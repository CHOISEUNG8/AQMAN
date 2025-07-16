import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { users } from "../signup/route"

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const authToken = cookieStore.get("auth-token")

    if (!authToken) {
      return NextResponse.json({ error: "인증 토큰이 없습니다." }, { status: 401 })
    }

    const user = users.find((u) => u.id === authToken.value)

    if (!user) {
      return NextResponse.json({ error: "사용자를 찾을 수 없습니다." }, { status: 401 })
    }

    return NextResponse.json({
      id: user.id,
      userId: user.userId,
      name: user.name,
    })
  } catch (error) {
    console.error("Auth check error:", error)
    return NextResponse.json({ error: "인증 확인 중 오류가 발생했습니다." }, { status: 500 })
  }
}
