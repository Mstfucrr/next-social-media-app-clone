'use server'

import prisma from '@/lib/prisma'
import { validateRequest } from '@/views/auth/lib/auth'
import { getCommentDataInclude, getPostDataInclude } from '../../utils'
import { createCommentSchema, createPostSchema } from '../lib/validation'

export async function submitPost(input: { content: string; mediaIds?: string[] }) {
  const { user } = await validateRequest()
  if (!user) throw new Error('Unauthorized')

  const { content, mediaIds } = createPostSchema.parse(input)

  const newPost = await prisma.post.create({
    data: {
      content,
      userId: user.id,
      attachments: {
        connect: mediaIds?.map(id => ({ id }))
      }
    },
    include: getPostDataInclude(user.id)
  })

  return newPost
}

export async function deletePost(id: string) {
  const { user } = await validateRequest()

  if (!user) throw new Error('Unauthorized')

  // delete post logic

  const post = await prisma.post.findUnique({
    where: { id }
  })

  if (!post) throw new Error('Post not found')

  if (post.userId !== user.id) throw new Error('Unauthorized')

  const deletedPost = await prisma.post.delete({
    where: { id },
    include: getPostDataInclude(user.id)
  })

  return deletedPost
}

export async function submitComment({ postId, content }: { postId: string; content: string }) {
  const { user } = await validateRequest()
  if (!user) throw new Error('Unauthorized')

  const { content: contentValidated } = createCommentSchema.parse({ content })

  const newComment = await prisma.comment.create({
    data: {
      content: contentValidated,
      postId: postId,
      userId: user.id
    },
    include: getCommentDataInclude(user.id)
  })

  return newComment
}

export async function deleteComment(id: string) {
  const { user } = await validateRequest()

  if (!user) throw new Error('Unauthorized')

  const comment = await prisma.comment.findUnique({
    where: { id }
  })

  if (!comment) throw new Error('Comment not found')

  if (comment.userId !== user.id) throw new Error('Unauthorized')

  const deletedComment = await prisma.comment.delete({
    where: { id },
    include: getCommentDataInclude(user.id)
  })

  return deletedComment
}
