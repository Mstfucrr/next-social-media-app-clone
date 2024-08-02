import { getUserDataSelect } from '@/utils/getInclude'
import { Prisma } from '@prisma/client'

export function getPostDataInclude(loggedInUserId: string) {
  return {
    user: {
      select: getUserDataSelect(loggedInUserId)
    }
  } satisfies Prisma.PostInclude
}
