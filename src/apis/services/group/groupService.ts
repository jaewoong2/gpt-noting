import { http as serverHttp } from "../api"
import { http } from "../apiClient"
import BaseService from "../baseService"
import { GetGroupResponse } from "./type"

class GroupService extends BaseService {
  get(page?: number) {
    if (!this.http) return null
    return this.http<GetGroupResponse>(`/api/groups`, {})
  }
}

const groupService = new GroupService()

export default groupService
