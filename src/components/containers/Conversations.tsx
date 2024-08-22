'use client'

import { useInfiniteGetPost } from '@/apis/services/post/usePostService'
import React from 'react'
import { UseInfiniteGetPostOptions } from '@/apis/services/post/type'
import ConversationCard from './ConversationCard'

type Props = {} & UseInfiniteGetPostOptions

function Conversations({ ...props }: Props) {
  const { data } = useInfiniteGetPost({ ...props })

  return (
    <div className="max-sm:px-4">
      {data.pages.map(({ data: post }) => (
        <React.Fragment
          key={`${post.meta?.page}-${post.meta?.hasNextPage}-${post.meta?.total}`}
        >
          {post.data.map(
            ({ title, id, description, createdAt, tags, user, is_public }) => (
              <ConversationCard
                is_public={is_public}
                key={id}
                id={id}
                title={title}
                user={user}
                createdAt={createdAt}
                tags={tags}
              >
                {description}
              </ConversationCard>
            ),
          )}
        </React.Fragment>
      ))}
    </div>
  )
}

export default Conversations
