'use client'

import React, { PropsWithChildren } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { Post } from '@/lib/type'
import { getRelativeTime } from '@/lib/time'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import UserAvatar from './UserAvatar'
import DesriptionSkeleton from '../ui/description-skeleton'
import UserName from './UserName'
import { Badge } from '../ui/badge'
import TransactionButtons from './TransactionButtons'

type Props = {
  title: string
  id: string
  tags: Post['tags']
  createdAt: string
  user: Post['user']
  is_public: boolean
}

const Description = dynamic(
  () => import('@/components/containers/Description'),
  { loading: () => <DesriptionSkeleton />, ssr: true },
)

function ConversationCard({
  createdAt,
  tags,
  user,
  title,
  is_public,
  id,
  children,
}: PropsWithChildren<Props>) {
  return (
    <div className="flex flex-col">
      <div className="mx-auto flex w-full max-w-xl flex-col gap-4 max-sm:w-full max-sm:gap-2">
        <div className="flex items-center gap-2">
          <Link href={`/${user?.userName}`}>
            <UserAvatar
              className="h-8 w-8 flex-shrink-0"
              avatar={user?.avatar}
            />
          </Link>
          <div>
            <Link href={`/${user?.userName}`}>
              <UserName userName={user?.userName} />
            </Link>
            <p className="text-xs">{getRelativeTime(createdAt)}</p>
          </div>
        </div>
        {/* 메인 등록 게시글 화면 */}
        <Card className="w-full overflow-hidden rounded-xl dark:bg-[#1f1f1f]">
          <CardHeader className="border-b pb-3">
            <CardTitle>
              <span>{title.split('] ')[1]}</span>
            </CardTitle>
            {tags?.map((tag) => (
              <Badge className="w-fit text-xs" variant="secondary" key={tag.id}>
                <Link href={`?tag=${tag.name}`}>{tag.name}</Link>
              </Badge>
            ))}
          </CardHeader>
          <Link
            href={`/post/${id}`}
            className="flex max-h-96 w-full max-sm:w-full max-sm:flex-col"
          >
            <CardContent className="mt-2 min-h-40 w-full px-6">
              <Description
                className="mt-6 w-full dark:bg-[#1f1f1f]"
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
                {children}
              </Description>
            </CardContent>
          </Link>
        </Card>
      </div>
      <div className="mx-auto flex w-full max-w-xl items-center justify-end gap-2 py-3">
        <TransactionButtons
          userId={user?.id}
          postId={id}
          is_public={is_public}
        />
      </div>
    </div>
  )
}

export default ConversationCard
