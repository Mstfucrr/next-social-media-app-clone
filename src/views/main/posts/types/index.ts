import { Prisma } from '@prisma/client'
import { getPostDataInclude } from '../utils'

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
