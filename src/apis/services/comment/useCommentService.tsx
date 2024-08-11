import Link from "next/link"
import {
  UseMutationOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query"

import { AuthValidationError } from "@/lib/error"
import { buttonVariants } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

import queryOptions from "./queries"
import { PostCommentBody, PostCommentResponse } from "./type"

type GetGroupQueryOptions = ReturnType<typeof queryOptions.get>

export function useGetComment(
  postId: string,
  options?: Omit<GetGroupQueryOptions, "queryFn" | "queryKey">
) {
  return useQuery({ ...queryOptions.get(postId), ...options })
}

export function usePostComment(
  options?: UseMutationOptions<
    PostCommentResponse,
    Error,
    PostCommentBody,
    unknown
  >
) {
  const queryClient = useQueryClient()
  const toast = useToast()

  return useMutation({
    ...queryOptions.create(),
    ...options,
    onSuccess(...rest) {
      const [, variables] = rest
      if (options?.onSuccess) {
        options?.onSuccess(...rest)
      }
      queryClient.invalidateQueries({
        queryKey: queryOptions.get(variables.postId).queryKey,
      })
    },
    onError(error, variables, context) {
      if (options?.onError) {
        options.onError(error, variables, context)
      }

      if (error instanceof AuthValidationError) {
        toast.toast({
          variant: "destructive",
          title: error.message,
          className: "bg-pink-300 border-0",
          action: (
            <Link
              href={"/login"}
              target="_blank"
              referrerPolicy="no-referrer"
              className={buttonVariants({ size: "sm" })}
            >
              로그인 하러가기
            </Link>
          ),
        })
      }
    },
  })
}
