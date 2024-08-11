import { DefaultResponse, User } from "@/types"

import BaseService from "../baseService"

class UserService extends BaseService {
  getMe(options?: RequestInit) {
    return this.http<DefaultResponse<User>>(`/api/users/me`, {
      next: { tags: ["user"] },
      ...options,
    })
  }

  getUser(user: string) {
    return this.http<DefaultResponse<User>>(`/api/users/${user}`, {})
  }
}

const userService = new UserService()

export default userService
