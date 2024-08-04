'use server'

import prisma from '@/lib/prisma'
import { getUserDataSelect } from '@/utils/getInclude'
import { validateRequest } from '@/views/auth/lib/auth'
import { UpdateUserProfileValues, updateUserProfileSchema } from '@/views/auth/lib/validation'

export async function updateUserProfile(value: UpdateUserProfileValues) {
  const validatedValues = updateUserProfileSchema.parse(value)

  const { user } = await validateRequest()

  if (!user) throw new Error('Unauthorized')

  const updatedUser = await prisma.user.update({
    where: { id: user.id },
    data: validatedValues,
    select: getUserDataSelect(user.id)
  })

  return updatedUser
}
