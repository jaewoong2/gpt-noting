import {
  UseMutationOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query"

import { useToast } from "@/components/ui/use-toast"

import postQueryOptions from "../../services/post/queries"
import queryOptions from "./queries"
import { LikePostResponse } from "./type"

export function useUnLikePost(
  options?: UseMutationOptions<LikePostResponse, Error, string, unknown>
) {
  const queryClient = useQueryClient()

  return useMutation({
    ...queryOptions.unlike(),
    ...options,
    onSuccess(...rest) {
      if (options?.onSuccess) {
        options?.onSuccess(...rest)
      }
      queryClient.invalidateQueries({
        queryKey: postQueryOptions.get().queryKey,
      })
      queryClient.invalidateQueries({
        queryKey: queryOptions.gets().queryKey,
      })
    },
  })
}

export function useLikePost(
  options?: UseMutationOptions<LikePostResponse, Error, string, unknown>
) {
  const queryClient = useQueryClient()
  const toast = useToast()

  return useMutation({
    ...queryOptions.like(),
    ...options,
    onSuccess(...rest) {
      if (options?.onSuccess) {
        options?.onSuccess(...rest)
      }
      queryClient.invalidateQueries({
        queryKey: postQueryOptions.get().queryKey,
      })
      queryClient.invalidateQueries({
        queryKey: queryOptions.gets().queryKey,
      })
    },
    onError(error, variables, context) {
      if (options?.onError) {
        options.onError(error, variables, context)
      }

      toast.toast({
        variant: "destructive",
        title: error.message,
        // className: "bg-red-500 text-white",
      })
    },
  })
}

export function useGetLikes(
  options?: Omit<ReturnType<typeof queryOptions.gets>, "queryFn" | "queryKey">
) {
  return useQuery({
    ...queryOptions.gets(),
    ...options,
  })
}
