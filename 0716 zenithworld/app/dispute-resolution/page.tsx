"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Home, Scale, FileText, Users, ShoppingCart, Phone, Mail } from "lucide-react"

export default function DisputeResolutionPage() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [])

  const handleLinkClick = (href: string) => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  if (!isMounted) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
            <div className="space-y-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-white p-6 rounded-lg">
                  <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* 헤더 */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">분쟁해결기준</h1>
              <p className="text-gray-600">통신판매 및 통신판매중개에서의 분쟁해결기준을 안내해드립니다.</p>
            </div>
            <Button variant="outline" asChild>
              <Link href="/" onClick={() => handleLinkClick("/")}>
                <Home className="h-4 w-4 mr-2" />
                홈으로
              </Link>
            </Button>
          </div>
        </div>

        <div className="space-y-8">
          {/* 제1장 총칙 */}
          <Card className="border-blue-200 bg-blue-50">
            <CardHeader>
              <CardTitle className="flex items-center text-blue-800">
                <Scale className="h-5 w-5 mr-2" />
                제1장 총칙
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-white p-4 rounded-lg border border-blue-200">
                <h3 className="font-semibold text-blue-800 mb-2">제1조(목적)</h3>
                <p className="text-gray-700 leading-relaxed">
                  통신판매 및 통신판매중개에서의 분쟁해결기준(이하 "분쟁해결기준")은 「전자상거래 등에서의 소비자보호에
                  관한 법률」 제20조제3항에 따라 주식회사 제니스코퍼레이션(이하 "회사")의 통신판매중개 또는 이를 통해
                  체결된 통신판매로 인해 발생한 분쟁의 원활한 해결을 위한 기준을 정함을 목적으로 한다.
                </p>
              </div>

              <div className="bg-white p-4 rounded-lg border border-blue-200">
                <h3 className="font-semibold text-blue-800 mb-2">제2조(정의)</h3>
                <p className="text-gray-700 mb-3">분쟁해결기준에서 사용하는 용어의 뜻은 다음 각 호와 같다.</p>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>
                    <strong>1.</strong> "통신판매"란 「전자상거래 등에서의 소비자보호에 관한 법률」 제2조 제2호에서 정한
                    통신판매를 말한다.
                  </p>
                  <p>
                    <strong>2.</strong> "통신판매중개"란 「전자상거래 등에서의 소비자보호에 관한 법률」 제2조 제4호에서
                    정한 통신판매중개를 말한다.
                  </p>
                  <p>
                    <strong>3.</strong> "판매자"란 "회사"가 제공하는 통신판매중개 서비스를 통하여 상품 또는 용역(이하
                    "상품등")을 판매할 목적으로 "회원"과 거래한 사업자를 말한다.
                  </p>
                  <p>
                    <strong>4.</strong> "회원"이란 "회사"와 이용계약을 체결하고 "회사"가 제공하는 서비스를 이용하는
                    자로, 「전자상거래 등에서의 소비자보호에 관한 법률」 제2조 제5호에서 정한 소비자를 말한다.
                  </p>
                  <p>
                    <strong>5.</strong> "상대방"이란 회사의 통신판매중개를 통해 판매자와 상품등을 거래한 자 중
                    「전자상거래 등에서의 소비자보호에 관한 법률」 제2조 제5호에서 정한 소비자가 아닌 자를 말한다.
                  </p>
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg border border-blue-200">
                <h3 className="font-semibold text-blue-800 mb-2">제3조(적용대상)</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>
                    <strong>①</strong> 분쟁해결기준은 회사와 회원 간 분쟁 및 판매자와 회원 간 분쟁(이하 "소비자분쟁")에
                    대해 적용된다.
                  </p>
                  <p>
                    <strong>②</strong> 분쟁해결기준에서 다르게 정한 경우를 제외하고, 분쟁해결기준은 회사와 상대방 간
                    분쟁 및 판매자와 상대방 간 분쟁(이하 통칭하여 "상대방분쟁")에 대해 적용된다.
                  </p>
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg border border-blue-200">
                <h3 className="font-semibold text-blue-800 mb-2">제4조(분쟁해결기준의 개정 및 다른 약정과의 관계)</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>
                    <strong>①</strong> 회사는 「전자상거래 등에서의 소비자보호에 관한 법률」, 「약관의 규제에 관한
                    법률」, 「정보통신망 이용 촉진 및 정보 보호 등에 관한 법률」, 「소비자기본법」 등 관계 법령을
                    위배하지 않는 범위에서 분쟁해결기준을 개정할 수 있다.
                  </p>
                  <p>
                    <strong>②</strong> 소비자분쟁 또는 상대방분쟁에 대해 분쟁해결기준에서 규정하지 않은 사항은 회사와
                    회원이 체결한 "제니스 이용약관"에 따르고, "제니스 이용약관"에도 규정되지 않은 사항은 회사와 판매자가
                    체결한 "제니스월드 판매회원 이용약관"에 따르며, 위 약관에서도 규정되지 않은 사항은 관계 법령 등에
                    따른다.
                  </p>
                  <p>
                    <strong>③</strong> 분쟁해결기준의 내용과 관련하여 분쟁해결기준과 "제니스 이용약관", "제니스월드
                    판매회원 이용약관"의 내용이 충돌하는 경우 "제니스 이용약관", "제니스월드 판매회원 이용약관",
                    분쟁해결기준의 내용 순으로 우선하여 적용된다.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 제2장 회사와 회원 또는 상대방 간 분쟁 및 해결기준 */}
          <Card className="border-green-200 bg-green-50">
            <CardHeader>
              <CardTitle className="flex items-center text-green-800">
                <Users className="h-5 w-5 mr-2" />
                제2장 회사와 회원 또는 상대방 간 분쟁 및 해결기준
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-white p-4 rounded-lg border border-green-200">
                <h3 className="font-semibold text-green-800 mb-2">제5조(청약철회등에 따른 대금의 환급등)</h3>
                <div className="space-y-3 text-sm text-gray-600">
                  <p>
                    <strong>①</strong> 회사가 회원으로부터 대금을 지급받은 경우 회원이 「전자상거래 등에서의
                    소비자보호에 관한 법률」 제17조에 따라 청약의 철회 및 계약의 해제(이하 "청약철회등")를 하였을 때에
                    회사는 회원에게 대금을 환급한다.
                  </p>

                  <div>
                    <p>
                      <strong>②</strong> 회사는 제1항에 따른 대금환급의무를 다음 각 호에서 정한 기한까지 이행한다.
                    </p>
                    <div className="ml-4 space-y-1">
                      <p>
                        <strong>1.</strong> 회원이 재화를 공급받은 경우: 그 재화를 판매자에 반환한 날로부터 3영업일 이내
                      </p>
                      <p>
                        <strong>2.</strong> 회원이 용역 또는 디지털콘텐츠를 공급받은 경우: 회원이 청약철회등을 한
                        날로부터 3영업일 이내
                      </p>
                      <p>
                        <strong>3.</strong> 회원이 상품등을 공급받지 않은 경우: 회원이 청약철회등을 한 날로부터 3영업일
                        이내
                      </p>
                    </div>
                  </div>

                  <p>
                    <strong>③</strong> 회원이 공급받은 상품등을 일부 사용하거나 소비한 경우, 회사는 제2항에 따라 대금을
                    환급함에 있어 「전자상거래 등에서의 소비자보호에 관한 법률」 제18조 제8항에서 정한 금액을 제외한
                    나머지 금액을 지급한다. 다만, "제니스 이용약관"에 따라 본조의 청약철회가 제한될 수 있다.
                  </p>

                  <p>
                    <strong>④</strong> 회사가 제2항 및 제3항에 따른 대금환급을 지연한 경우에 그 지연기간에 대해
                    「전자상거래 등에서의 소비자보호에 관한 법률」 제18조 제2항에서 정한 지연배상금(이하 "지연배상금")을
                    더하여 지급한다.
                  </p>

                  <p>
                    <strong>⑤</strong> 회사는 제2항 및 제3항에 따라 대금을 환급할 때 「여신전문금융업법」 제2조 제3호의
                    신용카드나 그 밖에 「전자상거래 등에서의 소비자보호에 관한 법률 시행령」 제22조의 결제수단으로
                    재화등의 대금을 지급한 경우에는 지체 없이 해당 결제업자에게 재화등의 대금 청구를 정지하거나
                    취소하도록 요청하여야 한다.
                  </p>

                  <p>
                    <strong>⑥</strong> 「전자상거래 등에서의 소비자보호에 관한 법률」 제17조 제1항에 따른 청약철회등의
                    경우, 공급받은 재화등의 반환에 필요한 비용은 회원이 부담하며, 판매자는 회원에게 청약철회등을 이유로
                    위약금이나 손해배상을 청구할 수 없다.
                  </p>

                  <p>
                    <strong>⑦</strong> 「전자상거래 등에서의 소비자보호에 관한 법률」 제17조 제3항에 따른 청약철회등의
                    경우, 재화등의 반환에 필요한 비용은 판매자가 부담한다.
                  </p>
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg border border-green-200">
                <h3 className="font-semibold text-green-800 mb-2">
                  제6조(고지의무 또는 신원정보 미제공에 따른 회사의 책임)
                </h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>
                    <strong>①</strong> 회사가 통신판매중개를 하면서 회원에게 통신판매의 당사자가 아니라는 사실을
                    고지하지 않은 경우에 회사는 판매자의 고의 또는 과실로 회원에게 발생한 재산상 손해에 대해 판매자와
                    연대하여 배상한다.
                  </p>
                  <p>
                    <strong>②</strong> 회사가 통신판매중개를 하면서 「전자상거래 등에서의 소비자보호에 관한 법률」
                    제20조 제2항에 따른 판매자의 정보를 제공하지 않거나 제공한 정보가 사실과 달라 회원에게 발생한 재산상
                    손해에 대해 판매자와 연대하여 배상한다. 다만, 회사가 회원에게 피해가 발생하지 않도록 상당한 주의를
                    기울인 경우에는 그러하지 아니하다.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 제3장 판매자와 회원 간 분쟁 및 해결기준 */}
          <Card className="border-purple-200 bg-purple-50">
            <CardHeader>
              <CardTitle className="flex items-center text-purple-800">
                <ShoppingCart className="h-5 w-5 mr-2" />
                제3장 판매자와 회원 간 분쟁 및 해결기준
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-white p-4 rounded-lg border border-purple-200">
                <h3 className="font-semibold text-purple-800 mb-2">제1절 일반적 분쟁해결기준</h3>
                <h4 className="font-semibold text-purple-700 mb-2">제7조(상품등의 하자ㆍ채무불이행 등)</h4>
                <p className="text-sm text-gray-600 mb-3">
                  판매자는 상품등의 하자·채무불이행 등으로 인한 회원의 피해에 대하여 다음 각 호의 기준에 따라
                  수리·교환·환급 또는 배상을 하거나, 계약의 해제·해지 및 이행 등을 하여야 한다.
                </p>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>
                    <strong>1.</strong> 품질보증기간 동안의 수리·교환·환급에 드는 비용은 판매자가 부담한다. 다만, 회원의
                    취급 잘못이나 천재지변으로 고장이나 손상이 발생한 경우와 제조자 및 제조자가 지정한 수리점·설치점이
                    아닌 자가 수리·설치하여 상품등이 변경되거나 손상된 경우에는 판매자가 비용을 부담하지 아니한다.
                  </p>
                  <p>
                    <strong>2.</strong> 수리는 지체 없이 하되, 수리가 지체되는 불가피한 사유가 있을 때는 회원에게 알려야
                    한다. 회원이 수리를 의뢰한 날부터 1개월이 지난 후에도 판매자가 수리된 상품등을 회원에게 인도하지
                    못할 경우에 품질보증기간 이내일 때는 같은 종류의 상품등으로 교환하거나 환급하고, 품질보증기간이
                    지났을 때에는 제13조에 따라 산정한 금액을 환급한다.
                  </p>
                  <p>
                    <strong>3.</strong> 상품등을 유상으로 수리한 경우에 그 유상으로 수리한 날부터 2개월 이내에 회원이
                    정상적으로 상품등을 사용하는 과정에서 그 수리한 부분에 종전과 동일한 고장이 재발한 경우에는 무상으로
                    수리하되, 수리가 불가능한 때에는 종전에 받은 수리비를 환급하여야 한다.
                  </p>
                  <p>
                    <strong>4.</strong> 교환은 같은 종류의 상품등으로 하되, 같은 종류의 상품등으로 교환하는 것이
                    불가능한 경우에는 같은 종류의 유사 상품등으로 교환한다. 다만, 같은 종류의 상품등으로 교환하는 것이
                    불가능하거나 회원이 같은 종류의 유사 상품등으로 교환하는 것을 원하지 아니하는 경우에는 환급한다.
                    이는 할인판매된 상품등을 교환하는 경우에도 같으며, 그 정상가격과 할인가격의 차액은 고려하지 않는다.
                  </p>
                  <p>
                    <strong>5.</strong> 환급금액은 거래 시 교부된 영수증 등에 적힌 상품등의 가격을 기준으로 한다. 다만,
                    영수증 등에 적힌 가격에 대하여 다툼이 있는 경우에는 영수증 등에 적힌 금액과 다른 금액을 기준으로
                    하려는 자가 그 다른 금액이 실제 거래가격임을 증명하여야 하며, 영수증이 없는 등의 사유로 실제
                    거래가격을 증명할 수 없는 경우에는 그 지역에서 거래되는 통상적인 가격을 기준으로 한다.
                  </p>
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg border border-purple-200">
                <h4 className="font-semibold text-purple-700 mb-2">제8조(경품류의 하자ㆍ채무불이행 등)</h4>
                <p className="text-sm text-gray-600">
                  판매자가 상품등의 거래에 부수(附隨)하여 회원에게 제공하는 경제적 이익인 경품류의 하자·채무불이행
                  등으로 인한 회원의 피해에 대한 분쟁해결기준은 제7조를 준용한다. 다만, 회원의 책임있는 사유로 계약이
                  해제되거나 해지되는 경우에 판매자는 회원으로부터 그 경품류를 반환받거나 반환이 불가능한 경우에는 해당
                  지역에서 거래되는 같은 종류의 유사 상품등의 통상적인 가격을 기준으로 가액반환을 받는다.
                </p>
              </div>

              <div className="bg-white p-4 rounded-lg border border-purple-200">
                <h4 className="font-semibold text-purple-700 mb-2">제9조(품질보증기간과 부품보유기간)</h4>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>품질보증기간과 부품보유기간은 다음 각 호에서 정한 바에 따른다.</p>
                  <p>
                    <strong>1.</strong> 품질보증기간과 부품보유기간은 해당 판매자가 품질보증서 등에 표시한 기간으로
                    한다. 다만, 이를 표시하지 않은 경우에는 제12조에서 정한 기간으로 한다.
                  </p>
                  <p>
                    <strong>2.</strong> 품질보증기간은 회원이 상품등을 구입하거나 제공받은 날부터 기산한다. 다만,
                    계약일과 인도일(용역의 경우에는 제공일을 말한다. 이하 이 호에서 같다)이 다른 경우에는 인도일을
                    기준으로 하고, 교환받은 상품등의 품질보증기간은 교환받은 날부터 기산한다.
                  </p>
                  <p>
                    <strong>3.</strong> 품질보증서에 판매일자가 적혀 있지 아니한 경우, 품질보증서 또는 영수증을 받지
                    아니하거나 분실한 경우 또는 그 밖의 사유로 판매일자를 확인하기 곤란한 경우에는 해당 상품등의
                    제조일이나 수입통관일부터 3월이 지난 날부터 품질보증기간을 기산하여야 한다. 다만, 상품등 또는
                    상품등의 포장에 제조일이나 수입통관일이 표시되어 있지 아니한 상품등은 판매자가 그 판매일자를
                    증명하여야 한다.
                  </p>
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg border border-purple-200">
                <h4 className="font-semibold text-purple-700 mb-2">제10조(피해배상)</h4>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>
                    <strong>①</strong> 회원에 대한 판매자의 배상 또는 보상 방법은 달리 합의가 없는 한 금전 지급을
                    원칙으로 한다.
                  </p>
                  <p>
                    <strong>②</strong> 판매자는 배상 또는 보상을 위해 회원에게 재화의 반환을 요구할 수 있다. 다만,
                    판매자가 수거하기로 약정한 경우, 재화의 반환에 전문기술 등이 요구되는 경우 또는 회원이 반환하기
                    곤란한 경우에는 판매자가 수거한다.
                  </p>
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg border border-purple-200">
                <h4 className="font-semibold text-purple-700 mb-2">제11조(경비의 부담)</h4>
                <p className="text-sm text-gray-600">
                  판매자의 책임있는 사유로 인해 회원의 피해처리과정에서 발생되는 운반비용, 시험 및 검사비용 등의 경비는
                  판매자가 부담한다.
                </p>
              </div>

              <div className="bg-white p-4 rounded-lg border border-purple-200">
                <h3 className="font-semibold text-purple-800 mb-2">제2절 재화ㆍ시설 및 용역별 분쟁해결기준 등</h3>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-purple-700 mb-2">제12조(재화별 품질보증기간 및 부품보유기간)</h4>
                    <p className="text-sm text-gray-600">
                      재화별 품질보증기간 및 부품보유기간은 「소비자기본법 시행령」에 따라 공정거래위원회가 고시하는
                      소비자분쟁해결기준의 &lt;별표III&gt;과 같다.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-purple-700 mb-2">제13조(재화ㆍ시설 및 용역별 분쟁해결기준)</h4>
                    <p className="text-sm text-gray-600">
                      재화ㆍ시설 및 용역별 분쟁해결기준 중 인터넷쇼핑몰업에 대한 분쟁해결기준은 「소비자기본법
                      시행령」에 따라 공정거래위원회가 고시하는 소비자분쟁해결기준의 &lt;별표II&gt;와 같다.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-purple-700 mb-2">제14조(재화별 내용연수표)</h4>
                    <p className="text-sm text-gray-600">
                      재화별 내용연수표는 「소비자기본법 시행령」에 따라 공정거래위원회가 고시하는 소비자분쟁해결기준의
                      &lt;별표IV&gt;과 같다.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 부칙 */}
          <Card className="border-gray-200 bg-gray-50">
            <CardHeader>
              <CardTitle className="flex items-center text-gray-800">
                <FileText className="h-5 w-5 mr-2" />
                부칙
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-800 mb-2">제1조(시행일)</h3>
                <p className="text-gray-700">분쟁해결기준은 2025년 10월 30일부터 시행된다.</p>
              </div>
            </CardContent>
          </Card>

          {/* 고객센터 정보 */}
          <Card className="bg-gradient-to-r from-blue-50 to-green-50 border-blue-200">
            <CardHeader>
              <CardTitle className="text-blue-800">분쟁 관련 문의</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                    <Phone className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">전화 상담</p>
                    <p className="text-blue-600 font-medium">070-4304-7220</p>
                    <p className="text-sm text-gray-600">평일 10:00 ~ 17:00</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                    <Mail className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">이메일 문의</p>
                    <p className="text-green-600 font-medium">help@zenithworld.com</p>
                    <p className="text-sm text-gray-600">24시간 접수 가능</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
