import { UserData } from '@/types'
import { validateRequest } from '@/views/auth/lib/auth'
import Link from 'next/link'
import FollowButton from '../../components/FollowButton'
import Linkify from '../../components/Linkify'
import UserAvatar from '../../components/UserAvatar'
import UserTooltip from '../../components/UserTooltip'

interface UserInfoSidebarProps {
  user: UserData
}

export default async function UserInfoSidebar({ user }: UserInfoSidebarProps) {
  const { user: loggedInUser } = await validateRequest()

  if (!loggedInUser) return null

  return (
    <div className='space-y-5 rounded-2xl bg-card p-5 shadow-sm'>
      <h2 className='text-xl font-bold'>About this user</h2>
      <UserTooltip user={user}>
        <Link href={`/users/${user.username}`} className='flex items-center gap-3'>
          <UserAvatar avatarUrl={user.avatarUrl} className='flex-none' />
          <div>
            <span className='line-clamp-1 break-all font-semibold hover:underline'>{user.displayName}</span>
            <span className='line-clamp-1 break-all text-muted-foreground'>@{user.username}</span>
          </div>
        </Link>
      </UserTooltip>

      <Linkify>
        <p className='line-clamp-6 whitespace-pre-line break-words text-muted-foreground'>{user.bio}</p>
      </Linkify>

      {user.id !== loggedInUser.id && (
        <FollowButton
          initialState={{
            followers: user._count.followers,
            isFollowdByUser: user.followers.some(follower => follower.followerId === loggedInUser.id)
          }}
          userId={user.id}
        />
      )}
    </div>
  )
}
