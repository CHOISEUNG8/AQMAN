import { promises as fs } from "fs"
import path from "path"
import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "이용약관 - ZENITH WORLD",
  description: "제니스월드 온라인 쇼핑몰 이용약관을 확인하세요.",
}

async function getTermsContent() {
  try {
    const filePath = path.join(process.cwd(), "public", "terms-of-service.txt")
    const fileContent = await fs.readFile(filePath, "utf8")
    return fileContent
  } catch (error) {
    console.error("Error reading terms content:", error)
    return null
  }
}

export default async function TermsPage() {
  const termsContent = await getTermsContent()

  if (!termsContent) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">이용약관</h1>
              <div className="text-center text-gray-500">
                <p>이용약관을 불러오는 중 오류가 발생했습니다.</p>
                <p className="mt-2">잠시 후 다시 시도해 주세요.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // 텍스트를 섹션별로 분리
  const sections = termsContent.split("\n\n").filter((section) => section.trim())

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* 뒤로가기 버튼 */}
          <div className="mb-6">
            <Button variant="outline" asChild>
              <Link href="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                홈으로 돌아가기
              </Link>
            </Button>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">이용약관</h1>

            <div className="prose prose-gray max-w-none">
              {sections.map((section, index) => {
                const lines = section.split("\n").filter((line) => line.trim())

                return (
                  <div key={index} className="mb-8">
                    {lines.map((line, lineIndex) => {
                      const trimmedLine = line.trim()

                      // 메인 제목
                      if (trimmedLine === "제니스월드 온라인 쇼핑몰 이용약관") {
                        return null // 이미 h1으로 표시됨
                      }

                      // 제목 (제1조, 제2조 등)
                      if (trimmedLine.startsWith("제") && trimmedLine.includes("조")) {
                        return (
                          <h2
                            key={lineIndex}
                            className="text-xl font-semibold text-gray-900 mt-8 mb-4 border-b border-gray-200 pb-2"
                          >
                            {trimmedLine}
                          </h2>
                        )
                      }

                      // 부제목 (연락처, 부칙 등)
                      if (trimmedLine === "연락처" || trimmedLine === "부칙" || trimmedLine.startsWith("(시행일)")) {
                        return (
                          <h3
                            key={lineIndex}
                            className="text-lg font-semibold text-gray-800 mt-8 mb-4 bg-gray-50 p-3 rounded"
                          >
                            {trimmedLine}
                          </h3>
                        )
                      }

                      // 번호가 있는 항목 (1., 2., 가., 나. 등)
                      if (/^[0-9]+\./.test(trimmedLine) || /^[가-힣]\./.test(trimmedLine)) {
                        return (
                          <div key={lineIndex} className="ml-6 mb-3">
                            <p className="text-gray-700 leading-relaxed">{trimmedLine}</p>
                          </div>
                        )
                      }

                      // 연락처 정보
                      if (
                        trimmedLine.startsWith("전화:") ||
                        trimmedLine.startsWith("이메일:") ||
                        trimmedLine.startsWith("주소:")
                      ) {
                        return (
                          <p key={lineIndex} className="text-gray-700 leading-relaxed mb-2 ml-4 font-medium">
                            {trimmedLine}
                          </p>
                        )
                      }

                      // 일반 텍스트
                      return (
                        <p key={lineIndex} className="text-gray-700 leading-relaxed mb-4">
                          {trimmedLine}
                        </p>
                      )
                    })}
                  </div>
                )
              })}
            </div>

            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blue-900 mb-3">문의사항이 있으시나요?</h3>
                <p className="text-blue-800 mb-4">
                  이용약관에 대한 궁금한 점이 있으시면 언제든지 고객센터로 연락해 주세요.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center">
                    <span className="font-medium text-blue-900 min-w-[50px]">전화:</span>
                    <span className="ml-2 text-blue-800">070-4304-7220</span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-medium text-blue-900 min-w-[50px]">이메일:</span>
                    <span className="ml-2 text-blue-800">help@zenithworld.com</span>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex items-start">
                    <span className="font-medium text-blue-900 min-w-[50px]">주소:</span>
                    <span className="ml-2 text-blue-800">서울특별시 마포구 잔다리로 58, 서경빌딩 6층</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
