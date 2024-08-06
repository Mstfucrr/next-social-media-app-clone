'use client'
import LoadingButton from '@/components/ui/loadingButton'
import { FollowerInfo } from '@/lib/types'
import useFollower from '../hooks/useFollower'

interface FollowButtonProps {
  userId: string
  initialState: FollowerInfo
}

export default function FollowButton({ userId, initialState }: FollowButtonProps) {
  const { data, mutate, isLoading } = useFollower(userId, initialState)

  const handleToggleFollow = () => mutate()

  return (
    <LoadingButton
      isLoading={isLoading}
      variant={data.isFollowdUser ? 'secondary' : 'default'}
      disabled={isLoading}
      onClick={handleToggleFollow}
    >
      {data.isFollowdUser ? 'Unfollow' : 'Follow'}
    </LoadingButton>
  )
}
