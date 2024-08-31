import { UseQueryOptions } from "@tanstack/react-query"

import groupService from "./groupService"
import { GetGroupResponse } from "./type"

const queryKeys = {
  group: ["group"] as const,
}

const queryOptions = {
  get: (): UseQueryOptions<
    GetGroupResponse | null,
    Error,
    GetGroupResponse,
    readonly ["group"]
  > => ({
    queryKey: queryKeys.group,
    queryFn: async () => {
      const result = await groupService.get()
      return result
    },
  }),
}

export default queryOptions
