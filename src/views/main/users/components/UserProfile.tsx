'use client'
import { FollowerInfo } from '@/lib/types'
import { formatNumber } from '@/lib/utils'
import { UserData } from '@/types'
import { formatDate } from 'date-fns'
import { useState } from 'react'
import EditProfileButton from '../../components/EditProfileButton'
import FollowButton from '../../components/FollowButton'
import FollowerCount from '../../components/FollowerCount'
import Linkify from '../../components/Linkify'
import UserAvatar from '../../components/UserAvatar'
import UserProfileForm from './UserProfileForm'

interface UserProfileProps {
  user: UserData
  loggedInUserId: string
}

const UserProfile = ({ user, loggedInUserId }: UserProfileProps) => {
  const followerInfo: FollowerInfo = {
    followers: user._count.followers,
    isFollowdByUser: user.followers.some(follower => follower.followerId === loggedInUserId)
  }

  const [activeEdit, setActiveEdit] = useState(false)

  const handleActiveEdit = () => setActiveEdit(true)
  const handleDeactiveEdit = () => setActiveEdit(false)

  return (
    <div className='flex h-fit w-full flex-col gap-y-5 rounded-2xl bg-card p-5 shadow-sm'>
      {activeEdit ? (
        <UserProfileForm user={user} handleDeactiveEdit={handleDeactiveEdit} />
      ) : (
        <>
          <UserAvatar avatarUrl={user.avatarUrl} className='mx-auto !size-60' />
          <div className='flex flex-wrap gap-5 sm:flex-nowrap'>
            <div className='me-auto space-y-3'>
              <div>
                <h1 className='text-3xl font-bold'>{user.displayName}</h1>
                <span className='text-muted-foreground'>@{user.username}</span>
              </div>
              <div>
                <span>Member since {formatDate(new Date(user.createdAt), 'MMM d, yyyy')}</span>
              </div>
              <div className='flex items-center gap-x-3'>
                <span>
                  Posts: <span className='font-bold'>{formatNumber(user._count.posts)}</span>
                </span>
                <FollowerCount userId={user.id} initialState={followerInfo} />
              </div>
            </div>
            {user.id === loggedInUserId ? (
              <EditProfileButton onClick={handleActiveEdit} />
            ) : (
              <FollowButton userId={user.id} initialState={followerInfo} />
            )}
          </div>
          {user.bio && (
            <>
              <hr />
              <div className='overflow-hidden'></div>
              <Linkify>
                <p className='whitespace-pre-line break-words'>{user.bio}</p>
              </Linkify>
            </>
          )}
        </>
      )}
    </div>
  )
}

export default UserProfile
