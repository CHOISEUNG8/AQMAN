import { Card, CardContent } from "@/components/ui/card"

export default function NoticesLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header Skeleton */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="h-8 bg-gray-200 rounded w-32 animate-pulse"></div>
              <div className="h-8 bg-gray-200 rounded w-20 animate-pulse"></div>
            </div>
            <div className="h-4 bg-gray-200 rounded w-64 animate-pulse"></div>
          </div>

          {/* Category Filter Skeleton */}
          <div className="flex flex-wrap gap-2 mb-6">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-8 bg-gray-200 rounded w-16 animate-pulse"></div>
            ))}
          </div>

          {/* Notice List Skeleton */}
          <div className="space-y-4">
            {/* Pinned Notice Skeleton */}
            <Card className="border-red-200 bg-red-50/50">
              <CardContent className="p-6">
                <div className="flex items-start gap-3">
                  <div className="h-5 w-5 bg-gray-200 rounded animate-pulse mt-0.5"></div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="h-5 bg-gray-200 rounded w-12 animate-pulse"></div>
                      <div className="h-5 bg-gray-200 rounded w-16 animate-pulse"></div>
                    </div>
                    <div className="h-6 bg-gray-200 rounded w-3/4 mb-2 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-full mb-4 animate-pulse"></div>
                    <div className="flex items-center gap-4">
                      <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
                      <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Regular Notice Skeletons */}
            {[1, 2, 3, 4].map((i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <div className="h-5 bg-gray-200 rounded w-16 mb-2 animate-pulse"></div>
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-2 animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-full mb-4 animate-pulse"></div>
                  <div className="flex items-center gap-4">
                    <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Pagination Skeleton */}
          <div className="mt-8 flex justify-center">
            <div className="flex items-center gap-2">
              <div className="h-8 bg-gray-200 rounded w-12 animate-pulse"></div>
              <div className="h-8 bg-gray-200 rounded w-8 animate-pulse"></div>
              <div className="h-8 bg-gray-200 rounded w-12 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
