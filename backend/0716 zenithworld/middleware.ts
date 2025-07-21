import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // /admin/login은 인증 체크에서 제외
  if (
    (pathname === "/admin" || pathname.startsWith("/admin/")) &&
    pathname !== "/admin/login"
  ) {
    const token = request.cookies.get("auth-token")?.value
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
