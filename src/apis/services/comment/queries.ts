import { UseMutationOptions, UseQueryOptions } from "@tanstack/react-query"

import commentService from "./commentService"
import {
  GetCommentResponse,
  PostCommentBody,
  PostCommentResponse,
} from "./type"

const queryKeys = {
  comments: (postId: string) => ["comments", postId],
}

const queryOptions = {
  get: (
    postId: string
  ): UseQueryOptions<
    GetCommentResponse | null,
    Error,
    GetCommentResponse,
    string[]
  > => ({
    queryKey: queryKeys.comments(postId),
    queryFn: async () => {
      const result = await commentService.get(postId)
      return result
    },
  }),

  create: (): UseMutationOptions<
    PostCommentResponse,
    Error,
    PostCommentBody,
    unknown
  > => ({
    mutationFn: ({ postId, content }: PostCommentBody) =>
      commentService.post(postId, { content }),
  }),
}

export default queryOptions
