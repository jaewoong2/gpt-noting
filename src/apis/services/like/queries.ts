"use client"

import { UseMutationOptions } from "@tanstack/react-query"

import likeService from "./likeService"
import { LikePostResponse } from "./type"

const queryKeys = {
  gets: ["gets"],
}

const queryOptions = {
  like: (): UseMutationOptions<LikePostResponse, Error, string, unknown> => ({
    mutationFn: (postId: string) => likeService.like(postId),
  }),

  unlike: (): UseMutationOptions<LikePostResponse, Error, string, unknown> => ({
    mutationFn: (postId: string) => likeService.unlike(postId),
  }),

  gets: () => ({
    queryKey: queryKeys.gets,
    queryFn: async () => {
      const result = await likeService.getLikes()
      return result
    },
  }),
}

export default queryOptions
