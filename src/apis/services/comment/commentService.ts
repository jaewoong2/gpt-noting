import BaseService from "../baseService"
import { GetCommentResponse, PostCommentResponse } from "./type"

class CommentService extends BaseService {
  get(postId: string) {
    return this.http<GetCommentResponse>(`/api/comments/post/${postId}`, {})
  }

  post(postId: string, body: { content: string }) {
    return this.http<PostCommentResponse>(`/api/comments/post/${postId}`, {
      method: "POST",
      body,
    })
  }
}

const commentService = new CommentService()

export default commentService
