import { type NextRequest, NextResponse } from "next/server"

// 실제 프로젝트에서는 데이터베이스를 사용하세요
// 여기서는 메모리 저장소를 사용합니다
const users: Array<{
  id: string
  userId: string
  password: string
  name: string
  signupTime: string
}> = []

const signupLogs: Array<{
  userId: string
  timestamp: string
  success: boolean
}> = []

export async function POST(request: NextRequest) {
  try {
    const { userId, password, name } = await request.json()

    // 아이디 중복 확인
    const existingUser = users.find((user) => user.userId === userId)
    if (existingUser) {
      return NextResponse.json({ error: "이미 존재하는 아이디입니다." }, { status: 400 })
    }

    // 새 사용자 생성
    const newUser = {
      id: Date.now().toString(),
      userId,
      password, // 실제 프로젝트에서는 해시화해야 합니다
      name,
      signupTime: new Date().toISOString(),
    }

    users.push(newUser)

    // 회원가입 로그 저장
    signupLogs.push({
      userId,
      timestamp: new Date().toISOString(),
      success: true,
    })

    return NextResponse.json({ message: "회원가입이 완료되었습니다." }, { status: 201 })
  } catch (error) {
    console.error("Signup error:", error)
    return NextResponse.json({ error: "회원가입 중 오류가 발생했습니다." }, { status: 500 })
  }
}

// 다른 API에서 사용할 수 있도록 export
export { users, signupLogs }
