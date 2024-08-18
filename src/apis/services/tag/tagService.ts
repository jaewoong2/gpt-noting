import { DefaultResponse, Tag } from '@/lib/type'
import BaseService from '../baseService'

class TagService extends BaseService {
  getTag(userId: string) {
    return this.http<DefaultResponse<Tag[]>>(`/api/tags?userId=${userId}`, {
      next: { tags: [userId] },
    })
  }
}

const tagService = new TagService()

export default tagService
