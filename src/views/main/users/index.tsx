import { FollowerInfo } from '@/lib/types'
import React from 'react'
import { formatDate } from 'date-fns'
import { formatNumber } from '@/lib/utils'
import UserAvatar from '../components/UserAvatar'
import FollowerCount from '../components/FollowerCount'
import { Button } from '@/components/ui/button'
import { PencilIcon } from 'lucide-react'
import FollowButton from '../components/FollowButton'
import UserProfilePosts from './components/UserPosts'
import { UserData } from '@/types'
import EditProfileButton from '../components/EditProfileButton'
import UserProfile from './components/UserProfile'
import TrendsSidebar from '../components/trendsSidebar'

interface UserViewProps {
  user: UserData
  loggedInUserId: string
}

const UserView = ({ user, loggedInUserId }: UserViewProps) => {
  return (
    <main className='flex w-full gap-5'>
      <div className='flex w-full flex-col gap-y-5'>
        <UserProfile user={user} loggedInUserId={loggedInUserId} />
        <div className='flex w-full flex-col gap-y-5'>
          <div className='rounded-2xl bg-card p-5 shadow-sm'>
            <h2 className='text-center text-2xl font-bold'>
              {user.displayName}&apos;s Posts ({formatNumber(user._count.posts)})
            </h2>
          </div>
          <UserProfilePosts userId={user.id} />
        </div>
      </div>
      <TrendsSidebar />
    </main>
  )
}

export default UserView
