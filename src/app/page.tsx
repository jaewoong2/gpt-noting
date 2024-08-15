import ConversationCard from '@/components/containers/ConversationCard'
import React from 'react'

function HomePage() {
  return (
    <section className="flex w-full flex-col gap-4">
      <ConversationCard />
      <ConversationCard />
      <ConversationCard />
      <ConversationCard />
    </section>
  )
}

export default HomePage
