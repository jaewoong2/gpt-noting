import BaseService from "../baseService";
import {
  CreatePostBody,
  CreatePostResponse,
  GetPostDetailResponse,
  GetPostsResponse,
} from "./type";

export type GetAllOptions = {
  type?: "user" | "group";
  userid?: string;
  groupId?: string;
};

class PostService extends BaseService {
  async getAll(page?: number, options?: GetAllOptions) {
    if (options?.type === "user") {
      const result = await this.http<GetPostsResponse>(
        `/api/posts/user?page=${page}&userId=${options.userid}`,
        { cache: "no-cache", keepalive: false }
      );

      return result;
    }

    const result = await this.http<GetPostsResponse>(
      `/api/posts?page=${page}`,
      {}
    );

    return result;
  }

  get(id: string) {
    return this.http<GetPostDetailResponse>(`/api/posts/${id}`, {});
  }

  create(variables: CreatePostBody) {
    return this.http<CreatePostResponse>("/api/posts", {
      method: "post",
      body: variables,
    });
  }

  delete(postId: string) {
    return this.http<CreatePostResponse>(`/api/posts/${postId}`, {
      method: "DELETE",
    });
  }
}

const postService = new PostService();

export default postService;
