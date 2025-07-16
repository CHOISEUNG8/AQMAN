"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function SignupCompletePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] py-12">
      <h1 className="text-3xl font-bold mb-4">회원가입이 완료되었습니다!</h1>
      <p className="mb-8 text-lg text-muted-foreground">제니스월드에 오신 것을 환영합니다.</p>
      <Button asChild>
        <Link href="/login">
          로그인 하러 가기
        </Link>
      </Button>
    </div>
  )
} 