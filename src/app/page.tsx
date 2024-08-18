import Conversations from '@/components/containers/Conversations'
import React from 'react'

function HomePage() {
  return (
    <section className="flex w-full flex-col gap-4">
      <div className="py-10">
        <Conversations />
      </div>
    </section>
  )
}

export default HomePage
