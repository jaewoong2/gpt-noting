import Link from 'next/link'
import React from 'react'

const NotFound = () => {
  return (
    <div className="flex min-h-[calc(100vh-100px)] w-full flex-col items-center justify-center">
      <div className="text-xl font-bold">잘못된 접근 이에요</div>
      <Link
        href={'/'}
        className="mt-4 w-fit rounded-lg bg-slate-200 p-3 px-6 text-sm font-bold shadow-lg hover:bg-slate-300"
      >
        홈으로 가기
      </Link>
    </div>
  )
}

export default NotFound
