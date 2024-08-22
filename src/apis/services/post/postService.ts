import BaseService from '../baseService'
import {
  GetPostsResponse,
  GetPostDetailResponse,
  CreatePostBody,
  CreatePostResponse,
  GetAllOptions,
  UpdatePostRequest,
} from './type'

class PostService extends BaseService {
  async getAll(page?: number, options?: GetAllOptions) {
    if (options?.type === 'user') {
      const result = await this.http<GetPostsResponse>(
        `/api/conversation/user?page=${page}&userId=${options.userid}`,
        { cache: 'no-cache', keepalive: false },
      )

      return result
    }

    const result = await this.http<GetPostsResponse>(
      `/api/conversation?page=${page}`,
      {},
    )

    return result
  }

  get(id: string) {
    return this.http<GetPostDetailResponse>(`/api/conversation/${id}`, {})
  }

  create(variables: CreatePostBody) {
    return this.http<CreatePostResponse>('/api/conversation', {
      method: 'post',
      body: variables,
    })
  }

  delete(postId: string) {
    return this.http<CreatePostResponse>(`/api/conversation/${postId}`, {
      method: 'DELETE',
    })
  }

  update(post: UpdatePostRequest) {
    return this.http<CreatePostResponse>(`/api/conversation/${post.id}`, {
      method: 'PATCH',
      body: post,
    })
  }
}

const postService = new PostService()

export default postService
