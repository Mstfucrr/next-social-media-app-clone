import prisma from '@/lib/prisma'
import { validateRequest } from '@/views/auth/lib/auth'
import { postDataInclude } from '@/views/posts/types'

export async function GET() {
  try {
    const { user } = await validateRequest()

    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 })

    const posts = await prisma.post.findMany({
      include: postDataInclude,
      orderBy: { createdAt: 'desc' }
    })

    return Response.json(posts)
  } catch (error) {
    console.error(error)
    return Response.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
