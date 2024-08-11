import { DefaultResponse, PageMetaDto, Post } from "@/types";

import { GetAllOptions } from "./postService";

export type GetPostsResponse = DefaultResponse<{
  data: Post[];
  meta: PageMetaDto | null;
}>;

export type GetPostDetailResponse = DefaultResponse<Post>;

export interface UseInfiniteGetPostOptions {
  initialPageParam?: { page: number };
  enabled?: boolean;
  initialData?: GetPostsResponse["data"];
  options?: GetAllOptions;
}

export type CreatePostBody = {
  title: string;
  description: string;
  groupName: string;
  images?: string[];
  tags?: string[];
};

export type CreateDeleteResponse = DefaultResponse<{
  data: { id: string };
}>;

export type CreatePostResponse = DefaultResponse<{
  message: string;
  error: null;
  status: number;
  success: boolean;
  data: {
    id: string;
  };
}>;
