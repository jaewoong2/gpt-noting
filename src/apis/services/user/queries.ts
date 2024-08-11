"use client"

import { UseMutationOptions } from "@tanstack/react-query"

import userService from "./userService"

const queryKeys = {
  getMe: ["getMe"] as const,
  getUser: (user: string) => ["get", user],
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
  getMe: () => ({
    queryKey: queryKeys.getMe,
    queryFn: () => userService.getMe(),
  }),

  getUser: () => ({
    queryKey: queryKeys.getMe,
    queryFn: () => userService.getMe(),
  }),
}

export default queryOptions
