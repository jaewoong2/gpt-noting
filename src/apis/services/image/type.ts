import { DefaultResponse } from '@/lib/type'

export type CreateImageResponse = DefaultResponse<{
  $metadata: {
    httpStatusCode: number
    requestId: string
    extendedRequestId: string
    attempts: number
    totalRetryDelay: number
  }
  ETag: string
  ServerSideEncryption: string
  url: string
}>

export type CreateImageBody = {
  file: FormData
}
