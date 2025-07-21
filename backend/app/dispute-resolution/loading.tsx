export default function DisputeResolutionLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          {/* 헤더 스켈레톤 */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="h-8 bg-gray-200 rounded w-48 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-96"></div>
              </div>
              <div className="h-10 bg-gray-200 rounded w-24"></div>
            </div>
          </div>

          {/* 콘텐츠 스켈레톤 */}
          <div className="space-y-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white p-6 rounded-lg border">
                <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded">
                    <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                    <div className="space-y-2">
                      <div className="h-3 bg-gray-200 rounded w-full"></div>
                      <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded">
                    <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                    <div className="space-y-2">
                      <div className="h-3 bg-gray-200 rounded w-full"></div>
                      <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 고객센터 정보 스켈레톤 */}
          <div className="mt-8 bg-white p-6 rounded-lg border">
            <div className="h-6 bg-gray-200 rounded w-32 mb-4"></div>
            <div className="grid md:grid-cols-2 gap-6">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded w-24 mb-1"></div>
                    <div className="h-5 bg-gray-200 rounded w-32 mb-1"></div>
                    <div className="h-3 bg-gray-200 rounded w-28"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
