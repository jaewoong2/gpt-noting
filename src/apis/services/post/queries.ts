"use client"

import { UseMutationOptions } from "@tanstack/react-query"

import postService, { GetAllOptions } from "./postService"
import {
  CreateDeleteResponse,
  CreatePostBody,
  CreatePostResponse,
  GetPostsResponse,
} from "./type"

const queryKeys = {
  posts: (userId?: string) => ["posts", userId] as const,
  detail: (id: string) => ["posts", id] as const,
  //   detail: (photoId: number) => [...queryKeys.all, photoId] as const,
  //   detailComments: (photoId: number) =>
  //     [...queryKeys.detail(photoId), "comments"] as const,
  //   detailComment: ({
  //     photoId,
  //     commentId,
  //   }: {
  //     photoId: number
  //     commentId: number
  //   }) => [...queryKeys.detailComments(photoId), commentId] as const,
}

const queryOptions = {
  get: (options?: GetAllOptions) => ({
    queryKey: queryKeys.posts(options?.userid),
    queryFn: ({ pageParam }: { pageParam: { page: number } }) =>
      postService.getAll(pageParam.page, options),
    getNextPageParam: (lastPage: GetPostsResponse) => {
      return lastPage?.data?.meta?.hasNextPage
        ? { page: lastPage?.data.meta.page + 1 }
        : null
    },
    getPreviousPageParam: (firstPage: GetPostsResponse) => {
      return firstPage?.data?.meta?.hasPreviousPage
        ? { page: firstPage?.data.meta.page - 1 }
        : null
    },
  }),

  getDetail: (id: string) => ({
    queryKey: queryKeys.detail(id),
    queryFn: () => postService.get(id),
  }),

  create: (): UseMutationOptions<
    CreatePostResponse,
    Error,
    CreatePostBody,
    unknown
  > => ({
    mutationFn: (variables: CreatePostBody) => postService.create(variables),
  }),

  delete: (): UseMutationOptions<
    CreateDeleteResponse,
    Error,
    string,
    unknown
  > => ({
    mutationFn: (postId: string) => postService.delete(postId),
  }),
}

export default queryOptions
