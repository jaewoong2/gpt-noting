export type NextPageProps<
  Params extends Record<string, string> | null = null,
  SearhParams extends Record<string, string> | null = null,
> = {
  params: Params
  searchParams: SearhParams
}

export type RequireKeys<T, K extends keyof T> = Omit<T, K> &
  Required<Pick<T, K>>

export interface NavItem {
  href?: string
  title: string
  disabled?: boolean
  external?: boolean
}
// export interfaces.ts

export interface Comment {
  content: string
  createdAt: string // timestamp without time zone
  userId?: string // uuid, nullable
  user?: Partial<User> // 추가된 릴레이션
  postId?: string // uuid, nullable
  post?: Partial<Post> // 추가된 릴레이션
  updateAt: string // timestamp without time zone
  id: string // uuid
}

export interface Group {
  createdAt: string // timestamp without time zone
  updateAt: string // timestamp without time zone
  groupName: string
  id: string // uuid
  ownerId?: string // character varying, nullable
  owner?: Partial<User> // 추가된 릴레이션

  posts?: Partial<Post[]>
}

export interface Image {
  createdAt: string // timestamp without time zone
  updateAt: string // timestamp without time zone
  userId?: string // uuid, nullable
  user?: Partial<User> // 추가된 릴레이션
  id: string // uuid
  postId?: string // uuid, nullable
  post?: Partial<Post> // 추가된 릴레이션
  url: string
}

export interface Like {
  createdAt: string // timestamp without time zone
  updateAt: string // timestamp without time zone
  id: string // uuid
  userId?: string // uuid, nullable
  user?: Partial<User> // 추가된 릴레이션
  postId?: string // uuid, nullable
  post?: Partial<Post> // 추가된 릴레이션
}

export interface Post {
  createdAt: string // timestamp without time zone
  updateAt: string // timestamp without time zone
  title: string
  description: string
  userId?: string // uuid, nullable
  user?: Partial<User> // 추가된 릴레이션
  id: string // uuid
  is_public: boolean
  groupsId?: string // uuid, nullable
  group?: Partial<Group> // 추가된 릴레이션
  images?: Partial<Image>[]
  likes?: Partial<Like>[]
  tags?: Partial<Tag>[]
}

export interface PostTagsTag {
  postId: string // uuid
  post?: Partial<Post> // 추가된 릴레이션
  tagId: string // uuid
  tag?: Partial<Tag> // 추가된 릴레이션
}

export interface Reward {
  createdAt: string // timestamp without time zone
  updateAt: string // timestamp without time zone
  userId?: string // uuid, nullable
  user?: Partial<User> // 추가된 릴레이션
  id: string // uuid
  issuedAt: string // timestamp without time zone
  expiresAt?: string // timestamp without time zone, nullable
  used: boolean
  rewardTypeId?: string // uuid, nullable
  rewardType?: Partial<RewardType> // 추가된 릴레이션
}

export interface RewardBalancer {
  createdAt: string // timestamp without time zone
  updateAt: string // timestamp without time zone
  total?: number // integer, nullable
  userId?: string // uuid, nullable
  user?: Partial<User> // 추가된 릴레이션
  id: string // uuid
}

export interface RewardType {
  id: string // uuid
  createdAt: string // timestamp without time zone
  updateAt: string // timestamp without time zone
  name: string
  description: string
  amount: number // integer
}

export interface Tag {
  name: string
  id: string // uuid
}

export interface User {
  avatar: string
  userName: string
  provider?: string // character varying, nullable
  createdAt: string // timestamp without time zone
  updateAt: string // timestamp without time zone
  id: string // uuid
  email?: string
  rewards: Reward[]
}

export interface UserGroupsGroup {
  userId: string // uuid
  user?: Partial<User> // 추가된 릴레이션
  groupId: string // uuid
  group?: Partial<Group> // 추가된 릴레이션
}

export interface PageMetaDtoParameters {
  pageOptionsDto: {
    page: number
    take: number
  }
  total: number
}

export class PageMetaDto {
  readonly total: number

  readonly page: number

  readonly take: number

  readonly last_page: number

  readonly hasPreviousPage: boolean

  readonly hasNextPage: boolean

  constructor({ pageOptionsDto, total }: PageMetaDtoParameters) {
    this.page = pageOptionsDto.page <= 0 ? 1 : pageOptionsDto.page
    this.take = pageOptionsDto.take
    this.total = total
    this.last_page = Math.ceil(this.total / this.take)
    this.hasPreviousPage = this.page > 1
    this.hasNextPage = this.page < this.last_page
  }
}

export interface DefaultResponse<T, U = any> {
  message: string
  error: U
  status: number
  success: boolean
  data: T
}
