'use client'
import { FollowerInfo } from '@/lib/types'
import { UserData } from '@/types'
import { PropsWithChildren } from 'react'
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip'
import UserAvatar from '../UserAvatar'
import { TooltipProvider } from '@radix-ui/react-tooltip'
import Linkify from '../Linkify'
import FollowButton from '../FollowButton'
import FollowerCount from '../FollowerCount'
import useSession from '../../hooks/useSession'

interface UserTooltipProps extends PropsWithChildren {
  user: UserData
}

export default function UserTooltip({ user, children }: UserTooltipProps) {
  const { user: loogedInUser } = useSession()
  const followerState: FollowerInfo = {
    followers: user._count.followers,
    isFollowdUser: !!user.followers.some(follower => follower.followerId === loogedInUser.id)
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent className='w-80 rounded-3xl p-4'>
          <div className='flex flex-col justify-between gap-x-4 gap-y-3'>
            <div className='flex items-center gap-x-4'>
              <UserAvatar avatarUrl={user.avatarUrl} size={70} />
              <div>
                <h4 className='text-sm font-semibold'>{user.displayName}</h4>
                <span className='text-sm'>@{user.username}</span>
              </div>
              {user.id !== loogedInUser.id && (
                <div className='ml-auto'>
                  <FollowButton userId={user.id} initialState={followerState} />
                </div>
              )}
            </div>
            {!user.bio && (
              <Linkify>
                {/* <p className='text-sm'>{user.bio.length > 100 ? `${user.bio.slice(0, 100)}...` : user.bio}</p> */}
                <p className='text-sm'>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea repellendus facilis praesentium at
                  reiciendis sapiente commodi ad nihil? Mollitia, error!
                </p>
              </Linkify>
            )}

            <FollowerCount userId={user.id} initialState={followerState} />
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
