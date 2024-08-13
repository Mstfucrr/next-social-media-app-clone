import prisma from '@/lib/prisma'
import { LikeInfo } from '@/lib/types'
import { validateRequest } from '@/views/auth/lib/auth'
import { NextRequest } from 'next/server'

export async function GET(req: NextRequest, { params }: { params: { postId: string } }) {
  const { postId } = params

  try {
    const { user: loggedInUser } = await validateRequest()

    if (!loggedInUser) return Response.json({ error: 'Unauthorized' }, { status: 401 })

    const post = await prisma.post.findUnique({
      where: { id: postId }, // postId 'e göre post bul
      select: {
        likes: {
          where: { userId: loggedInUser.id }, // like'ları getirirken sadece login olan user'ın like'larını getir
          select: { userId: true } // sadece userId'yi getir
        },
        _count: { select: { likes: true } } // like sayısını getir
      }
    })

    if (!post) return Response.json({ error: 'Post not found' }, { status: 404 })

    const data: LikeInfo = {
      likes: post._count.likes,
      isLikedByUser: !!post.likes.length // like'lar içinde user var mı yok mu kontrol et
    }

    return Response.json({ data })
  } catch (error) {
    return Response.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function POST(req: NextRequest, { params }: { params: { postId: string } }) {
  const { postId } = params

  try {
    const { user: loggedInUser } = await validateRequest()

    if (!loggedInUser) return Response.json({ error: 'Unauthorized' }, { status: 401 })

    await prisma.like.upsert({
      // like'ı bulup yoksa oluşturur
      where: {
        userId_postId: {
          // like'ı bulurken userId ve postId'ye göre bul
          userId: loggedInUser.id, // login olan user'ın id'si
          postId: postId // post id'si
        }
      },
      create: {
        userId: loggedInUser.id, // login olan user'ın id'si
        postId: postId // post id'si
      }, // eğer like yoksa oluştur
      update: {}
    })

    return Response.json({ success: true })
  } catch (error) {
    return Response.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { postId: string } }) {
  const { postId } = params

  try {
    const { user: loggedInUser } = await validateRequest()

    if (!loggedInUser) return Response.json({ error: 'Unauthorized' }, { status: 401 })

    await prisma.like.deleteMany({
      where: {
        userId: loggedInUser.id,
        postId
      }
    })

    return Response.json({ success: true })
  } catch (error) {
    return Response.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
