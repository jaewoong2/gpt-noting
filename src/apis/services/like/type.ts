import { DefaultResponse, Like, PageMetaDto } from '@/lib/type'

export type LikePostResponse = {}

export type GetLikesResponse = DefaultResponse<{
  data: Like[]
  meta: PageMetaDto | null
}>
