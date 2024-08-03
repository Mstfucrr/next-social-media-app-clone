import { getUserDataSelect } from '@/utils/getInclude'
import { Prisma } from '@prisma/client'

export type UserData = Prisma.UserGetPayload<{
  select: ReturnType<typeof getUserDataSelect>
}>
