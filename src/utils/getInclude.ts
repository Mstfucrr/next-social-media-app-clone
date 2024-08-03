import { Prisma } from '@prisma/client'

export function getUserDataSelect(loggedInUserId: string) {
  return {
    id: true,
    username: true,
    displayName: true,
    avatarUrl: true,
    bio: true,
    createdAt: true,
    followers: {
      where: { followerId: loggedInUserId },
      select: { followerId: true }
    },
    _count: { select: { followers: true, posts: true } }
  } satisfies Prisma.UserSelect
}
