'use client'

import PostsList from './PostsList'
import usePostOperations from '../../hooks/usePostOperations'

export default function FollowingFeed() {
  const { followingFeedQuery } = usePostOperations()

  return <PostsList queryResult={followingFeedQuery} />
}
