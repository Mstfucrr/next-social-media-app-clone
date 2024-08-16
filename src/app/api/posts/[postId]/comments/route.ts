import prisma from '@/lib/prisma'
import { validateRequest } from '@/views/auth/lib/auth'
import { CommentsPage } from '@/views/main/posts/types'
import { getCommentDataInclude } from '@/views/main/utils'
import { NextRequest } from 'next/server'

export async function GET(req: NextRequest, { params }: { params: { postId: string } }) {
  const { postId } = params
  try {
    const curser = req.nextUrl.searchParams.get('cursor') ?? undefined

    const pageSize = 5

    const { user } = await validateRequest()

    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 })

    const comments = await prisma.comment.findMany({
      where: { postId: postId },
      include: getCommentDataInclude(user.id),
      orderBy: { createdAt: 'asc' }, // burası => tarihi eskiye göre sıralar
      take: -pageSize - 1,
      cursor: curser ? { id: curser } : undefined
    })

    const prevCurser = comments.length > pageSize ? comments[0].id : null

    const data: CommentsPage = {
      // burası => comments.slice(1) => yorumları 1. yorumdan itibaren gösterir
      comments: comments.length > pageSize ? comments.slice(1) : comments,
      previousCursor: prevCurser
    }

    return Response.json(data)
  } catch (error) {
    return Response.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
