import { http as serverHttp } from './api'
import { http } from './apiClient'

export default class BaseService {
  private isServer: boolean

  protected http: typeof http

  constructor() {
    if (typeof window === 'undefined') {
      this.http = serverHttp
      this.isServer = true
    } else {
      this.http = http
      this.isServer = false
    }
  }

  // eslint-disable-next-line class-methods-use-this, consistent-return
  response_interceptor(response: Response) {
    if (response.ok) return response
  }
}
