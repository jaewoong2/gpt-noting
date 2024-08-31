import { UseMutationOptions, useMutation } from "@tanstack/react-query"

import { useToast } from "@/components/ui/use-toast"

import queryOptions from "./queries"
import { CreateImageBody, CreateImageResponse } from "./type"

export function useCreateImage(
  options?: UseMutationOptions<
    CreateImageResponse,
    Error,
    CreateImageBody,
    unknown
  >
) {
  const toast = useToast()

  return useMutation({
    ...queryOptions.create(),
    ...options,
    onError(error, variables, context) {
      if (options?.onError) {
        options.onError(error, variables, context)
      }

      toast.toast({ title: error.message })
    },
  })
}
