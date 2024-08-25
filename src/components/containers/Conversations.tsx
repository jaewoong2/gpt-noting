'use client'

import { useInfiniteGetPost } from '@/apis/services/post/usePostService'
import React from 'react'
import { UseInfiniteGetPostOptions } from '@/apis/services/post/type'
import { motion } from 'framer-motion'
import ConversationCard from './ConversationCard'

type Props = {} & UseInfiniteGetPostOptions

function Conversations({ ...props }: Props) {
  const { data, fetchNextPage, hasNextPage } = useInfiniteGetPost({
    ...props,
    enabled: !props.initialData,
  })

  return (
    <div className="max-sm:px-4">
      {data.pages.map(({ data: post }, index) => (
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
          {index + 1 === data.pages.at(-1)?.data.meta?.page && hasNextPage && (
            <motion.div onViewportEnter={() => fetchNextPage()} />
          )}
        </React.Fragment>
      ))}
    </div>
  )
}

export default Conversations
