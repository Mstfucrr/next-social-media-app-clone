// src/app/api/users/username/[username]/route.tsx

import prisma from '@/lib/prisma'
import { getUserDataSelect } from '@/utils/getInclude'
import { validateRequest } from '@/views/auth/lib/auth'
import { NextRequest } from 'next/server'

export async function GET(req: NextRequest, { params }: { params: { username: string } }) {
  const { username } = params

  try {
    const { user: loggedInUser } = await validateRequest()

    if (!loggedInUser) return Response.json({ error: 'Unauthorized' }, { status: 401 })

    const user = await prisma.user.findFirst({
      where: {
        username: {
          equals: username,
          mode: 'insensitive'
        }
      },
      select: getUserDataSelect(loggedInUser.id)
    })

    if (!user) return Response.json({ error: 'User not found' }, { status: 404 })

    return Response.json(user)
  } catch (error) {
    return Response.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
