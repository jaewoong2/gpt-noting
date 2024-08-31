import BaseService from '../baseService'
import {
  GetPostsResponse,
  GetPostDetailResponse,
  CreatePostBody,
  CreatePostResponse,
  GetAllOptions,
  UpdatePostRequest,
  SearchPostsResponse,
} from './type'

class PostService extends BaseService {
  // No page Get ALL Posts
  async searchPosts(query?: string) {
    const result = await this.http<SearchPostsResponse>(
      `/api/conversation/search?query=${query}`,
      {
        next: { tags: ['posts'] },
      },
    )

    return result
  }

  async getAll(page?: number, options?: GetAllOptions) {
    if (options?.type === 'like') {
      const result = await this.http<GetPostsResponse>(
        `/api/conversation/likes?page=${page}`,
        { next: { tags: ['posts'] } },
      )

      return result
    }

    if (options?.type === 'user') {
      const result = await this.http<GetPostsResponse>(
        `/api/conversation/user?page=${page}&userId=${options.userid}`,
        {
          useCookie: true,
          next: { tags: ['posts'] },
        },
      )

      return result
    }

    const result = await this.http<GetPostsResponse>(
      `/api/conversation?page=${page}`,
      {
        useCookie: false,
        next: { tags: ['posts'] },
        // next: { revalidate: 300, tags: ['posts', `${page}`] },
      },
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
    const result = this.http<CreatePostResponse>(
      `/api/conversation/${postId}`,
      {
        method: 'DELETE',
      },
    )

    return result
  }

  async update(post: UpdatePostRequest) {
    const result = await this.http<CreatePostResponse>(
      `/api/conversation/${post.id}`,
      {
        method: 'PATCH',
        body: post,
      },
    )

    return result
  }
}

const postService = new PostService()

export default postService
