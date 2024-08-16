import { Prisma } from '@prisma/client'
import { getCommentDataInclude, getPostDataInclude } from '../../utils'

export type PostData = Prisma.PostGetPayload<{ include: ReturnType<typeof getPostDataInclude> }>

export interface PostsPage {
  posts: PostData[]
  nextCursor: string | null
}

// Bir dosyanın yükleme işlemini temsil eden arayüz.
export interface Attachment {
  file: File // Yüklenen dosya.
  mediaId?: string // Dosyanın sunucuda aldığı kimlik (opsiyonel).
  isUploading: boolean // Dosyanın yüklenip yüklenmediğini belirten bayrak.
}

export type CommentData = Prisma.CommentGetPayload<{
  include: ReturnType<typeof getCommentDataInclude>
}>

export interface CommentsPage {
  comments: CommentData[]
  previousCursor: string | null
}
