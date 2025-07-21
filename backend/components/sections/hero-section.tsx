"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import Link from "next/link"

const heroSlides = [
  {
    id: 1,
    image:
      "https://images.pexels.com/photos/1884583/pexels-photo-1884583.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    badge: "무료 배송",
    rating: 5,
    title: "프리미엄 컬렉션",
    subtitle: "품격있는 라이프스타일을 제안합니다",
    description: "고급스러운 디자인과 뛰어난 품질을 경험해보세요",
    primaryButton: "컬렉션 보기",
    secondaryButton: "더 알아보기",
    primaryLink: "/products?category=premium",
    secondaryLink: "/products",
  },
  {
    id: 2,
    image:
      "https://images.pexels.com/photos/1884581/pexels-photo-1884581.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    badge: "신상품",
    rating: 5,
    title: "최신 트렌드",
    subtitle: "새로운 스타일을 만나보세요",
    description: "트렌디한 아이템으로 당신만의 스타일을 완성하세요",
    primaryButton: "신상품 보기",
    secondaryButton: "더 알아보기",
    primaryLink: "/products?category=new",
    secondaryLink: "/products",
  },
  {
    id: 3,
    image:
      "https://images.pexels.com/photos/1884584/pexels-photo-1884584.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    badge: "특가 할인",
    rating: 4,
    title: "할인 이벤트",
    subtitle: "최대 70% 할인 혜택",
    description: "지금 바로 특별한 가격으로 만나보세요",
    primaryButton: "할인상품 보기",
    secondaryButton: "더 알아보기",
    primaryLink: "/products?category=sale",
    secondaryLink: "/products",
  },
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

  const currentSlideData = heroSlides[currentSlide]

  return (
    <section className="relative h-[600px] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={currentSlideData.image || "/placeholder.svg"}
          alt={currentSlideData.title}
          className="w-full h-full object-cover"
          crossOrigin="anonymous"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
        <div className="max-w-2xl text-white">
          {/* Badge with Rating */}
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-blue-600 hover:bg-blue-700 text-white border-0 px-4 py-2 rounded-full text-sm font-medium">
              {currentSlideData.badge}
            </div>
            <div className="flex items-center gap-1">
              {[...Array(currentSlideData.rating)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
          </div>

          {/* Title */}
          <h1 className="text-5xl md:text-6xl font-bold mb-4 leading-tight">{currentSlideData.title}</h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl mb-4 text-gray-200">{currentSlideData.subtitle}</p>

          {/* Description */}
          <p className="text-lg mb-8 text-gray-300 leading-relaxed">{currentSlideData.description}</p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3" asChild>
              <Link href={currentSlideData.primaryLink}>{currentSlideData.primaryButton}</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-black px-8 py-3 bg-transparent"
              asChild
            >
              <Link href={currentSlideData.secondaryLink}>{currentSlideData.secondaryButton}</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${index === currentSlide ? "bg-white" : "bg-white/50"}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
