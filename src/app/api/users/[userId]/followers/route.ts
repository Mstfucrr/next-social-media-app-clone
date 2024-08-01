// src/app/api/users/[userId]/followers/route.ts

import prisma from '@/lib/prisma'
import { FollowerInfo } from '@/lib/types'
import { validateRequest } from '@/views/auth/lib/auth'
import { NextRequest } from 'next/server'

export async function GET(req: NextRequest, { params }: { params: { userId: string } }) {
  const { userId } = params

  try {
    const { user: loggedInUser } = await validateRequest()

    if (!loggedInUser) return Response.json({ error: 'Unauthorized' }, { status: 401 })

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        followers: {
          where: { followerId: loggedInUser.id },
          select: { followerId: true }
        },
        _count: { select: { followers: true } }
      }
    })

    if (!user) return Response.json({ error: 'User not found' }, { status: 404 })

    const data: FollowerInfo = {
      followers: user._count.followers,
      isFollowdUser: !!user.followers.length
    }

    return Response.json({ data })
  } catch (error) {
    return Response.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function POST(req: NextRequest, { params }: { params: { userId: string } }) {
  try {
    const { user: loggedInUser } = await validateRequest()

    if (!loggedInUser) return Response.json({ error: 'Unauthorized' }, { status: 401 })

    await prisma.follow.upsert({
      where: {
        followerId_followingId: {
          followerId: loggedInUser.id,
          followingId: params.userId
        }
      },
      create: {
        followerId: loggedInUser.id,
        followingId: params.userId
      },
      update: {}
    })

    return Response.json({ success: true })
  } catch (error) {
    return Response.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { userId: string } }) {
  try {
    const { user: loggedInUser } = await validateRequest()

    if (!loggedInUser) return Response.json({ error: 'Unauthorized' }, { status: 401 })

    await prisma.follow.deleteMany({
      where: {
        followerId: loggedInUser.id,
        followingId: params.userId
      }
    })

    return Response.json({ success: true })
  } catch (error) {
    return Response.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
