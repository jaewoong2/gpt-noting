import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import DesriptionSkeleton from '@/components/ui/description-skeleton'
import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

function PageSkeletonCard() {
  return (
    <div className="flex w-full flex-col">
      <div className="mx-auto flex w-full max-w-xl flex-col gap-4 max-sm:w-full max-sm:gap-2">
        <div className="flex items-center gap-2">
          <Skeleton className="h-10 w-10 flex-shrink-0 rounded-full bg-zinc-300" />
          <div>
            <Skeleton className="mb-1 h-4 w-24 bg-zinc-300 text-xs" />
            <Skeleton className="h-4 w-16 bg-zinc-300 text-xs" />
          </div>
        </div>

        <Card className="w-full overflow-hidden rounded-xl dark:bg-[#1f1f1f]">
          <CardHeader className="border-b pb-3">
            <CardTitle>
              <Skeleton className="mb-1 h-4 w-24 bg-zinc-300 text-xs" />
            </CardTitle>
          </CardHeader>
          <CardContent className="mt-2 min-h-40 w-full px-6">
            <DesriptionSkeleton />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function LoadingPage() {
  return (
    <div className="my-10 flex w-full flex-col gap-10">
      {Array(10)
        .fill(0)
        .map((number, index) => (
          <PageSkeletonCard key={`${+number + index}`} />
        ))}
    </div>
  )
}

export default LoadingPage
