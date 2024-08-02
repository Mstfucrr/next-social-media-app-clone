'use client'

import usePostOperations from '@/views/main/hooks/usePostOperations'
import PostsList from '../../components/PostsList'

export default function ForYouFeed() {
  const { forYouFeedQuery } = usePostOperations()

  return <PostsList queryResult={forYouFeedQuery} />
}
