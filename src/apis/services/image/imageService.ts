import BaseService from "../baseService"
import { CreateImageBody, CreateImageResponse } from "./type"

class ImageService extends BaseService {
  async getPostImage(postId?: string) {
    const result = await this.http(`/api/images?postId=${postId}`, {})
    return result
  }

  create({ file }: CreateImageBody) {
    return this.http<CreateImageResponse>("/api/images", {
      method: "post",
      body: file,
      stringfy: false,
    })
  }
}

const imageService = new ImageService()

export default imageService
