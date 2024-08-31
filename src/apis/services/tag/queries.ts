'use client'

import tagService from './tagService'

const queryKeys = {
  getTag: (userId: string) => ['get', userId],
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
  getTag: (userId: string) => ({
    queryKey: queryKeys.getTag(userId),
    queryFn: () => tagService.getTag(userId),
  }),
}

export default queryOptions
