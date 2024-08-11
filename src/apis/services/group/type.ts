import { DefaultResponse, Post, User } from "@/types"

export type GetGroupResponse = DefaultResponse<{
  id: string
  groupName: string
  ownerId: string
  users: User[]
  posts: Post[]
}>
