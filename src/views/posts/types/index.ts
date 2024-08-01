import { Prisma } from '@prisma/client'
import { getPostDataInclude } from '../utils'

export type PostData = Prisma.PostGetPayload<{ include: ReturnType<typeof getPostDataInclude> }>

export interface PostsPage {
  posts: PostData[]
  nextCursor: string | null
}
