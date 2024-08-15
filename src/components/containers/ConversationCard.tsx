'use client'

import React from 'react'
import dynamic from 'next/dynamic'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import UserAvatar from './UserAvatar'
import HeartIcon from '../ui/icons/HeartIcon'
import Link from 'next/link'
import DesriptionSkeleton from '../ui/description-skeleton'
import UserName from './UserName'

const Description = dynamic(
  () => import('@/components/containers/Description'),
  { loading: () => <DesriptionSkeleton />, ssr: true },
)

const createdAt = '2024.08.14'

function ConversationCard() {
  return (
    <div className="flex flex-col">
      <div className="mx-auto flex w-[672px] flex-col gap-4 max-sm:w-full max-sm:gap-2">
        <div className="flex items-center gap-2">
          <UserAvatar className="h-8 w-8 flex-shrink-0" />
          <div>
            <UserName />
            <p className="text-xs">{createdAt}</p>
          </div>
        </div>
        <Link
          href="/post/b86b2108-1885-41bc-8326-ec96b880d273"
          className="flex max-h-96 w-full max-sm:w-full max-sm:flex-col"
        >
          <Card className="w-full overflow-hidden rounded-xl dark:bg-zinc-900">
            <CardHeader className="border-b pb-3">
              <CardTitle>
                <span>타이틀</span>
              </CardTitle>
              <p className="text-sm font-light text-gray-700 dark:text-white">
                #tag
              </p>
            </CardHeader>
            <CardContent className="mt-2 min-h-40 w-full px-6">
              <Description
                className="w-full dark:bg-zinc-900"
                rehypeRewrite={(node, _, parent) => {
                  if (
                    parent &&
                    'tagName' in node &&
                    'tagName' in parent &&
                    node.tagName === 'a' &&
                    parent &&
                    /^h(1|2|3|4|5|6)/.test(parent.tagName)
                  ) {
                    // eslint-disable-next-line no-param-reassign
                    parent.children = parent.children.slice(1)
                  }
                }}
                style={{ padding: 0 }}
              >
                {process.env.NEXT_PUBLIC_EXAMPLE}
              </Description>
            </CardContent>
          </Card>
        </Link>
      </div>
      <div className="mx-auto flex w-[672px] items-center justify-end gap-2 py-3">
        <button type="button" className="group">
          <HeartIcon
            className="stroke-gray-600 transition-colors group-hover:fill-red-400 dark:stroke-white"
            strokeWidth={2}
          />
        </button>
      </div>
    </div>
  )
}

export default ConversationCard
