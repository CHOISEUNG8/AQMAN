"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Eye, EyeOff, UserPlus, Check } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "../contexts/auth-context"

export default function SignupPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { signup } = useAuth()

  const [formData, setFormData] = useState({
    userId: "", // email을 userId로 변경
    password: "",
    confirmPassword: "",
    name: "",
    phone: "",
    birthYear: "",
    birthMonth: "",
    birthDay: "",
    gender: "",
  })

  const [agreements, setAgreements] = useState({
    all: false,
    terms: false,
    privacy: false,
    marketing: false,
    sms: false,
    email: false,
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // 에러 메시지 제거
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }

    // 비밀번호/비밀번호 확인 일치 검증 (onChange)
    if (name === "password" || name === "confirmPassword") {
      const password = name === "password" ? value : formData.password
      const confirmPassword = name === "confirmPassword" ? value : formData.confirmPassword
      if (confirmPassword && password !== confirmPassword) {
        setErrors((prev) => ({ ...prev, confirmPassword: "비밀번호가 일치하지 않습니다." }))
      } else {
        setErrors((prev) => ({ ...prev, confirmPassword: "" }))
      }
    }
  }

  const handleAllAgreement = (checked: boolean) => {
    setAgreements({
      all: checked,
      terms: checked,
      privacy: checked,
      marketing: checked,
      sms: checked,
      email: checked,
    })
  }

  const handleAgreementChange = (key: keyof typeof agreements, checked: boolean) => {
    const newAgreements = { ...agreements, [key]: checked }

    // 전체동의 상태 업데이트
    const requiredAgreements = ["terms", "privacy"]
    const optionalAgreements = ["marketing", "sms", "email"]
    const allRequired = requiredAgreements.every((k) => newAgreements[k as keyof typeof agreements])
    const allOptional = optionalAgreements.every((k) => newAgreements[k as keyof typeof agreements])
    newAgreements.all = allRequired && allOptional

    setAgreements(newAgreements)
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.userId) {
      newErrors.userId = "아이디를 입력해주세요."
    } else if (formData.userId.length < 4 || formData.userId.length > 20) {
      newErrors.userId = "아이디는 4~20자여야 합니다."
    } else if (!/^[a-zA-Z0-9]+$/.test(formData.userId)) {
      newErrors.userId = "아이디는 영문과 숫자만 사용할 수 있습니다."
    } else if (!/[a-zA-Z]/.test(formData.userId)) {
      newErrors.userId = "아이디에는 영문자가 반드시 포함되어야 합니다."
    }

    if (!formData.password) {
      newErrors.password = "비밀번호를 입력해주세요."
    } else if (formData.password.length < 4 || formData.password.length > 20) {
      newErrors.password = "비밀번호는 4자 이상 20자 이하여야 합니다."
    } else if (!/^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{4,20}$/.test(formData.password)) {
      newErrors.password = "비밀번호는 영문, 숫자, 특수문자만 사용할 수 있습니다."
    } else if (/^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{4,20}$/.test(formData.password)) {
      newErrors.password = "비밀번호는 특수문자만으로 구성할 수 없습니다."
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "비밀번호 확인을 입력해주세요."
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "비밀번호가 일치하지 않습니다."
    }

    if (!formData.name) {
      newErrors.name = "이름을 입력해주세요."
    } else if (/^[ㄱ-ㅎㅏ-ㅣ]+$/.test(formData.name)) {
      newErrors.name = "이름에 자음 또는 모음만 입력할 수 없습니다."
    } else if (!/^[가-힣]+$/.test(formData.name) && !/^[a-zA-Z]+$/.test(formData.name)) {
      newErrors.name = "이름은 한글(완성형) 또는 영문만 입력할 수 있습니다."
    }

    if (!formData.phone) {
      newErrors.phone = "휴대폰번호를 입력해주세요."
    } else if (!/^(010|011|016|017|018|019)\d{7,8}$/.test(formData.phone)) {
      newErrors.phone =
        "휴대폰번호는 010, 011, 016, 017, 018, 019로 시작하고, 숫자 10~11자리만 입력하세요. (하이픈 없이 숫자만 입력)"
    }

    if (!agreements.terms) {
      newErrors.terms = "이용약관에 동의해주세요."
    }
    if (!agreements.privacy) {
      newErrors.privacy = "개인정보 수집 및 이용에 동의해주세요."
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // 휴대폰번호를 010-1234-5678 형식으로 변환
  function formatPhoneForBackend(phone: string) {
    if (phone.length === 11) {
      return phone.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
    } else if (phone.length === 10) {
      return phone.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
    }
    return phone;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsLoading(true)

    try {
      const formattedPhone = formatPhoneForBackend(formData.phone)
      const result = await signup(
        formData.userId, 
        formData.password, 
        formData.name,
        formattedPhone,
        formData.birthYear && formData.birthMonth && formData.birthDay 
          ? `${formData.birthYear}-${formData.birthMonth.padStart(2, '0')}-${formData.birthDay.padStart(2, '0')}`
          : undefined,
        formData.gender
      )
      if (result.success) {
        toast({
          title: "회원가입 성공!",
          description: "회원가입이 완료되었습니다. 완료 페이지로 이동합니다.",
        })
        router.push("/signup/complete")
      } else {
        toast({
          title: "회원가입 실패",
          description: result.error || "회원가입에 실패했습니다. 다시 시도해주세요.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "오류 발생",
        description: "회원가입 중 오류가 발생했습니다.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // 아이디 입력란 onBlur에서 검증
  const handleIdBlur = () => {
    let error = ""
    if (!formData.userId) {
      error = "아이디를 입력해주세요."
    } else if (formData.userId.length < 4 || formData.userId.length > 20) {
      error = "아이디는 4~20자여야 합니다."
    } else if (!/^[a-zA-Z0-9]+$/.test(formData.userId)) {
      error = "아이디는 영문과 숫자만 사용할 수 있습니다."
    } else if (!/[a-zA-Z]/.test(formData.userId)) {
      error = "아이디에는 영문자가 반드시 포함되어야 합니다."
    }
    setErrors((prev) => ({ ...prev, userId: error }))
  }

  // 비밀번호 입력란 onBlur에서 검증
  const handlePasswordBlur = () => {
    let error = ""
    const value = formData.password
    if (!value) {
      error = "비밀번호를 입력해주세요."
    } else if (value.length < 4 || value.length > 20) {
      error = "비밀번호는 4자 이상 20자 이하여야 합니다."
    }
    setErrors((prev) => ({ ...prev, password: error }))
  }

  // 이름 입력란 onBlur에서 검증
  const handleNameBlur = () => {
    let error = ""
    const value = formData.name
    if (!value) {
      error = "이름을 입력해주세요."
    } else if (/^[ㄱ-ㅎㅏ-ㅣ]+$/.test(value)) {
      error = "이름에 자음 또는 모음만 입력할 수 없습니다."
    } else if (!/^[가-힣]+$/.test(value) && !/^[a-zA-Z]+$/.test(value)) {
      error = "이름은 한글(완성형) 또는 영문만 입력할 수 있습니다."
    }
    setErrors((prev) => ({ ...prev, name: error }))
  }

  // 휴대폰번호 하이픈 포맷 함수
  const formatPhone = (value: string) => {
    if (value.length === 10) {
      return value.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3")
    } else if (value.length === 11) {
      return value.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3")
    }
    return value
  }

  // 휴대폰번호 입력 onChange 핸들러
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, "") // 숫자만 허용
    setFormData((prev) => ({ ...prev, phone: value }))
    if (errors.phone) {
      setErrors((prev) => ({ ...prev, phone: "" }))
    }
  }

  // 휴대폰번호 입력란 onBlur에서 검증
  const handlePhoneBlur = () => {
    let error = ""
    const value = formData.phone
    if (!value) {
      error = "휴대폰번호를 입력해주세요."
    } else if (!/^(010|011|016|017|018|019)\d{7,8}$/.test(value)) {
      error =
        "휴대폰번호는 010, 011, 016, 017, 018, 019로 시작하고, 숫자 10~11자리만 입력하세요. (하이픈 없이 숫자만 입력)"
    }
    setErrors((prev) => ({ ...prev, phone: error }))
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <UserPlus className="h-12 w-12 mx-auto mb-4 text-primary" />
          <h1 className="text-3xl font-bold mb-2">회원가입</h1>
          <p className="text-muted-foreground">제니스월드에 오신 것을 환영합니다</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 기본 정보 */}
          <Card>
            <CardHeader>
              <CardTitle>기본 정보</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="userId">아이디 *</Label>
                <Input
                  id="userId"
                  name="userId"
                  placeholder="4~20자, 영문/숫자 조합"
                  value={formData.userId}
                  onChange={handleInputChange}
                  onBlur={handleIdBlur}
                  autoComplete="username"
                  className={errors.userId ? "border-red-500" : ""}
                />
                {errors.userId && <p className="text-sm text-red-500">{errors.userId}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">비밀번호 *</Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="4~20자, 영문/숫자/특수문자 모두 허용"
                    value={formData.password}
                    onChange={handleInputChange}
                    onBlur={handlePasswordBlur}
                    autoComplete="new-password"
                    className={errors.password ? "border-red-500" : ""}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                  </Button>
                </div>
                {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">비밀번호 확인 *</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="비밀번호를 다시 입력해주세요"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    autoComplete="new-password"
                    className={errors.confirmPassword ? "border-red-500" : ""}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                  </Button>
                </div>
                {errors.confirmPassword && <p className="text-sm text-red-500">{errors.confirmPassword}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">이름 *</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="홍길동"
                    value={formData.name}
                    onChange={handleInputChange}
                    onBlur={handleNameBlur}
                    autoComplete="name"
                    className={errors.name ? "border-red-500" : ""}
                  />
                  {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">휴대폰번호 *</Label>
                  <Input
                    id="phone"
                    name="phone"
                    placeholder="숫자만 입력 (예: 01012345678)"
                    value={formatPhone(formData.phone)}
                    onChange={handlePhoneChange}
                    onBlur={handlePhoneBlur}
                    autoComplete="tel"
                    className={errors.phone ? "border-red-500" : ""}
                  />
                  {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>생년월일</Label>
                  <div className="flex gap-2">
                    <Input
                      id="birthYear"
                      name="birthYear"
                      type="number"
                      placeholder="년"
                      min="1900"
                      max={new Date().getFullYear()}
                      value={formData.birthYear}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, birthYear: e.target.value.replace(/[^0-9]/g, "") }))
                      }
                      autoComplete="bday-year"
                      className="w-20"
                    />
                    <span className="self-center">년</span>
                    <Input
                      id="birthMonth"
                      name="birthMonth"
                      type="number"
                      placeholder="월"
                      min="1"
                      max="12"
                      value={formData.birthMonth}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, birthMonth: e.target.value.replace(/[^0-9]/g, "") }))
                      }
                      autoComplete="bday-month"
                      className="w-14"
                    />
                    <span className="self-center">월</span>
                    <Input
                      id="birthDay"
                      name="birthDay"
                      type="number"
                      placeholder="일"
                      min="1"
                      max="31"
                      value={formData.birthDay}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, birthDay: e.target.value.replace(/[^0-9]/g, "") }))
                      }
                      autoComplete="bday-day"
                      className="w-14"
                    />
                    <span className="self-center">일</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gender">성별</Label>
                  <select
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={(e) => setFormData((prev) => ({ ...prev, gender: e.target.value }))}
                    autoComplete="sex"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="">선택하세요</option>
                    <option value="male">남성</option>
                    <option value="female">여성</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 약관 동의 */}
          <Card>
            <CardHeader>
              <CardTitle>약관 동의</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* 전체동의 */}
              <div className="flex items-center space-x-2 p-4 bg-blue-50 rounded-lg">
                <Checkbox id="all-agreement" checked={agreements.all} onCheckedChange={handleAllAgreement} />
                <Label htmlFor="all-agreement" className="font-semibold text-blue-900">
                  전체동의 - 모든 약관을 확인하고 전체 동의합니다.
                </Label>
              </div>
              <Separator />

              {/* 이용약관 동의 (필수) */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="terms-agreement"
                      checked={agreements.terms}
                      onCheckedChange={(checked) => handleAgreementChange("terms", checked as boolean)}
                    />
                    <Label htmlFor="terms-agreement" className="font-medium">
                      이용약관 동의 <span className="text-red-500">(필수)</span>
                    </Label>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/terms">전문보기</Link>
                  </Button>
                </div>
                {errors.terms && <p className="text-sm text-red-500 ml-6">{errors.terms}</p>}
              </div>

              {/* 개인정보 수집 및 이용 동의 (필수) */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="privacy-agreement"
                      checked={agreements.privacy}
                      onCheckedChange={(checked) => handleAgreementChange("privacy", checked as boolean)}
                    />
                    <Label htmlFor="privacy-agreement" className="font-medium">
                      개인정보 수집 및 이용 동의 <span className="text-red-500">(필수)</span>
                    </Label>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/privacy">전문보기</Link>
                  </Button>
                </div>
                {errors.privacy && <p className="text-sm text-red-500 ml-6">{errors.privacy}</p>}

                {/* 개인정보 수집 및 이용 동의 상세 내용 */}
                <div className="ml-6 p-4 bg-gray-50 rounded-lg text-sm">
                  <ScrollArea className="h-48">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">[개인정보 수집 및 이용 동의]</h4>
                        <h5 className="font-medium mb-1">1. 개인정보 수집목적 및 이용목적</h5>
                        <p className="mb-2">
                          <strong>가. 서비스 제공에 관한 계약 이행 및 서비스 제공에 따른 요금정산</strong>
                        </p>
                        <p className="mb-3">
                          콘텐츠 제공, 구매 및 요금 결제, 물품배송 또는 청구지 등 발송, 금융거래 본인 인증 및 금융
                          서비스
                        </p>
                        <p className="mb-2">
                          <strong>나. 회원 관리</strong>
                        </p>
                        <p className="mb-3">
                          회원제 서비스 이용에 따른 본인확인, 개인 식별, 불량회원의 부정 이용 방지와 비인가 사용 방지,
                          가입 의사 확인, 연령확인, 만14세 미만 아동 개인정보 수집 시 법정 대리인 동의여부 확인,
                          불만처리 등 민원처리, 고지사항 전달
                        </p>
                        <h5 className="font-medium mb-1">2. 수집하는 개인정보 항목</h5>
                        <p className="mb-3">
                          이름, 로그인ID, 비밀번호, 이메일, 14세미만 가입자의 경우 법정대리인의 정보
                        </p>
                        <h5 className="font-medium mb-1">3. 개인정보의 보유기간 및 이용기간</h5>
                        <p className="mb-3">
                          원칙적으로, 개인정보 수집 및 이용목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다. 단,
                          다음의 정보에 대해서는 아래의 이유로 명시한 기간 동안 보존합니다.
                        </p>
                        <p className="mb-2">
                          <strong>가. 회사 내부 방침에 의한 정보 보유 사유</strong>
                        </p>
                        <p className="mb-3">o 부정거래 방지 및 쇼핑몰 운영방침에 따른 보관 : 3년</p>
                        <p className="mb-2">
                          <strong>나. 관련 법령에 의한 정보보유 사유</strong>
                        </p>
                        <div className="space-y-2 mb-3">
                          <p>o 계약 또는 청약철회 등에 관한 기록</p>
                          <p className="ml-2">-보존이유 : 전자상거래등에서의소비자보호에관한법률</p>
                          <p className="ml-2">-보존기간 : 5년</p>
                          <p>o 대금 결제 및 재화 등의 공급에 관한 기록</p>
                          <p className="ml-2">-보존이유: 전자상거래등에서의소비자보호에관한법률</p>
                          <p className="ml-2">-보존기간 : 5년</p>
                          <p>o 소비자 불만 또는 분쟁처리에 관한 기록</p>
                          <p className="ml-2">-보존이유 : 전자상거래등에서의소비자보호에관한법률</p>
                          <p className="ml-2">-보존기간 : 3년</p>
                          <p>o 로그 기록</p>
                          <p className="ml-2">-보존이유: 통신비밀보호법</p>
                          <p className="ml-2">-보존기간 : 3개월</p>
                        </div>
                        <p className="text-red-600 font-medium">
                          ※ 동의를 거부할 수 있으나 거부시 회원 가입이 불가능합니다.
                        </p>
                      </div>
                    </div>
                  </ScrollArea>
                </div>
              </div>

              {/* 쇼핑정보 수신 동의 (선택) */}
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="marketing-agreement"
                    checked={agreements.marketing}
                    onCheckedChange={(checked) => handleAgreementChange("marketing", checked as boolean)}
                  />
                  <Label htmlFor="marketing-agreement" className="font-medium">
                    쇼핑정보 수신 동의 <span className="text-gray-500">(선택)</span>
                  </Label>
                </div>

                {/* SMS 수신 동의 */}
                <div className="ml-6 flex items-center space-x-2">
                  <Checkbox
                    id="sms-agreement"
                    checked={agreements.sms}
                    onCheckedChange={(checked) => handleAgreementChange("sms", checked as boolean)}
                  />
                  <Label htmlFor="sms-agreement">
                    SMS 수신 동의 <span className="text-gray-500">(선택)</span>
                  </Label>
                </div>

                {/* 이메일 수신 동의 */}
                <div className="ml-6 flex items-center space-x-2">
                  <Checkbox
                    id="email-agreement"
                    checked={agreements.email}
                    onCheckedChange={(checked) => handleAgreementChange("email", checked as boolean)}
                  />
                  <Label htmlFor="email-agreement">
                    이메일 수신 동의 <span className="text-gray-500">(선택)</span>
                  </Label>
                </div>

                <div className="ml-6 p-4 bg-gray-50 rounded-lg text-sm">
                  <p className="mb-2">
                    할인쿠폰 및 혜택, 이벤트, 신상품 소식 등 쇼핑몰에서 제공하는 유익한 쇼핑정보를 SMS나 이메일로
                    받아보실 수 있습니다. 단, 주문/거래 정보 및 주요 정책과 관련된 내용은 수신동의 여부와 관계없이
                    발송됩니다.
                  </p>
                  <p className="text-gray-600">
                    선택 약관에 동의하지 않으셔도 회원가입은 가능하며, 회원가입 후 회원정보수정 페이지에서 언제든지
                    수신여부를 변경하실 수 있습니다.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 회원가입 버튼 */}
          <div className="space-y-4">
            <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
              <Check className="h-4 w-4 mr-2" />
              {isLoading ? "처리 중..." : "회원가입"}
            </Button>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                이미 계정이 있으신가요?{" "}
                <Link href="/login" className="text-primary hover:underline">
                  로그인
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
