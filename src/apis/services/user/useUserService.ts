import { UseQueryOptions, useQuery } from '@tanstack/react-query'

import { DefaultResponse, User } from '@/lib/type'
import queryOptions from './queries'

export function useUserGetMe(
  options?: Omit<
    UseQueryOptions<DefaultResponse<User | null>>,
    'queryFn' | 'queryKey'
  >,
) {
  return useQuery({
    ...queryOptions.getMe(),
    initialData: () => ({
      data: null,
      error: 'initial data user',
      message: 'initial data user',
      success: false,
      status: 401,
    }),
    placeholderData: () => ({
      data: null,
      error: 'placeholder user',
      message: 'placeholder user',
      success: false,
      status: 401,
    }),
    retry: 0,
    ...options,
  })
}
