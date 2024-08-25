import postService from '@/apis/services/post/postService'
import tagService from '@/apis/services/tag/tagService'
import userService from '@/apis/services/user/userService'
import Conversations from '@/components/containers/Conversations'
import { NextPageProps } from '@/lib/type'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import React from 'react'

type Params = {
  username: string
}

async function UserNamePage({ params }: NextPageProps<Params>) {
  const user = await userService.getUser(params.username)
  const usersPost = await postService.getAll(0, {
    type: 'user',
    userid: user.data?.id,
  })

  if (!user.data?.id) {
    notFound()
  }

  const { avatar, userName } = user.data && user.data
  // const posts = usersPost.data.data
  const tags = await tagService.getTag(user.data?.id)

  return (
    <div className="mt-10 flex w-full flex-col">
      <div className="mx-auto flex w-full max-w-xl flex-col gap-4 border-b max-sm:w-full max-sm:gap-2">
        <div className="flex w-full items-center justify-between max-sm:px-6">
          <figure className="overflow-hidden rounded-full border bg-white">
            <Image
              className="size-20 flex-shrink-0"
              src={avatar}
              alt={userName}
              width={80}
              height={80}
            />
          </figure>
          <div className="flex flex-col items-end">
            <span className="text-lg font-semibold">{userName}</span>
            <div className="flex gap-1 text-sm text-muted-foreground">
              <span>저장</span>
              <span>{usersPost.data?.meta?.total}건</span>
            </div>
          </div>
        </div>
        <div className="pb-10">
          <div className="flex flex-wrap gap-2">
            {tags.data?.map((tag) => (
              <Link href={`?tag=${tag.name}`} key={tag?.id}>
                <code className="rounded-xl border bg-slate-100 p-1 text-xs text-muted-foreground hover:bg-slate-200 dark:bg-stone-900 dark:hover:bg-stone-950">
                  {tag.name}
                </code>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="py-10">
        <Conversations
          initialData={usersPost.data}
          options={{ userid: user.data?.id, type: 'user' }}
        />
      </div>
    </div>
  )
}

export default UserNamePage
