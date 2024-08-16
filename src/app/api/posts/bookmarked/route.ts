import prisma from '@/lib/prisma'
import { validateRequest } from '@/views/auth/lib/auth'
import { PostsPage } from '@/views/main/posts/types'
import { getPostDataInclude } from '@/views/main/utils'
import { NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  try {
    const curser = req.nextUrl.searchParams.get('cursor') ?? undefined

    const pageSize = 10

    const { user } = await validateRequest()

    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 })

    const bookmarks = await prisma.bookmark.findMany({
      where: { userId: user.id },
      include: {
        post: {
          include: getPostDataInclude(user.id)
        }
      },
      orderBy: { createdAt: 'desc' },
      take: pageSize + 1,
      cursor: curser ? { id: curser } : undefined
    }) // burada kullanıcının kaydettiği postları getiriyoruz

    const nextCurser = bookmarks.length > pageSize ? bookmarks[pageSize].id : null

    const data: PostsPage = {
      posts: bookmarks.slice(0, pageSize).map(b => b.post),
      nextCursor: nextCurser
    }

    return Response.json(data)
  } catch (error) {
    return Response.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
