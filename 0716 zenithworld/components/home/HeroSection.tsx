"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, ShoppingBag, Zap, Star } from "lucide-react"

const heroSlides = [
  {
    id: 1,
    title: "신상품 런칭",
    subtitle: "최신 트렌드 아이템을 만나보세요",
    description: "엄선된 프리미엄 상품들을 특별한 가격으로 제공합니다",
    image: "https://images.pexels.com/photos/1884581/pexels-photo-1884581.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    cta: "지금 쇼핑하기",
    discount: "최대 50% 할인"
  },
  {
    id: 2,
    title: "빅 세일 이벤트",
    subtitle: "놓치면 후회하는 특가 찬스",
    description: "연말 특별 세일로 더욱 저렴하게 구매하세요",
    image: "https://images.pexels.com/photos/1884582/pexels-photo-1884582.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    cta: "세일 상품 보기",
    discount: "추가 30% 할인"
  },
  {
    id: 3,
    title: "프리미엄 컬렉션",
    subtitle: "품격있는 라이프스타일을 제안합니다",
    description: "고급스러운 디자인과 뛰어난 품질을 경험해보세요",
    image: "https://images.pexels.com/photos/1884583/pexels-photo-1884583.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    cta: "컬렉션 보기",
    discount: "무료 배송"
  }
]

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
  }

  return (
    <section className="relative h-[500px] md:h-[600px] overflow-hidden">
      {/* 슬라이드 컨테이너 */}
      <div className="relative h-full">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {/* 배경 이미지 */}
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ 
                backgroundImage: `url(${slide.image})` 
              }}
            >
              <div className="absolute inset-0 bg-black/40"></div>
            </div>

            {/* 콘텐츠 */}
            <div className="relative h-full flex items-center">
              <div className="container mx-auto px-4">
                <div className="max-w-2xl text-white">
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="bg-blue-500 px-3 py-1 rounded-full text-sm font-medium">
                      {slide.discount}
                    </div>
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-blue-400 text-blue-400" />
                      ))}
                    </div>
                  </div>
                  
                  <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
                    {slide.title}
                  </h1>
                  
                  <p className="text-xl md:text-2xl mb-4 opacity-90">
                    {slide.subtitle}
                  </p>
                  
                  <p className="text-lg mb-8 opacity-80 leading-relaxed">
                    {slide.description}
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button 
                      size="lg" 
                      className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg font-semibold transition-all duration-200 transform hover:scale-105"
                    >
                      <ShoppingBag className="w-5 h-5 mr-2" />
                      {slide.cta}
                    </Button>
                    <Button 
                      variant="outline" 
                      size="lg" 
                      className="border-white text-white hover:bg-white hover:text-gray-900 px-8 py-3 text-lg font-semibold transition-all duration-200"
                    >
                      <Zap className="w-5 h-5 mr-2" />
                      더 알아보기
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 네비게이션 버튼 */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-all duration-200"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-all duration-200"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* 인디케이터 */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-200 ${
              index === currentSlide ? 'bg-blue-500' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </section>
  )
}