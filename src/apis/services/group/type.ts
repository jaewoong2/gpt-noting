import { DefaultResponse, Post, User } from '@/lib/type'

export type GetGroupResponse = DefaultResponse<{
  id: string
  groupName: string
  ownerId: string
  users: User[]
  posts: Post[]
}>
