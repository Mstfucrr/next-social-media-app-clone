'use client'
import { FollowerInfo } from '@/lib/types'
import { formatNumber } from '@/lib/utils'
import useFollower from '@/views/main/hooks/useFollower'

interface FollowerCountProps {
  userId: string
  initialState: FollowerInfo
}

export default function FollowerCount({ userId, initialState }: FollowerCountProps) {
  const { data } = useFollower(userId, initialState)

  return (
    <span>
      Followers: <span className='font-semibold'>{formatNumber(data.followers)}</span>
    </span>
  )
}
