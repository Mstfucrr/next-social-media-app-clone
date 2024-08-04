import { UserData } from '@/types'
import React from 'react'
import UserAvatar from '../../components/UserAvatar'
import { formatDate } from 'date-fns'
import { formatNumber } from '@/lib/utils'
import FollowerCount from '../../components/FollowerCount'
import { FollowerInfo } from '@/lib/types'
import EditProfileButton from '../../components/EditProfileButton'
import FollowButton from '../../components/FollowButton'

interface UserProfileProps {
  user: UserData
  loggedInUserId: string
}

const UserProfile = ({ user, loggedInUserId }: UserProfileProps) => {
  const followorInfo: FollowerInfo = {
    // FollowerInfo tipinde bir obje oluşturduk
    followers: user._count.followers, // user'ın followers sayısını aldık
    isFollowdUser: user.followers.some(follower => follower.followerId === loggedInUserId) // user'ı takip edenler arasında loggedInUserId var mı diye kontrol ettik. (loggedInUserId user'ı takip ediyor mu?)
  }

  return (
    <div className='flex h-fit w-full flex-col gap-y-5 rounded-2xl bg-card p-5 shadow-sm'>
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
            <FollowerCount userId={user.id} initialState={followorInfo} />
          </div>
        </div>
        {user.id === loggedInUserId ? (
          <EditProfileButton user={user} />
        ) : (
          <FollowButton userId={user.id} initialState={followorInfo} />
        )}
      </div>
      {user.bio && (
        <>
          <hr />
          <div className='overflow-hidden'></div>
          <p className='whitespace-pre-line break-words'>{user.bio}</p>
        </>
      )}
    </div>
  )
}

export default UserProfile
