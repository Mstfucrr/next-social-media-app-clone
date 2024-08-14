import prisma from '@/lib/prisma'
import { BookmarkInfo } from '@/lib/types'
import { validateRequest } from '@/views/auth/lib/auth'
import { NextRequest } from 'next/server'

export async function GET(req: NextRequest, { params }: { params: { postId: string } }) {
  const { postId } = params

  try {
    const { user: loggedInUser } = await validateRequest()

    if (!loggedInUser) return Response.json({ error: 'Unauthorized' }, { status: 401 })

    const bookmark = await prisma.bookmark.findUnique({
      where: {
        userId_postId: {
          userId: loggedInUser.id,
          postId: postId
        }
      }
    })

    const data: BookmarkInfo = {
      isBookmarkedByUser: !!bookmark
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

    await prisma.bookmark.upsert({
      where: {
        userId_postId: {
          userId: loggedInUser.id, // login olan user'ın id'si
          postId: postId // post id'si
        }
      },
      create: {
        userId: loggedInUser.id, // login olan user'ın id'si
        postId: postId // post id'si
      },
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

    await prisma.bookmark.delete({
      where: {
        userId_postId: {
          userId: loggedInUser.id,
          postId: postId
        }
      }
    })

    return Response.json({ success: true })
  } catch (error) {
    return Response.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
