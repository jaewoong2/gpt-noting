import BaseService from '../baseService'
import { GetGroupResponse } from './type'

class GroupService extends BaseService {
  get() {
    if (!this.http) return null
    return this.http<GetGroupResponse>(`/api/groups`, {})
  }
}

const groupService = new GroupService()

export default groupService
