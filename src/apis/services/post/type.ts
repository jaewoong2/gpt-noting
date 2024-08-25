import { DefaultResponse, PageMetaDto, Post } from '@/lib/type'

export type GetAllOptions = {
  type?: 'user' | 'group' | 'like'
  userid?: string
  groupId?: string
}

export type SearchPostsResponse = DefaultResponse<
  (Post & { snippet: string; matchSource: string })[]
>

export type GetPostsResponse = DefaultResponse<{
  data: Post[]
  meta: PageMetaDto | null
}>

export type GetPostDetailResponse = DefaultResponse<Post>

export type UpdatePostRequest = Partial<Post> & { id: string }

export type UpdatePostResponse = DefaultResponse<{
  data: { id: string }
}>

export interface UseInfiniteGetPostOptions {
  initialPageParam?: { page: number }
  enabled?: boolean
  initialData?: GetPostsResponse['data']
  options?: GetAllOptions
}

export type CreatePostBody = {
  title: string
  description: string
  groupName: string
  images?: string[]
  tags?: string[]
  is_public: boolean
}

export type CreateDeleteResponse = DefaultResponse<{
  data: { id: string }
}>

export type CreatePostResponse = DefaultResponse<{
  message: string
  error: null
  status: number
  success: boolean
  data: {
    id: string
  }
}>
