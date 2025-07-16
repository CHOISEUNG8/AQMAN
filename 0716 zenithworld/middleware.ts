import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // 어드민 접근 시 인증 체크
  if (pathname.startsWith("/admin")) {
    // 1. 쿠키 기반 인증 (SSR)
    const token = request.cookies.get("auth-token")?.value
    // 2. localStorage는 SSR에서 접근 불가, 클라이언트에서 layout에서 체크됨
    // 쿠키가 없으면 로그인으로 리다이렉트
    if (!token) {
      const loginUrl = new URL("/admin/login", request.url)
      loginUrl.searchParams.set("redirect", pathname)
      return NextResponse.redirect(loginUrl)
    }
  }

  // 기존 마이페이지 인증 체크
  if (pathname.startsWith("/mypage")) {
    const token = request.cookies.get("auth-token")?.value
    if (!token) {
      const loginUrl = new URL("/login", request.url)
      loginUrl.searchParams.set("redirect", pathname)
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/mypage/:path*", "/admin/:path*", "/admin"],
}
