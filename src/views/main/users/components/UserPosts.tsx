'use client'

import usePostOperations from '@/views/main/hooks/usePostOperations'
import PostsList from '../../components/PostsList'

interface UserPostsProps {
  userId: string
}

export default function UserPosts({ userId }: UserPostsProps) {
  const { userFeedQuery } = usePostOperations()
  const queryResult = userFeedQuery(userId)

  return <PostsList queryResult={queryResult} />
}
