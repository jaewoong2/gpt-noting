import React from 'react'
import Conversations from '@/components/containers/Conversations'
import postService from '@/apis/services/post/postService'

async function HomePage() {
  const posts = await postService.getAll(1)

  return (
    <section className="flex w-full flex-col gap-4">
      <div className="py-10">
        <Conversations
          initialData={posts.data}
          initialPageParam={{ page: 1 }}
        />
      </div>
    </section>
  )
}

export default HomePage
