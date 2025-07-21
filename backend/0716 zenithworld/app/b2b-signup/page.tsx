"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Building2, Upload, Eye, EyeOff } from "lucide-react"

export default function B2BSignupPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [showTermsModal, setShowTermsModal] = useState(false)
  const [showPrivacyModal, setShowPrivacyModal] = useState(false)
  const [formData, setFormData] = useState({
    // 회사 정보
    companyName: "",
    businessNumber: "",
    representativeName: "",
    companyPhone: "",
    companyAddress: "",
    detailAddress: "",
    businessType: "",
    establishedYear: "",
    employeeCount: "",
    monthlySales: "",
    businessDescription: "",

    // 담당자 정보
    managerName: "",
    managerEmail: "",
    managerPhone: "",
    department: "",
    position: "",

    // 계정 정보
    loginId: "",
    password: "",
    confirmPassword: "",

    // 약관 동의
    agreeTerms: false,
    agreePrivacy: false,
    agreeMarketing: false,
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // 에러 메시지 제거
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const validateBusinessNumber = (number: string) => {
    const regex = /^\d{3}-\d{2}-\d{5}$/
    return regex.test(number)
  }

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
  }

  const validatePhone = (phone: string) => {
    const regex = /^01[0-9]-\d{4}-\d{4}$/
    return regex.test(phone)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: Record<string, string> = {}

    // 필수 필드 검증
    if (!formData.companyName) newErrors.companyName = "회사명을 입력해주세요"
    if (!formData.businessNumber) newErrors.businessNumber = "사업자등록번호를 입력해주세요"
    else if (!validateBusinessNumber(formData.businessNumber)) {
      newErrors.businessNumber = "올바른 사업자등록번호 형식이 아닙니다 (000-00-00000)"
    }
    if (!formData.representativeName) newErrors.representativeName = "대표자명을 입력해주세요"
    if (!formData.managerName) newErrors.managerName = "담당자명을 입력해주세요"
    if (!formData.managerEmail) newErrors.managerEmail = "담당자 이메일을 입력해주세요"
    else if (!validateEmail(formData.managerEmail)) {
      newErrors.managerEmail = "올바른 이메일 형식이 아닙니다"
    }
    if (!formData.managerPhone) newErrors.managerPhone = "담당자 휴대폰을 입력해주세요"
    else if (!validatePhone(formData.managerPhone)) {
      newErrors.managerPhone = "올바른 휴대폰 형식이 아닙니다 (010-0000-0000)"
    }
    if (!formData.loginId) newErrors.loginId = "로그인 ID를 입력해주세요"
    if (!formData.password) newErrors.password = "비밀번호를 입력해주세요"
    if (!formData.confirmPassword) newErrors.confirmPassword = "비밀번호 확인을 입력해주세요"
    else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "비밀번호가 일치하지 않습니다"
    }
    if (!formData.agreeTerms) newErrors.agreeTerms = "이용약관에 동의해주세요"
    if (!formData.agreePrivacy) newErrors.agreePrivacy = "개인정보 처리방침에 동의해주세요"

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    // 회원가입 처리 로직
    alert("B2B 입점 신청이 완료되었습니다. 검토 후 연락드리겠습니다.")
    router.push("/")
  }

  const termsContent = `전자상거래(인터넷사이버몰) 표준약관

표준약관 제10023호 (2015. 6. 26. 개정)

제1조(목적)
이 약관은 주식회사 제니스코퍼레이션(전자상거래 사업자)이 운영하는 B2B쇼핑몰(이하 "쇼핑몰"이라 한다)에서 제공하는 인터넷 관련 서비스(이하 "서비스"라 한다)를 이용함에 있어 사이버 쇼핑몰과 이용자의 권리․의무 및 책임사항을 규정함을 목적으로 합니다.
※「PC통신, 무선 등을 이용하는 전자상거래에 대해서도 그 성질에 반하지 않는 한 이 약관을 준용합니다.」

제2조(정의)
① "쇼핑몰"이란 주식회사 제니스코퍼레이션이 재화 또는 용역(이하 "재화 등"이라 함)을 이용자에게 제공하기 위하여 컴퓨터 등 정보통신설비를 이용하여 재화 등을 거래할 수 있도록 설정한 가상의 영업장을 말하며, 아울러 사이버몰을 운영하는 사업자의 의미로도 사용합니다.
② "이용자"란 "쇼핑몰"에 접속하여 이 약관에 따라 "쇼핑몰"이 제공하는 서비스를 받는 회원 및 비회원을 말합니다.
③ '회원'이라 함은 "쇼핑몰"에 회원등록을 한 자로서, 계속적으로 "쇼핑몰"이 제공하는 서비스를 이용할 수 있는 자를 말합니다.
④ '비회원'이라 함은 회원에 가입하지 않고 "쇼핑몰"이 제공하는 서비스를 이용하는 자를 말합니다.

제3조 (약관 등의 명시와 설명 및 개정)
① "쇼핑몰"은 이 약관의 내용과 상호 및 대표자 성명, 영업소 소재지 주소(소비자의 불만을 처리할 수 있는 곳의 주소를 포함), 전화번호․모사전송번호․전자우편주소, 사업자등록번호, 통신판매업 신고번호, 개인정보관리책임자등을 이용자가 쉽게 알 수 있도록 제니스B2B쇼핑몰의 초기 서비스화면(전면)에 게시합니다. 다만, 약관의 내용은 이용자가 연결화면을 통하여 볼 수 있도록 할 수 있습니다.
② "쇼핑몰은 이용자가 약관에 동의하기에 앞서 약관에 정하여져 있는 내용 중 청약철회․배송책임․환불조건 등과 같은 중요한 내용을 이용자가 이해할 수 있도록 별도의 연결화면 또는 팝업화면 등을 제공하여 이용자의 확인을 구하여야 합니다.
③ "쇼핑몰"은 「전자상거래 등에서의 소비자보호에 관한 법률」, 「약관의 규제에 관한 법률」, 「전자문서 및 전자거래기본법」, 「전자금융거래법」, 「전자서명법」, 「정보통신망 이용촉진 및 정보보호 등에 관한 법률」, 「방문판매 등에 관한 법률」, 「소비자기본법」 등 관련 법을 위배하지 않는 범위에서 이 약관을 개정할 수 있습니다.
④ "쇼핑몰"이 약관을 개정할 경우에는 적용일자 및 개정사유를 명시하여 현행약관과 함께 쇼핑몰의 초기화면에 그 적용일자 7일 이전부터 적용일자 전일까지 공지합니다. 다만, 이용자에게 불리하게 약관내용을 변경하는 경우에는 최소한 30일 이상의 사전 유예기간을 두고 공지합니다.  이 경우 "쇼핑몰"은 개정 전 내용과 개정 후 내용을 명확하게 비교하여 이용자가 알기 쉽도록 표시합니다. 
⑤ "쇼핑몰"이 약관을 개정할 경우에는 그 개정약관은 그 적용일자 이후에 체결되는 계약에만 적용되고 그 이전에 이미 체결된 계약에 대해서는 개정 전의 약관조항이 그대로 적용됩니다. 다만 이미 계약을 체결한 이용자가 개정약관 조항의 적용을 받기를 원하는 뜻을 제3항에 의한 개정약관의 공지기간 내에 "쇼핑몰"에 송신하여 "쇼핑몰"의 동의를 받은 경우에는 개정약관 조항이 적용됩니다.
⑥ 이 약관에서 정하지 아니한 사항과 이 약관의 해석에 관하여는 전자상거래 등에서의 소비자보호에 관한 법률, 약관의 규제 등에 관한 법률, 공정거래위원회가 정하는 전자상거래 등에서의 소비자 보호지침 및 관계법령 또는 상관례에 따릅니다.

제4조(서비스의 제공 및 변경) 
① "쇼핑몰"은 다음과 같은 업무를 수행합니다.
	1. 재화 또는 용역에 대한 정보 제공 및 구매계약의 체결
	2. 구매계약이 체결된 재화 또는 용역의 배송
	3. 기타 "쇼핑몰"이 정하는 업무
② "쇼핑몰"은 재화 또는 용역의 품절 또는 기술적 사양의 변경 등의 경우에는 장차 체결되는 계약에 의해 제공할 재화 또는 용역의 내용을 변경할 수 있습니다. 이 경우에는 변경된 재화 또는 용역의 내용 및 제공일자를 명시하여 현재의 재화 또는 용역의 내용을 게시한 곳에 즉시 공지합니다.
③ "쇼핑몰"이 제공하기로 이용자와 계약을 체결한 서비스의 내용을 재화등의 품절 또는 기술적 사양의 변경 등의 사유로 변경할 경우에는 그 사유를 이용자에게 통지 가능한 주소로 즉시 통지합니다.
④ 전항의 경우 "쇼핑몰"은 이로 인하여 이용자가 입은 손해를 배상합니다. 다만, "쇼핑몰"이 고의 또는 과실이 없음을 입증하는 경우에는 그러하지 아니합니다.

제5조(서비스의 중단) 
① "쇼핑몰"은 컴퓨터 등 정보통신설비의 보수점검․교체 및 고장, 통신의 두절 등의 사유가 발생한 경우에는 서비스의 제공을 일시적으로 중단할 수 있습니다.
② "쇼핑몰"은 제1항의 사유로 서비스의 제공이 일시적으로 중단됨으로 인하여 이용자 또는 제3자가 입은 손해에 대하여 배상합니다. 단, "쇼핑몰"이 고의 또는 과실이 없음을 입증하는 경우에는 그러하지 아니합니다.
③ 사업종목의 전환, 사업의 포기, 업체 간의 통합 등의 이유로 서비스를 제공할 수 없게 되는 경우에는 "쇼핑몰"은 제8조에 정한 방법으로 이용자에게 통지하고 당초 "쇼핑몰"에서 제시한 조건에 따라 소비자에게 보상합니다. 다만, "쇼핑몰"이 보상기준 등을 고지하지 아니한 경우에는 이용자들의 마일리지 또는 적립금 등을 "쇼핑몰"에서 통용되는 통화가치에 상응하는 현물 또는 현금으로 이용자에게 지급합니다.

제6조(회원가입)
① 이용자는 "쇼핑몰"이 정한 가입 양식에 따라 회원정보를 기입한 후 이 약관에 동의한다는 의사표시를 함으로서 회원가입을 신청합니다.
② "쇼핑몰"은 제1항과 같이 회원으로 가입할 것을 신청한 이용자 중 다음 각 호에 해당하지 않는 한 회원으로 등록합니다.
	1. 가입신청자가 이 약관 제7조제3항에 의하여 이전에 회원자격을 상실한 적이 있는 경우, 다만 제7조제3항에 의한 회원자격 상실 후 3년이 경과한 자로서 
	"쇼핑몰"의 회원재가입 승낙을 얻은 경우에는 예외로 한다.
	2. 등록 내용에 허위, 기재누락, 오기가 있는 경우
	3. 기타 회원으로 등록하는 것이 "쇼핑몰"의 기술상 현저히 지장이 있다고 판단되는 경우
③ 회원가입계약의 성립 시기는 "쇼핑몰"의 승낙이 회원에게 도달한 시점으로 합니다.
④ 회원은 회원가입 시 등록한 사항에 변경이 있는 경우, 상당한 기간 이내에 "쇼핑몰"에 대하여 회원정보 수정 등의 방법으로 그 변경사항을 알려야 합니다.

제7조(회원 탈퇴 및 자격 상실 등) 
① 회원은 "쇼핑몰"에 언제든지 탈퇴를 요청할 수 있으며 "쇼핑몰"은 즉시 회원탈퇴를 처리합니다.
② 회원이 다음 각 호의 사유에 해당하는 경우, "쇼핑몰"은 회원자격을 제한 및 정지시킬 수 있습니다.
	1. 가입 신청 시에 허위 내용을 등록한 경우
	2. "쇼핑몰"을 이용하여 구입한 재화 등의 대금, 기타 "쇼핑몰"이용에 관련하여 회원이 부담하는 채무를 기일에 지급하지 않는 경우
	3. 다른 사람의 "쇼핑몰" 이용을 방해하거나 그 정보를 도용하는 등 전자상거래 질서를 위협하는 경우
	4. "쇼핑몰"을 이용하여 법령 또는 이 약관이 금지하거나 공서양속에 반하는 행위를 하는 경우
③ "쇼핑몰"이 회원 자격을 제한․정지 시킨 후, 동일한 행위가 2회 이상 반복되거나 30일 이내에 그 사유가 시정되지 아니하는 경우 "쇼핑몰"은 회원자격을 상실시킬 수 있습니다.
④ "쇼핑몰"이 회원자격을 상실시키는 경우에는 회원등록을 말소합니다. 이 경우 회원에게 이를 통지하고, 회원등록 말소 전에 최소한 30일 이상의 기간을 정하여 소명할 기회를 부여합니다.

제8조(회원에 대한 통지)
① "쇼핑몰"이 회원에 대한 통지를 하는 경우, 회원이 "쇼핑몰"과 미리 약정하여 지정한 전자우편 주소로 할 수 있습니다.
② "쇼핑몰"은 불특정다수 회원에 대한 통지의 경우 1주일이상 "쇼핑몰" 게시판에 게시함으로서 개별 통지에 갈음할 수 있습니다. 
다만, 회원 본인의 거래와 관련하여 중대한 영향을 미치는 사항에 대하여는 개별통지를 합니다.

제9조(구매신청 및 개인정보 제공 동의 등)
① "쇼핑몰"이용자는 "쇼핑몰"상에서 다음 또는 이와 유사한 방법에 의하여 구매를 신청하며, "쇼핑몰"은 이용자가 구매신청을 함에 있어서 다음의 각 내용을 알기 쉽게 제공하여야 합니다. 
	1. 재화 등의 검색 및 선택
	2. 받는 사람의 성명, 주소, 전화번호, 전자우편주소(또는 이동전화번호) 등의 입력
	3. 약관내용, 청약철회권이 제한되는 서비스, 배송료․설치비 등의 비용부담과 관련한 내용에 대한 확인
	4. 이 약관에 동의하고 위 3.호의 사항을 확인하거나 거부하는 표시
	 (예, 마우스 클릭)
	5. 재화등의 구매신청 및 이에 관한 확인 또는 "쇼핑몰"의 확인에 대한 동의
	6. 결제방법의 선택
② "쇼핑몰"이 제3자에게 구매자 개인정보를 제공할 필요가 있는 경우 1) 개인정보를 제공받는 자, 2)개인정보를 제공받는 자의 개인정보 이용목적, 3) 제공하는 개인정보의 항목, 4) 개인정보를 제공받는 자의 개인정보 보유 및 이용기간을 구매자에게 알리고 동의를 받아야 합니다. (동의를 받은 사항이 변경되는 경우에도 같습니다.)
③ "쇼핑몰"이 제3자에게 구매자의 개인정보를 취급할 수 있도록 업무를 위탁하는 경우에는 1) 개인정보 취급위탁을 받는 자, 2) 개인정보 취급위탁을 하는 업무의 내용을 구매자에게 알리고 동의를 받아야 합니다. (동의를 받은 사항이 변경되는 경우에도 같습니다.) 다만, 서비스제공에 관한 계약이행을 위해 필요하고 구매자의 편의증진과 관련된 경우에는 「정보통신망 이용촉진 및 정보보호 등에 관한 법률」에서 정하고 있는 방법으로 개인정보 취급방침을 통해 알림으로써 고지절차와 동의절차를 거치지 않아도 됩니다.

제10조 (계약의 성립)
①  "쇼핑몰"은 제9조와 같은 구매신청에 대하여 다음 각 호에 해당하면 승낙하지 않을 수 있습니다. 다만, 미성년자와 계약을 체결하는 경우에는 법정대리인의 동의를 얻지 못하면 미성년자 본인 또는 법정대리인이 계약을 취소할 수 있다는 내용을 고지하여야 합니다.
	1. 신청 내용에 허위, 기재누락, 오기가 있는 경우
	2. 미성년자가 담배, 주류 등 청소년보호법에서 금지하는 재화 및 용역을 구매하는 경우
	3. 기타 구매신청에 승낙하는 것이 "쇼핑몰" 기술상 현저히 지장이 있다고 판단하는 경우
② "쇼핑몰"의 승낙이 제12조제1항의 수신확인통지형태로 이용자에게 도달한 시점에 계약이 성립한 것으로 봅니다.
③ "쇼핑몰"의 승낙의 의사표시에는 이용자의 구매 신청에 대한 확인 및 판매가능 여부, 구매신청의 정정 취소 등에 관한 정보 등을 포함하여야 합니다.

제11조(지급방법)
"쇼핑몰"에서 구매한 재화 또는 용역에 대한 대금지급방법은 다음 각 호의 방법중 가용한 방법으로 할 수 있습니다. 단, "쇼핑몰"은 이용자의 지급방법에 대하여 재화 등의 대금에 어떠한 명목의 수수료도  추가하여 징수할 수 없습니다.
	1. 폰뱅킹, 인터넷뱅킹, 메일 뱅킹 등의 각종 계좌이체 
	2. 선불카드, 직불카드, 신용카드 등의 각종 카드 결제
	3. 온라인무통장입금
	4. 전자화폐에 의한 결제
	5. 수령 시 대금지급
	6. 마일리지 등 "쇼핑몰"이 지급한 포인트에 의한 결제
	7. "쇼핑몰"과 계약을 맺었거나 "쇼핑몰"이 인정한 상품권에 의한 결제  
	8. 기타 전자적 지급 방법에 의한 대금 지급 등

제12조(수신확인통지․구매신청 변경 및 취소)
① "쇼핑몰"은 이용자의 구매신청이 있는 경우 이용자에게 수신확인통지를 합니다.
② 수신확인통지를 받은 이용자는 의사표시의 불일치 등이 있는 경우에는 수신확인통지를 받은 후 즉시 구매신청 변경 및 취소를 요청할 수 있고 "쇼핑몰"은 배송 전에 이용자의 요청이 있는 경우에는 지체 없이 그 요청에 따라 처리하여야 합니다. 다만 이미 대금을 지불한 경우에는 제15조의 청약철회 등에 관한 규정에 따릅니다.

제13조(재화 등의 공급)
① "쇼핑몰"은 이용자와 재화 등의 공급시기에 관하여 별도의 약정이 없는 이상, 이용자가 청약을 한 날부터 7일 이내에 재화 등을 배송할 수 있도록 주문제작, 포장 등 기타의 필요한 조치를 취합니다. 다만, "쇼핑몰"이 이미 재화 등의 대금의 전부 또는 일부를 받은 경우에는 대금의 전부 또는 일부를 받은 날부터 3영업일 이내에 조치를 취합니다.  이때 "쇼핑몰"은 이용자가 재화 등의 공급 절차 및 진행 사항을 확인할 수 있도록 적절한 조치를 합니다.
② "쇼핑몰"은 이용자가 구매한 재화에 대해 배송수단, 수단별 배송비용 부담자, 수단별 배송기간 등을 명시합니다. 만약 "쇼핑몰"이 약정 배송기간을 초과한 경우에는 그로 인한 이용자의 손해를 배상하여야 합니다. 다만 "쇼핑몰"이 고의․과실이 없음을 입증한 경우에는 그러하지 아니합니다.

제14조(환급)
"쇼핑몰"은 이용자가 구매신청한 재화 등이 품절 등의 사유로 인도 또는 제공을 할 수 없을 때에는 지체 없이 그 사유를 이용자에게 통지하고 사전에 재화 등의 대금을 받은 경우에는 대금을 받은 날부터 3영업일 이내에 환급하거나 환급에 필요한 조치를 취합니다.

제15조(청약철회 등)
① "쇼핑몰"과 재화등의 구매에 관한 계약을 체결한 이용자는 「전자상거래 등에서의 소비자보호에 관한 법률」 제13조 제2항에 따른 계약내용에 관한 서면을 받은 날(그 서면을 받은 때보다 재화 등의 공급이 늦게 이루어진 경우에는 재화 등을 공급받거나 재화 등의 공급이 시작된 날을 말합니다)부터 7일 이내에는 청약의 철회를 할 수 있습니다. 다만, 청약철회에 관하여 「전자상거래 등에서의 소비자보호에 관한 법률」에 달리 정함이 있는 경우에는 동 법 규정에 따릅니다. 
② 이용자는 재화 등을 배송 받은 경우 다음 각 호의 1에 해당하는 경우에는 반품 및 교환을 할 수 없습니다.
	1. 이용자에게 책임 있는 사유로 재화 등이 멸실 또는 훼손된 경우(다만, 재화 등의 내용을 확인하기 위하여 포장 등을 훼손한 경우에는 청약철회를 할 수 있습니다)
    2. 이용자의 사용 또는 일부 소비에 의하여 재화 등의 가치가 현저히 감소한 경우
    3. 시간의 경과에 의하여 재판매가 곤란할 정도로 재화등의 가치가 현저히 감소한 경우
    4. 같은 성능을 지닌 재화 등으로 복제가 가능한 경우 그 원본인 재화 등의 포장을 훼손한 경우
③ 제2항제2호 내지 제4호의 경우에 "쇼핑몰"이 사전에 청약철회 등이 제한되는 사실을 소비자가 쉽게 알 수 있는 곳에 명기하거나 시용상품을 제공하는 등의 조치를 하지 않았다면 이용자의 청약철회 등이 제한되지 않습니다.
④ 이용자는 제1항 및 제2항의 규정에 불구하고 재화 등의 내용이 표시·광고 내용과 다르거나 계약내용과 다르게 이행된 때에는 당해 재화 등을 공급받은 날부터 3월 이내, 그 사실을 안 날 또는 알 수 있었던 날부터 30일 이내에 청약철회 등을 할 수 있습니다.

제16조(청약철회 등의 효과)
① "쇼핑몰"은 이용자로부터 재화 등을 반환받은 경우 3영업일 이내에 이미 지급받은 재화 등의 대금을 환급합니다. 이 경우 "쇼핑몰"이 이용자에게 재화등의 환급을 지연한때에는 그 지연기간에 대하여 「전자상거래 등에서의 소비자보호에 관한 법률 시행령」제21조의2에서 정하는 지연이자율을 곱하여 산정한 지연이자를 지급합니다.
② "쇼핑몰"은 위 대금을 환급함에 있어서 이용자가 신용카드 또는 전자화폐 등의 결제수단으로 재화 등의 대금을 지급한 때에는 지체 없이 당해 결제수단을 제공한 사업자로 하여금 재화 등의 대금의 청구를 정지 또는 취소하도록 요청합니다.
③ 청약철회 등의 경우 공급받은 재화 등의 반환에 필요한 비용은 이용자가 부담합니다. "쇼핑몰"은 이용자에게 청약철회 등을 이유로 위약금 또는 손해배상을 청구하지 않습니다. 다만 재화 등의 내용이 표시·광고 내용과 다르거나 계약내용과 다르게 이행되어 청약철회 등을 하는 경우 재화 등의 반환에 필요한 비용은 "쇼핑몰"이 부담합니다.
④ 이용자가 재화 등을 제공받을 때 발송비를 부담한 경우에 "쇼핑몰"은 청약철회 시 그 비용을  누가 부담하는지를 이용자가 알기 쉽도록 명확하게 표시합니다.

제17조(개인정보보호)
① "쇼핑몰"은 이용자의 개인정보 수집시 서비스제공을 위하여 필요한 범위에서 최소한의 개인정보를 수집합니다. 
② "쇼핑몰"은 회원가입시 구매계약이행에 필요한 정보를 미리 수집하지 않습니다. 다만, 관련 법령상 의무이행을 위하여 구매계약 이전에 본인확인이 필요한 경우로서 최소한의 특정 개인정보를 수집하는 경우에는 그러하지 아니합니다.
③ "쇼핑몰"은 이용자의 개인정보를 수집·이용하는 때에는 당해 이용자에게 그 목적을 고지하고 동의를 받습니다. 
④ "쇼핑몰"은 수집된 개인정보를 목적외의 용도로 이용할 수 없으며, 새로운 이용목적이 발생한 경우 또는 제3자에게 제공하는 경우에는 이용·제공단계에서 당해 이용자에게 그 목적을 고지하고 동의를 받습니다. 다만, 관련 법령에 달리 정함이 있는 경우에는 예외로 합니다.
⑤ "쇼핑몰"이 제2항과 제3항에 의해 이용자의 동의를 받아야 하는 경우에는 개인정보관리 책임자의 신원(소속, 성명 및 전화번호, 기타 연락처), 정보의 수집목적 및 이용목적, 제3자에 대한 정보제공 관련사항(제공받은자, 제공목적 및 제공할 정보의 내용) 등 「정보통신망 이용촉진 및 정보보호 등에 관한 법률」 제22조제2항이 규정한 사항을 미리 명시하거나 고지해야 하며 이용자는 언제든지 이 동의를 철회할 수 있습니다.
⑥ 이용자는 언제든지 "쇼핑몰"이 가지고 있는 자신의 개인정보에 대해 열람 및 오류정정을 요구할 수 있으며 "쇼핑몰"은 이에 대해 지체 없이 필요한 조치를 취할 의무를 집니다. 이용자가 오류의 정정을 요구한 경우에는 "쇼핑몰"은 그 오류를 정정할 때까지 당해 개인정보를 이용하지 않습니다.
⑦ "쇼핑몰"은 개인정보 보호를 위하여 이용자의 개인정보를 취급하는 자를  최소한으로 제한하여야 하며 신용카드, 은행계좌 등을 포함한 이용자의 개인정보의 분실, 도난, 유출, 동의 없는 제3자 제공, 변조 등으로 인한 이용자의 손해에 대하여 모든 책임을 집니다.
⑧ "쇼핑몰" 또는 그로부터 개인정보를 제공받은 제3자는 개인정보의 수집목적 또는 제공받은 목적을 달성한 때에는 당해 개인정보를 지체 없이 파기합니다.
⑨ "쇼핑몰"은 개인정보의 수집·이용·제공에 관한 동의 란을 미리 선택한 것으로 설정해두지 않습니다. 또한 개인정보의 수집·이용·제공에 관한 이용자의 동의거절시 제한되는 서비스를 구체적으로 명시하고, 필수수집항목이 아닌 개인정보의 수집·이용·제공에 관한 이용자의 동의 거절을 이유로 회원가입 등 서비스 제공을 제한하거나 거절하지 않습니다.

제18조("쇼핑몰"의 의무)
① "쇼핑몰"은 법령과 이 약관이 금지하거나 공서양속에 반하는 행위를 하지 않으며 이 약관이 정하는 바에 따라 지속적이고, 안정적으로 재화․용역을 제공하는데 최선을 다하여야 합니다.
② "쇼핑몰"은 이용자가 안전하게 인터넷 서비스를 이용할 수 있도록 이용자의 개인정보(신용정보 포함)보호를 위한 보안 시스템을 갖추어야 합니다.
③ "쇼핑몰"이 상품이나 용역에 대하여 「표시․광고의 공정화에 관한 법률」 제3조 소정의 부당한 표시․광고행위를 함으로써 이용자가 손해를 입은 때에는 이를 배상할 책임을 집니다.
④ "쇼핑몰"은 이용자가 원하지 않는 영리목적의 광고성 전자우편을 발송하지 않습니다.

제19조(회원의 ID 및 비밀번호에 대한 의무)
① 제17조의 경우를 제외한 ID와 비밀번호에 관한 관리책임은 회원에게 있습니다.
② 회원은 자신의 ID 및 비밀번호를 제3자에게 이용하게 해서는 안됩니다.
③ 회원이 자신의 ID 및 비밀번호를 도난당하거나 제3자가 사용하고 있음을 인지한 경우에는 바로 "쇼핑몰"에 통보하고 "쇼핑몰"의 안내가 있는 경우에는 그에 따라야 합니다.

제20조(이용자의 의무) 이용자는 다음 행위를 하여서는 안 됩니다.
	1. 신청 또는 변경시 허위 내용의 등록
    2. 타인의 정보 도용
    3. "쇼핑몰"에 게시된 정보의 변경
    4. "쇼핑몰"이 정한 정보 이외의 정보(컴퓨터 프로그램 등) 등의 송신 또는 게시
    5. "쇼핑몰" 기타 제3자의 저작권 등 지적재산권에 대한 침해
    6. "쇼핑몰" 기타 제3자의 명예를 손상시키거나 업무를 방해하는 행위
    7. 외설 또는 폭력적인 메시지, 화상, 음성, 기타 공서양속에 반하는 정보를 쇼핑몰에 공개 또는 게시하는 행위

제21조(연결"쇼핑몰"과 피연결"쇼핑몰" 간의 관계)
① 상위 "쇼핑몰"과 하위 "쇼핑몰"이 하이퍼링크(예: 하이퍼링크의 대상에는 문자, 그림 및 동화상 등이 포함됨)방식 등으로 연결된 경우, 전자를 연결 "쇼핑몰"(웹 사이트)이라고 하고 후자를 피연결 "쇼핑몰"(웹사이트)이라고 합니다.
② 연결"쇼핑몰"은 피연결"쇼핑몰"이 독자적으로 제공하는 재화 등에 의하여 이용자와 행하는 거래에 대해서 보증 책임을 지지 않는다는 뜻을 연결"쇼핑몰"의 초기화면 또는 연결되는 시점의 팝업화면으로 명시한 경우에는 그 거래에 대한 보증 책임을 지지 않습니다.

제22조(저작권의 귀속 및 이용제한)
① "쇼핑몰"이 작성한 저작물에 대한 저작권 기타 지적재산권은 "쇼핑몰"에 귀속합니다.
② 이용자는 "쇼핑몰"을 이용함으로써 얻은 정보 중 "쇼핑몰"에게 지적재산권이 귀속된 정보를 "쇼핑몰"의 사전 승낙 없이 복제, 송신, 출판, 배포, 방송 기타 방법에 의하여 영리목적으로 이용하거나 제3자에게 이용하게 하여서는 안됩니다.
③ "쇼핑몰"은 약정에 따라 이용자에게 귀속된 저작권을 사용하는 경우 당해 이용자에게 통보하여야 합니다.

제23조(분쟁해결)
① "쇼핑몰"은 이용자가 제기하는 정당한 의견이나 불만을 반영하고 그 피해를 보상처리하기 위하여 피해보상처리기구를 설치․운영합니다.
② "쇼핑몰"은 이용자로부터 제출되는 불만사항 및 의견은 우선적으로 그 사항을 처리합니다. 다만, 신속한 처리가 곤란한 경우에는 이용자에게 그 사유와 처리일정을 즉시 통보해 드립니다.
③ "쇼핑몰"과 이용자 간에 발생한 전자상거래 분쟁과 관련하여 이용자의 피해구제신청이 있는 경우에는 공정거래위원회 또는 시·도지사가 의뢰하는 분쟁조정기관의 조정에 따를 수 있습니다.

제24조(재판권 및 준거법)
① "쇼핑몰"과 이용자 간에 발생한 전자상거래 분쟁에 관한 소송은 제소 당시의 이용자의 주소에 의하고, 주소가 없는 경우에는 거소를 관할하는 지방법원의 전속관할로 합니다. 다만, 제소 당시 이용자의 주소 또는 거소가 분명하지 않거나 외국 거주자의 경우에는 민사소송법상의 관할법원에 제기합니다.
② "쇼핑몰"과 이용자 간에 제기된 전자상거래 소송에는 한국법을 적용합니다.`

  const privacyContent = `수집하는 개인정보 항목 및 수집방법

1. 수집하는 개인정보의 항목

① 회사는 회원가입시 중복가입 확인, 원할한 고객상담, 각종 서비스의 제공을 위해 아래와 같은 최소한의 개인정보를 필수항목을 수집하고 있습니다.
- 아이디, 비밀번호, 이름, 성별, 생년월일, 이메일주소, 휴대폰번호, 가입인증정보

② 서비스 이용과정이나 사업 처리과정에서 아래와 같은 정보들이 생성되어 수집될 수 있습니다.
- 최근접속일, 접속 IP 정보, 쿠키, 구매로그, 이벤트로그
- 물품 주문시 : 이메일주소, 전화번호, 휴대폰번호, 주소
- 물품(서비스)구매에 대한 결제 및 환불시 : 은행계좌정보
- 개인맞춤서비스 이용시 : 주소록, 기념일

2. 개인정보 수집방법
회사는 다음과 같은 방법으로 개인정보를 수집합니다.

① 홈페이지, 서면양식, 팩스, 전화, 상담 게시판, 이메일, 이벤트 응모, 배송요청
② 협력회사로부터의 제공
③ 로그 분석 프로그램을 통한 생성정보 수집

3. 개인정보 수집에 대한 동의

회사는 귀하께서 제니스월드의 개인정보취급방침 및 이용약관의 내용에 대해 「동의한다」버튼 또는 「동의하지 않는다」버튼을 클릭할 수 있는 절차를 마련하여, 「동의한다」버튼을 클릭하면 개인정보 수집에 대해 동의한 것으로 봅니다. 「동의안함」을 선택하실 경우, 회사가 제공하는 기본서비스 제공이 제한됩니다.

4. 14세 미만 아동의 개인정보보호

회사는 법정 대리인의 동의가 필요한 만14세 미만 아동의 회원가입은 받고 있지 않습니다.

5. 비회원의 개인정보보호

① 회사는 비회원 주문의 경우에도 배송, 대금결제, 주문내역 조회 및 구매확인을 위하여 필요한 개인정보만을 요청하고 있으며, 이 경우 그 정보는 대금결제 및 상품의 배송에 관련된 용도 이외에는 다른 어떠한 용도로도 사용되지 않습니다.
② 회사는 비회원의 개인정보도 회원과 동등한 수준으로 보호합니다.

개인정보의 수집목적 및 이용 목적

① 회원제 서비스 이용에 따른 본인 식별 절차에 이용
② 고지사항 전달, 본인 의사 확인, 불만 처리 등 원활한 의사소통 경로의 확보, 새로운 서비스, 신상품이나 이벤트 정보 등 최신 정보의 안내
③ 쇼핑 물품 배송에 대한 정확한 배송지의 확보
④ 개인맞춤 서비스를 제공하기 위한 자료
⑤ 경품 수령 및 세무신고를 위한 별도의 개인정보 요청

개인정보의 보유, 이용기간

1. 귀하의 개인정보는 회사가 신청인에게 서비스를 제공하는 기간 동안에 한하여 보유하고 이를 활용합니다. 다만 다른 법률에 특별한 규정이 있는 경우에는 관계법령에 따라 보관합니다.

개인정보의 보유, 이용기간
개인정보	파기시점
회원가입정보	회원가입을 탈퇴하거나 회원에 제명된 때
대금지급정보	대금의 완제일 또는 채권소명시효기간이 만료된 때
배송정보	물품 또는 서비스가 인도되거나 제공된 때
설문조사, 이벤트 등 일시적 목적을 위하여 수집한 경우	당해 설문조사, 이벤트 등이 종료한 때

2. 위 개인정보 수집목적 달성시 즉시파기 원칙에도 불구하고 다음과 같이 거래 관련 권리 의무 관계의 확인 등을 이유로 일정기간 보유하여야 할 필요가 있을 경우에는 전자상거래 등에서의 소비자보호에 관한 법률 등에 근거하여 일정기간 보유합니다.

① 「전자상거래 등에서의 소비자보호에 관한 법률」에 의한 보관
- 계약 또는 청약철회 등에 관한 기록 : 5년
- 대금결제 및 재화 등의 공급에 관한 기록 : 5년
- 소비자의 불만 또는 분쟁처리에 관한 기록 : 3년

② 「통신비밀보호법」 시행령 제41조에 의한 통신사실확인자료 보관
- 컴퓨터통신, 인터넷 로그기록자료, 접속지 추적자료 : 3개월

③ 설문조사, 이벤트 등 일시적 목적을 위하여 수집한 경우 : 당해 설문조사, 이벤트 등의 종료 시점`

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Building2 className="w-12 h-12 text-blue-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900">B2B 입점 신청</h1>
          </div>
          <p className="text-gray-600">제니스월드와 함께 성장할 파트너를 찾습니다</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl text-center">입점 신청서</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* 회사 정보 */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">회사 정보</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="companyName">
                      회사명 <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="companyName"
                      value={formData.companyName}
                      onChange={(e) => handleInputChange("companyName", e.target.value)}
                      placeholder="회사명을 입력하세요"
                      className={errors.companyName ? "border-red-500" : ""}
                    />
                    {errors.companyName && <p className="text-red-500 text-sm">{errors.companyName}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="businessNumber">
                      사업자등록번호 <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="businessNumber"
                      value={formData.businessNumber}
                      onChange={(e) => handleInputChange("businessNumber", e.target.value)}
                      placeholder="000-00-00000"
                      className={errors.businessNumber ? "border-red-500" : ""}
                    />
                    {errors.businessNumber && <p className="text-red-500 text-sm">{errors.businessNumber}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="representativeName">
                      대표자명 <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="representativeName"
                      value={formData.representativeName}
                      onChange={(e) => handleInputChange("representativeName", e.target.value)}
                      placeholder="대표자명을 입력하세요"
                      className={errors.representativeName ? "border-red-500" : ""}
                    />
                    {errors.representativeName && <p className="text-red-500 text-sm">{errors.representativeName}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="companyPhone">회사 전화번호</Label>
                    <Input
                      id="companyPhone"
                      value={formData.companyPhone}
                      onChange={(e) => handleInputChange("companyPhone", e.target.value)}
                      placeholder="02-0000-0000"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="businessType">업종</Label>
                    <Select onValueChange={(value) => handleInputChange("businessType", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="업종을 선택하세요" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fashion">패션/의류</SelectItem>
                        <SelectItem value="beauty">뷰티/화장품</SelectItem>
                        <SelectItem value="electronics">전자제품</SelectItem>
                        <SelectItem value="home">홈/리빙</SelectItem>
                        <SelectItem value="sports">스포츠/레저</SelectItem>
                        <SelectItem value="food">식품</SelectItem>
                        <SelectItem value="books">도서/문구</SelectItem>
                        <SelectItem value="other">기타</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="establishedYear">설립년도</Label>
                    <Input
                      id="establishedYear"
                      value={formData.establishedYear}
                      onChange={(e) => handleInputChange("establishedYear", e.target.value)}
                      placeholder="2020"
                      type="number"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="employeeCount">직원 수</Label>
                    <Select onValueChange={(value) => handleInputChange("employeeCount", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="직원 수를 선택하세요" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-10">1-10명</SelectItem>
                        <SelectItem value="11-50">11-50명</SelectItem>
                        <SelectItem value="51-100">51-100명</SelectItem>
                        <SelectItem value="101-500">101-500명</SelectItem>
                        <SelectItem value="500+">500명 이상</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="monthlySales">월 매출액</Label>
                    <Select onValueChange={(value) => handleInputChange("monthlySales", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="월 매출액을 선택하세요" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="under-10m">1천만원 미만</SelectItem>
                        <SelectItem value="10m-50m">1천만원-5천만원</SelectItem>
                        <SelectItem value="50m-100m">5천만원-1억원</SelectItem>
                        <SelectItem value="100m-500m">1억원-5억원</SelectItem>
                        <SelectItem value="over-500m">5억원 이상</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="companyAddress">회사 주소</Label>
                  <Input
                    id="companyAddress"
                    value={formData.companyAddress}
                    onChange={(e) => handleInputChange("companyAddress", e.target.value)}
                    placeholder="기본 주소를 입력하세요"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="detailAddress">상세 주소</Label>
                  <Input
                    id="detailAddress"
                    value={formData.detailAddress}
                    onChange={(e) => handleInputChange("detailAddress", e.target.value)}
                    placeholder="상세 주소를 입력하세요"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="businessDescription">사업 소개</Label>
                  <Textarea
                    id="businessDescription"
                    value={formData.businessDescription}
                    onChange={(e) => handleInputChange("businessDescription", e.target.value)}
                    placeholder="회사 및 사업에 대해 간단히 소개해주세요"
                    rows={4}
                  />
                </div>
              </div>

              {/* 담당자 정보 */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">담당자 정보</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="managerName">
                      담당자명 <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="managerName"
                      value={formData.managerName}
                      onChange={(e) => handleInputChange("managerName", e.target.value)}
                      placeholder="담당자명을 입력하세요"
                      className={errors.managerName ? "border-red-500" : ""}
                    />
                    {errors.managerName && <p className="text-red-500 text-sm">{errors.managerName}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="managerEmail">
                      담당자 이메일 <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="managerEmail"
                      type="email"
                      value={formData.managerEmail}
                      onChange={(e) => handleInputChange("managerEmail", e.target.value)}
                      placeholder="example@company.com"
                      className={errors.managerEmail ? "border-red-500" : ""}
                    />
                    {errors.managerEmail && <p className="text-red-500 text-sm">{errors.managerEmail}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="managerPhone">
                      담당자 휴대폰 <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="managerPhone"
                      value={formData.managerPhone}
                      onChange={(e) => handleInputChange("managerPhone", e.target.value)}
                      placeholder="010-0000-0000"
                      className={errors.managerPhone ? "border-red-500" : ""}
                    />
                    {errors.managerPhone && <p className="text-red-500 text-sm">{errors.managerPhone}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="department">부서</Label>
                    <Input
                      id="department"
                      value={formData.department}
                      onChange={(e) => handleInputChange("department", e.target.value)}
                      placeholder="영업팀"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="position">직급</Label>
                    <Input
                      id="position"
                      value={formData.position}
                      onChange={(e) => handleInputChange("position", e.target.value)}
                      placeholder="팀장"
                    />
                  </div>
                </div>
              </div>

              {/* 계정 정보 */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">계정 정보</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="loginId">
                      로그인 ID <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="loginId"
                      value={formData.loginId}
                      onChange={(e) => handleInputChange("loginId", e.target.value)}
                      placeholder="로그인 ID를 입력하세요"
                      className={errors.loginId ? "border-red-500" : ""}
                    />
                    {errors.loginId && <p className="text-red-500 text-sm">{errors.loginId}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">
                      비밀번호 <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={(e) => handleInputChange("password", e.target.value)}
                        placeholder="비밀번호를 입력하세요"
                        className={errors.password ? "border-red-500" : ""}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                    {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="confirmPassword">
                      비밀번호 확인 <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                        placeholder="비밀번호를 다시 입력하세요"
                        className={errors.confirmPassword ? "border-red-500" : ""}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                    {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
                  </div>
                </div>
              </div>

              {/* 서류 첨부 */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">서류 첨부</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>사업자등록증</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                      <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                      <p className="text-sm text-gray-600">파일을 드래그하거나 클릭하여 업로드</p>
                      <p className="text-xs text-gray-500 mt-1">JPG, PNG, PDF (최대 5MB)</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>통신판매업신고증</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                      <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                      <p className="text-sm text-gray-600">파일을 드래그하거나 클릭하여 업로드</p>
                      <p className="text-xs text-gray-500 mt-1">JPG, PNG, PDF (최대 5MB)</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 약관 동의 */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">약관 동의</h3>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Checkbox
                        id="agreeTerms"
                        checked={formData.agreeTerms}
                        onCheckedChange={(checked) => handleInputChange("agreeTerms", checked as boolean)}
                      />
                      <Label htmlFor="agreeTerms" className="cursor-pointer">
                        B2B 이용약관 동의 <span className="text-red-500">(필수)</span>
                      </Label>
                    </div>
                    <Button variant="outline" size="sm" type="button" onClick={() => setShowTermsModal(true)}>
                      전문보기
                    </Button>
                  </div>
                  {errors.agreeTerms && <p className="text-red-500 text-sm">{errors.agreeTerms}</p>}

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Checkbox
                        id="agreePrivacy"
                        checked={formData.agreePrivacy}
                        onCheckedChange={(checked) => handleInputChange("agreePrivacy", checked as boolean)}
                      />
                      <Label htmlFor="agreePrivacy" className="cursor-pointer">
                        개인정보 처리방침 동의 <span className="text-red-500">(필수)</span>
                      </Label>
                    </div>
                    <Button variant="outline" size="sm" type="button" onClick={() => setShowPrivacyModal(true)}>
                      전문보기
                    </Button>
                  </div>
                  {errors.agreePrivacy && <p className="text-red-500 text-sm">{errors.agreePrivacy}</p>}

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Checkbox
                        id="agreeMarketing"
                        checked={formData.agreeMarketing}
                        onCheckedChange={(checked) => handleInputChange("agreeMarketing", checked as boolean)}
                      />
                      <Label htmlFor="agreeMarketing" className="cursor-pointer">
                        마케팅 정보 수신 동의 (선택)
                      </Label>
                    </div>
                  </div>
                </div>
              </div>

              {/* 제출 버튼 */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <Button type="button" variant="outline" className="flex-1 bg-transparent" onClick={() => router.back()}>
                  취소
                </Button>
                <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700">
                  입점 신청하기
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* 이용약관 모달 */}
        <Dialog open={showTermsModal} onOpenChange={setShowTermsModal}>
          <DialogContent className="max-w-4xl max-h-[80vh]">
            <DialogHeader>
              <DialogTitle>B2B 이용약관</DialogTitle>
            </DialogHeader>
            <ScrollArea className="h-[60vh] w-full rounded-md border p-4">
              <div className="whitespace-pre-wrap text-sm leading-relaxed">{termsContent}</div>
            </ScrollArea>
          </DialogContent>
        </Dialog>

        {/* 개인정보 처리방침 모달 */}
        <Dialog open={showPrivacyModal} onOpenChange={setShowPrivacyModal}>
          <DialogContent className="max-w-4xl max-h-[80vh]">
            <DialogHeader>
              <DialogTitle>개인정보 처리방침</DialogTitle>
            </DialogHeader>
            <ScrollArea className="h-[60vh] w-full rounded-md border p-4">
              <div className="whitespace-pre-wrap text-sm leading-relaxed">{privacyContent}</div>
            </ScrollArea>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
