import prisma from '@/lib/prisma'
import { validateRequest } from '@/views/auth/lib/auth'
import { userDataSelect } from '@/views/posts/types'
import Link from 'next/link'
import React from 'react'
import UserAvatar from '../UserAvatar'
import { Button } from '@/components/ui/button'

async function WhoToFollow() {
  const { user } = await validateRequest()

  if (!user) return null

  const usersToFollow = await prisma.user.findMany({
    where: {
      NOT: { id: user.id }
    },
    select: userDataSelect,
    take: 5
  })

  return (
    <div className='space-y-5 rounded-2xl bg-card p-5 shadow-sm'>
      <h1 className='text-xl font-bold'>Who to follow</h1>
      {usersToFollow.map(user => (
        <div className='flex items-center justify-between gap-3' key={user.id}>
          <Link href={`/user/${user.username}`} className='flex items-center gap-3'>
            <UserAvatar avatarUrl={user.avatarUrl} className='float-none' />
            <div className=''>
              <span className='line-clamp-1 break-all font-semibold hover:underline'>{user.displayName}</span>
              <span className='line-clamp-1 break-all text-muted-foreground'>@{user.username}</span>
            </div>
          </Link>
          <Button>Follow</Button>
        </div>
      ))}
    </div>
  )
}

export default WhoToFollow
