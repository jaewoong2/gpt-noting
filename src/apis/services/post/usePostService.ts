import {
  UseMutationOptions,
  UseQueryOptions,
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'

import queryOptions from './queries'
import {
  CreateDeleteResponse,
  CreatePostBody,
  CreatePostResponse,
  GetPostDetailResponse,
  SearchPostsResponse,
  UpdatePostRequest,
  UseInfiniteGetPostOptions,
} from './type'

const INITIAL_DATA = {
  page: {
    data: {
      data: [],
      meta: null,
    },
    success: true,
    error: '',
    message: '',
    status: 200,
  },
  pageParams: [{ page: 1 }],
}

export function useSearchPosts(
  query?: string,
  options?: Omit<
    UseQueryOptions<SearchPostsResponse | null>,
    'queryFn' | 'queryKey'
  >,
) {
  return useQuery({
    ...queryOptions.searchPosts(query),
    ...options,
  })
}

export function useInfiniteGetPost({
  initialPageParam,
  enabled,
  initialData,
  options,
}: UseInfiniteGetPostOptions) {
  return useInfiniteQuery({
    ...queryOptions.get(options),
    initialData() {
      return {
        pages: [
          {
            ...INITIAL_DATA.page,
            data: {
              data: initialData?.data ?? [],
              meta: initialData?.meta ?? null,
            },
          },
        ],
        pageParams: INITIAL_DATA.pageParams,
      }
    },
    initialPageParam: initialPageParam ?? { page: 1 }, // Default to page 1 if not provided
    enabled: enabled ?? true, // Default to true if not provided
    retry: 0,
  })
}

export function useCreatePost(
  options?: UseMutationOptions<
    CreatePostResponse,
    Error,
    CreatePostBody,
    unknown
  >,
) {
  const queryClient = useQueryClient()

  return useMutation({
    ...queryOptions.create(),
    ...options,
    onSuccess(data, variables, context) {
      if (options?.onSuccess) {
        options?.onSuccess(data, variables, context)
      }
      queryClient.invalidateQueries({ queryKey: queryOptions.get().queryKey })
    },
  })
}

export function useGetPostDetail(
  id: string,
  options?: Omit<
    UseQueryOptions<GetPostDetailResponse, Error>,
    'queryKey' | 'queryFn'
  >,
) {
  return useQuery({
    ...queryOptions.getDetail(id),
    ...options,
  })
}

export function useDeletePost(
  options?: UseMutationOptions<CreateDeleteResponse, Error, string, unknown>,
) {
  const queryClient = useQueryClient()

  return useMutation({
    ...queryOptions.delete(),
    ...options,
    onSuccess(data, variables, context) {
      if (options?.onSuccess) {
        options?.onSuccess(data, variables, context)
      }
      queryClient.invalidateQueries({ queryKey: queryOptions.get().queryKey })
    },
  })
}

export function useUpdatePost(
  options?: UseMutationOptions<
    CreateDeleteResponse,
    Error,
    UpdatePostRequest,
    unknown
  >,
) {
  const queryClient = useQueryClient()

  return useMutation({
    ...queryOptions.update(),
    ...options,
    onSuccess(data, variables, context) {
      if (options?.onSuccess) {
        options?.onSuccess(data, variables, context)
      }
      queryClient.invalidateQueries({ queryKey: queryOptions.get().queryKey })
    },
  })
}
