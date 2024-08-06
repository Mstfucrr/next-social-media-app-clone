import { formatNumber } from '@/lib/utils'
import { UserData } from '@/types'
import TrendsSidebar from '../components/trendsSidebar'
import UserProfilePosts from './components/UserPosts'
import UserProfile from './components/UserProfile'

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
