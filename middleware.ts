import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // 마이페이지 접근 시 인증 체크
  if (pathname.startsWith("/mypage")) {
    const token = request.cookies.get("auth-token")?.value

    if (!token) {
      const loginUrl = new URL("/login", request.url)
      loginUrl.searchParams.set("redirect", pathname)
      return NextResponse.redirect(loginUrl)
    }
  }

  // 관리자 페이지 접근 시 인증 및 권한 체크
  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
    const token = request.cookies.get("auth-token")?.value
    if (!token) {
      const loginUrl = new URL("/admin/login", request.url)
      loginUrl.searchParams.set("redirect", pathname)
      return NextResponse.redirect(loginUrl)
    }

    // 관리자 권한 확인 (API 호출)
    // 서버에서 동기적으로 권한 체크를 위해 fetch 사용
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
      const res = await fetch(`${apiUrl}/api/user-info/`, {
        method: "GET",
        headers: { "Authorization": `Bearer ${token}` },
      });
      if (!res.ok) {
        const loginUrl = new URL("/admin/login", request.url)
        loginUrl.searchParams.set("redirect", pathname)
        return NextResponse.redirect(loginUrl)
      }
      const user = await res.json();
      // 관리자 권한이 없으면 리다이렉트
      if (!user.is_staff && user.role !== "Admin") {
        const loginUrl = new URL("/admin/login", request.url)
        loginUrl.searchParams.set("redirect", pathname)
        return NextResponse.redirect(loginUrl)
      }
    } catch (e) {
      const loginUrl = new URL("/admin/login", request.url)
      loginUrl.searchParams.set("redirect", pathname)
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/mypage/:path*", "/admin/:path*"],
}
