import { DefaultResponse, Like, User } from '@/lib/type'
import BaseService from '../baseService'

class LikeService extends BaseService {
  // 좋아요 누른 포스트
  getLikes() {
    return this.http<DefaultResponse<Like[]>>(`/api/likes/user`, {})
  }

  // 포스트에 좋아요 누른 사람들
  getUser(user: string) {
    return this.http<DefaultResponse<User>>(`/api/users/${user}`, {})
  }

  // 포스트 좋아요 누르기
  like(postId: string) {
    return this.http<DefaultResponse<User>>(`/api/likes/post/${postId}`, {
      method: 'POST',
    })
  }

  unlike(postId: string) {
    return this.http<DefaultResponse<User>>(`/api/likes/post/${postId}`, {
      method: 'DELETE',
    })
  }
}

const likeService = new LikeService()

export default likeService
