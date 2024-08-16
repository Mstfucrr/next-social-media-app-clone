// src/app/api/users/[userId]/posts/route.ts

import prisma from '@/lib/prisma'
import { validateRequest } from '@/views/auth/lib/auth'
import { PostsPage } from '@/views/main/posts/types'
import { getPostDataInclude } from '@/views/main/utils'
import { NextRequest } from 'next/server'

export async function GET(req: NextRequest, { params }: { params: { userId: string } }) {
  const { userId } = params

  try {
    const curser = req.nextUrl.searchParams.get('cursor') ?? undefined

    const pageSize = 10

    const { user } = await validateRequest()

    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 })

    const posts = await prisma.post.findMany({
      include: getPostDataInclude(user.id),
      orderBy: { createdAt: 'desc' },
      take: pageSize + 1,
      cursor: curser ? { id: curser } : undefined,
      where: { userId: userId }
    })

    const nextCurser = posts.length > pageSize ? posts[pageSize].id : null

    const data: PostsPage = {
      posts: posts.slice(0, pageSize),
      nextCursor: nextCurser
    }

    return Response.json(data)
  } catch (error) {
    return Response.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
