import { Comment, DefaultResponse } from "@/types"

export type GetCommentResponse = DefaultResponse<Comment[]>

export type PostCommentResponse = DefaultResponse<{}>

export type PostCommentBody = { postId: string; content: string }
