'use server'

import { validateRequest } from '@/views/auth/lib/auth'
import { createPostSchema } from '../../lib/validation'
import prisma from '@/lib/prisma'
import { getPostDataInclude } from '../../utils'

export async function submitPost(input: string) {
  const { user } = await validateRequest()
  if (!user) throw new Error('Unauthorized')

  const { content } = createPostSchema.parse({ content: input })

  const newPost = await prisma.post.create({
    data: {
      content,
      userId: user.id
    },
    include: getPostDataInclude(user.id)
  })

  return newPost
}
