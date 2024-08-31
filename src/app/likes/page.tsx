import Conversations from '@/components/containers/Conversations'
import React from 'react'

export const dynamic = 'force-dynamic'

async function LikePage() {
  // const posts = await postService.getAll(1, { type: 'like' })

  return (
    <section className="flex w-full flex-col gap-4">
      <div className="py-10">
        {/* <Conversations initialData={posts.data} options={{ type: 'like' }} /> */}
        <Conversations options={{ type: 'like' }} />
      </div>
    </section>
  )
}

export default LikePage
