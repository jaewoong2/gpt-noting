import Conversations from '@/components/containers/Conversations'
import React from 'react'

async function LikePage() {
  return (
    <section className="flex w-full flex-col gap-4">
      <div className="py-10">
        <Conversations options={{ type: 'like' }} />
      </div>
    </section>
  )
}

export default LikePage
