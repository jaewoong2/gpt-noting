import { UseQueryOptions, useQuery } from '@tanstack/react-query'
import { DefaultResponse, User } from '@/types'

import queryOptions from './queries'

const placeholdUser: User = {
  avatar: 'https://images.prlc.kr/resized/images/jeans.png',
  userName: 'Moooo-',
  createdAt: new Date().toString(),
  updateAt: new Date().toString(),
  id: '',
  rewards: [],
}

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
