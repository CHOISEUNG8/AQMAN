"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, Zap } from "lucide-react"

const timeSaleProducts = [
  {
    id: 1,
    name: "타임세일 무선 이어폰",
    price: 99000,
    originalPrice: 159000,
    image: "https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=800",
    discount: 38,
    endsAt: new Date(Date.now() + 1000 * 60 * 60 * 2), // 2시간 후 종료
  },
  {
    id: 2,
    name: "타임세일 스마트워치",
    price: 129000,
    originalPrice: 199000,
    image: "https://images.pexels.com/photos/267394/pexels-photo-267394.jpeg?auto=compress&cs=tinysrgb&w=800",
    discount: 35,
    endsAt: new Date(Date.now() + 1000 * 60 * 60 * 2),
  },
  {
    id: 3,
    name: "타임세일 프리미엄 백팩",
    price: 79000,
    originalPrice: 129000,
    image: "https://images.pexels.com/photos/322207/pexels-photo-322207.jpeg?auto=compress&cs=tinysrgb&w=800",
    discount: 39,
    endsAt: new Date(Date.now() + 1000 * 60 * 60 * 2),
  },
]

function getTimeLeft(end: Date) {
  const now = new Date()
  const diff = end.getTime() - now.getTime()
  if (diff <= 0) return "00:00:00"
  const hours = String(Math.floor(diff / (1000 * 60 * 60))).padStart(2, "0")
  const minutes = String(Math.floor((diff / (1000 * 60)) % 60)).padStart(2, "0")
  const seconds = String(Math.floor((diff / 1000) % 60)).padStart(2, "0")
  return `${hours}:${minutes}:${seconds}`
}

export default function TimeSaleSection() {
  const [now, setNow] = useState(new Date())
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge className="bg-orange-500 text-white px-4 py-2 text-base"><Zap className="w-4 h-4 mr-1 inline" />타임세일</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 mt-4">⏰ 한정 타임세일</h2>
          <p className="text-gray-700 text-lg max-w-2xl mx-auto">지금만 이 가격! 타임세일 상품을 놓치지 마세요</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {timeSaleProducts.map((product) => (
            <Card key={product.id} className="group overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer">
              <div className="relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-red-500 text-white">-{product.discount}%</Badge>
                </div>
                <div className="absolute top-4 right-4 flex items-center gap-1 bg-black/60 text-white px-3 py-1 rounded-full">
                  <Clock className="w-4 h-4 mr-1" />
                  <span className="font-mono text-sm">{getTimeLeft(product.endsAt)}</span>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-2">{product.name}</h3>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl font-bold text-orange-600">{product.price.toLocaleString()}원</span>
                  <span className="text-gray-400 line-through">{product.originalPrice.toLocaleString()}원</span>
                </div>
                <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white mt-2">구매하기</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
} 