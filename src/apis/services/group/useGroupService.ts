import { useQuery } from "@tanstack/react-query"

import queryOptions from "./queries"

type GetGroupQueryOptions = ReturnType<typeof queryOptions.get>

export function useGroupGetGroup(
  options?: Omit<GetGroupQueryOptions, "queryFn" | "queryKey">
) {
  return useQuery({ ...queryOptions.get(), ...options })
}
