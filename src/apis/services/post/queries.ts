'use client'

import { UseMutationOptions } from '@tanstack/react-query'

import postService from './postService'
import {
  CreateDeleteResponse,
  CreatePostBody,
  CreatePostResponse,
  GetAllOptions,
  GetPostsResponse,
  UpdatePostRequest,
} from './type'

const queryKeys = {
  posts: (userId?: string) => ['posts', userId] as const,
  detail: (id: string) => ['posts', id] as const,
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
    getNextPageParam: (lastPage: GetPostsResponse) =>
      lastPage?.data?.meta?.hasNextPage
        ? // eslint-disable-next-line no-unsafe-optional-chaining
          { page: lastPage?.data.meta.page + 1 }
        : null,
    getPreviousPageParam: (firstPage: GetPostsResponse) =>
      firstPage?.data?.meta?.hasPreviousPage
        ? // eslint-disable-next-line no-unsafe-optional-chaining
          { page: firstPage?.data.meta.page - 1 }
        : null,
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

  update: (): UseMutationOptions<
    CreateDeleteResponse,
    Error,
    UpdatePostRequest,
    unknown
  > => ({
    mutationFn: (post: UpdatePostRequest) => postService.update(post),
  }),
}

export default queryOptions
