import React from 'react'

type Props = JSX.IntrinsicElements['div']

const DesriptionSkeleton = ({ className, ...props }: Props) => {
  return (
    <div className={`flex h-40 w-full flex-col gap-2 ${className}`} {...props}>
      <div className="h-8 w-full animate-pulse rounded-md bg-slate-200 dark:bg-zinc-700"></div>
      <div className="h-8 w-[80%] animate-pulse rounded-md bg-slate-200 dark:bg-zinc-700"></div>
      <div className="h-8 w-[75%] animate-pulse rounded-md bg-slate-200 dark:bg-zinc-700"></div>
      <div className="h-8 w-[90%] animate-pulse rounded-md bg-slate-200 dark:bg-zinc-700"></div>
    </div>
  )
}

export default DesriptionSkeleton
