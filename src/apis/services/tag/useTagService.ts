import { UseQueryOptions, useQuery } from '@tanstack/react-query'

import { DefaultResponse, Tag } from '@/lib/type'
import queryOptions from './queries'

function useGetTag(
  userId: string,
  options?: Omit<
    UseQueryOptions<DefaultResponse<Tag | null>>,
    'queryFn' | 'queryKey'
  >,
) {
  return useQuery({
    ...queryOptions.getTag(userId),
    initialData: {
      data: null,
      error: 'initial data user',
      message: 'initial data user',
      success: false,
      status: 401,
    },
    ...options,
  })
}

export { useGetTag }
