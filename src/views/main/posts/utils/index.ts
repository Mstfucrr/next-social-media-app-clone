import { getUserDataSelect } from '@/utils/getInclude'
import { Prisma } from '@prisma/client'

export function getPostDataInclude(loggedInUserId: string) {
  return {
    user: {
      select: getUserDataSelect(loggedInUserId)
    },
    attachments: true,
    likes: {
      where: { userId: loggedInUserId },
      select: { userId: true }
    },
    bookmarks: {
      where: { userId: loggedInUserId },
      select: { userId: true }
    },
    _count: { select: { likes: true } }
  } satisfies Prisma.PostInclude
}
