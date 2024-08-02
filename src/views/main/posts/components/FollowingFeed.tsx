'use client'

import usePostOperations from '../../hooks/usePostOperations'
import PostsList from '../../components/PostsList'

export default function FollowingFeed() {
  const { followingFeedQuery } = usePostOperations()

  return <PostsList queryResult={followingFeedQuery} />
}
