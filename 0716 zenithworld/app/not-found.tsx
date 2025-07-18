import Link from 'next/link'
import { Button } from '@/components/ui/button'
import BackButton from '@/components/BackButton'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-bold text-gray-800">페이지를 찾을 수 없습니다</h2>
        <p className="text-gray-600 max-w-md">
          요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
        </p>
        <div className="space-x-4">
          <Button asChild>
            <Link href="/">
              홈으로 돌아가기
            </Link>
          </Button>
          <BackButton />
        </div>
      </div>
    </div>
  )
} 