import prisma from '@/lib/prisma'
import { getUserDataSelect } from '@/utils/getInclude'
import { validateRequest } from '@/views/auth/lib/auth'
import FollowButton from '@/views/main/components/FollowButton'
import Link from 'next/link'
import UserAvatar from '../UserAvatar'
import UserTooltip from '../UserTooltip'

async function WhoToFollow() {
  const { user: loggedInUser } = await validateRequest()

  if (!loggedInUser) return null

  const usersToFollow = await prisma.user.findMany({
    where: {
      NOT: { id: loggedInUser.id }, // Not ile bu query'de kendi kullanıcımızı çıkartıyoruz
      followers: { none: { followerId: loggedInUser.id } } // none ile bu query'de takip etmediğimiz kullanıcıları getiriyoruz
    },
    select: getUserDataSelect(loggedInUser.id), // bu query ile sadece gerekli verileri getiriyoruz
    take: 5 // bu query ile sadece 5 kullanıcı getiriyoruz
  })

  return (
    <div className='space-y-5 rounded-2xl bg-card p-5 shadow-sm'>
      <h1 className='text-xl font-bold'>Who to follow</h1>
      {usersToFollow.map(user => (
        <div className='flex items-center justify-between gap-3' key={user.id}>
          <UserTooltip user={user}>
            <Link href={`/users/${user.username}`} className='flex items-center gap-3'>
              <UserAvatar avatarUrl={user.avatarUrl} className='float-none' />
              <div>
                <span className='line-clamp-1 break-all font-semibold hover:underline'>{user.displayName}</span>
                <span className='line-clamp-1 break-all text-muted-foreground'>@{user.username}</span>
              </div>
            </Link>
          </UserTooltip>
          <FollowButton
            userId={user.id}
            initialState={{
              followers: user._count.followers,
              isFollowdUser: user.followers.some(({ followerId }) => followerId === user.id)
            }}
          />
        </div>
      ))}
    </div>
  )
}

export default WhoToFollow
