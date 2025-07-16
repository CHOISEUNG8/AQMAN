import { promises as fs } from "fs"
import path from "path"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Shield, ArrowLeft } from "lucide-react"
import Link from "next/link"

async function getPrivacyContent() {
  try {
    const filePath = path.join(process.cwd(), "public", "privacy-policy.txt")
    const content = await fs.readFile(filePath, "utf-8")
    return content
  } catch (error) {
    console.error("Error reading privacy policy content:", error)
    return null
  }
}

function parsePrivacyContent(content: string) {
  const lines = content.split("\n").filter((line) => line.trim() !== "")
  const parsedContent: Array<{ type: string; content: string }> = []

  for (const line of lines) {
    const trimmedLine = line.trim()

    if (trimmedLine.includes("주식회사 제니스코퍼레이션 개인정보처리방침")) {
      parsedContent.push({ type: "title", content: trimmedLine })
    } else if (trimmedLine.match(/^\d+\./)) {
      parsedContent.push({ type: "article", content: trimmedLine })
    } else if (trimmedLine.match(/^[가-힣]\./)) {
      parsedContent.push({ type: "subsection", content: trimmedLine })
    } else if (trimmedLine.startsWith("-")) {
      parsedContent.push({ type: "bullet", content: trimmedLine })
    } else if (trimmedLine.includes("본 방침은")) {
      parsedContent.push({ type: "effective", content: trimmedLine })
    } else if (
      trimmedLine.includes("개인정보보호책임자") ||
      trimmedLine.includes("전화번호") ||
      trimmedLine.includes("이메일") ||
      trimmedLine.includes("담당부서")
    ) {
      parsedContent.push({ type: "contact-info", content: trimmedLine })
    } else {
      parsedContent.push({ type: "paragraph", content: trimmedLine })
    }
  }

  return parsedContent
}

export default async function PrivacyPage() {
  let content: string | null = null
  let parsedContent: Array<{ type: string; content: string }> = []

  try {
    content = await getPrivacyContent()
    if (content) {
      parsedContent = parsePrivacyContent(content)
    }
  } catch (error) {
    console.error("Error in PrivacyPage:", error)
  }

  if (!content || parsedContent.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="p-6 text-center">
            <p className="text-red-600 mb-4">개인정보처리방침을 불러올 수 없습니다.</p>
            <Button asChild>
              <Link href="/">홈으로 돌���가기</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <Button variant="outline" size="sm" asChild className="bg-white/80 backdrop-blur-sm">
              <Link href="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                홈으로
              </Link>
            </Button>
            <div className="h-6 w-px bg-border"></div>
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              <Shield className="w-3 h-3 mr-1" />
              개인정보보호
            </Badge>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent mb-4">
            개인정보처리방침
          </h1>
          <p className="text-xl text-muted-foreground">주식회사 제니스코퍼레이션의 개인정보처리방침을 확인하세요.</p>
        </div>

        {/* Main Content */}
        <Card className="shadow-medium border-0 bg-white/90 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-t-lg">
            <CardTitle className="text-2xl text-slate-900">개인정보처리방침</CardTitle>
            <CardDescription className="text-base">
              최종 수정일: 2025년 10월 25일 | 시행일: 2025년 10월 30일
            </CardDescription>
          </CardHeader>

          <CardContent className="p-8">
            <div className="prose prose-slate max-w-none">
              {parsedContent.map((item, index) => {
                switch (item.type) {
                  case "title":
                    return (
                      <h1
                        key={index}
                        className="text-3xl font-bold text-center text-slate-900 mb-8 pb-4 border-b-2 border-primary/20"
                      >
                        {item.content}
                      </h1>
                    )
                  case "article":
                    return (
                      <h2
                        key={index}
                        className="text-xl font-bold text-slate-900 mt-8 mb-4 pb-2 border-b border-slate-200"
                      >
                        {item.content}
                      </h2>
                    )
                  case "subsection":
                    return (
                      <h3
                        key={index}
                        className="text-lg font-semibold text-slate-800 mt-6 mb-3 bg-slate-50 p-2 rounded"
                      >
                        {item.content}
                      </h3>
                    )
                  case "bullet":
                    return (
                      <p key={index} className="ml-6 mb-1 text-slate-600">
                        {item.content}
                      </p>
                    )
                  case "contact-info":
                    return (
                      <p key={index} className="text-slate-700 mb-1 font-medium">
                        {item.content}
                      </p>
                    )
                  case "effective":
                    return (
                      <div key={index} className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg text-center">
                        <p className="text-green-800 font-semibold">{item.content}</p>
                      </div>
                    )
                  default:
                    return (
                      <p key={index} className="mb-3 text-slate-700 leading-relaxed">
                        {item.content}
                      </p>
                    )
                }
              })}
            </div>

            {/* Contact Information */}
            <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">고객센터 정보</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-slate-600">
                    <strong className="text-slate-800">주소:</strong> 서울특별시 마포구 잔다리로 58, 서경빌딩 6층
                  </p>
                  <p className="text-slate-600">
                    <strong className="text-slate-800">대표전화:</strong> 070-4304-7220
                  </p>
                  <p className="text-slate-600">
                    <strong className="text-slate-800">이메일:</strong> help@zenithworld.co.kr
                  </p>
                </div>
                <div>
                  <p className="text-slate-600">
                    <strong className="text-slate-800">개인정보보호책임자:</strong> 최승영
                  </p>
                  <p className="text-slate-600">
                    <strong className="text-slate-800">담당부서:</strong> 이커머스팀
                  </p>
                </div>
              </div>
              <div className="mt-4">
                <Button
                  asChild
                  className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
                >
                  <Link href="/contact?from=privacy">개인정보 문의하기</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">본 개인정보처리방침은 2025년 10월 30일부터 적용됩니다.</p>
        </div>
      </div>
    </div>
  )
}
