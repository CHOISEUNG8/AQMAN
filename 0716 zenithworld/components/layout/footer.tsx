"use client"
import Link from "next/link"
import { Instagram, Facebook, Youtube } from "lucide-react"
import Image from "next/image"

export default function Footer() {
  return (
    <footer className="bg-slate-800 text-white">
      <div className="container mx-auto px-4 py-8">
        {/* 상단 네비게이션 링크 */}
        <div className="flex flex-wrap justify-center md:justify-end gap-4 md:gap-8 text-sm text-gray-300 mb-8">
          <Link href="/notices" className="hover:text-blue-400 font-semibold transition-colors">
            공지사항
          </Link>
          <a
            href="http://worldbl.co.kr/sub03/sub05.php"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 font-semibold transition-colors"
          >
            회사소개
          </a>
          <Link href="/terms" className="hover:text-blue-400 font-semibold transition-colors">
            이용약관
          </Link>
          <Link href="/privacy" className="hover:text-blue-400 font-semibold transition-colors">
            개인정보처리방침
          </Link>
          <Link href="/dispute-resolution" className="hover:text-blue-400 font-semibold transition-colors">
            분쟁해결기준
          </Link>
          <Link href="/usage-guide" className="hover:text-blue-400 font-semibold transition-colors">
            이용안내
          </Link>
          <Link href="/faq" className="hover:text-blue-400 font-semibold transition-colors">
            자주 묻는 질문(FAQ)
          </Link>
        </div>

        {/* 메인 정보 섹션 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* 좌측 - 로고 */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center space-x-3 group mb-6">
              <div className="transform group-hover:scale-105 transition-transform duration-200">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-MQ5pMJM88ytq3eQJvj93CCYF4gabLD.png"
                  alt="ZENITH WORLD 로고"
                  width={48}
                  height={48}
                  className="w-12 h-12 object-contain"
                />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
                ZENITH SHOP
              </span>
            </Link>
            <p className="text-sm text-gray-300 leading-relaxed">
              프리미엄 온라인 쇼핑몰 제니스월드에서
              <br />
              최고의 상품과 서비스를 경험하세요.
            </p>
          </div>

          {/* 중앙 - 고객센터 정보 */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold mb-4 text-white">고객센터 정보</h3>
            <div className="space-y-4 text-sm text-gray-300">
              <div>
                <p className="font-medium text-white mb-1">상담 전화</p>
                <p className="text-lg font-semibold text-blue-400">070-4304-7220</p>
              </div>
              <div>
                <p className="font-medium text-white mb-1">상담 이메일</p>
                <p>help@zenithworld.shop</p>
              </div>

              <div className="pt-2">
                <p className="font-medium text-white mb-1">운영 시간</p>
                <p>평일 오전 10:00 ~ 오후 05:00</p>
                <p>점심시간 오후 12:00 ~ 오후 01:00</p>
                <p>토, 일, 법정공휴일 휴무</p>
              </div>

              <div className="pt-2">
                <p className="font-medium text-white mb-1">반품 주소</p>
                <p>04033 서울특별시 마포구 잔다리로 58 (서교동)</p>
              </div>

              <div className="pt-2">
                <p className="font-medium text-white mb-1">계좌 정보</p>
                <p>
                  하나은행 1089-1002-659104
                  <br />
                  (주)제니스 코퍼레이션
                </p>
              </div>
            </div>
          </div>

          {/* 우측 - 쇼핑몰 기본정보 */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold mb-4 text-white">쇼핑몰 기본정보</h3>
            <div className="space-y-2 text-sm text-gray-300">
              <p>
                <span className="font-medium text-white">상호명</span>
                <br />
                (주)제니스 코퍼레이션
              </p>
              <p>
                <span className="font-medium text-white">대표자명</span>
                <br />
                전금희
              </p>
              <p>
                <span className="font-medium text-white">사업자등록번호</span>
                <br />
                322-86-00715
              </p>
              <p>
                <span className="font-medium text-white">사업장 주소</span>
                <br />
                04033 서울특별시 마포구 잔다리로 58 (서교동)
              </p>
              <p>
                <span className="font-medium text-white">통신판매업 신고번호</span>
                <br />
                2018-서울마포-0327{" "}
                <a
                  href="https://www.ftc.go.kr/bizCommPop.do?wrkr_no=3228600715"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 underline"
                  aria-label="사업자정보확인 새창으로 열기"
                >
                  [사업자정보확인]
                </a>
              </p>
              <p>
                <span className="font-medium text-white">개인정보보호책임자</span>
                <br />
                최승영
              </p>
              <p>
                <span className="font-medium text-white">호스팅서비스</span>
                <br />
                (주)제니스 코퍼레이션
              </p>
            </div>

            {/* SNS 아이콘 */}
            <div className="mt-6">
              <p className="text-sm font-medium mb-3 text-white">SNS</p>
              <div className="flex space-x-3">
                <a
                  href="#"
                  className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors"
                  aria-label="Instagram 페이지로 이동"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors"
                  aria-label="Facebook 페이지로 이동"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors"
                  aria-label="YouTube 채널로 이동"
                >
                  <Youtube className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* 하단 섹션 */}
        <div className="border-t border-gray-700 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            {/* 좌측 - 결제 서비스 및 저작권 */}
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-3">
                <div className="bg-white px-3 py-1 rounded text-xs">
                  <span className="text-slate-800 font-semibold">결제대행사 선정</span>
                </div>
                <span className="text-xs text-gray-400">
                  고객님의 안전거래를 위해 결제시 저희 쇼핑몰에서 가입한 구매안전서비스를 이용하실 수 있습니다.
                </span>
              </div>
              <p className="text-xs text-gray-400">
                 Copyright © ZENITH WORLD. All rights reserved. Designed & Developed by AQMAN
              </p>
            </div>
          </div>
        </div>

        {/* 면책조항 */}
        <div className="mt-6 pt-4 border-t border-gray-700">
          <div className="bg-gray-700 p-4 rounded-lg">
            <p className="text-xs text-gray-300 leading-relaxed">
              일부 상품의 경우 주식회사 제니스는 통신판매의 당사자가 아닌 통신판매중개자로서 상품, 상품정보, 거래에 대한
              책임이 제한될 수 있으므로, 각 상품 페이지에서 구체적인 내용을 확인하시기 바랍니다.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
